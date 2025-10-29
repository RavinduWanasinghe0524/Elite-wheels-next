
'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-text-primary">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-text-secondary">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {cart.map(car => (
            <div key={car.id} className="flex items-center bg-secondary p-4 rounded-lg shadow-lg">
              <Image src={car.image} alt={`${car.make} ${car.model}`} width={150} height={100} className="object-cover rounded-lg" />
              <div className="ml-4 flex-grow">
                <h2 className="text-2xl font-bold text-text-primary">{car.make} {car.model}</h2>
                <p className="text-text-secondary">{car.year}</p>
                <p className="text-xl font-bold text-accent">${car.price.toLocaleString()}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeFromCart(car.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
