'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Author } from '../types/quote';
import { authors } from '../data/quotes';

interface AuthorSearchBarProps {
  onAuthorSelect: (author: Author) => void;
}

export const AuthorSearchBar = ({ onAuthorSelect }: AuthorSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = authors.filter(author => author.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5) // Limit to 5 suggestions

      setFilteredAuthors(results);
      setIsDropdownOpen(true);
    } else {
      setFilteredAuthors([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAuthorSelect = (author: Author) => {
    onAuthorSelect(author);
    setSearchTerm(author.name);
    setIsDropdownOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative mx-4 flex-1 max-w-md"
      ref={searchRef}
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length > 0 && setIsDropdownOpen(true)}
          placeholder="Search by author..."
          className="w-full px-4 py-2 bg-transparent bg-opacity-10 border border-purple-300 border-opacity-20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {isDropdownOpen && filteredAuthors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 mt-1 w-full bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border border-gray-700"
        >
          <ul>
            {filteredAuthors.map((author) => (
              <li
                key={author.id}
                onClick={() => handleAuthorSelect(author)}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center space-x-3"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500`}>
                  {author.initials}
                </div>
                <div>
                  <p className="text-white">{author.name}</p>
                  <p className="text-xs text-gray-400">{author.profession}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};