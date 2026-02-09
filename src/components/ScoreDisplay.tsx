import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
}

const getScoreColor = (score: number) => {
  if (score <= 3) return "from-destructive to-accent";
  if (score <= 6) return "from-accent to-primary";
  return "from-primary to-green-500";
};

const getScoreLabel = (score: number) => {
  if (score <= 2) return "Absolute Disaster";
  if (score <= 4) return "Needs Serious Help";
  if (score <= 6) return "Mediocre at Best";
  if (score <= 8) return "Actually Decent";
  return "Chef's Kiss";
};

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative flex items-center justify-center w-32 h-32"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 glow-fire" />
        <div className="absolute inset-1 rounded-full bg-card" />
        <div className="relative flex flex-col items-center">
          <motion.span
            className="text-5xl font-bold text-gradient-fire font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground font-mono">/10</span>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
            initial={{ width: 0 }}
            animate={{ width: `${score * 10}%` }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />
        </div>
        <p className="text-center text-sm font-medium text-muted-foreground mt-2">
          {getScoreLabel(score)}
        </p>
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;
