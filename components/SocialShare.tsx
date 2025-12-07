'use client';

import { motion } from 'framer-motion';

interface SocialShareProps {
  carMake: string;
  carModel: string;
  carPrice: number;
  carImage: string;
}

export default function SocialShare({ carMake, carModel, carPrice, carImage }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this ${carMake} ${carModel} for $${carPrice.toLocaleString()} at Elite Wheels!`;

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: '📘',
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
  ];

  const handleShare = (platform: string, url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    // Show toast notification
    alert('Link copied to clipboard!');
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <h3 className="text-xl font-display font-bold mb-4">
        Share Your <span className="text-gold">Dream Car</span>
      </h3>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {socialPlatforms.map((platform, index) => (
          <motion.button
            key={platform.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare(platform.name, platform.url)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors flex items-center gap-2"
          >
            <span className="text-2xl">{platform.icon}</span>
            <span className="font-medium text-sm">{platform.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Copy Link */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={copyLink}
        className="w-full p-3 glass border border-gold/30 -lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="font-medium">Copy Link</span>
      </motion.button>
    </div>
  );
}
