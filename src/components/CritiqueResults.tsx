import ScoreDisplay from "./ScoreDisplay";
import { CritiqueSection, Flame, AlertTriangle, Lightbulb, Wrench } from "./CritiqueSection";

interface Critique {
  score: number;
  praises: string[];
  roast: string;
  why: string;
  fixes: string[];
}

const CritiqueResults = ({ critique }: { critique: Critique }) => {
  return (
    <div className="space-y-6">
      <ScoreDisplay score={critique.score} />

      <div className="space-y-4">
        <CritiqueSection
          icon={<Lightbulb size={20} />}
          title="The Good Stuff"
          content={critique.praises}
          delay={0.2}
          variant="praise"
        />
        <CritiqueSection
          icon={<Flame size={20} />}
          title="The Roast"
          content={critique.roast}
          delay={0.4}
          variant="roast"
        />
        <CritiqueSection
          icon={<AlertTriangle size={20} />}
          title="The 'Why'"
          content={critique.why}
          delay={0.6}
          variant="why"
        />
        <CritiqueSection
          icon={<Wrench size={20} />}
          title="The Fix"
          content={critique.fixes}
          delay={0.8}
          variant="fix"
        />
      </div>
    </div>
  );
};

export default CritiqueResults;
