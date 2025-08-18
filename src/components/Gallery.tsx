import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  caption: string;
}

const Gallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Enhanced motion values for smoother interactions
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#F5F0E8", "#F8F4ED", "#F5F0E8"]
  );

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "story (5).jpg",
      caption: "Moodboard"
    },
    {
      id: 2,
      image: "story (3).jpg",
      caption: "Behind the Brand"
    },
    {
      id: 3,
      image: "story (4).jpg",
      caption: "Inspo"
    },
    {
      id: 4,
      image: "story(6).jpg",
      caption: "Lookbook"
    },
    {
      id: 5,
      image: "story (1).jpg",
      caption: "Textures"
    },
    {
      id: 6,
      image: "story (2).jpg",
      caption: "Craftsmanship"
    }
  ];

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      
      // Calculate active index based on scroll position
      const itemWidth = window.innerWidth < 768 ? 304 : 352; // card width + gap
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(newIndex, galleryItems.length - 1));
    }
  }, [galleryItems.length]);

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons, { passive: true });
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, [checkScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 304 : 352; // Precise card width + gap
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 304 : 352;
      const targetScroll = index * scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll functionality for premium feel (optional)
  useEffect(() => {
    if (isHovering) return;
    
    const autoScroll = setInterval(() => {
      if (canScrollRight) {
        scroll('right');
      } else if (activeIndex === galleryItems.length - 1) {
        scrollToIndex(0);
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [canScrollRight, activeIndex, isHovering, galleryItems.length]);

  return (
    <motion.section 
      id="gallery" 
      className="py-16 md:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: background }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A1E2B]/10 via-transparent to-[#E2725B]/10" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#5A1E2B] mb-6 tracking-tight leading-[0.9]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Jamaliè
            <motion.span 
              className="text-[#D6C1A9] block mt-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Aesthetics
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/80 max-w-3xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            A glimpse into our creative process and the inspiration behind our timeless collections.
          </motion.p>
          
          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent my-8 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Gallery Container */}
        <div className="relative">
          {/* Enhanced Navigation Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-20 px-4">
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              disabled={!canScrollLeft}
              className={`pointer-events-auto p-4 rounded-full backdrop-blur-md border transition-all duration-500 shadow-xl ${
                canScrollLeft 
                  ? 'bg-white/90 text-[#5A1E2B] border-[#D6C1A9]/50 hover:bg-[#5A1E2B] hover:text-[#D6C1A9] hover:border-[#5A1E2B]' 
                  : 'bg-white/30 text-[#5A1E2B]/30 border-[#D6C1A9]/20 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <motion.button
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              disabled={!canScrollRight}
              className={`pointer-events-auto p-4 rounded-full backdrop-blur-md border transition-all duration-500 shadow-xl ${
                canScrollRight 
                  ? 'bg-white/90 text-[#5A1E2B] border-[#D6C1A9]/50 hover:bg-[#5A1E2B] hover:text-[#D6C1A9] hover:border-[#5A1E2B]' 
                  : 'bg-white/30 text-[#5A1E2B]/30 border-[#D6C1A9]/20 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mb-8 md:hidden">
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full transition-all duration-300 ${
                canScrollLeft 
                  ? 'bg-[#5A1E2B] text-[#D6C1A9] shadow-lg' 
                  : 'bg-[#D6C1A9]/30 text-[#5A1E2B]/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!canScrollRight}
              className={`p-3 rounded-full transition-all duration-300 ${
                canScrollRight 
                  ? 'bg-[#5A1E2B] text-[#D6C1A9] shadow-lg' 
                  : 'bg-[#D6C1A9]/30 text-[#5A1E2B]/40 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Enhanced Gallery Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-6 gallery-scroll snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.25, 0.25, 0, 1]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: [0.25, 0.25, 0, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 w-72 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem] relative rounded-2xl overflow-hidden border border-white/50 hover:border-[#E2725B]/60 transition-all duration-500 snap-start group touch-manipulation shadow-xl hover:shadow-2xl backdrop-blur-sm"
              >
                {/* Enhanced Image with Parallax Effect */}
                <motion.img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  whileHover={{ scale: 1.08 }}
                  loading="lazy"
                />
                
                {/* Enhanced Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Premium Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.h3
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-white text-xl md:text-2xl lg:text-3xl font-playfair font-semibold text-center tracking-wide"
                  >
                    {item.caption}
                  </motion.h3>
                  
                  {/* Elegant underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-12 h-px bg-[#D6C1A9] mx-auto mt-3"
                  />
                </div>

                {/* Subtle Decorative Elements */}
                <motion.div 
                  className="absolute top-3 right-3 md:top-6 md:right-6 w-3 h-3 md:w-6 md:h-6 border border-[#D6C1A9]/60 md:border-2 md:border-[#D6C1A9] rounded-full"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: window.innerWidth >= 768 ? 1.2 : 1.1, rotate: 90 }}
                />
                
                <motion.div 
                  className="absolute bottom-3 left-3 md:bottom-6 md:left-6 w-2 h-2 md:w-4 md:h-4 border border-[#E2725B]/60 md:border-2 md:border-[#E2725B] rounded-full"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: window.innerWidth >= 768 ? 1.3 : 1.1, rotate: -90 }}
                />

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#5A1E2B]/20 to-[#E2725B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Tiny Gallery Indicators */}
          <div className="flex justify-center mt-8 md:mt-12 space-x-1.5 md:space-x-3">
            {galleryItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToIndex(index)}
                whileHover={{ scale: window.innerWidth >= 768 ? 1.4 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`transition-all duration-400 rounded-full cursor-pointer ${
                  index === activeIndex 
                    ? 'w-3 h-1 md:w-8 md:h-2 bg-[#E2725B]' 
                    : 'w-1 h-1 md:w-2 md:h-2 bg-[#5A1E2B]/20 hover:bg-[#E2725B]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Gallery;
