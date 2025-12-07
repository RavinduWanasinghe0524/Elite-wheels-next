'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs: FAQItem[] = [
    {
      category: 'General',
      question: 'What types of vehicles do you offer?',
      answer: 'We offer a wide range of luxury and premium vehicles including sedans, SUVs, electric vehicles, sports cars, and exotic automobiles from top manufacturers like Mercedes, BMW, Audi, Tesla, and more.'
    },
    {
      category: 'General',
      question: 'Are all vehicles brand new?',
      answer: 'We offer both brand new and certified pre-owned luxury vehicles. All our pre-owned vehicles undergo rigorous inspection and come with comprehensive warranties.'
    },
    {
      category: 'Purchasing',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including cash, bank transfers, credit cards (Visa, Mastercard), and digital payment platforms. We also offer flexible financing options through our partner banks.'
    },
    {
      category: 'Purchasing',
      question: 'Do you offer financing options?',
      answer: 'Yes, we provide competitive financing solutions through our network of partner banks. Our finance team can help you find the best rates and terms that fit your budget.'
    },
    {
      category: 'Purchasing',
      question: 'Can I trade in my current vehicle?',
      answer: 'Absolutely! We accept trade-ins and offer competitive valuations. Simply bring your vehicle for an appraisal, and we\'ll provide you with a fair market value that can be applied toward your purchase.'
    },
    {
      category: 'Test Drive',
      question: 'How do I schedule a test drive?',
      answer: 'You can schedule a test drive through our website by clicking "Book Test Drive" on any vehicle listing, or by calling our showroom directly. We\'re available 7 days a week to accommodate your schedule.'
    },
    {
      category: 'Test Drive',
      question: 'What do I need to bring for a test drive?',
      answer: 'Please bring a valid driver\'s license and proof of insurance. If you don\'t have insurance, we can arrange coverage for the test drive.'
    },
    {
      category: 'Delivery',
      question: 'Do you offer home delivery?',
      answer: 'Yes, we provide complimentary home delivery within Colombo and surrounding areas. For locations outside this area, delivery can be arranged for a nominal fee.'
    },
    {
      category: 'Delivery',
      question: 'How long does delivery take?',
      answer: 'For in-stock vehicles, delivery typically takes 2-5 business days. For custom orders or special configurations, it may take 4-8 weeks depending on manufacturer availability.'
    },
    {
      category: 'Warranty',
      question: 'What warranty coverage do you provide?',
      answer: 'All new vehicles come with manufacturer warranty. Our certified pre-owned vehicles include a comprehensive warranty covering major components. Extended warranty options are also available.'
    },
    {
      category: 'Warranty',
      question: 'Do you offer after-sales service?',
      answer: 'Yes, we have a state-of-the-art service center staffed by certified technicians. We offer regular maintenance, repairs, and genuine parts for all vehicles we sell.'
    },
    {
      category: 'Service',
      question: 'Where is your service center located?',
      answer: 'Our service center is located at our main showroom on Galle Road, Colombo 03. We also offer pickup and drop-off service for your convenience.'
    },
    {
      category: 'Service',
      question: 'How often should I service my vehicle?',
      answer: 'We recommend servicing your vehicle every 6 months or 10,000 km, whichever comes first. Our service team will send you reminders when your vehicle is due for maintenance.'
    }
  ];

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Frequently <span className="text-gold">Asked Questions</span>
          </h1>
          <p className="text-gray-400 text-lg">Find answers to common questions about our services</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gold text-black'
                  : 'glass border border-white/10 text-gray-300 hover:border-gold/50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden hover:border-gold/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider px-3 py-1 rounded-full glass">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full glass flex items-center justify-center transition-transform ${
                  openIndex === index ? 'rotate-180 bg-gold/20' : ''
                }`}>
                  <svg className={`w-5 h-5 ${openIndex === index ? 'text-gold' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-4 border-l-2 border-gold/30">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center glass-card p-8 rounded-2xl border border-gold/20"
        >
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Our team is here to help you find your perfect vehicle</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-gold px-8 py-3">
              Contact Us
            </a>
            <a href="tel:+94112345678" className="btn-glass px-8 py-3 border-gold/30">
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
