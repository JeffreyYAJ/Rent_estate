import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, Maximize2 } from "lucide-react";

interface Photo {
  url: string;
}

interface ImageCarouselProps {
  photos?: Photo[];
  altTitle: string;
  onImageClick?: (index: number) => void; // <--- AJOUT ICI
}

export default function ImageCarousel({ photos = [], altTitle, onImageClick }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safePhotos = photos || [];

  if (safePhotos.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200">
        <ImageOff className="w-12 h-12 mb-2 opacity-50" />
        <span className="font-medium">Aucune photo</span>
      </div>
    );
  }

  const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? safePhotos.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex(prev => (prev === safePhotos.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-2/3 h-[350px] md:h-[500px] group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      <div 
        className="w-full h-full bg-gray-200 relative cursor-zoom-in"
        onClick={() => onImageClick && onImageClick(currentIndex)} // <--- DÉCLENCHEUR
      >
        <img
          src={safePhotos[currentIndex].url}
          alt={`${altTitle} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Indication visuelle qu'on peut cliquer */}
        <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition duration-300">
            <Maximize2 size={16} />
        </div>
      </div>

      {/* FLÈCHES */}
      {safePhotos.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10">
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10">
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {safePhotos.length}
          </div>
        </>
      )}
    </div>
  );
}