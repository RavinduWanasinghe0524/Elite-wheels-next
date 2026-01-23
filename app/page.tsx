'use client';

import CinematicHero from '@/components/CinematicHero';
import FleetShowcase from '@/components/FleetShowcase';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import StickyVehicleDetails from '@/components/StickyVehicleDetails';
import AccordionFeatures from '@/components/AccordionFeatures';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import CinematicFooter from '@/components/CinematicFooter';
import PersistentCTA from '@/components/PersistentCTA';
import { cars } from '@/lib/carData';

export default function Home() {
  // Get latest arrivals for horizontal scroll (first 8 cars)
  const latestArrivals = cars.slice(0, 8).map(car => ({
    id: car.id,
    name: `${car.make} ${car.model}`,
    image: car.image,
    price: `$${car.price.toLocaleString()}`,
    year: car.year,
  }));

  // Featured spotlight vehicle for sticky details
  const spotlightCar = cars[0];
  const spotlightSpecs = [
    { label: '0-60 MPH', value: '3.2s' },
    { label: 'Horsepower', value: '650 HP' },
    { label: 'Engine', value: 'V8 Twin-Turbo' },
    { label: 'Top Speed', value: '205 MPH' },
    { label: 'Transmission', value: '8-Speed Automatic' },
    { label: 'Drive Type', value: 'All-Wheel Drive' },
  ];

  return (
    <main className="min-h-screen overflow-hidden selection:bg-gold selection:text-black">
      {/* Cinematic Hero with Video Background */}
      <CinematicHero />

      {/* Fleet Showcase with Mask Reveals */}
      <FleetShowcase />

      {/* Horizontal Scroll - Latest Arrivals */}
      <HorizontalScrollSection
        title="Latest Arrivals"
        items={latestArrivals}
      />

      {/* Sticky Vehicle Details - Spotlight Car */}
      <StickyVehicleDetails
        name={`${spotlightCar.make} ${spotlightCar.model}`}
        tagline={spotlightCar.description}
        image={spotlightCar.image}
        blueprintImage="/images/blueprints/blueprint-generic.svg"
        specs={spotlightSpecs}
      />

      {/* Accordion Features */}
      <AccordionFeatures />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Cinematic Footer */}
      <CinematicFooter />

      {/* Persistent CTA */}
      <PersistentCTA />
    </main>
  );
}
