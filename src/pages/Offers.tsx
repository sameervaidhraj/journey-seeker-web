
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, Percent } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

interface OfferData {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  original_price?: string;
  discount?: number;
  validity?: string;
  highlight?: string;
  limited?: boolean;
}

const Offers = () => {
  // Fetch offers from Supabase
  const { data: offers = [], isLoading, error } = useQuery({
    queryKey: ['public_special_offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('special_offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as OfferData[];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Special Offers & Deals</h1>
            <p className="text-gray-600 mb-8">Loading amazing deals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Special Offers & Deals</h1>
            <p className="text-red-600 mb-8">Error loading offers. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Special Offers & Deals</h1>
          <p className="text-gray-600 mb-8">
            Discover amazing travel deals and limited-time offers for your next adventure
          </p>
        </div>

        <div className="space-y-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-travel-orange/10 text-travel-orange mb-2">
                      {offer.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                    <p className="text-gray-600 mb-3">{offer.description}</p>
                    
                    <div className="space-y-1 text-sm mb-3">
                      {offer.validity && (
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-2" />
                          <span>Valid till: {offer.validity}</span>
                        </div>
                      )}
                      {offer.highlight && (
                        <p className="text-travel-blue font-medium">{offer.highlight}</p>
                      )}
                      {offer.limited && (
                        <p className="text-travel-orange font-medium">⚡ Limited Time Offer</p>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {offer.original_price && (
                        <span className="line-through text-gray-400 mr-2 text-lg">₹{offer.original_price}</span>
                      )}
                      <span className="text-2xl font-bold text-travel-blue">
                        {offer.price?.startsWith('₹') ? offer.price : `₹${offer.price}`}
                      </span>
                      {offer.discount && offer.discount > 0 && (
                        <span className="ml-3 flex items-center bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-medium">
                          <Percent size={14} className="mr-1" /> {offer.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-6">
                    <Button className="bg-travel-orange hover:bg-travel-orange/90">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Offers Message */}
        {offers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600">No special offers available</h3>
            <p className="text-gray-500 mt-1">Check back soon for amazing deals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
