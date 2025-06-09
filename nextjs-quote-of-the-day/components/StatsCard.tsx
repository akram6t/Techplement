'use client';

import { QuoteState } from '@/types/quote';
import { motion } from 'framer-motion';
import React from 'react';

interface QuoteStateProps {
  quoteState: QuoteState
}

export const StatsCard: React.FC<QuoteStateProps> = ({ quoteState }) => {
  console.log(quoteState);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="bg-gray-900 bg-opacity-50 rounded-3xl p-8 backdrop-blur-lg border border-gray-700">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Today's Inspiration Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: quoteState.totalTodayViews as number, label: 'Quotes Viewed Today', color: 'text-purple-400' },
            // { value: '89', label: 'Authors Featured', color: 'text-pink-400' },
            { value: quoteState.totalTodaySaved as number, label: 'Quotes Saved', color: 'text-blue-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center"
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 animate-pulse`}>
                {stat.value}
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};