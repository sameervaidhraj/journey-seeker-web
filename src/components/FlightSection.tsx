
import React from "react";
import { Button } from "@/components/ui/button";
import { Airplane } from "lucide-react";

const FlightSection = () => {
  const popularFlights = [
    { from: "New York", to: "London", price: "$349", date: "Nov 15 - Nov 22" },
    { from: "Los Angeles", to: "Tokyo", price: "$699", date: "Dec 3 - Dec 17" },
    { from: "Chicago", to: "Paris", price: "$429", date: "Jan 8 - Jan 15" },
    { from: "Miami", to: "Cancún", price: "$199", date: "Oct 25 - Nov 1" },
  ];

  return (
    <section className="py-12 md:py-20 bg-travel-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">Popular Flight Deals</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Save big on flights to domestic and international destinations with our exclusive deals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFlights.map((flight, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-travel-blue">
                  <Airplane size={24} />
                </div>
                <span className="text-travel-orange font-bold text-lg">{flight.price}</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-medium">{flight.from}</span>
                  <span className="text-gray-600 font-medium">{flight.to}</span>
                </div>
                <div className="h-[2px] bg-gray-200 relative">
                  <div className="absolute h-2 w-2 bg-travel-blue rounded-full top-1/2 left-0 transform -translate-y-1/2"></div>
                  <div className="absolute h-2 w-2 bg-travel-orange rounded-full top-1/2 right-0 transform -translate-y-1/2"></div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4">{flight.date}</p>
              <Button variant="outline" className="w-full border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="bg-travel-blue hover:bg-travel-blue-dark">
            View All Flight Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlightSection;
