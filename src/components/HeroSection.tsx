
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070')", 
          filter: "brightness(0.7)"
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Your Perfect Getaway
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            Find and book amazing travel experiences with our exclusive holiday packages, flights, and hotels
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
