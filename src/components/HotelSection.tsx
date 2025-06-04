
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

const HotelSection = () => {
  const hotels = [
    {
      name: "Grand Plaza Hotel",
      location: "New York",
      image: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1000",
      rating: 4.8,
      price: "$149",
    },
    {
      name: "Oceanview Resort",
      location: "Miami Beach",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000",
      rating: 4.6,
      price: "$199",
    },
    {
      name: "Mountain Lodge",
      location: "Colorado",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000",
      rating: 4.7,
      price: "$129",
    },
    {
      name: "City Center Suites",
      location: "Chicago",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
      rating: 4.5,
      price: "$159",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">Featured Hotels</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find the perfect place to stay for your next trip with our selection of top-rated hotels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                <div className="flex items-center mb-2">
                  <MapPin size={14} className="text-gray-500 mr-1" />
                  <span className="text-gray-500 text-sm">{hotel.location}</span>
                </div>
                <div className="flex items-center mb-3">
                  <Star size={16} className="text-yellow-400 mr-1" fill="#FBBF24" />
                  <span className="text-sm">{hotel.rating}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">From</span>
                    <div className="text-travel-blue font-bold">{hotel.price}<span className="text-xs font-normal">/night</span></div>
                  </div>
                  <Button size="sm" variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="bg-travel-blue hover:bg-travel-blue-dark">
            Explore All Hotels
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
