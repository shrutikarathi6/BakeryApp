// components/HalfCategoryWheel.tsx
import React from "react";

interface HalfCategoryWheelProps {
  categories: string[];
  categoryImages: Record<string, string>;
  onCategoryClick?: (category: string) => void;
}

export function HalfCategoryWheel({
  categories,
  categoryImages,
  onCategoryClick,
}: HalfCategoryWheelProps) {
  return (
    <div className="py-20 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <h2 className="text-center text-4xl font-bold text-amber-900 mb-16">
        Discover Our Categories
      </h2>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex justify-end">
          {/* Wheel Container */}
          <div className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]">
            {/* Left Half Mask */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white to-transparent z-10"></div>

            {/* Rotating Layer */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="relative w-full h-full">
                {[...categories, ...categories].map((cat, index) => {
                  const total = categories.length;
                  const angle = (index * 360) / total;
                  const radius = "45%"; // Controls distance from center

                  return (
                    <div
                      key={`${cat}-${index}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateX(${radius})`,
                      }}
                    >
                      <div
                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-full 
                                   bg-white/95 backdrop-blur-sm shadow-2xl 
                                   border-8 border-amber-100 
                                   flex items-center justify-center
                                   hover:scale-125 hover:shadow-amber-300/50 hover:border-amber-300 
                                   hover:glow-hover transition-all duration-700 cursor-pointer
                                   z-20"
                        style={{ transform: `rotate(-${angle}deg)` }}
                        onClick={() => onCategoryClick?.(cat)}
                      >
                        <img
                          src={categoryImages[cat]}
                          alt={cat}
                          className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full p-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Center Focus Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-40 h-40 lg:w-48 lg:h-48 rounded-full 
                            bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 
                            shadow-2xl z-30 flex items-center justify-center">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
                <span className="text-5xl lg:text-6xl">🥐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}