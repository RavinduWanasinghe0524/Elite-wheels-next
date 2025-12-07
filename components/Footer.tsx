'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Inventory', href: '/inventory' },
      { name: 'Contact', href: '/contact' },
      { name: 'Login', href: '/login' },
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Test Drive', href: '/book-test-drive' },
      { name: 'Contact Support', href: '/contact' },
      { name: 'Inventory', href: '/inventory' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', href: 'https://facebook.com' },
    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', href: 'https://instagram.com' },
    { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', href: 'https://linkedin.com' },
  ];

  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10 mt-20">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-display font-bold mb-4">
                Elite <span className="text-gradient-gold">Wheels</span>
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Your premier destination for luxury and high-performance vehicles. 
                Experience automotive excellence with our curated collection of the world's finest cars.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <a href="tel:+94112345678" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors group">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-gold/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+94 11 234 5678</span>
                </a>
                
                <a href="mailto:info@elitewheels.lk" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors group">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-gold/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>info@elitewheels.lk</span>
                </a>
                
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>123 Galle Road,<br />Colombo 03, Sri Lanka</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 hover:border-gold/50 transition-colors group"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Hours
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-gray-400">
                <span>Mon - Fri</span>
                <span className="text-white">9AM - 7PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Saturday</span>
                <span className="text-white">9AM - 6PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sunday</span>
                <span className="text-white">10AM - 4PM</span>
              </li>
              <li className="pt-3 border-t border-white/10">
                <div className="glass px-3 py-2 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 text-gold text-xs font-bold">
                    <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                    OPEN NOW
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-2xl border border-gold/10 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">We Accept</h4>
              <p className="text-xs text-gray-400">Secure payment methods</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* Payment Method Icons */}
              <div className="w-14 h-10 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-gold/30 transition-colors">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 48 32" fill="currentColor">
                  <rect width="48" height="32" rx="4" fill="#1434CB"/>
                  <rect x="14" y="11" width="20" height="10" fill="#FFA500"/>
                </svg>
              </div>
              <div className="w-14 h-10 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-gold/30 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 48 32" fill="none">
                  <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                  <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                </svg>
              </div>
              <div className="w-14 h-10 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-gold/30 transition-colors">
                <span className="text-xs font-bold text-blue-600">PayPal</span>
              </div>
              <div className="w-14 h-10 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-gold/30 transition-colors">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl border border-gold/20 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-2xl font-display font-bold mb-2">
                Stay <span className="text-gold">Updated</span>
              </h4>
              <p className="text-gray-400">Get exclusive offers and the latest luxury vehicles delivered to your inbox.</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-gold transition-all duration-300 placeholder-gray-600"
              />
              <button className="btn-gold px-8 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Elite Wheels. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                Premium Luxury Vehicles
              </span>
              <span>•</span>
              <span>Crafted with Excellence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
    </footer>
  );
}
