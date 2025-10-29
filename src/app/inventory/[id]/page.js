
'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cars = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2024, price: 79990, image: '/Img/T S.avif', description: 'The Tesla Model S is a luxury all-electric sedan with impressive range and performance.' },
  { id: 2, make: 'BMW', model: 'i4', year: 2024, price: 52200, image: '/Img/i4.avif', description: 'The BMW i4 is a stylish and sporty electric sedan with a premium interior.' },
  { id: 3, make: 'Audi', model: 'A6', year: 2023, price: 56900, image: '/Img/A E.avif', description: 'The Audi A6 is a sophisticated and comfortable luxury sedan with a smooth ride.' },
  { id: 4, make: 'Mercedes', model: 'GLA', year: 2024, price: 41850, image: '/Img/GLA.avif', description: 'The Mercedes-Benz GLA is a compact luxury SUV with a stylish design and a comfortable interior.' },
  { id: 5, make: 'Honda', model: 'CRV', year: 2022, price: 28410, image: '/Img/CRV.avif', description: 'The Honda CR-V is a reliable and practical compact SUV with a spacious interior.' },
  { id: 6, make: 'Toyota', model: 'Camry', year: 2023, price: 26320, image: '/Img/TC.avif', description: 'The Toyota Camry is a popular midsize sedan known for its reliability and fuel efficiency.' },
  { id: 7, make: 'Ford', model: 'Explorer', year: 2021, price: 36760, image: '/Img/FE.avif', description: 'The Ford Explorer is a spacious and versatile midsize SUV with three rows of seating.' },
  { id: 8, make: 'Nissan', model: 'Pathfinder', year: 2024, price: 36080, image: '/Img/NPa.avif', description: 'The Nissan Pathfinder is a rugged and capable midsize SUV with a comfortable ride.' },
  { id: 9, make: 'Jeep', model: 'Grand Cherokee', year: 2022, price: 40130, image: '/Img/JG.avif', description: 'The Jeep Grand Cherokee is a versatile and off-road-capable midsize SUV.' },
  { id: 10, make: 'Porsche', model: 'Cayenne', year: 2023, price: 79200, image: '/Img/PC.avif', description: 'The Porsche Cayenne is a high-performance luxury SUV with a sporty design.' },
  { id: 11, make: 'Lexus', model: 'NX', year: 2021, price: 39025, image: '/Img/LN.avif', description: 'The Lexus NX is a stylish and comfortable compact luxury SUV.' },
  { id: 12, make: 'Chevrolet', model: 'Equinox', year: 2024, price: 26600, image: '/Img/Hi.avif', description: 'The Chevrolet Equinox is a practical and fuel-efficient compact SUV.' },
];

export default function CarPage({ params }) {
  const { addToCart } = useCart();
  const car = cars.find(c => c.id === parseInt(params.id));

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-text-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary p-8 rounded-lg shadow-lg"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image src={car.image} alt={`${car.make} ${car.model}`} width={800} height={600} className="object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">{car.make} {car.model}</h1>
            <p className="text-text-secondary mb-4">{car.year}</p>
            <p className="text-3xl font-bold text-accent mb-4">${car.price.toLocaleString()}</p>
            <p className="text-lg mb-8">{car.description}</p>
            <button
              className="bg-accent hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => addToCart(car)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
