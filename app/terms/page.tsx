'use client';

import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Terms of <span className="text-gold">Service</span>
          </h1>
          <p className="text-gray-400">Last updated: December 2024</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-2xl space-y-8 text-gray-300"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Agreement to Terms
            </h2>
            <p className="leading-relaxed">
              By accessing or using Elite Wheels' website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Use of Services
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the services in any way that violates applicable laws or regulations</li>
                <li>Impersonate or attempt to impersonate Elite Wheels or any employee or representative</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the services</li>
                <li>Use any automated system to access the services without our express written permission</li>
                <li>Attempt to gain unauthorized access to any portion of the website or services</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Vehicle Information and Pricing
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                We strive to provide accurate information about our vehicles, including specifications, features, and pricing. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prices are subject to change without notice</li>
                <li>Vehicle availability is not guaranteed until purchase is confirmed</li>
                <li>Vehicle specifications may vary from those listed on the website</li>
                <li>Images are for illustration purposes and may not represent the exact vehicle</li>
                <li>We reserve the right to correct any errors in pricing or product information</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Purchase Terms
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gold">Payment</h3>
              <p className="leading-relaxed">
                All purchases require full payment or approved financing before vehicle delivery. We accept various payment methods including cash, bank transfers, and credit cards. A non-refundable deposit may be required to hold a vehicle.
              </p>
              
              <h3 className="text-xl font-semibold text-gold">Financing</h3>
              <p className="leading-relaxed">
                Financing options are subject to credit approval. Terms and rates are determined by our financing partners. Elite Wheels is not responsible for financing decisions or terms offered by third-party lenders.
              </p>
              
              <h3 className="text-xl font-semibold text-gold">Trade-Ins</h3>
              <p className="leading-relaxed">
                Trade-in valuations are estimates and may be adjusted upon physical inspection. All trade-in vehicles must have clear title and be free of liens. We reserve the right to refuse any trade-in vehicle.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Test Drives
            </h2>
            <p className="leading-relaxed mb-4">
              Test drives are subject to the following conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Valid driver's license and insurance are required</li>
              <li>Test drivers must be at least 21 years of age</li>
              <li>Test drives are conducted at our discretion and may be denied</li>
              <li>Drivers are responsible for any damage or violations during the test drive</li>
              <li>Test drive routes and durations are determined by Elite Wheels staff</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Warranties and Disclaimers
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                New vehicles come with manufacturer warranties. Pre-owned vehicles may include limited warranties as specified in the purchase agreement. All warranties are subject to their respective terms and conditions.
              </p>
              <p className="leading-relaxed font-semibold">
                DISCLAIMER: THE SERVICES AND VEHICLES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, Elite Wheels shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of Elite Wheels or its content suppliers and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Dispute Resolution
            </h2>
            <p className="leading-relaxed">
              Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with Sri Lankan law. You waive any right to a jury trial or to participate in a class action lawsuit.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Changes to Terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page. Your continued use of the services after such modifications constitutes your acceptance of the updated Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Contact Information
            </h2>
            <p className="leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="glass p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:legal@elitewheels.lk" className="text-gold hover:text-gold-light transition-colors">
                  legal@elitewheels.lk
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+94112345678" className="text-gold hover:text-gold-light transition-colors">
                  +94 11 234 5678
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
