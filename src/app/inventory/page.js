
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const cars = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2024, price: 79990, image: '/Img/T S.avif' },
  { id: 2, make: 'BMW', model: 'i4', year: 2024, price: 52200, image: '/Img/i4.avif' },
  { id: 3, make: 'Audi', model: 'A6', year: 2023, price: 56900, image: '/Img/A E.avif' },
  { id: 4, make: 'Mercedes', model: 'GLA', year: 2024, price: 41850, image: '/Img/GLA.avif' },
  { id: 5, make: 'Honda', model: 'CRV', year: 2022, price: 28410, image: '/Img/CRV.avif' },
  { id: 6, make: 'Toyota', model: 'Camry', year: 2023, price: 26320, image: '/Img/TC.avif' },
  { id: 7, make: 'Ford', model: 'Explorer', year: 2021, price: 36760, image: '/Img/FE.avif' },
  { id: 8, make: 'Nissan', model: 'Pathfinder', year: 2024, price: 36080, image: '/Img/NPa.avif' },
  { id: 9, make: 'Jeep', model: 'Grand Cherokee', year: 2022, price: 40130, image: '/Img/JG.avif' },
  { id: 10, make: 'Porsche', model: 'Cayenne', year: 2023, price: 79200, image: '/Img/PC.avif' },
  { id: 11, make: 'Lexus', model: 'NX', year: 2021, price: 39025, image: '/Img/LN.avif' },
  { id: 12, make: 'Chevrolet', model: 'Equinox', year: 2024, price: 26600, image: '/Img/Hi.avif' },
];

export default function Inventory() {
  const { addToCart } = useCart();
  const [filteredCars, setFilteredCars] = useState(cars);
  const [search, setSearch] = useState('');
  const [make, setMake] = useState('all');
  const [price, setPrice] = useState('all');
  const [year, setYear] = useState('all');

  const handleFilter = () => {
    let tempCars = cars;

    if (search) {
      tempCars = tempCars.filter(car =>
        car.make.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (make !== 'all') {
      tempCars = tempCars.filter(car => car.make === make);
    }

    if (price !== 'all') {
      tempCars = tempCars.filter(car => car.price <= parseInt(price));
    }

    if (year !== 'all') {
      tempCars = tempCars.filter(car => car.year === parseInt(year));
    }

    setFilteredCars(tempCars);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-secondary p-8 rounded-lg shadow-lg mb-8 animate-fade-in-down">
        <h2 className="text-3xl font-bold mb-4 text-text-primary">Find Your Perfect Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by make or model"
            className="p-2 border rounded bg-primary text-text-primary"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="p-2 border rounded bg-primary text-text-primary" value={make} onChange={e => setMake(e.target.value)}>
            <option value="all">All Makes</option>
            <option value="Tesla">Tesla</option>
            <option value="BMW">BMW</option>
            <option value="Audi">Audi</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Honda">Honda</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Nissan">Nissan</option>
            <option value="Jeep">Jeep</option>
            <option value="Porsche">Porsche</option>
            <option value="Lexus">Lexus</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
          <select className="p-2 border rounded bg-primary text-text-primary" value={price} onChange={e => setPrice(e.target.value)}>
            <option value="all">All Prices</option>
            <option value="30000">$30,000 and below</option>
            <option value="50000">$50,000 and below</option>
            <option value="80000">$80,000 and below</option>
            <option value="100000">$100,000 and below</option>
          </select>
          <select className="p-2 border rounded bg-primary text-text-primary" value={year} onChange={e => setYear(e.target.value)}>
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          <button
            className="bg-accent hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <Link key={car.id} href={`/inventory/${car.id}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-primary rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <Image src={car.image} alt={`${car.make} ${car.model}`} width={500} height={300} className="object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-text-primary">{car.make} {car.model}</h3>
                <p className="text-text-secondary mb-2">{car.year}</p>
                <p className="text-2xl font-bold text-accent">${car.price.toLocaleString()}</p>
                <button
                  className="bg-accent hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={(e) => { e.preventDefault(); addToCart(car); }}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
