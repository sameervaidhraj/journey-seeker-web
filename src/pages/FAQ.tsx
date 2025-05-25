import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a travel package?",
      answer: "You can book a travel package by browsing our available packages on the homepage, selecting your preferred package, and filling out the booking form. Our team will contact you within 24 hours to confirm your booking and provide payment details."
    },
    {
      question: "What is included in the travel packages?",
      answer: "Our travel packages typically include accommodation, transportation, guided tours, and some meals. The specific inclusions vary by package and are clearly listed in each package description. Please review the package details or contact us for clarification."
    },
    {
      question: "Can I customize my travel package?",
      answer: "Yes! We offer customizable travel packages to suit your preferences and budget. Contact our team at +91 99934 16639 or asbtravelssjp@gmail.com to discuss your requirements."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellation policies vary depending on the package and timing of cancellation. Generally, cancellations made 30+ days in advance receive a full refund minus processing fees. Please refer to our Refund Policy page for detailed information."
    },
    {
      question: "Do you provide travel insurance?",
      answer: "We strongly recommend travel insurance and can help you arrange coverage through our partner insurance providers. Travel insurance is not automatically included in our packages but can be added upon request."
    },
    {
      question: "How do I make payments?",
      answer: "We accept payments through bank transfers, UPI, and cash. A booking advance is required to confirm your reservation, with the balance due before travel. Payment details will be provided upon booking confirmation."
    },
    {
      question: "What documents do I need for domestic travel?",
      answer: "For domestic travel within India, you'll need a valid government-issued photo ID (Aadhaar card, passport, driver's license, or voter ID). Some destinations may require additional permits which we'll arrange for you."
    },
    {
      question: "Do you provide pickup and drop services?",
      answer: "Yes, most of our packages include pickup and drop services from designated points in your city. Specific pickup points and timings will be communicated during booking confirmation."
    },
    {
      question: "What if there are changes to my travel dates?",
      answer: "We understand that plans can change. Date modifications are subject to availability and may incur additional charges. Please contact us as soon as possible to discuss rescheduling options."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via phone at +91 99934 16639, email at asbtravelssjp@gmail.com, or WhatsApp at +91 99934 16639. We're available to assist you with any queries or concerns."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-travel-blue mb-2 text-center">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-12">Find answers to common questions about our travel services</p>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <div className="space-x-4">
              <span className="inline-block bg-travel-blue text-white px-6 py-2 rounded-lg">
                Call Us: +91 99934 16639
              </span>
              <span className="inline-block bg-travel-orange text-white px-6 py-2 rounded-lg">
                Email Us: asbtravelssjp@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
