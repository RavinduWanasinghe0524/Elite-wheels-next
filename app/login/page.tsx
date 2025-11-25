'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import ParticleBackground from '@/components/ParticleBackground';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login functionality coming soon!');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto glass-card p-8 rounded-2xl relative z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-600 bg-primary/50 text-gold focus:ring-gold" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-gold hover:text-white transition-colors">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold text-primary font-bold rounded-xl hover:bg-white transition-colors duration-300 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>
              Don't have an account?{' '}
              <Link href="/register" className="text-gold hover:text-white transition-colors font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
