'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactDealerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'email',
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl border border-gold/20 text-center"
      >
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">
          Our team will contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card p-8 rounded-2xl border border-white/10 space-y-6"
    >
      <div>
        <h3 className="text-2xl font-display font-bold mb-2">
          Contact <span className="text-gold">Dealer</span>
        </h3>
        <p className="text-gray-400">Get in touch to schedule a test drive or ask questions</p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all placeholder-gray-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all placeholder-gray-500"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all placeholder-gray-500"
          placeholder="+94 71 234 5678"
        />
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Preferred Contact Method
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
            className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
              formData.preferredContact === 'email'
                ? 'bg-gold/20 border-gold text-gold'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/50'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, preferredContact: 'phone' })}
            className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
              formData.preferredContact === 'phone'
                ? 'bg-gold/20 border-gold text-gold'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/50'
            }`}
          >
            Phone
          </button>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all placeholder-gray-500 resize-none"
          placeholder="I'm interested in this vehicle and would like to schedule a test drive..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-gold py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Your information will not be shared with third parties.
      </p>
    </motion.form>
  );
}
