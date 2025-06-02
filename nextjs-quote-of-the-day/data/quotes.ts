import { Quote, Author, Category } from '../types/quote';

export const quotes: Quote[] = [
  {
    id: '1',
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    likes: 1247
  },
  // Add more quotes...
];

export const authors: Author[] = [
  {
    id: '1',
    name: "Albert Einstein",
    profession: "Physicist & Philosopher",
    initials: "AE",
    category: "science"
  },
  // Add more authors...
];

export const categories: Category[] = [
  { id: '1', name: 'motivation', color: 'from-purple-500 to-pink-500' },
  { id: '2', name: 'inspiration', color: 'from-blue-500 to-indigo-500' },
  // Add more categories...
];