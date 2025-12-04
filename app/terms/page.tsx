export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">
          Terms of <span className="text-gold">Service</span>
        </h1>
        
        <div className="glass-card p-8 rounded-2xl space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
            <p>By using Elite Wheels services, you agree to these terms and conditions.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Vehicle Information</h2>
            <p>We strive to provide accurate information. Prices and availability are subject to change.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p>For questions about these terms, email: legal@elitewheels.lk</p>
          </section>
        </div>
      </div>
    </main>
  );
}
