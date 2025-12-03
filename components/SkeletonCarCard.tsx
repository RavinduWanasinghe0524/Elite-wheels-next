'use client';

import { motion } from 'framer-motion';

export default function SkeletonCarCard() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-white/5" />

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Category Badge */}
        <div className="w-20 h-6 bg-white/10 rounded-full" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-1/2 bg-white/10 rounded" />
        </div>

        {/* Features */}
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-white/10 rounded" />
          <div className="h-8 w-20 bg-white/10 rounded" />
          <div className="h-8 w-20 bg-white/10 rounded" />
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="h-8 w-32 bg-white/10 rounded" />
          <div className="h-10 w-28 bg-white/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
