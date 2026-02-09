import ScoreDisplay from "./ScoreDisplay";
import { CritiqueSection, Flame, AlertTriangle, Wrench } from "./CritiqueSection";

interface Critique {
  score: number;
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
          icon={<Flame size={20} />}
          title="The Roast"
          content={critique.roast}
          delay={0.3}
          variant="roast"
        />
        <CritiqueSection
          icon={<AlertTriangle size={20} />}
          title="The 'Why'"
          content={critique.why}
          delay={0.5}
          variant="why"
        />
        <CritiqueSection
          icon={<Wrench size={20} />}
          title="The Fix"
          content={critique.fixes}
          delay={0.7}
          variant="fix"
        />
      </div>
    </div>
  );
};

export default CritiqueResults;
