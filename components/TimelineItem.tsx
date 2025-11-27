'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

export default function TimelineItem({ year, title, description, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row gap-8 items-center mb-16 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Year Bubble */}
      <div className="w-32 h-32 flex-shrink-0 rounded-full border-2 border-gold/30 bg-black/50 backdrop-blur-md flex items-center justify-center relative z-10 group hover:border-gold transition-colors duration-300">
        <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="text-3xl font-display font-bold text-gold">{year}</span>
      </div>

      {/* Content Card */}
      <div className={`flex-1 glass p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-colors duration-300 relative ${
        index % 2 === 0 ? 'text-left' : 'text-left md:text-right'
      }`}>
        {/* Connector Line (Desktop) */}
        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gold/30 ${
          index % 2 === 0 ? '-left-8' : '-right-8'
        }`} />
        
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
