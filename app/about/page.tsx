'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticleBackground from '@/components/ParticleBackground';
import TimelineItem from '@/components/TimelineItem';

export default function About() {
  const history = [
    {
      year: '2008',
      title: 'The Inception',
      description: 'Elite Wheels was founded with a singular vision: to redefine the luxury car buying experience. Starting with a modest showroom of 5 premium vehicles, we set out to build a brand synonymous with trust and quality.'
    },
    {
      year: '2012',
      title: 'Expansion & Growth',
      description: 'Recognized for our exceptional service, we expanded our operations to a state-of-the-art facility. Our inventory grew to over 50 exclusive supercars, attracting clients from across the nation.'
    },
    {
      year: '2018',
      title: 'Global Recognition',
      description: 'Elite Wheels became a globally recognized name in luxury automotive sales. We established partnerships with top manufacturers and began offering bespoke import services for rare collectibles.'
    },
    {
      year: '2024',
      title: 'The Future of Luxury',
      description: 'Today, we stand at the forefront of the industry, integrating cutting-edge technology with timeless service. Our digital showroom and virtual consultation services mark a new era for Elite Wheels.'
    }
  ];

  const values = [
    {
      title: 'Integrity',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Honesty is the cornerstone of our business. We believe in transparent transactions and building lasting relationships based on trust.'
    },
    {
      title: 'Excellence',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'We strive for perfection in every aspect, from the quality of our vehicles to the standard of our customer service.'
    },
    {
      title: 'Passion',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Our love for cars drives everything we do. We share your enthusiasm for automotive engineering and design.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            About <span className="text-gradient-gold">Us</span>
          </h1>
          <div className="w-32 h-1.5 bg-gold mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        </motion.div>

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-gray-300 leading-relaxed text-lg"
          >
            <h2 className="text-3xl font-display font-bold text-white">Legacy of <span className="text-gold">Luxury</span></h2>
            <p>
              At <span className="text-gold font-bold">Elite Wheels</span>, we don't just sell cars; we curate lifestyles. For over a decade, we have been the premier destination for automotive enthusiasts seeking the extraordinary.
            </p>
            <p>
              Our showroom is a sanctuary for the world's most coveted machines. From the raw power of Italian supercars to the refined elegance of British grand tourers, every vehicle in our collection is hand-picked for its provenance and condition.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="glass p-4 rounded-xl text-center border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="text-3xl font-bold text-gold mb-1">15+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Years Exp.</div>
              </div>
              <div className="glass p-4 rounded-xl text-center border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="text-3xl font-bold text-gold mb-1">5k+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Happy Clients</div>
              </div>
              <div className="glass p-4 rounded-xl text-center border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="text-3xl font-bold text-gold mb-1">100%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Quality</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-3xl overflow-hidden glass-card p-3"
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/5.jpg"
                alt="About Elite Wheels"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* History Timeline */}
        <div className="mb-32 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">History of <span className="text-gold">Excellence</span></h2>
            <p className="text-gray-400">A timeline of our journey to the top.</p>
          </div>

          <div className="space-y-8">
            {history.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Our Core <span className="text-gold">Values</span></h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
