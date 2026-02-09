import ScoreDisplay from "./ScoreDisplay";
import { CritiqueSection, Flame, AlertTriangle, Lightbulb, Wrench } from "./CritiqueSection";

const DEMO_CRITIQUE = {
  score: 4,
  roast:
    "This photo has the energy of a LinkedIn headshot taken in a Denny's parking lot at 2 PM. The lighting screams 'I gave up,' and that background is doing absolutely nothing for you. Even your phone's camera is disappointed.",
  why: "The flat, overhead lighting creates unflattering shadows under the eyes and nose, washing out skin tones and killing any sense of dimension. The cluttered background competes for attention with the subject, and the dead-center composition breaks no rules — because it didn't try to.",
  fixes: [
    "Move to a window for soft, directional light. Position yourself at a 45° angle to the light source for natural depth and dimension.",
    "Clean up or blur that background. A shallow depth of field (f/1.8-2.8) or simply finding a cleaner backdrop will make the subject pop.",
    "Apply the rule of thirds — shift the subject slightly off-center and leave breathing room in the direction they're facing.",
  ],
};

const DemoResults = () => {
  return (
    <div className="space-y-6">
      <ScoreDisplay score={DEMO_CRITIQUE.score} />

      <div className="space-y-4">
        <CritiqueSection
          icon={<Flame size={20} />}
          title="The Roast"
          content={DEMO_CRITIQUE.roast}
          delay={0.3}
          variant="roast"
        />
        <CritiqueSection
          icon={<AlertTriangle size={20} />}
          title="The 'Why'"
          content={DEMO_CRITIQUE.why}
          delay={0.5}
          variant="why"
        />
        <CritiqueSection
          icon={<Wrench size={20} />}
          title="The Fix"
          content={DEMO_CRITIQUE.fixes}
          delay={0.7}
          variant="fix"
        />
      </div>
    </div>
  );
};

export default DemoResults;
