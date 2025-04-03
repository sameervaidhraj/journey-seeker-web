
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building2, Star } from 'lucide-react';

const Hotels = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-travel-blue mb-8">Hotel Bookings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelData.map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold">
                  {hotel.rating} <Star className="inline h-4 w-4 text-yellow-500" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Building2 size={20} className="text-travel-blue mr-2" />
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                </div>
                <p className="text-gray-600 mb-2">{hotel.location}</p>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>{hotel.amenities}</p>
                  <p>{hotel.roomType}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-travel-blue">₹{hotel.price}<span className="text-sm font-normal">/night</span></span>
                  <button className="bg-travel-orange text-white px-4 py-2 rounded hover:bg-travel-orange/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Sample hotel data
const hotelData = [
  {
    name: "The Taj Palace",
    location: "New Delhi",
    rating: 4.8,
    amenities: "Free WiFi, Pool, Spa, Restaurant",
    roomType: "Deluxe Room",
    price: "12,500"
  },
  {
    name: "The Oberoi",
    location: "Mumbai",
    rating: 4.9,
    amenities: "Free WiFi, Pool, Spa, Gym, Restaurant",
    roomType: "Luxury Suite",
    price: "15,999"
  },
  {
    name: "Leela Palace",
    location: "Bangalore",
    rating: 4.7,
    amenities: "Free WiFi, Pool, Gym, Restaurant",
    roomType: "Executive Room",
    price: "10,500"
  },
  {
    name: "ITC Grand Chola",
    location: "Chennai",
    rating: 4.8,
    amenities: "Free WiFi, Pool, Spa, Restaurant",
    roomType: "Premium Room",
    price: "11,299"
  },
  {
    name: "Taj Lake Palace",
    location: "Udaipur",
    rating: 4.9,
    amenities: "Free WiFi, Pool, Spa, Restaurant",
    roomType: "Heritage Suite",
    price: "22,999"
  },
  {
    name: "Radisson Blu",
    location: "Jaipur",
    rating: 4.5,
    amenities: "Free WiFi, Pool, Restaurant, Bar",
    roomType: "Standard Room",
    price: "7,500"
  }
];

export default Hotels;
