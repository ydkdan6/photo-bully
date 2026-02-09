import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, Image } from "lucide-react";

interface PhotoUploadProps {
  onPhotoSelect: (file: File, preview: string) => void;
  preview: string | null;
  onClear: () => void;
}

const PhotoUpload = ({ onPhotoSelect, preview, onClear }: PhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoSelect(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onPhotoSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <AnimatePresence mode="wait">
      {preview ? (
        <motion.div
          key="preview"
          className="relative group rounded-lg overflow-hidden border border-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <img
            src={preview}
            alt="Uploaded photo"
            className="w-full max-h-[400px] object-contain bg-card"
          />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-3">
            <p className="text-xs text-muted-foreground font-mono">Ready for judgment</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="upload"
          className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 glow-fire-sm"
              : "border-border hover:border-primary/50 hover:bg-card"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("photo-input")?.click()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              {isDragging ? (
                <Image className="text-primary" size={28} />
              ) : (
                <Upload className="text-muted-foreground" size={28} />
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">
                {isDragging ? "Drop it like it's hot" : "Upload your photo"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or click to select • JPG, PNG, WebP
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoUpload;
