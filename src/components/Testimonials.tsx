
import React, { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  user_name: string;
  user_location: string;
  user_image: string;
  rating: number;
  review_text: string;
  package_name: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials');
        // Fall back to default testimonials
        setTestimonials(defaultTestimonials);
      } else if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Use default testimonials if no data
        setTestimonials(defaultTestimonials);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load testimonials');
      setTestimonials(defaultTestimonials);
    } finally {
      setLoading(false);
    }
  };

  // Default testimonials as fallback
  const defaultTestimonials = [
    {
      id: "1",
      user_name: "Sarah Johnson",
      user_location: "New York",
      user_image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      review_text: "Our trip to Bali was absolutely amazing! The package was perfectly organized with great accommodations and activities. Will definitely book with JourneySeeker again.",
      package_name: "Bali Adventure Package"
    },
    {
      id: "2",
      user_name: "Michael Chen",
      user_location: "San Francisco",
      user_image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      review_text: "The European tour exceeded all our expectations. The hotels were fantastic, and the guided tours were informative and fun. Highly recommended!",
      package_name: "European Discovery Tour"
    },
    {
      id: "3",
      user_name: "Emily Rodriguez",
      user_location: "Chicago",
      user_image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      review_text: "Great experience booking our honeymoon through JourneySeeker. The customer service was excellent, and they helped us find the perfect romantic getaway.",
      package_name: "Romantic Honeymoon Package"
    },
  ];

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-travel-gray-light">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="section-title mx-auto">What Our Travelers Say</h2>
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-blue"></div>
              <p className="text-gray-600 ml-3">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-travel-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">What Our Travelers Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from our satisfied customers about their travel experiences with us
          </p>
          {error && (
            <p className="text-orange-600 text-sm mt-2">
              Showing sample testimonials
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.user_image || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                  alt={testimonial.user_name} 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.currentTarget.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                  }}
                />
                <div>
                  <h4 className="font-semibold">{testimonial.user_name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.user_location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={i < testimonial.rating ? "#FBBF24" : "#E5E7EB"} 
                    className="w-4 h-4"
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 italic">{testimonial.review_text}</p>
              
              {testimonial.package_name && (
                <p className="text-sm text-travel-blue mt-2 font-medium">
                  Package: {testimonial.package_name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
