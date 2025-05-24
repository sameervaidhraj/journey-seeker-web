
import React from 'react';
import HeroSection from '@/components/HeroSection';
import PackageCard from '@/components/PackageCard';
import SpecialOffers from '@/components/SpecialOffers';
import Testimonials from '@/components/Testimonials';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image_url: string;
}

const Index = () => {
  // Fetch packages from Supabase
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['homepage_packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as PackageData[];
    }
  });

  return (
    <div>
      <HeroSection />
      
      {/* Popular Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Travel Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked travel packages designed to give you the best experiences
              at unbeatable prices.
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-lg">Loading packages...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  image={pkg.image_url}
                  title={pkg.title}
                  location="India"
                  duration={pkg.duration}
                  price={pkg.price.replace('₹', '')}
                  rating={4}
                />
              ))}
            </div>
          )}

          {packages.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No packages available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <SpecialOffers />
      <Testimonials />
    </div>
  );
};

export default Index;
