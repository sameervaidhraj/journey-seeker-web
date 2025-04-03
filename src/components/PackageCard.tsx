
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

interface PackageCardProps {
  image: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  discount?: string;
}

const PackageCard = ({
  image,
  title,
  location,
  duration,
  price,
  rating,
  discount
}: PackageCardProps) => {
  return (
    <div className="package-card bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative">
        {/* Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover"
        />
        
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-travel-orange text-white px-2 py-1 rounded text-sm font-medium">
            {discount}
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Rating */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={i < rating ? "#FBBF24" : "#E5E7EB"} 
              className="w-4 h-4"
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          ))}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        {/* Duration */}
        <div className="flex items-center text-gray-600 mb-3">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        
        {/* Price and button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-xs text-gray-500">Starting from</span>
            <div className="text-travel-blue font-bold">{price}</div>
          </div>
          <Button size="sm" className="bg-travel-blue hover:bg-travel-blue-dark">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
