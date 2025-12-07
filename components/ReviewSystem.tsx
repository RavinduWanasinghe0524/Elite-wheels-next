'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  carModel: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'Sandun Jayawardena',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-11-20',
    comment: 'Absolutely love my new Prius! The hybrid technology is perfect for Colombo traffic. Elite Wheels gave me the best deal and excellent after-sales service.',
    carModel: 'Toyota Prius',
    verified: true,
    helpful: 24,
    images: []
  },
  {
    id: 2,
    author: 'Nimal Silva',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-11-18',
    comment: 'Professional team and transparent pricing. Got my BMW i4 at an amazing price. The electric range is perfect for my daily commute!',
    carModel: 'BMW i4',
    verified: true,
    helpful: 18
  },
  {
    id: 3,
    author: 'Kavindu Perera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4,
    date: '2024-11-15',
    comment: 'Great selection of cars and financing options. Wishthey had more SUV options in stock, but overall very satisfied with my purchase.',
    carModel: 'Honda CR-V',
    verified: true,
    helpful: 12
  }
];

export default function ReviewSystem({ carModel }: { carModel?: string }) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <h3 className="text-2xl font-display font-bold mb-6">
        Customer <span className="text-gold">Reviews</span>
      </h3>

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-6 p-6 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl border border-gold/30">
        <div className="text-center">
          <div className="text-5xl font-bold text-gold mb-2">{avgRating.toFixed(1)}</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className={star <= avgRating ? 'text-gold' : 'text-gray-600'}>★</span>
            ))}
          </div>
          <div className="text-sm text-gray-400">Based on {reviews.length} reviews</div>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = (count / reviews.length) * 100;
            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm w-8">{rating}★</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-gold outline-none text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-xl border border-white/10"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{review.author}</span>
                      {review.verified && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{review.carModel}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= review.rating ? 'text-gold' : 'text-gray-600'}>★</span>
                  ))}
                </div>

                <p className="text-sm text-gray-300 mb-3">{review.comment}</p>

                <div className="flex gap-3 text-sm">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-gold transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-gray-400 hover:text-gold transition-colors">Reply</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 btn-gold py-4 text-lg font-bold"
      >
        Write a Review
      </motion.button>
    </div>
  );
}
