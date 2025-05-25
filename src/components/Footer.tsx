
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">ASB <span className="text-travel-orange">Travels</span></h3>
            <p className="mb-4 text-gray-400">
              We specialize in providing the best travel experiences across India. Our mission is to help you discover the beauty of India with comfort and convenience.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/asbtravels" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/asbtravels" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/asbtravels" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/asbtravels" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Holiday Packages</Link></li>
              <li><Link to="/flights" className="text-gray-400 hover:text-white">Flight Booking</Link></li>
              <li><Link to="/hotels" className="text-gray-400 hover:text-white">Hotel Reservation</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white">Special Offers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">User Login</Link></li>
              <li><Link to="/admin-login" className="text-gray-400 hover:text-white">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-travel-orange" />
                <span className="text-gray-400">
                  Silicon City, Indore, Madhya Pradesh, India, 452013
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-travel-orange" />
                <a href="tel:+919993416639" className="text-gray-400 hover:text-white">
                  +91 99934 16639
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-travel-orange" />
                <a href="mailto:asbtravelssjp@gmail.com" className="text-gray-400 hover:text-white">
                  asbtravelssjp@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <MessageSquare size={18} className="mr-2 text-travel-orange" />
                <a href="https://wa.me/919993416639" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  WhatsApp: +91 99934 16639
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ASB Travels. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/refund-policy" className="text-gray-400 hover:text-white text-sm">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
