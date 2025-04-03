
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample data for demonstration
const initialPackages = [
  {
    id: 1,
    title: "Goa Beach Holiday",
    location: "Goa, India",
    duration: "5 Days / 4 Nights",
    price: "19,999",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    location: "Kerala, India",
    duration: "4 Days / 3 Nights",
    price: "15,999",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1887",
  },
  {
    id: 3,
    title: "Rajasthan Heritage Tour",
    location: "Jaipur & Udaipur",
    duration: "7 Days / 6 Nights",
    price: "24,999",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975",
  },
];

const initialHotels = [
  {
    id: 1,
    name: "Taj Palace",
    location: "New Delhi",
    pricePerNight: "12,500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
  },
  {
    id: 2,
    name: "The Leela",
    location: "Mumbai",
    pricePerNight: "15,000",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
  },
];

const initialFlights = [
  {
    id: 1,
    airline: "Air India",
    from: "Delhi",
    to: "Mumbai",
    price: "5,999",
    image: "https://images.unsplash.com/photo-1507812984078-917a274065be?q=80&w=2070",
  },
  {
    id: 2,
    airline: "IndiGo",
    from: "Bangalore",
    to: "Hyderabad",
    price: "4,499",
    image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=2070",
  },
];

const AdminDashboard = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [hotels, setHotels] = useState(initialHotels);
  const [flights, setFlights] = useState(initialFlights);
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [showAddHotelForm, setShowAddHotelForm] = useState(false);
  const [showAddFlightForm, setShowAddFlightForm] = useState(false);
  
  const [newPackage, setNewPackage] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    image: "",
  });
  
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    pricePerNight: "",
    image: "",
  });
  
  const [newFlight, setNewFlight] = useState({
    airline: "",
    from: "",
    to: "",
    price: "",
    image: "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackage.title || !newPackage.location || !newPackage.duration || !newPackage.price) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setPackages([
      ...packages,
      {
        id: packages.length + 1,
        ...newPackage,
      },
    ]);

    setNewPackage({
      title: "",
      location: "",
      duration: "",
      price: "",
      image: "",
    });

    setShowAddPackageForm(false);
    
    toast({
      title: "Success",
      description: "Package added successfully!",
    });
  };

  const handleAddHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotel.name || !newHotel.location || !newHotel.pricePerNight) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setHotels([
      ...hotels,
      {
        id: hotels.length + 1,
        ...newHotel,
      },
    ]);

    setNewHotel({
      name: "",
      location: "",
      pricePerNight: "",
      image: "",
    });

    setShowAddHotelForm(false);
    
    toast({
      title: "Success",
      description: "Hotel added successfully!",
    });
  };

  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlight.airline || !newFlight.from || !newFlight.to || !newFlight.price) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setFlights([
      ...flights,
      {
        id: flights.length + 1,
        ...newFlight,
      },
    ]);

    setNewFlight({
      airline: "",
      from: "",
      to: "",
      price: "",
      image: "",
    });

    setShowAddFlightForm(false);
    
    toast({
      title: "Success",
      description: "Flight offer added successfully!",
    });
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    toast({
      title: "Deleted",
      description: "Package has been deleted successfully",
    });
  };

  const handleDeleteHotel = (id: number) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
    toast({
      title: "Deleted",
      description: "Hotel has been deleted successfully",
    });
  };

  const handleDeleteFlight = (id: number) => {
    setFlights(flights.filter(flight => flight.id !== id));
    toast({
      title: "Deleted",
      description: "Flight offer has been deleted successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-travel-blue">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="border-travel-orange text-travel-orange hover:bg-travel-orange hover:text-white"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="packages">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="packages">Holiday Packages</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
          </TabsList>
          
          {/* Packages Tab */}
          <TabsContent value="packages">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Holiday Packages</h2>
              <Button 
                onClick={() => setShowAddPackageForm(!showAddPackageForm)} 
                className="bg-travel-blue hover:bg-travel-blue-dark flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Package
              </Button>
            </div>

            {showAddPackageForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddPackage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Package Title</Label>
                        <Input 
                          id="title" 
                          placeholder="e.g. Goa Beach Holiday"
                          value={newPackage.title}
                          onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          placeholder="e.g. Goa, India"
                          value={newPackage.location}
                          onChange={(e) => setNewPackage({...newPackage, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input 
                          id="duration" 
                          placeholder="e.g. 5 Days / 4 Nights"
                          value={newPackage.duration}
                          onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input 
                          id="price" 
                          placeholder="e.g. 19,999"
                          value={newPackage.price}
                          onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input 
                        id="image" 
                        placeholder="Enter image URL"
                        value={newPackage.image}
                        onChange={(e) => setNewPackage({...newPackage, image: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAddPackageForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Package</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img 
                        src={pkg.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                        alt={pkg.title} 
                        className="w-full h-40 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-3/4 flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{pkg.title}</h3>
                        <p className="text-gray-600">{pkg.location}</p>
                        <p className="text-gray-600">{pkg.duration}</p>
                        <p className="font-medium mt-2">₹{pkg.price}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDeletePackage(pkg.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Hotels Tab */}
          <TabsContent value="hotels">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Hotels</h2>
              <Button 
                onClick={() => setShowAddHotelForm(!showAddHotelForm)} 
                className="bg-travel-blue hover:bg-travel-blue-dark flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Hotel
              </Button>
            </div>

            {showAddHotelForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Hotel</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddHotel} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hotelName">Hotel Name</Label>
                        <Input 
                          id="hotelName" 
                          placeholder="e.g. Taj Palace"
                          value={newHotel.name}
                          onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hotelLocation">Location</Label>
                        <Input 
                          id="hotelLocation" 
                          placeholder="e.g. Mumbai"
                          value={newHotel.location}
                          onChange={(e) => setNewHotel({...newHotel, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hotelPrice">Price Per Night (₹)</Label>
                        <Input 
                          id="hotelPrice" 
                          placeholder="e.g. 12,500"
                          value={newHotel.pricePerNight}
                          onChange={(e) => setNewHotel({...newHotel, pricePerNight: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hotelImage">Image URL</Label>
                        <Input 
                          id="hotelImage" 
                          placeholder="Enter image URL"
                          value={newHotel.image}
                          onChange={(e) => setNewHotel({...newHotel, image: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAddHotelForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Hotel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img 
                        src={hotel.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                        alt={hotel.name} 
                        className="w-full h-40 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-3/4 flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                        <p className="text-gray-600">{hotel.location}</p>
                        <p className="font-medium mt-2">₹{hotel.pricePerNight} per night</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDeleteHotel(hotel.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Flights Tab */}
          <TabsContent value="flights">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Flight Offers</h2>
              <Button 
                onClick={() => setShowAddFlightForm(!showAddFlightForm)} 
                className="bg-travel-blue hover:bg-travel-blue-dark flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Flight Offer
              </Button>
            </div>

            {showAddFlightForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Flight Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddFlight} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="airline">Airline</Label>
                        <Input 
                          id="airline" 
                          placeholder="e.g. Air India"
                          value={newFlight.airline}
                          onChange={(e) => setNewFlight({...newFlight, airline: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <Input 
                          id="from" 
                          placeholder="e.g. Delhi"
                          value={newFlight.from}
                          onChange={(e) => setNewFlight({...newFlight, from: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <Input 
                          id="to" 
                          placeholder="e.g. Mumbai"
                          value={newFlight.to}
                          onChange={(e) => setNewFlight({...newFlight, to: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="flightPrice">Price (₹)</Label>
                        <Input 
                          id="flightPrice" 
                          placeholder="e.g. 5,999"
                          value={newFlight.price}
                          onChange={(e) => setNewFlight({...newFlight, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="flightImage">Image URL</Label>
                        <Input 
                          id="flightImage" 
                          placeholder="Enter image URL"
                          value={newFlight.image}
                          onChange={(e) => setNewFlight({...newFlight, image: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAddFlightForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Flight Offer</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img 
                        src={flight.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                        alt={flight.airline} 
                        className="w-full h-40 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-3/4 flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{flight.airline}</h3>
                        <p className="text-gray-600">{flight.from} to {flight.to}</p>
                        <p className="font-medium mt-2">₹{flight.price}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDeleteFlight(flight.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
