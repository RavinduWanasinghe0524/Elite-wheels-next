
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

export const metadata = {
  title: 'Elite Wheels',
  description: 'Find your perfect ride at Elite Wheels.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
