
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';

interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image_url: string;
}

const PackageSection = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching packages from Supabase...');
      
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching packages:', error);
        throw new Error('Failed to load packages: ' + error.message);
      }

      console.log('Packages fetched successfully:', data);
      setPackages(data || []);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError(error instanceof Error ? error.message : 'Failed to load packages');
      
      // Auto-retry on failure (max 3 times)
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchPackages();
        }, 1000 * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleRetry = () => {
    setRetryCount(0);
    fetchPackages();
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Holiday Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our amazing holiday packages designed for unforgettable experiences.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-orange"></div>
            <span className="ml-2 text-gray-600">Loading packages...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Holiday Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our amazing holiday packages designed for unforgettable experiences.
            </p>
          </div>
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-red-600 mb-2">Error loading packages</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <p className="text-sm text-gray-400 mb-4">Retry attempt: {retryCount}/3</p>
            <Button 
              onClick={handleRetry}
              className="bg-travel-blue hover:bg-travel-blue/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Holiday Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our amazing holiday packages designed for unforgettable experiences.
          </p>
        </div>
        
        {packages.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 mb-2">No packages available</h3>
            <p className="text-gray-500">Check back soon for exciting holiday packages!</p>
            <Button 
              onClick={handleRetry}
              className="mt-4 bg-travel-blue hover:bg-travel-blue/90"
            >
              Refresh
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={pkg.image_url} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=Package+Image";
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-travel-orange">{pkg.price}</span>
                    <span className="text-sm text-gray-500">{pkg.duration}</span>
                  </div>
                  <Button className="w-full bg-travel-blue hover:bg-travel-blue/90">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PackageSection;
