'use client';

import { useState, useEffect } from 'react';
import { Quote, Author, Category } from '../types/quote';
import { quotes as initialQuotes, authors, categories } from '../data/quotes';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Set initial random quote
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const filtered = selectedCategory 
      ? quotes.filter(q => q.category === selectedCategory)
      : quotes;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setCurrentQuote(filtered[randomIndex]);
  };

  const searchQuotes = (term: string) => {
    setSearchTerm(term);
    if (term) {
      const results = quotes.filter(q => 
        q.text.toLowerCase().includes(term.toLowerCase()) || 
        q.author.toLowerCase().includes(term.toLowerCase())
      );
      setQuotes(results);
    } else {
      setQuotes(initialQuotes);
    }
  };

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = initialQuotes.filter(q => q.category === category);
      setQuotes(filtered);
    } else {
      setQuotes(initialQuotes);
    }
  };

  return {
    quotes,
    currentQuote,
    authors,
    categories,
    searchTerm,
    selectedCategory,
    getRandomQuote,
    searchQuotes,
    filterByCategory
  };
};