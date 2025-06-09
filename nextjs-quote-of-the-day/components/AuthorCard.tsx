// 'use client';

// import { motion } from 'framer-motion';
// import { Author } from '../types/quote';

// interface AuthorCardProps {
//   author: Author;
//   delay?: number;
// }

// export const AuthorCard = ({ author, delay = 0 }: AuthorCardProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay }}
//       className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer group backdrop-blur-lg border border-gray-700"
//     >
//       <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold group-hover:animate-bounce">
//         {author.initials}
//       </div>
//       <h4 className="text-lg font-semibold mb-2">{author.name}</h4>
//       <p className="text-gray-400 text-sm">{author.profession}</p>
//     </motion.div>
//   );
// };