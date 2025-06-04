
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: "Our trip to Bali was absolutely amazing! The package was perfectly organized with great accommodations and activities. Will definitely book with JourneySeeker again.",
    },
    {
      name: "Michael Chen",
      location: "San Francisco",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      text: "The European tour exceeded all our expectations. The hotels were fantastic, and the guided tours were informative and fun. Highly recommended!",
    },
    {
      name: "Emily Rodriguez",
      location: "Chicago",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      text: "Great experience booking our honeymoon through JourneySeeker. The customer service was excellent, and they helped us find the perfect romantic getaway.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-travel-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">What Our Travelers Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from our satisfied customers about their travel experiences with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
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
              
              <p className="text-gray-700 italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
