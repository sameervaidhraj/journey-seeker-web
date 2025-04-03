
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plane } from 'lucide-react';

const Flights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-travel-blue mb-8">Flight Bookings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flightData.map((flight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Plane size={24} className="text-travel-blue mr-2" />
                  <h3 className="text-lg font-semibold">{flight.from} to {flight.to}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>Date: {flight.date}</p>
                  <p>Airline: {flight.airline}</p>
                  <p>Duration: {flight.duration}</p>
                  <p>Departure: {flight.departureTime}</p>
                  <p>Arrival: {flight.arrivalTime}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-travel-blue">₹{flight.price}</span>
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

// Sample flight data
const flightData = [
  {
    from: "Delhi",
    to: "Mumbai",
    date: "10 May 2025",
    airline: "Air India",
    duration: "2h 10m",
    departureTime: "10:00 AM",
    arrivalTime: "12:10 PM",
    price: "5,499"
  },
  {
    from: "Mumbai",
    to: "Bangalore",
    date: "12 May 2025",
    airline: "IndiGo",
    duration: "1h 45m",
    departureTime: "2:30 PM",
    arrivalTime: "4:15 PM",
    price: "4,299"
  },
  {
    from: "Delhi",
    to: "Chennai",
    date: "15 May 2025",
    airline: "SpiceJet",
    duration: "2h 45m",
    departureTime: "7:15 AM",
    arrivalTime: "10:00 AM",
    price: "6,199"
  },
  {
    from: "Kolkata",
    to: "Hyderabad",
    date: "18 May 2025",
    airline: "Vistara",
    duration: "2h 15m",
    departureTime: "5:45 PM",
    arrivalTime: "8:00 PM",
    price: "5,899"
  },
  {
    from: "Bangalore",
    to: "Goa",
    date: "20 May 2025",
    airline: "IndiGo",
    duration: "1h 15m",
    departureTime: "9:30 AM",
    arrivalTime: "10:45 AM",
    price: "3,799"
  },
  {
    from: "Mumbai",
    to: "Jaipur",
    date: "22 May 2025",
    airline: "Air India",
    duration: "1h 50m",
    departureTime: "4:00 PM",
    arrivalTime: "5:50 PM",
    price: "4,599"
  }
];

export default Flights;
