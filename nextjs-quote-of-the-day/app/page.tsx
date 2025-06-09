'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteCard } from '@/components/QuoteCard';
// import { SearchBar } from '@/components/SearchBar';
import { QuoteTypeSelector } from '@/components/QuoteTypeSelector';
// import { AuthorCard } from '@/components/AuthorCard';
import { StatsCard } from '@/components/StatsCard';
import { useAuth } from '@/context/auth-context';
import { use, useEffect, useState } from 'react';
import { getAllQuoteTypes, getQuoteOfToday, getQuoteState, saveQuote } from '@/lib/api';
import { Quote, QuoteState } from '@/types/quote';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const { user } = useAuth();
  const [ quote, setQuote ] = useState<Quote | null>(null);
  const [quoteTypes, setQuoteTypes]  = useState<string[]>([]);
  const [selectedquoteType, setSelectedQuoteType] = useState<string>("");
  const [ quoteState, setQuoteState ] = useState<QuoteState>({
    totalTodaySaved: 0,
    totalTodayViews: 0
  });
  const [ loading, setLoading ] = useState(false);

  // get quote
  useEffect(() => {
    ;(async () => {
      setLoading(true);
      const { error, data } = await getQuoteOfToday(selectedquoteType);

      if(!error){
        setQuote(data);
      }
      setLoading(false);
    })();

  // get quote state
    ;(async () => {
      setLoading(true);
      const { error, data } = await getQuoteState();

      if(!error){
          setQuoteState(data);        
      }
      setLoading(false);
    })();

      // get quote state
      ;(async () => {
        setLoading(true);
        const { error, data } = await getAllQuoteTypes();
  
        if(!error){
            setQuoteTypes(data);        
        }
        setLoading(false);
      })();

  }, [selectedquoteType]);

  const handleSave = async () => {
    if(!user){
      return toast("Please login first to save.");
    }

    setLoading(true);
    // In a real app, you would update the likes in your database
    const { error, data } = await saveQuote();
    if(!error){
      setQuote(data);
    }

    setLoading(false)
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

        {
          (!quote && loading) && (
            <div className='flex items-center justify-center min-h-96'>
              <Loader size={25} className='animate-spin'/>
            </div>
          )
        }

        {quote && (
          <section className="mb-16">
            <QuoteCard
              loading={loading}
              quote={quote}
              onSave={handleSave}
            />
          </section>
        )}

        {/* Category Selector */}
        <QuoteTypeSelector
          quoteTypes={quoteTypes}
          selectedType={selectedquoteType}
          onSelectType={(type) => {
            setSelectedQuoteType(type);
          }}
        />

        {/* Stats Section */}
        <StatsCard quoteState={quoteState} />
      </main>

      <Footer />
    </div>
  );
}