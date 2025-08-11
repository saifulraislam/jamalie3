import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
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

  return (
    <section id="gallery" className="py-12 md:py-20 bg-[#F5F0E8]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4 tracking-tight">
            Jamaliè
            <span className="text-[#D6C1A9] block mt-2">Aesthetics</span>
          </h2>
          <p className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/90 max-w-2xl mx-auto px-4">
            A glimpse into our creative process and the inspiration behind our timeless collections.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent my-6 mx-auto" />
        </motion.div>

        {/* Gallery Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!canScrollLeft}
              className={`p-2 md:p-3 rounded-full transition-all duration-300 ${
                canScrollLeft 
                  ? 'bg-[#5A1E2B] text-[#D6C1A9] hover:bg-[#5A1E2B]/90' 
                  : 'bg-[#D6C1A9]/30 text-[#5A1E2B]/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!canScrollRight}
              className={`p-2 md:p-3 rounded-full transition-all duration-300 ${
                canScrollRight 
                  ? 'bg-[#5A1E2B] text-[#D6C1A9] hover:bg-[#5A1E2B]/90' 
                  : 'bg-[#D6C1A9]/30 text-[#5A1E2B]/40 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </motion.button>
          </div>

          {/* Gallery Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 gallery-scroll snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 w-72 h-80 md:w-80 md:h-96 relative rounded-xl overflow-hidden border border-[#D6C1A9]/30 hover:border-[#E2725B]/50 transition-all duration-300 snap-start group touch-manipulation"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-white text-lg md:text-xl font-playfair font-semibold text-center"
                  >
                    {item.caption}
                  </motion.h3>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-6 h-6 border border-[#D6C1A9] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border border-[#E2725B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75" />
              </motion.div>
            ))}
          </motion.div>

          {/* Gallery Indicators */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {Array.from({ length: Math.ceil(galleryItems.length / 2) }).map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                className="w-2 h-2 bg-[#5A1E2B]/30 rounded-full transition-all duration-300 hover:bg-[#E2725B] cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;