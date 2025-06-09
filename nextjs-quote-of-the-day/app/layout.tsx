import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuoteVerse - Daily Inspiration',
  description: 'Discover powerful quotes that inspire, motivate, and transform your perspective every single day.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          position='top-center'
          toastOptions={{
            className: 'bg-gray-800 text-white',
          }}
        />
      </body>
    </html>
  );
}