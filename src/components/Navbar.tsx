
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  if (isAdminRoute) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-travel-blue">ASB <span className="text-travel-orange">Travels</span> <span className="text-travel-orange text-lg">Admin</span></span>
              </Link>
            </div>

            {/* Desktop Navigation for Admin */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                onClick={() => handleNavigation("/")}
              >
                View Website
              </Button>
              <Button 
                className="bg-travel-orange text-white hover:bg-travel-orange/90"
                onClick={() => {
                  // This would be replaced with actual logout functionality
                  navigate('/admin/login');
                }}
              >
                Logout
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

          {/* Mobile Navigation for Admin */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
              <Link 
                to="/" 
                className="block w-full text-left text-gray-700 hover:text-travel-blue font-medium py-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                View Website
              </Link>
              <Button 
                className="w-full bg-travel-orange text-white hover:bg-travel-orange/90"
                onClick={() => {
                  // This would be replaced with actual logout functionality
                  navigate('/admin/login');
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // Regular user navbar - removed Admin Portal button
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-travel-blue">ASB <span className="text-travel-orange">Travels</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-travel-blue font-medium">
              Holiday Packages
            </Link>
            <Link to="/flights" className="text-gray-700 hover:text-travel-blue font-medium">
              Flights
            </Link>
            <Link to="/hotels" className="text-gray-700 hover:text-travel-blue font-medium">
              Hotels
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-travel-blue font-medium">
              Special Offers
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-travel-blue font-medium">
              Contact Us
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
              onClick={() => handleNavigation("/login")}
            >
              User Login
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
            <Link 
              to="/" 
              className="block w-full text-left text-gray-700 hover:text-travel-blue font-medium py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Holiday Packages
            </Link>
            <Link 
              to="/flights" 
              className="block w-full text-left text-gray-700 hover:text-travel-blue font-medium py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>
            <Link 
              to="/hotels" 
              className="block w-full text-left text-gray-700 hover:text-travel-blue font-medium py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link 
              to="/offers" 
              className="block w-full text-left text-gray-700 hover:text-travel-blue font-medium py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Special Offers
            </Link>
            <Link 
              to="/contact" 
              className="block w-full text-left text-gray-700 hover:text-travel-blue font-medium py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="flex flex-col gap-2 mt-3">
              <Button 
                variant="outline" 
                className="w-full border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                onClick={() => handleNavigation("/login")}
              >
                User Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
