'use client';

import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-20 py-8 border-t border-white border-opacity-10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
        <p className="text-gray-400 mb-4">
          &copy; {new Date().getFullYear()} QuoteVerse. Made with ❤️ for daily inspiration.
        </p>
        <div className="flex justify-center space-x-6">
          {['Privacy', 'Terms', 'Contact'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="text-gray-400 hover:text-purple-300 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};