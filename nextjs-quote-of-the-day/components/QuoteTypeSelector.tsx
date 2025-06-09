'use client';

import { motion } from 'framer-motion';

interface QuoteTypeSelectorProps {
  quoteTypes: string[];
  selectedType: string | null;
  onSelectType: (type: string) => void;
}

export const QuoteTypeSelector = ({ 
  quoteTypes, 
  selectedType, 
  onSelectType 
}: QuoteTypeSelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      <button
        onClick={() => onSelectType("")}
        className={`px-4 py-2 rounded-full ${!selectedType ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-800 text-gray-300'} transition-all duration-300`}
      >
        All
      </button>
      {quoteTypes.map((type, index) => (
        <button
          key={index}
          onClick={() => onSelectType(type)}
          className={`px-4 py-2 rounded-full ${type === selectedType ? `bg-gradient-to-r from-purple-500 to-pink-500 text-white` : 'bg-gray-800 text-gray-300'} transition-all duration-300`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </motion.div>
  );
};