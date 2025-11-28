import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import EnhancedNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Elite Wheels | Premium Car Dealership',
  description: 'Find your perfect ride at Elite Wheels. We offer a wide range of top-quality vehicles to suit every budget and lifestyle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-primary text-white antialiased">
        <Preloader />
        <EnhancedNavbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
