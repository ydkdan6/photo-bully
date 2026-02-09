import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import PhotoUpload from "@/components/PhotoUpload";
import DemoResults from "@/components/DemoResults";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [photo, setPhoto] = useState<{ file: File; preview: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handlePhotoSelect = (file: File, preview: string) => {
    setPhoto({ file, preview });
    setShowResults(false);
  };

  const handleClear = () => {
    setPhoto(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis delay (replace with real AI call)
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Flame size={14} className="text-primary" />
              <span className="text-xs font-mono text-primary tracking-wide uppercase">
                No mercy. No filters.
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient-fire">The Brutal</span>
              <br />
              <span className="text-foreground">Critic AI</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Upload your photo. Get roasted by AI with the precision of a professional
              photographer and the warmth of a stand-up comedian on a bad night.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-20 -mt-2">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PhotoUpload
            onPhotoSelect={handlePhotoSelect}
            preview={photo?.preview ?? null}
            onClear={handleClear}
          />

          {/* Analyze Button */}
          <AnimatePresence>
            {photo && !showResults && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="group relative px-8 py-3 rounded-lg bg-gradient-fire font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Zap size={18} />
                        </motion.div>
                        Judging your life choices...
                      </>
                    ) : (
                      <>
                        <Flame size={18} />
                        Roast My Photo
                      </>
                    )}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <DemoResults />

                <motion.p
                  className="text-center text-xs text-muted-foreground mt-8 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  ⚡ Demo mode — connect an AI vision API for real critiques
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground font-mono">
          The Brutal Critic AI • Your photos will never feel safe again
        </p>
      </footer>
    </div>
  );
};

export default Index;
