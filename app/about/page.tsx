'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticleBackground from '@/components/ParticleBackground';

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About <span className="text-gold">Us</span>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </motion.div>

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-gray-300 leading-relaxed text-lg"
          >
            <p>
              At <span className="text-gold font-bold">Elite Wheels</span>, we are passionate about providing a diverse selection of high-quality vehicles that cater to the needs and preferences of our customers. From the latest models to reliable pre-owned cars, we pride ourselves on delivering a premium car-buying experience.
            </p>
            <p>
              Our knowledgeable team is committed to guiding you through the entire process, ensuring that you find the perfect vehicle to match your lifestyle and budget. With years of experience in the automotive industry, Elite Wheels is built on a foundation of trust, integrity, and exceptional customer service.
            </p>
            <p>
              We go above and beyond to ensure that each customer leaves our dealership with confidence and satisfaction. Our goal is not just to sell cars but to build lasting relationships with our clients by offering reliable support and service long after the sale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-2xl overflow-hidden glass-card p-2"
          >
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <Image
                src="/images/5.jpg"
                alt="About Elite Wheels"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-2xl overflow-hidden glass-card p-2 order-2 lg:order-1"
          >
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <Image
                src="/images/4.jpg"
                alt="Our Mission"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-gray-300 leading-relaxed text-lg order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mission <span className="text-gold">Statement</span>
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full mb-6" />
            
            <p>
              Our mission at Elite Wheels is to deliver an outstanding car-buying experience by offering a wide variety of top-tier vehicles and unparalleled customer service. We believe in making the process transparent, simple, and enjoyable for each of our customers.
            </p>
            <p>
              By prioritizing honesty, trust, and personalized attention, we ensure that every customer feels confident in their decision. We are dedicated to fostering long-term relationships with our customers, providing them with ongoing support throughout their car ownership journey.
            </p>
            <p>
              We aim to stand out as a dealership that prioritizes excellence in every aspect, from the vehicles we offer to the way we treat our clients. Our mission is to help you drive away in your dream car, knowing you've made the right choice.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
