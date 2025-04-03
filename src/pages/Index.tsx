
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PackageCard from '@/components/PackageCard';
import FlightSection from '@/components/FlightSection';
import HotelSection from '@/components/HotelSection';
import SpecialOffers from '@/components/SpecialOffers';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const featuredPackages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
      title: "Beach Paradise Escape",
      location: "Bali, Indonesia",
      duration: "5 Days / 4 Nights",
      price: "$899",
      rating: 5,
      discount: "20% OFF"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1887",
      title: "Paris City Tour",
      location: "Paris, France",
      duration: "4 Days / 3 Nights",
      price: "$799",
      rating: 4
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975",
      title: "Thailand Adventure",
      location: "Bangkok & Phuket",
      duration: "7 Days / 6 Nights",
      price: "$1,199",
      rating: 5,
      discount: "15% OFF"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1535152903264-15fc4895bba9?q=80&w=1160",
      title: "Dubai City Delights",
      location: "Dubai, UAE",
      duration: "5 Days / 4 Nights",
      price: "$1,299",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Featured Packages Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto">Featured Holiday Packages</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Discover our handpicked selection of the best holiday packages for your next adventure
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  image={pkg.image}
                  title={pkg.title}
                  location={pkg.location}
                  duration={pkg.duration}
                  price={pkg.price}
                  rating={pkg.rating}
                  discount={pkg.discount}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="btn-primary">
                Explore All Packages
              </Button>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-travel-gray-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto">Why Choose Us</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                We provide the best travel experiences with premium services tailored to your needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-travel-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-travel-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">We offer the best prices for premium travel experiences without compromising quality.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-travel-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-travel-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Worldwide Coverage</h3>
                <p className="text-gray-600">Explore destinations worldwide with our extensive network of travel partners globally.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-travel-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-travel-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our dedicated support team is available round-the-clock to assist with any travel needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-travel-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-travel-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Handpicked Experiences</h3>
                <p className="text-gray-600">Each travel package is carefully curated to provide authentic and memorable experiences.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Flight Deals Section */}
        <FlightSection />
        
        {/* Hotel Section */}
        <HotelSection />
        
        {/* Special Offers Section */}
        <SpecialOffers />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-travel-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-3">Subscribe to Our Newsletter</h2>
              <p className="text-white/80 mb-6">
                Get the latest travel deals, offers and updates delivered straight to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-lg flex-grow focus:outline-none"
                />
                <Button className="bg-travel-orange hover:bg-travel-orange/90 whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
