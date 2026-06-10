import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import PremiumNavbar from '@/components/PremiumNavbar';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elite Wheels | Premium Automotive Experience',
  description: 'Experience cinematic luxury. Discover the 2026 Toyota Land Cruiser and our curated collection of the world\'s most exclusive vehicles.',
  keywords: 'premium cars, luxury SUV, Toyota Land Cruiser, Elite Wheels, test drive',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <PremiumNavbar />
        {children}
      </body>
    </html>
  );
}
