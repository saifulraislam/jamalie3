import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background Video with subtle black overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/jamalie.mp4" type="video/mp4" />
        </video>
        {/* Subtle black gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))'
          }}
        />
      </div>

      {/* Original hero content - completely unchanged */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-wide leading-tight mb-6"
        >
          Elegance isn’t loud,<br />
          <span className="text-[#D6C1A9] mt-1 block">it lingers.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed mb-8"
        >
          The art of timeless craftsmanship.
        </motion.p>

        <motion.a
          href="https://www.instagram.com/joyfeesh"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 border border-[#D6C1A9] px-8 py-3 rounded-full text-[#D6C1A9] font-medium tracking-wide transition-all duration-300 hover:bg-[#D6C1A9] hover:text-[#5A1E2B] shadow-lg"
        >
          Visit Our Instagram
          <ExternalLink size={18} />
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-0.5 h-8 bg-[#D6C1A9] rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;