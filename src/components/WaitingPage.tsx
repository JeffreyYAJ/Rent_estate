import React, { useEffect, useState } from 'react';

const WaitingPage: React.FC = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [
    'text-blue-500',    // Bleu
    'text-green-500',   // Vert
    'text-purple-500',  // Violet
    'text-orange-500',  // Orange
    'text-pink-500',    // Rose
    'text-cyan-500',    // Cyan
  ];

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing(true);
      
      // Changer la couleur après un délai
      setTimeout(() => {
        setColorIndex((prev) => (prev + 1) % colors.length);
        setIsGlowing(false);
      }, 600);
    }, 1200);

    return () => clearInterval(glowInterval);
  }, [colors.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo Maison Animé */}
        <div className="relative mb-8">
          <div className={`w-32 h-32 mx-auto transition-all duration-500 ${
            isGlowing 
              ? 'scale-110 filter brightness-125' 
              : 'scale-100'
          }`}>
            <svg 
              viewBox="0 0 24 24" 
              className={`w-full h-full transition-colors duration-500 ${colors[colorIndex]} ${
                isGlowing ? 'drop-shadow-lg' : ''
              }`}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              {/* Effet de brillance */}
              {isGlowing && (
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              )}
              
              {/* Contour de la maison */}
              <path 
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                filter={isGlowing ? "url(#glow)" : ""}
                className="transition-all duration-300"
              />
              
              {/* Porte */}
              <path 
                d="M9 22V12h6v10" 
                filter={isGlowing ? "url(#glow)" : ""}
                className="transition-all duration-300"
              />
              
              {/* Fenêtres */}
              {/* <rect 
                x="4" y="11" width="3" height="3" 
                rx="0.5" 
                filter={isGlowing ? "url(#glow)" : ""}
                className="transition-all duration-300"
              />
              <rect 
                x="17" y="11" width="3" height="3" 
                rx="0.5" 
                filter={isGlowing ? "url(#glow)" : ""}
                className="transition-all duration-300"
              /> */}
            </svg>
          </div>
          
          {/* Effet de particules (optionnel) */}
          {isGlowing && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-ping"
                  style={{
                    backgroundColor: 'currentColor',
                    animationDelay: `${i * 0.1}s`,
                    transform: `rotate(${i * 45}deg) translateX(40px)`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Loading dots */}
          <div className="flex justify-center space-x-1 mt-6">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${dot * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;