'use client';

import { motion } from 'framer-motion';
import { useQuotes } from '@/hooks/useQuotes';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteCard } from '@/components/QuoteCard';
import { SearchBar } from '@/components/SearchBar';
import { CategorySelector } from '@/components/CategorySelector';
import { AuthorCard } from '@/components/AuthorCard';
import { StatsCard } from '@/components/StatsCard';

export default function Home() {
  const {
    quotes,
    currentQuote,
    authors,
    categories,
    searchTerm,
    selectedCategory,
    getRandomQuote,
    searchQuotes,
    filterByCategory
  } = useQuotes();

  const handleLike = () => {
    // In a real app, you would update the likes in your database
    console.log('Liked quote:', currentQuote?.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />

      <main className="max-w-6xl mx-auto px-6 md:px-8 pb-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight"
          >
            Daily Inspiration
          </motion.h2>
        </section>

        {/* Quote Display */}
        {currentQuote && (
          <section className="mb-16">
            <QuoteCard
              quote={currentQuote}
              onNewQuote={getRandomQuote}
              onLike={handleLike}
            />
          </section>
        )}

        {/* Featured Authors */}
        <section className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
          >
            Featured Authors
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.slice(0, 4).map((author, index) => (
              <AuthorCard
                key={author.id}
                author={author}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Search Section */}
        <SearchBar onSearch={searchQuotes} searchTerm={searchTerm} />

        {/* Category Selector */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={filterByCategory}
        />

        {/* Stats Section */}
        <StatsCard />
      </main>

      <Footer />
    </div>
  );
}