
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab("packages")}
          className={`search-tab px-4 py-2 font-medium rounded-t-lg ${
            activeTab === "packages" ? "active" : "text-gray-600 hover:text-travel-blue"
          }`}
        >
          Holiday Packages
        </button>
        <button
          onClick={() => setActiveTab("flights")}
          className={`search-tab px-4 py-2 font-medium rounded-t-lg ${
            activeTab === "flights" ? "active" : "text-gray-600 hover:text-travel-blue"
          }`}
        >
          Flights
        </button>
        <button
          onClick={() => setActiveTab("hotels")}
          className={`search-tab px-4 py-2 font-medium rounded-t-lg ${
            activeTab === "hotels" ? "active" : "text-gray-600 hover:text-travel-blue"
          }`}
        >
          Hotels
        </button>
      </div>

      {/* Package Search Form */}
      {activeTab === "packages" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <MapPin size={18} className="text-travel-blue mr-2" />
              <select className="bg-transparent w-full focus:outline-none">
                <option>Select Destination</option>
                <option>Bali, Indonesia</option>
                <option>Paris, France</option>
                <option>Bangkok, Thailand</option>
                <option>Dubai, UAE</option>
                <option>Maldives</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Calendar size={18} className="text-travel-blue mr-2" />
              <input
                type="date"
                placeholder="Departure Date"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Users size={18} className="text-travel-blue mr-2" />
              <select className="bg-transparent w-full focus:outline-none">
                <option>2 Adults, 0 Children</option>
                <option>1 Adult, 0 Children</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <select className="bg-transparent w-full focus:outline-none">
                <option>Budget (Any)</option>
                <option>Under $500</option>
                <option>$500 - $1000</option>
                <option>$1000 - $2000</option>
                <option>$2000+</option>
              </select>
            </div>
          </div>

          <Button className="w-full md:w-auto bg-travel-orange hover:bg-travel-orange/90 text-white py-3 px-6 rounded-lg font-medium">
            Search Packages
          </Button>
        </div>
      )}

      {/* Flight Search Form */}
      {activeTab === "flights" && (
        <div className="space-y-4">
          <div className="flex mb-3">
            <label className="inline-flex items-center mr-4">
              <input type="radio" name="flightType" defaultChecked className="text-travel-blue" />
              <span className="ml-2">Round Trip</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="flightType" className="text-travel-blue" />
              <span className="ml-2">One Way</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <MapPin size={18} className="text-travel-blue mr-2" />
              <input
                type="text"
                placeholder="From (City or Airport)"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <MapPin size={18} className="text-travel-blue mr-2" />
              <input
                type="text"
                placeholder="To (City or Airport)"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Calendar size={18} className="text-travel-blue mr-2" />
              <input
                type="date"
                placeholder="Departure Date"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Calendar size={18} className="text-travel-blue mr-2" />
              <input
                type="date"
                placeholder="Return Date"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Users size={18} className="text-travel-blue mr-2" />
              <select className="bg-transparent w-full focus:outline-none">
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4+ Passengers</option>
              </select>
            </div>
          </div>

          <Button className="w-full md:w-auto bg-travel-orange hover:bg-travel-orange/90 text-white py-3 px-6 rounded-lg font-medium">
            Search Flights
          </Button>
        </div>
      )}

      {/* Hotel Search Form */}
      {activeTab === "hotels" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <MapPin size={18} className="text-travel-blue mr-2" />
              <input
                type="text"
                placeholder="Destination/Hotel Name"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Users size={18} className="text-travel-blue mr-2" />
              <select className="bg-transparent w-full focus:outline-none">
                <option>2 Adults, 1 Room</option>
                <option>1 Adult, 1 Room</option>
                <option>2 Adults, 2 Rooms</option>
                <option>4 Adults, 2 Rooms</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Calendar size={18} className="text-travel-blue mr-2" />
              <input
                type="date"
                placeholder="Check-in Date"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
              <Calendar size={18} className="text-travel-blue mr-2" />
              <input
                type="date"
                placeholder="Check-out Date"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          <Button className="w-full md:w-auto bg-travel-orange hover:bg-travel-orange/90 text-white py-3 px-6 rounded-lg font-medium">
            Search Hotels
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
