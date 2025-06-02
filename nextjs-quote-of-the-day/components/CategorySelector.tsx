'use client';

import { motion } from 'framer-motion';
import { Category } from '../types/quote';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategorySelector = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-800 text-gray-300'} transition-all duration-300`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.name)}
          className={`px-4 py-2 rounded-full ${selectedCategory === category.name ? `bg-gradient-to-r ${category.color} text-white` : 'bg-gray-800 text-gray-300'} transition-all duration-300`}
        >
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </button>
      ))}
    </motion.div>
  );
};