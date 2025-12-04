'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookTestDrive() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="glass-card p-12 rounded-2xl">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-4xl font-bold mb-4">
              Test Drive <span className="text-gold">Booked!</span>
            </h2>
            <p className="text-gray-400 mb-8">We'll contact you shortly to confirm your appointment.</p>
            <Link href="/inventory">
              <button className="btn-gold">Browse More Vehicles</button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">
          Book a <span className="text-gold">Test Drive</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input required type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Date</label>
            <input required type="date" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none" />
          </div>
          
          <button type="submit" className="w-full btn-gold py-4 text-lg font-bold">
            Book Test Drive
          </button>
        </form>
      </div>
    </main>
  );
}
