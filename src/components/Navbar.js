'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/Img/logo.png" alt="Elite Wheels Logo" className="h-10 w-10 mr-2" />
          <Link href="/" className="text-text-primary text-2xl font-bold">
            Elite Wheels
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-text-primary hover:text-gray-300">
            Home
          </Link>
          <Link href="/inventory" className="text-text-primary hover:text-gray-300">
            Inventory
          </Link>
          <Link href="/about" className="text-text-primary hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="text-text-primary hover:text-gray-300">
            Contact
          </Link>
          <Link href="/login" className="text-text-primary hover:text-gray-300">
            Log In
          </Link>
          <Link href="/cart" className="text-text-primary hover:text-gray-300">
            Cart ({cart.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;