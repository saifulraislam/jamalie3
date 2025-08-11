import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Grid, List } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  whatsappText: string;
}

const CollectionPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products: Product[] = [
    {
      id: 1,
      name: "Solace Time Keep Journal",
      price: "BDT 850",
      image: "jour (1).jpeg",
      category: "journals",
      description: "Handcrafted leather-bound journal with gold foil detailing",
      whatsappText: "I'm interested in Solace Time Keep Journal"
    },
    {
      id: 2,
      name: "Ember Time Keep Journal",
      price: "BDT 850",
      image: "jour (2).jpeg",
      category: "journals",
      description: "Burnt sienna cover with hand-stitched binding",
      whatsappText: "I'm interested in Ember Time Keep Journal"
    },
    {
      id: 3,
      name: "Écru Flower Journal",
      price: "BDT 850",
      image: "jour (3).jpeg",
      category: "journals",
      description: "Linen cover with pressed botanical inclusions",
      whatsappText: "I'm interested in Écru Flower Journal"
    },
    {
      id: 4,
      name: "Noir Red Heart Journal",
      price: "BDT 850",
      image: "jour (4).jpeg",
      category: "journals",
      description: "Black leather with crimson heart embossing",
      whatsappText: "I'm interested in Noir Red Heart Journal"
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'journals', name: 'Journals' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-20 bg-[#F5F0E8] min-h-screen">
      {/* Page Header */}
      <section className="py-12 px-4 border-b border-[#D6C1A9]/30">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4 tracking-tight">
              ROWEAM
            </h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-[#E2725B] font-medium tracking-widest mb-6">
              <span>NOP</span>
              <span>OBJECTIONS</span>
              <span>ABOUT</span>
              <span>IN EVEN</span>
            </div>
            <p className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/90 max-w-2xl mx-auto px-2">
              Timeless pieces crafted with intention
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 px-4 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Category Filters - Scrollable on mobile */}
            <div className="w-full sm:w-auto overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-[#5A1E2B] text-[#D6C1A9]'
                        : 'bg-[#F5F0E8] text-[#5A1E2B] hover:bg-[#D6C1A9]/20'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#F5F0E8] rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#5A1E2B] shadow-sm'
                    : 'text-[#5A1E2B]/60 hover:text-[#5A1E2B]'
                }`}
              >
                <Grid size={16} className="md:w-5 md:h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#5A1E2B] shadow-sm'
                    : 'text-[#5A1E2B]/60 hover:text-[#5A1E2B]'
                }`}
              >
                <List size={16} className="md:w-5 md:h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-8 px-4 bg-[#F5F0E8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
                : 'space-y-4 sm:space-y-6'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-xl overflow-hidden border border-[#D6C1A9]/30 hover:border-[#E2725B]/50 transition-all ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' 
                    ? 'h-48 md:h-56 md:w-56 flex-shrink-0' 
                    : 'h-48 sm:h-56'
                }`}>
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10" />
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <h3 className="text-lg font-playfair font-semibold text-[#5A1E2B] mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-inter font-light text-[#5A1E2B]/80 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-base font-medium text-[#E2725B] mb-3">
                      {product.price}
                    </p>
                  </div>

                  {/* WhatsApp Button */}
                  <motion.a
                    href={`https://wa.me/8801881445154?text=${encodeURIComponent(product.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-1 border border-[#D6C1A9] text-[#5A1E2B] py-1.5 px-3 rounded-full font-inter font-light text-xs sm:text-sm hover:bg-[#D6C1A9]/10 transition-all"
                  >
                    <MessageCircle size={14} className="text-[#E2725B]" />
                    <span className="hidden sm:inline">Order via WhatsApp</span>
                    <span className="sm:hidden">Order</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-base font-inter text-[#5A1E2B]/80 mb-4">
                No products found in this category.
              </p>
              <motion.button
                onClick={() => setSelectedCategory('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#5A1E2B] text-[#D6C1A9] px-5 py-2 rounded-full font-medium hover:bg-[#5A1E2B]/90 transition-colors text-sm"
              >
                View All Products
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;