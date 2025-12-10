import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface LightboxProps {
  photos: { url: string }[];
  startIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({ photos, startIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Gestion des touches clavier (Esc, Flèches)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Bouton Fermer */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
      >
        <X size={32} />
      </button>

      {/* Navigation Gauche */}
      {photos.length > 1 && (
        <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
        >
            <ChevronLeft size={40} />
        </button>
      )}

      {/* IMAGE */}
      <img
        src={photos[currentIndex].url}
        alt="Agrandissement"
        className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-md select-none"
      />

      {/* Navigation Droite */}
      {photos.length > 1 && (
        <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
        >
            <ChevronRight size={40} />
        </button>
      )}

      {/* Compteur */}
      <div className="absolute bottom-5 text-white/80 font-medium">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}