
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Mail, Phone, Instagram, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Form submission logic would go here
    
    toast({
      title: "Success",
      description: "Your message has been sent! We'll get back to you soon.",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-travel-blue mb-2 text-center">Contact Us</h1>
          <p className="text-gray-600 text-center mb-12">Have any questions? We'd love to hear from you</p>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-travel-blue hover:bg-travel-blue-dark">
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="bg-travel-blue text-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-6 w-6 text-travel-orange" />
                    <div>
                      <p className="font-semibold">Our Location</p>
                      <p>Silicon City, Indore</p>
                      <p>Madhya Pradesh, India, 452013</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="mr-3 h-6 w-6 text-travel-orange" />
                    <div>
                      <p className="font-semibold">Phone Number</p>
                      <p>+91 99934 16639</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="mr-3 h-6 w-6 text-travel-orange" />
                    <div>
                      <p className="font-semibold">Email Address</p>
                      <p>asbtravelssjp@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect With Us</h2>
                
                <div className="space-y-4">
                  <a href="https://wa.me/919993416639" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <MessageSquare className="mr-3 h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-semibold text-gray-800">WhatsApp</p>
                      <p className="text-gray-600 text-sm">+91 99934 16639</p>
                    </div>
                  </a>
                  
                  <a href="https://www.instagram.com/asbtravels" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <Instagram className="mr-3 h-6 w-6 text-pink-500" />
                    <div>
                      <p className="font-semibold text-gray-800">Instagram</p>
                      <p className="text-gray-600 text-sm">@asbtravels</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
