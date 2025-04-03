
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

const SpecialOffers = () => {
  const offers = [
    {
      title: "Bali Paradise",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
      discount: "30% OFF",
      description: "5 nights at a luxury resort with private pool villa",
      validUntil: "Valid until Dec 15, 2023",
      price: "$899"
    },
    {
      title: "Thailand Adventure",
      image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=1000",
      discount: "25% OFF",
      description: "7 days tour through Bangkok, Phuket & Phi Phi Islands",
      validUntil: "Valid until Nov 30, 2023",
      price: "$1,199"
    }
  ];

  return (
    <section className="py-12 md:py-20 travel-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers & Deals</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Limited-time offers and exclusive deals to make your dream vacation affordable
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-travel-orange text-white font-bold py-1 px-3 rounded">
                  {offer.discount}
                </div>
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{offer.validUntil}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting from</span>
                    <div className="text-travel-blue font-bold text-xl">{offer.price}</div>
                  </div>
                  <Button className="bg-travel-orange hover:bg-travel-orange/90">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-travel-blue"
          >
            View All Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
