'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import ContactGlobe3D from '@/components/ContactGlobe3D';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <div className="w-32 h-1.5 bg-gold mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* 3D Globe Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden glass-card border border-gold/10 order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10 pointer-events-none" />
            <ContactGlobe3D />
            
            <div className="absolute bottom-10 left-10 z-20">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Global <span className="text-gold">Reach</span></h3>
              <p className="text-gray-300 max-w-xs">Connecting luxury enthusiasts worldwide. Visit our headquarters or reach out digitally.</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] order-1 lg:order-2"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Get in <span className="text-gold">Touch</span></h3>
              <p className="text-gray-400">Fill out the form below and our concierge team will contact you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-all duration-300 placeholder-gray-600 hover:border-white/30"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-all duration-300 placeholder-gray-600 hover:border-white/30"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-all duration-300 resize-none placeholder-gray-600 hover:border-white/30"
                  placeholder="Tell us about your dream car..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 btn-gold text-lg font-bold shadow-lg shadow-gold/20 mt-4 relative overflow-hidden group"
              >
                <span className={`relative z-10 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Send Message
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { title: 'Visit Us', desc: '123 Elite Drive, Luxury City', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
            { title: 'Call Us', desc: '+1 (555) 123-4567', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
            { title: 'Email Us', desc: 'concierge@elitewheels.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-gold/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
