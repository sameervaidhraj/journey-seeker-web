import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-travel-blue mb-2 text-center">Privacy Policy</h1>
          <p className="text-gray-600 text-center mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="mb-6">
                At ASB Travels, we collect information you provide directly to us, such as when you book a travel package, 
                contact us for support, or subscribe to our newsletter. This may include your name, email address, phone number, 
                travel preferences, and payment information.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Process and manage your travel bookings</li>
                <li>Communicate with you about your trips and our services</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Send you promotional materials and travel offers (with your consent)</li>
                <li>Improve our services and develop new offerings</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this policy. We may share your information with trusted service providers who assist us 
                in operating our business, conducting transactions, or servicing you, as long as they agree to keep this 
                information confidential.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                storage is 100% secure.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request information about how we use your data</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> asbtravelssjp@gmail.com</p>
                <p><strong>Phone:</strong> +91 99934 16639</p>
                <p><strong>Address:</strong> Silicon City, Indore, Madhya Pradesh, India, 452013</p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
