
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Gift, Percent, Star } from 'lucide-react';

const Offers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-travel-blue mb-2">Special Offers</h1>
        <p className="text-gray-600 mb-8">Exclusive deals and discounts for your next adventure</p>
        
        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {offer.discount && (
                  <div className="absolute top-0 right-0 bg-travel-orange text-white px-3 py-1 font-semibold">
                    {offer.discount}% OFF
                  </div>
                )}
                {offer.limited && (
                  <div className="absolute bottom-0 left-0 right-0 bg-travel-blue/80 text-white px-3 py-1 text-center text-sm font-medium">
                    Limited Time Offer
                  </div>
                )}
              </div>
              <div className="p-6">
                <Badge variant="outline" className="mb-2 bg-travel-orange/10 text-travel-orange border-travel-orange/20">
                  {offer.category}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="space-y-2 text-sm">
                  {offer.validity && (
                    <div className="flex items-center text-gray-600">
                      <CalendarClock size={16} className="mr-2" />
                      Valid till: {offer.validity}
                    </div>
                  )}
                  
                  {offer.highlight && (
                    <div className="flex items-center text-travel-blue">
                      <Gift size={16} className="mr-2" />
                      {offer.highlight}
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    {offer.originalPrice && (
                      <span className="line-through text-gray-400 mr-2">₹{offer.originalPrice}</span>
                    )}
                    <span className="text-xl font-bold text-travel-blue">₹{offer.price}</span>
                  </div>
                  <button className="bg-travel-orange text-white px-4 py-2 rounded hover:bg-travel-orange/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coupon Code Section */}
        <div className="mt-16 bg-travel-blue/10 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-travel-blue mb-2">Have a Promo Code?</h2>
              <p className="text-gray-600">Enter your code below to get exclusive discounts on your bookings</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="text"
                placeholder="Enter promo code"
                className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-travel-blue"
              />
              <button className="bg-travel-orange text-white px-6 py-3 rounded-r hover:bg-travel-orange/90 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Sample offers data
const offers = [
  {
    category: "Holiday Package",
    title: "Goa Beach Getaway",
    description: "3 nights and 4 days at a luxury beach resort with all meals included",
    price: "25,999",
    originalPrice: "32,500",
    discount: 20,
    validity: "31 July 2025",
    highlight: "Complimentary water sports session",
    limited: true
  },
  {
    category: "Flight Deal",
    title: "Delhi-Mumbai Return",
    description: "Special fare for return flights between Delhi and Mumbai",
    price: "9,499",
    originalPrice: "12,999",
    discount: 27,
    validity: "15 June 2025",
    limited: false
  },
  {
    category: "Hotel Offer",
    title: "Luxury Stay in Udaipur",
    description: "2 nights at a 5-star heritage property with breakfast and dinner",
    price: "18,500",
    originalPrice: "24,999",
    discount: 26,
    validity: "30 September 2025",
    highlight: "Complimentary palace tour",
    limited: false
  },
  {
    category: "Holiday Package",
    title: "Kerala Backwaters Cruise",
    description: "2 nights houseboat cruise with authentic Kerala cuisine",
    price: "16,999",
    originalPrice: "21,500",
    discount: 21,
    validity: "31 August 2025",
    highlight: "Ayurvedic massage included",
    limited: true
  },
  {
    category: "Flight Deal",
    title: "Delhi-Bangalore Return",
    description: "Special fare for return flights with extra baggage allowance",
    price: "8,999",
    originalPrice: "11,500",
    discount: 22,
    validity: "20 June 2025",
    limited: false
  },
  {
    category: "Hotel Offer",
    title: "Mountain Retreat in Shimla",
    description: "3 nights at a mountain view resort with all meals",
    price: "22,500",
    originalPrice: "29,999",
    discount: 25,
    validity: "30 October 2025",
    highlight: "Complimentary hiking tour",
    limited: true
  }
];

export default Offers;
