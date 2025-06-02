'use client';

import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

export const SearchBar = ({ onSearch, searchTerm }: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-gray-900 bg-opacity-50 rounded-2xl p-8 backdrop-blur-lg border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Search Quotes
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search by quote or author..."
                className="w-full px-6 py-4 bg-purple-950 bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};