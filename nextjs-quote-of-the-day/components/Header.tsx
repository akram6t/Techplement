'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { AuthorSearchBar } from '@/components/AuthorSearchBar';
import { Author } from '../types/quote';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAuthorSelect = (author: Author) => {
    console.log('Selected author:', author.name);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative z-30 p-6 md:p-8">
      <nav className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4 md:gap-0">
        {/* Top row: Logo on left, Menu/Login on right (mobile only) */}
        <div className="flex justify-between items-center w-full md:w-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">Q</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              QuoteVerse
            </h1>
          </motion.div>

          {/* Mobile menu button and dropdown wrapper */}
          <div className="md:hidden relative" ref={menuRef}>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <img
                  src="https://i.pravatar.cc/150"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-purple-400"
                />
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Dropdown - Positioned relative to the wrapper */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
              >
                {['Home', 'Authors', 'Favorites'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                {isLoggedIn ? (
                  <>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : null}
              </motion.div>
            )}
          </div>
        </div>

        {/* SearchBar in center in mobile, inline in desktop */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <div className="w-full max-w-md md:max-w-none">
            <AuthorSearchBar onAuthorSelect={handleAuthorSelect} />
          </div>
        </div>

        {/* Desktop menu and auth */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center space-x-6"
        >
          {['Home', 'Authors', 'Favorites'].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-purple-300 transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {isLoggedIn ? (
            <div className="relative group">
              <img
                src="https://i.pravatar.cc/150"
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-purple-400"
              />
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 hidden group-hover:block z-20">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            >
              Login
            </button>
          )}
        </motion.div>
      </nav>
    </header>
  );
};