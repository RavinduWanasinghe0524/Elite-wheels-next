'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InventoryTrackerProps {
  carId: number;
  initialStock?: number;
}

export default function InventoryTracker({ carId, initialStock = 3 }: InventoryTrackerProps) {
  const [stock, setStock] = useState(initialStock);
  const [viewCount, setViewCount] = useState(0);
  const [trending, setTrending] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    // Check if trending
    if (viewCount > 50) {
      setTrending(true);
    }

    return () => clearInterval(interval);
  }, [viewCount]);

  const urgencyLevel = stock <= 2 ? 'high' : stock <= 5 ? 'medium' : 'low';
  const urgencyColors = {
    high: 'text-red-400 bg-red-500/10 border-red-500/30',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    low: 'text-green-400 bg-green-500/10 border-green-500/30'
  };

  return (
    <div className="space-y-3">
      {/* Stock Status */}
      <div className={`p-4 rounded-xl border ${urgencyColors[urgencyLevel]}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {urgencyLevel === 'high' && <span className="text-2xl">🔥</span>}
            {urgencyLevel === 'medium' && <span className="text-2xl">⚠️</span>}
            {urgencyLevel === 'low' && <span className="text-2xl">✅</span>}
            <span className="font-bold">
              {stock === 0 ? 'Out of Stock' : `Only ${stock} Left!`}
            </span>
          </div>
          <div className="text-sm">
            {stock > 0 && (stock <= 2 ? 'Act Fast!' : 'In Stock')}
          </div>
        </div>
        
        {stock > 0 && stock <= 5 && (
          <div className="text-xs opacity-80">
            High demand - {stock} unit{stock !== 1 ? 's' : ''} available
          </div>
        )}
      </div>

      {/* Trending Badge */}
      {trending && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <div>
              <div className="font-bold text-purple-300">Trending Now!</div>
              <div className="text-xs text-gray-400">{viewCount}+ views in last 24h</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Expected Restock */}
      {stock === 0 && (
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-sm text-gray-300 mb-1">Expected Restock:</div>
          <div className="font-bold text-gold">December 15, 2025</div>
          <button className="mt-2 w-full py-2 bg-gold/10 border border-gold/30 rounded-lg text-sm font-medium hover:bg-gold/20 transition-colors">
            Notify When Available
          </button>
        </div>
      )}

      {/* Reserve Now */}
      {stock > 0 && stock <= 3 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Reserve This Car Now
        </motion.button>
      )}
    </div>
  );
}
