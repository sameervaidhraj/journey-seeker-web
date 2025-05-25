
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-travel-blue mb-2 text-center">Refund Policy</h1>
          <p className="text-gray-600 text-center mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancellation Terms</h2>
              <p className="mb-6">
                At ASB Travels, we understand that travel plans can change. Our refund policy is designed to be fair 
                while protecting our business interests and those of our service providers.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Schedule</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">For Domestic Travel Packages:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>45+ days before travel:</strong> 100% refund (minus processing fees)</li>
                  <li><strong>30-44 days before travel:</strong> 75% refund</li>
                  <li><strong>15-29 days before travel:</strong> 50% refund</li>
                  <li><strong>7-14 days before travel:</strong> 25% refund</li>
                  <li><strong>Less than 7 days:</strong> No refund</li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Processing Fees</h2>
              <p className="mb-6">
                A processing fee of ₹500 per person applies to all cancellations, regardless of the cancellation timeline. 
                This fee covers administrative costs and payment gateway charges.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Non-Refundable Items</h2>
              <p className="mb-4">The following are non-refundable:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Visa fees and documentation charges</li>
                <li>Travel insurance premiums</li>
                <li>Confirmed flight tickets (subject to airline policies)</li>
                <li>Pre-booked activities and experiences</li>
                <li>Peak season and festival bookings (special terms apply)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Medical Emergency Cancellations</h2>
              <p className="mb-6">
                In case of medical emergencies or unforeseen circumstances, we may consider special refund terms on a 
                case-by-case basis. Valid medical certificates or documentation will be required.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Process</h2>
              <p className="mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 mb-6">
                <li>Contact us immediately via phone or email</li>
                <li>Provide your booking reference and reason for cancellation</li>
                <li>Submit any required documentation</li>
                <li>Refunds will be processed within 7-10 business days after approval</li>
                <li>Refunds will be credited to the original payment method</li>
              </ol>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Force Majeure</h2>
              <p className="mb-6">
                In cases of natural disasters, political unrest, or other circumstances beyond our control, 
                we will work with you to reschedule your trip or provide a credit for future travel.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact for Cancellations</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">To cancel your booking or inquire about refunds:</p>
                <p><strong>Email:</strong> <a href="mailto:asbtravelssjp@gmail.com" className="text-travel-blue hover:underline">asbtravelssjp@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+919993416639" className="text-travel-blue hover:underline">+91 99934 16639</a></p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/919993416639" className="text-travel-blue hover:underline">+91 99934 16639</a></p>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This refund policy is subject to change. Please review the terms at the time of booking. 
                  For group bookings and special packages, different terms may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;
