'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const featuredCars = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2024, price: 79990, image: '/Img/T S.avif' },
  { id: 10, make: 'Porsche', model: 'Cayenne', year: 2023, price: 79200, image: '/Img/PC.avif' },
  { id: 3, make: 'Audi', model: 'A6', year: 2023, price: 56900, image: '/Img/A E.avif' },
];

const testimonials = [
  { id: 1, name: 'John Doe', testimonial: 'The best car buying experience I have ever had. The staff was friendly and knowledgeable.', image: '/Img/55.jpg' },
  { id: 2, name: 'Jane Smith', testimonial: 'I found the perfect car for my family at a great price. I would highly recommend Elite Wheels to anyone.', image: '/Img/123.jpg' },
  { id: 3, name: 'Peter Jones', testimonial: 'The customer service was exceptional. They went above and beyond to make sure I was satisfied with my purchase.', image: '/Img/HP.webp' },
];

export default function Home() {
  return (
    <div>
      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/Img/BV 1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-text-primary bg-black bg-opacity-50">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            Find Your Perfect Ride
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-8 max-w-2xl text-center"
          >
            Welcome to Elite Wheels, your one-stop destination for the best new and used cars! We offer a wide range of top-quality vehicles to suit every budget and lifestyle. Whether you're looking for a sleek sedan, a powerful SUV, or a fuel-efficient hatchback, we have the perfect car for you. Explore our latest arrivals and find the car of your dreams today.
          </motion.p>
          <Link href="/inventory" className="bg-accent hover:bg-red-700 text-white font-bold py-2 px-4 rounded animate-bounce">
            View Inventory
          </Link>
        </div>
      </div>

      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-text-primary">Featured Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <motion.div
                key={car.id}
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-text-primary">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary rounded-lg shadow-lg p-8"
              >
                <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="rounded-full mx-auto mb-4" />
                <p className="text-text-secondary text-center mb-4">"{testimonial.testimonial}"</p>
                <p className="text-text-primary text-center font-bold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}