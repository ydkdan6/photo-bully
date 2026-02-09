import { motion } from "framer-motion";
import { Flame, AlertTriangle, Lightbulb, Wrench } from "lucide-react";
import { ReactNode } from "react";

interface CritiqueSectionProps {
  icon: ReactNode;
  title: string;
  content: string | string[];
  delay?: number;
  variant?: "praise" | "roast" | "why" | "fix";
}

const variantStyles = {
  praise: "border-l-yellow-400",
  roast: "border-l-destructive",
  why: "border-l-primary",
  fix: "border-l-green-500",
};

const CritiqueSection = ({ icon, title, content, delay = 0, variant = "roast" }: CritiqueSectionProps) => {
  return (
    <motion.div
      className={`bg-card rounded-lg border border-border p-5 border-l-4 ${variantStyles[variant]}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary">{icon}</span>
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      </div>
      {Array.isArray(content) ? (
        <ul className="space-y-2">
          {content.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-secondary-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.1 * (i + 1) }}
            >
              <span className="text-primary mt-1 text-sm">▸</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-secondary-foreground leading-relaxed">{content}</p>
      )}
    </motion.div>
  );
};

export { CritiqueSection, Flame, AlertTriangle, Lightbulb, Wrench };
