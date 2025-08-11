import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SlideData {
  id: number;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  title: string;
  subtitle: string;
}

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: SlideData[] = [
    {
      id: 1,
      image: {
        desktop: "mood (2).jpeg",
        tablet: "mood (2).jpeg",
        mobile: "mood (2).jpeg"
      },
      title: "Artisan Craftsmanship",
      subtitle: "Handcrafted with precision and passion"
    },
    {
      id: 2,
      image: {
        desktop: "mood (3).jpeg",
        tablet: "mood (3).jpeg",
        mobile: "mood (3).jpeg"
      },
      title: "Premium Materials",
      subtitle: "Only the finest materials make the cut"
    },
    {
      id: 3,
      image: {
        desktop: "mood(4).jpeg",
        tablet: "mood(4).jpeg",
        mobile: "mood(4).jpeg"
      },
      title: "Timeless Design",
      subtitle: "Elegance that transcends trends"
    },
    {
      id: 4,
      image: {
        desktop: "mood (1).jpeg",
        tablet: "mood (1).jpeg",
        mobile: "mood (1).jpeg"
      },
      title: "Luxury Collection",
      subtitle: "Discover our signature pieces"
    }
  ];

  // Auto-play functionality remains the same
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Event handlers remain the same
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F0E8]"> {/* Changed to cream background */}
      {/* Image Slider */}
      <div 
        className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Responsive Images - unchanged */}
            <picture>
              <source media="(min-width: 1200px)" srcSet={slides[currentSlide].image.desktop} />
              <source media="(min-width: 768px)" srcSet={slides[currentSlide].image.tablet} />
              <img
                src={slides[currentSlide].image.mobile}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>

            {/* Overlay - changed to wine color with reduced opacity */}
            <div className="absolute inset-0 bg-[#5A1E2B]/60" />

            {/* Slide Content - updated text styling */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-3 md:mb-4 text-[#D6C1A9]">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F0E8] font-light tracking-wider">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - updated styling */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#5A1E2B]/80 backdrop-blur-sm rounded-full items-center justify-center text-[#D6C1A9] hover:bg-[#5A1E2B] transition-all duration-200 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#5A1E2B]/80 backdrop-blur-sm rounded-full items-center justify-center text-[#D6C1A9] hover:bg-[#5A1E2B] transition-all duration-200 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators - updated colors */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#D6C1A9] scale-125' 
                  : 'bg-[#D6C1A9]/50 hover:bg-[#D6C1A9]/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Brand Section - updated color scheme */}
      <div className="bg-[#F5F0E8] py-8 md:py-12 lg:py-16"> {/* Cream background */}
        <div className="container mx-auto px-4 lg:px-8 text-center">
          {/* Brand Logo/Text - updated colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#5A1E2B] mb-3 md:mb-4">
              
            </h1>
            <div className="pb-2 border-b border-[#D6C1A9] max-w-xs mx-auto mb-3"> {/* Added gold-beige border */}
              <p className="text-sm md:text-base text-[#5A1E2B] tracking-widest uppercase">
                Timeless Elegance
              </p>
            </div>
            <p className="text-xs md:text-sm text-[#5A1E2B]/70 tracking-wide">
              EST. 2018
            </p>
          </motion.div>

          {/* Collection Buttons - updated colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center max-w-2xl mx-auto"
          >
            <Link to="/collection" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-[#5A1E2B] text-[#F5F0E8] px-8 py-4 text-base md:text-lg font-medium hover:bg-[#3A121D] transition-all duration-300 hover:shadow-lg"
              >
                SHOP COLLECTION
              </motion.button>
            </Link>
            
            <Link to="/about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto border-2 border-[#5A1E2B] text-[#5A1E2B] px-8 py-4 text-base md:text-lg font-medium hover:bg-[#5A1E2B] hover:text-[#F5F0E8] transition-all duration-300"
              >
                OUR STORY
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Elements - updated colors */}
          <div className="flex justify-center items-center mt-8 md:mt-12 space-x-4">
            <div className="w-8 md:w-12 h-0.5 bg-[#D6C1A9] opacity-60" />
            <div className="w-2 h-2 bg-[#D6C1A9] rounded-full opacity-60" />
            <div className="w-8 md:w-12 h-0.5 bg-[#D6C1A9] opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;