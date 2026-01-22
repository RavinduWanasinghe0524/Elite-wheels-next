import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import EnhancedNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Elite Wheels | Premium Car Dealership',
  description: 'Experience luxury in motion. Discover our curated collection of the world\'s most exclusive vehicles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <SmoothScrollProvider>
          <Preloader />
          <EnhancedNavbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
