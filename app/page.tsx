'use client';

import CanvasSequenceHero from '@/components/CanvasSequenceHero';
import PremiumFeatures from '@/components/PremiumFeatures';
import CarSpecsSection from '@/components/CarSpecsSection';
import PremiumCTA from '@/components/PremiumCTA';
import PremiumFooter from '@/components/PremiumFooter';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', overflow: 'hidden', background: '#050508' }}>
      {/* HERO — Canvas Scroll Sequence */}
      <CanvasSequenceHero />

      {/* FEATURES */}
      <PremiumFeatures />

      {/* SPECS */}
      <CarSpecsSection />

      {/* CTA */}
      <PremiumCTA />

      {/* FOOTER */}
      <PremiumFooter />
    </main>
  );
}
