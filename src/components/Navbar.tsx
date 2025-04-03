
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-travel-blue">ASB <span className="text-travel-orange">Travels</span></span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-travel-blue font-medium">Holiday Packages</a>
            <a href="#" className="text-gray-700 hover:text-travel-blue font-medium">Flights</a>
            <a href="#" className="text-gray-700 hover:text-travel-blue font-medium">Hotels</a>
            <a href="#" className="text-gray-700 hover:text-travel-blue font-medium">Special Offers</a>
            <a href="#" className="text-gray-700 hover:text-travel-blue font-medium">Contact Us</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">
              User Login
            </Button>
            <Button className="bg-travel-orange text-white hover:bg-travel-orange/90">
              Admin Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
            <a href="#" className="block text-gray-700 hover:text-travel-blue font-medium py-2">Holiday Packages</a>
            <a href="#" className="block text-gray-700 hover:text-travel-blue font-medium py-2">Flights</a>
            <a href="#" className="block text-gray-700 hover:text-travel-blue font-medium py-2">Hotels</a>
            <a href="#" className="block text-gray-700 hover:text-travel-blue font-medium py-2">Special Offers</a>
            <a href="#" className="block text-gray-700 hover:text-travel-blue font-medium py-2">Contact Us</a>
            <div className="flex flex-col gap-2 mt-3">
              <Button variant="outline" className="w-full border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">
                User Login
              </Button>
              <Button className="w-full bg-travel-orange text-white hover:bg-travel-orange/90">
                Admin Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
