import Image from 'next/image';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 text-text-primary">
      <div className="flex flex-col md:flex-row items-center mb-12 animate-fade-in-left">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <div className="w-24 h-1 bg-accent mb-4"></div>
          <p className="text-lg mb-4">
            At Elite Wheels, we are passionate about providing a diverse selection of high-quality vehicles that cater to the needs and preferences of our customers. From the latest models to reliable pre-owned cars, we pride ourselves on delivering a premium car-buying experience. Our knowledgeable team is committed to guiding you through the entire process, ensuring that you find the perfect vehicle to match your lifestyle and budget.
          </p>
          <p className="text-lg">
            With years of experience in the automotive industry, Elite Wheels is built on a foundation of trust, integrity, and exceptional customer service. We go above and beyond to ensure that each customer leaves our dealership with confidence and satisfaction. Our goal is not just to sell cars but to build lasting relationships with our clients by offering reliable support and service long after the sale.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
          <Image src="/Img/5.jpg" alt="About Us Image" width={500} height={400} className="rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center animate-fade-in-right">
        <div className="md:w-1/2">
          <Image src="/Img/4.jpg" alt="Mission Statement Image" width={500} height={400} className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
          <h1 className="text-4xl font-bold mb-4">Mission Statement</h1>
          <div className="w-24 h-1 bg-accent mb-4"></div>
          <p className="text-lg mb-4">
            Our mission at Elite Wheels is to deliver an outstanding car-buying experience by offering a wide variety of top-tier vehicles and unparalleled customer service. We believe in making the process transparent, simple, and enjoyable for each of our customers. By prioritizing honesty, trust, and personalized attention, we ensure that every customer feels confident in their decision.
          </p>
          <p className="text-lg">
            At Elite Wheels, we are dedicated to fostering long-term relationships with our customers, providing them with ongoing support throughout their car ownership journey. We aim to stand out as a dealership that prioritizes excellence in every aspect, from the vehicles we offer to the way we treat our clients. Our mission is to help you drive away in your dream car, knowing you’ve made the right choice.
          </p>
        </div>
      </div>
    </div>
  );
}