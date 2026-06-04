import React, { useEffect, useRef } from 'react';

const carouselImages = [
  'https://i.ibb.co/35pYbcyD/1.png',
  'https://i.ibb.co/d4RgLD0j/2.png',
  'https://i.ibb.co/xqbG2pL2/3.png',
  'https://i.ibb.co/cKGrxhvf/4.png',
  'https://i.ibb.co/KpxSYyt9/5.png',
  'https://i.ibb.co/8gcRxDF3/6.png',
  'https://i.ibb.co/8g410vkr/7.png',
  'https://i.ibb.co/yBkCL60H/8.png'
];

export function BraidsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollSpeed = 0.8; // pixels per frame

    const scroll = () => {
      if (container) {
        container.scrollLeft += scrollSpeed;
        
        // If we scrolled past half of the content (the original list), reset to 0 for infinite feel
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => { scrollSpeed = 0; };
    const handleMouseLeave = () => { scrollSpeed = 0.8; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clone items to make continuous looping seamless
  const extendedImages = [...carouselImages, ...carouselImages];

  return (
    <div className="w-full overflow-hidden py-4 select-none relative bg-[#FAF9F6]/50 rounded-3xl p-4 border border-rose-100/10">
      {/* Absolute fades on edges to give highly polished effect */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#FAF9F6]/60 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#FAF9F6]/60 to-transparent z-10 pointer-events-none"></div>

      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto py-2 px-6 cursor-grab active:cursor-grabbing"
        style={{ 
          scrollBehavior: 'auto', 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Style tag to hide scrollbars cross-browser */}
        <style dangerouslySetInnerHTML={{__html: `
          div::-webkit-scrollbar {
            display: none !important;
          }
        `}} />

        {extendedImages.map((imageUrl, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-52 sm:w-64 h-72 sm:h-88 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative bg-rose-50/20"
          >
            <img
              src={imageUrl}
              alt={`Penteado Junino ${idx + 1}`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

