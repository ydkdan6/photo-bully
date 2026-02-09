import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { imageBase64 } = await req.json();
    if (!imageBase64) throw new Error("No image provided");

    const systemPrompt = `You are "The Brutal Critic AI" — a professional photographer meets late-night stand-up comedian.

Analyze the uploaded photo and respond with ONLY valid JSON (no markdown, no code fences) in this exact structure:
{
  "score": <number 0-10>,
  "praises": ["<genuine compliment 1>", "<genuine compliment 2>", "<genuine compliment 3>"],
  "roast": "<2-3 brutal witty sentences targeting lighting, background, pose, or energy>",
  "why": "<technical explanation of what's wrong — lighting, composition, color, etc>",
  "fixes": ["<tip 1>", "<tip 2>", "<tip 3>"]
}

For "praises", find at least 3 genuinely positive things about the photo — could be composition choices, color palette, expression, mood, creativity, subject matter, or anything that actually works well. Be sincere here, not sarcastic.

Be stingy with high scores. Be brutally honest but technically insightful.`;

    console.log("Sending request to Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Critique this photo brutally." },
              { type: "image_url", image_url: { url: imageBase64 } },
            ],
          },
        ],
        temperature: 0.8,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: `AI Gateway error: ${response.status}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let critique;
    try {
      critique = JSON.parse(content);
    } catch {
      const match = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) {
        critique = JSON.parse(match[1].trim());
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return new Response(JSON.stringify(critique), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("critique-photo error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});