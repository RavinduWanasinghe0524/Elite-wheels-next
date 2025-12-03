'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  car: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Silva',
    role: 'Business Owner',
    image: '/images/testimonials/avatar1.jpg',
    rating: 5,
    text: 'Exceptional service and quality! The Elite Wheels team helped me find the perfect luxury sedan. The entire process from selection to delivery was seamless.',
    car: '2023 Mercedes-Benz E-Class',
    verified: true,
  },
  {
    id: 2,
    name: 'Amaya Fernando',
    role: 'Entrepreneur',
    image: '/images/testimonials/avatar2.jpg',
    rating: 5,
    text: 'I absolutely love my new hybrid! The team was professional, knowledgeable, and went above and beyond to ensure I got the best deal. Highly recommended!',
    car: '2024 Toyota Camry Hybrid',
    verified: true,
  },
  {
    id: 3,
    name: 'Nuwan Perera',
    role: 'IT Professional',
    image: '/images/testimonials/avatar3.jpg',
    rating: 5,
    text: 'First-class experience from start to finish. The vehicle was exactly as described, and the financing options were very competitive. Will definitely return for my next purchase!',
   car: '2023 Honda CR-V',
    verified: true,
  },
  {
    id: 4,
    name: 'Priya Jayawardena',
    role: 'Doctor',
    image: '/images/testimonials/avatar4.jpg',
    rating: 5,
    text: 'Outstanding customer service! They took the time to understand my needs and found me the perfect family SUV. The after-sales support is also excellent.',
    car: '2024 BMW X5',
    verified: true,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

 const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Customer <span className="text-gold">Testimonials</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our satisfied customers have to say
          </p>
          <div className="w-24 h-1 bg-gold rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-12 rounded-3xl border border-gold/20 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-gold/20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${i < currentTestimonial.rating ? 'text-gold fill-gold' : 'text-gray-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl md:text-2xl text-gray-200 text-center leading-relaxed mb-8 italic">
              "{currentTestimonial.text}"
            </p>

            {/* Customer Info */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-2xl font-bold text-black">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-white">{currentTestimonial.name}</h4>
                    {currentTestimonial.verified && (
                      <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-gray-400">{currentTestimonial.role}</p>
                </div>
              </div>
              <div className="glass px-4 py-2 rounded-full border border-gold/30">
                <span className="text-sm text-gold">Purchased: {currentTestimonial.car}</span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="glass p-4 rounded-full hover:bg-white/20 transition-colors border border-white/10 hover:border-gold/50"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="glass p-4 rounded-full hover:bg-white/20 transition-colors border border-white/10 hover:border-gold/50"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-gold' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: '500+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '1000+', label: 'Vehicles Sold' },
            { value: '98%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-gold/10 text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
