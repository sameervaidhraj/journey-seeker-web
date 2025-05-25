
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface Offer {
  id: string;
  title: string;
  description: string;
  price: string;
  original_price?: string;
  discount: number;
  validity?: string;
  image_url?: string;
}

const SpecialOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Fetch initial offers
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (!error && data) {
        setOffers(data);
      }
    };

    fetchOffers();

    // Set up real-time subscription
    const channel = supabase
      .channel('offers-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'offers' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setOffers(prev => [payload.new as Offer, ...prev.slice(0, 1)]);
          } else if (payload.eventType === 'DELETE') {
            setOffers(prev => prev.filter(offer => offer.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setOffers(prev => prev.map(offer => 
              offer.id === payload.new.id ? payload.new as Offer : offer
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 relative">
                <img
                  src={offer.image_url || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000"}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-travel-orange text-white font-bold py-1 px-3 rounded">
                  {offer.discount}% OFF
                </div>
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  {offer.validity && (
                    <div className="flex items-center text-gray-500 mb-4">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">Valid until {offer.validity}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting from</span>
                    <div className="text-travel-blue font-bold text-xl">₹{offer.price}</div>
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
