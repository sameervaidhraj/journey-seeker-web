
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Star } from 'lucide-react';

const AdminHotels = () => {
  const { toast } = useToast();
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "The Taj Palace",
      location: "New Delhi",
      rating: 4.8,
      amenities: "Free WiFi, Pool, Spa, Restaurant",
      roomType: "Deluxe Room",
      price: "12,500"
    },
    {
      id: 2,
      name: "The Oberoi",
      location: "Mumbai",
      rating: 4.9,
      amenities: "Free WiFi, Pool, Spa, Gym, Restaurant",
      roomType: "Luxury Suite",
      price: "15,999"
    },
    {
      id: 3,
      name: "Leela Palace",
      location: "Bangalore",
      rating: 4.7,
      amenities: "Free WiFi, Pool, Gym, Restaurant",
      roomType: "Executive Room",
      price: "10,500"
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    rating: "",
    amenities: "",
    roomType: "",
    price: ""
  });

  const handleAddHotel = () => {
    // Validate inputs
    if (!newHotel.name || !newHotel.location || !newHotel.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Add new hotel with a unique ID
    const updatedHotels = [
      ...hotels,
      {
        id: hotels.length + 1,
        ...newHotel,
        rating: parseFloat(newHotel.rating) || 4.0
      }
    ];

    setHotels(updatedHotels);
    setNewHotel({ name: "", location: "", rating: "", amenities: "", roomType: "", price: "" });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Hotel added successfully!"
    });
  };

  const handleDeleteHotel = (id: number) => {
    const updatedHotels = hotels.filter(hotel => hotel.id !== id);
    setHotels(updatedHotels);

    toast({
      title: "Success",
      description: "Hotel deleted successfully!"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Hotels</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-travel-blue hover:bg-travel-blue-dark">
              <Plus size={18} className="mr-2" /> Add New Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Hotel Name</Label>
                <Input 
                  id="name" 
                  value={newHotel.name}
                  onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                  placeholder="e.g. The Taj Palace" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={newHotel.location}
                  onChange={(e) => setNewHotel({...newHotel, location: e.target.value})}
                  placeholder="e.g. New Delhi" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input 
                  id="rating" 
                  value={newHotel.rating}
                  onChange={(e) => setNewHotel({...newHotel, rating: e.target.value})}
                  placeholder="e.g. 4.8" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amenities">Amenities</Label>
                <Input 
                  id="amenities" 
                  value={newHotel.amenities}
                  onChange={(e) => setNewHotel({...newHotel, amenities: e.target.value})}
                  placeholder="e.g. WiFi, Pool, Spa" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Input 
                  id="roomType" 
                  value={newHotel.roomType}
                  onChange={(e) => setNewHotel({...newHotel, roomType: e.target.value})}
                  placeholder="e.g. Deluxe Room" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price per Night (₹)</Label>
                <Input 
                  id="price" 
                  value={newHotel.price}
                  onChange={(e) => setNewHotel({...newHotel, price: e.target.value})}
                  placeholder="e.g. 12,500" 
                />
              </div>
              <Button className="w-full mt-4 bg-travel-blue hover:bg-travel-blue-dark" onClick={handleAddHotel}>
                Add Hotel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold">Hotel Name</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Room Type</th>
              <th className="px-4 py-3 font-semibold">Price per Night</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="border-b">
                <td className="px-4 py-3 font-medium">{hotel.name}</td>
                <td className="px-4 py-3">{hotel.location}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {hotel.rating}
                    <Star size={14} className="ml-1 text-yellow-500" />
                  </div>
                </td>
                <td className="px-4 py-3">{hotel.roomType}</td>
                <td className="px-4 py-3 font-medium">₹{hotel.price}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-white hover:bg-red-500"
                      onClick={() => handleDeleteHotel(hotel.id)}
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHotels;
