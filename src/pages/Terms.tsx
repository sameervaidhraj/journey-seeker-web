
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-travel-blue mb-2 text-center">Terms & Conditions</h1>
          <p className="text-gray-600 text-center mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
              <p className="mb-6">
                By using our services, you agree to be bound by these Terms and Conditions. If you do not agree 
                to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking and Payment</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>All bookings require a confirmation deposit</li>
                <li>Full payment must be made before travel commencement</li>
                <li>Prices are subject to change until booking is confirmed</li>
                <li>We accept payments via bank transfer, UPI, and cash</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Travel Documents</h2>
              <p className="mb-6">
                Travelers are responsible for ensuring they have valid identification and any required permits. 
                ASB Travels is not responsible for denied entry due to improper documentation.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Liability</h2>
              <p className="mb-6">
                ASB Travels acts as an intermediary between travelers and service providers. We are not liable 
                for any loss, injury, or damage arising from services provided by third parties.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Itinerary</h2>
              <p className="mb-6">
                We reserve the right to modify itineraries due to weather, local conditions, or circumstances 
                beyond our control. We will provide suitable alternatives whenever possible.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> asbtravelssjp@gmail.com</p>
                <p><strong>Phone:</strong> +91 99934 16639</p>
                <p><strong>Address:</strong> Silicon City, Indore, Madhya Pradesh, India, 452013</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
