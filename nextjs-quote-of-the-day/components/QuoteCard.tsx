'use client';

import { motion } from 'framer-motion';
import { Quote } from '../types/quote';
import { Loader } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  loading: boolean;

  // Function to handle saving this quote
  onSave: () => void;
}

export const QuoteCard = ({ quote, onSave, loading}: QuoteCardProps) => {
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500"></div>
      <div className="relative bg-gray-900 bg-opacity-50 rounded-3xl p-8 md:p-12 backdrop-blur-lg border border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
        </div>

        <blockquote className="text-center mb-8">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-100 mb-6 italic">
            "{quote.quote}"
          </p>
          <footer className="text-lg md:text-xl text-purple-300 font-medium">
            — {quote.author}
          </footer>
        </blockquote>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onSave}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2"
          >
            {
              loading ? (
                <Loader className='animate-spin'/>
              ) :
              (
                <svg className="w-5 h-5" fill={quote.isSavedByUser ? "red" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              )
            }
            <span>{quote.isSavedByUser ? "Saved" : "Save"} ({quote.totalSaves || 0})</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};