
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  user_name: string;
  user_location?: string;
  user_image?: string;
  rating: number;
  review_text: string;
  package_name?: string;
}

// Static testimonials data
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'default-1',
    user_name: "Priya Sharma",
    user_location: "Mumbai",
    user_image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    review_text: "Amazing travel experience! ASB Travels made our honeymoon trip to Goa absolutely perfect. The hotel was beautiful and the itinerary was well-planned.",
    package_name: "Goa Honeymoon Package"
  },
  {
    id: 'default-2',
    user_name: "Rajesh Kumar",
    user_location: "Delhi",
    user_image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    review_text: "Excellent service and great value for money. Our family trip to Kerala was unforgettable. Highly recommend ASB Travels for their professionalism.",
    package_name: "Kerala Family Package"
  },
  {
    id: 'default-3',
    user_name: "Anita Patel",
    user_location: "Ahmedabad",
    user_image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    review_text: "Best travel agency in India! They handled everything from booking to accommodation. Our Rajasthan tour was simply magical.",
    package_name: "Rajasthan Heritage Tour"
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our satisfied customers who have experienced amazing journeys with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEFAULT_TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.user_image || "https://via.placeholder.com/50x50?text=?"} 
                  alt={testimonial.user_name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/50x50?text=?";
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.user_name}</h4>
                  {testimonial.user_location && (
                    <p className="text-sm text-gray-600">{testimonial.user_location}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">
                "{testimonial.review_text}"
              </p>
              
              {testimonial.package_name && (
                <div className="text-xs text-travel-orange font-medium border-t pt-3">
                  {testimonial.package_name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
