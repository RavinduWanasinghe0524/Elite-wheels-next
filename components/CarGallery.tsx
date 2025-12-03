'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface CarGalleryProps {
  images: string[];
  carName: string;
}

export default function CarGallery({ images, carName }: CarGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Generate multiple images from the main image for demo
  const galleryImages = images.length > 1 ? images : Array(6).fill(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[500px] rounded-2xl overflow-hidden glass-card cursor-pointer group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={galleryImages[selectedImage]}
          alt={`${carName} - View ${selectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Zoom Indicator */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass px-6 py-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 glass px-4 py-2 rounded-full border border-white/20">
          <span className="text-sm font-bold text-white">
            {selectedImage + 1} / {galleryImages.length}
          </span>
        </div>
      </motion.div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-6 gap-3">
        {galleryImages.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-gold shadow-lg shadow-gold/20'
                : 'border-white/10 hover:border-gold/50'
            }`}
          >
            <Image
              src={image}
              alt={`${carName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 glass p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
            }}
            className="absolute left-6 glass p-4 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-6 glass p-4 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Lightbox Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
            <Image
              src={galleryImages[selectedImage]}
              alt={`${carName} - Full view ${selectedImage + 1}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass px-6 py-3 rounded-full border border-white/20">
            <span className="text-lg font-bold text-white">
              {selectedImage + 1} / {galleryImages.length}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
