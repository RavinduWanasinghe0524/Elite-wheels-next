'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Rajitha Fernando',
    location: 'Colombo',
    car: 'Toyota Prius',
    rating: 5,
    date: '2024-11-15',
    comment: 'Exceptional service and amazing hybrid technology! Fuel savings are incredible.',
    videoUrl: '/videos/testimonial1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Priya Silva',
    location: 'Kandy',
    car: 'BMW i4',
    rating: 5,
    date: '2024-11-10',
    comment: 'Best electric car experience! The team walked me through everything.',
    videoUrl: '/videos/testimonial2.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Kumar Perera',
    location: 'Galle',
    car: 'Mercedes E-Class',
    rating: 5,
    date: '2024-11-05',
    comment: 'Luxury and comfort beyond expectations. Worth every rupee!',
    videoUrl: '/videos/testimonial3.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  },
];

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [filter, setFilter] = useState<number | null>(null);

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Customer <span className="text-gold">Stories</span>
          </h3>
          <p className="text-sm text-gray-400">
            Hear from our satisfied customers
          </p>
        </div>
        
        {/* Rating Filter */}
        <div className="flex gap-1">
          {[5, 4, 3].map(rating => (
            <button
              key={rating}
              onClick={() => setFilter(filter === rating ? null : rating)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter === rating
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {rating}★+
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 transition-colors cursor-pointer group"
            onClick={() => setSelectedVideo(testimonial.id)}
          >
            {/* Video Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-black/40 to-black/20">
              <img
                src={testimonial.thumbnail}
                alt={testimonial.name}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded-lg flex items-center gap-1">
                <span className="text-gold">★</span>
                <span className="text-sm font-bold">{testimonial.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={testimonial.thumbnail}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.location}</div>
                </div>
              </div>

              <div className="text-xs text-gold mb-2">{testimonial.car}</div>
              <p className="text-sm text-gray-300 line-clamp-2">{testimonial.comment}</p>
              
              <div className="mt-3 text-xs text-gray-500">
                {new Date(testimonial.date).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Screen Video Modal - Placeholder */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-video bg-black rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <div className="text-xl">Video Player</div>
                <div className="text-sm text-gray-400 mt-2">Testimonial #{selectedVideo}</div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
