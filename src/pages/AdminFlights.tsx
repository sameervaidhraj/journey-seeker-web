
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Plane } from 'lucide-react';

const AdminFlights = () => {
  const { toast } = useToast();
  const [flights, setFlights] = useState([
    {
      id: 1,
      from: "Delhi",
      to: "Mumbai",
      date: "10 May 2025",
      airline: "Air India",
      duration: "2h 10m",
      departureTime: "10:00 AM",
      arrivalTime: "12:10 PM",
      price: "5,499"
    },
    {
      id: 2,
      from: "Mumbai",
      to: "Bangalore",
      date: "12 May 2025",
      airline: "IndiGo",
      duration: "1h 45m",
      departureTime: "2:30 PM",
      arrivalTime: "4:15 PM",
      price: "4,299"
    },
    {
      id: 3,
      from: "Delhi",
      to: "Chennai",
      date: "15 May 2025",
      airline: "SpiceJet",
      duration: "2h 45m",
      departureTime: "7:15 AM",
      arrivalTime: "10:00 AM",
      price: "6,199"
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFlight, setNewFlight] = useState({
    from: "",
    to: "",
    date: "",
    airline: "",
    duration: "",
    departureTime: "",
    arrivalTime: "",
    price: ""
  });

  const handleAddFlight = () => {
    // Validate inputs
    if (!newFlight.from || !newFlight.to || !newFlight.date || !newFlight.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Add new flight with a unique ID
    const updatedFlights = [
      ...flights,
      {
        id: flights.length + 1,
        ...newFlight
      }
    ];

    setFlights(updatedFlights);
    setNewFlight({
      from: "",
      to: "",
      date: "",
      airline: "",
      duration: "",
      departureTime: "",
      arrivalTime: "",
      price: ""
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Flight added successfully!"
    });
  };

  const handleDeleteFlight = (id: number) => {
    const updatedFlights = flights.filter(flight => flight.id !== id);
    setFlights(updatedFlights);

    toast({
      title: "Success",
      description: "Flight deleted successfully!"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Flights</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-travel-blue hover:bg-travel-blue-dark">
              <Plus size={18} className="mr-2" /> Add New Flight
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Flight</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="from">From</Label>
                  <Input 
                    id="from" 
                    value={newFlight.from}
                    onChange={(e) => setNewFlight({...newFlight, from: e.target.value})}
                    placeholder="e.g. Delhi" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to">To</Label>
                  <Input 
                    id="to" 
                    value={newFlight.to}
                    onChange={(e) => setNewFlight({...newFlight, to: e.target.value})}
                    placeholder="e.g. Mumbai" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    value={newFlight.date}
                    onChange={(e) => setNewFlight({...newFlight, date: e.target.value})}
                    placeholder="e.g. 10 May 2025" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="airline">Airline</Label>
                  <Input 
                    id="airline" 
                    value={newFlight.airline}
                    onChange={(e) => setNewFlight({...newFlight, airline: e.target.value})}
                    placeholder="e.g. Air India" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="departureTime">Departure Time</Label>
                  <Input 
                    id="departureTime" 
                    value={newFlight.departureTime}
                    onChange={(e) => setNewFlight({...newFlight, departureTime: e.target.value})}
                    placeholder="e.g. 10:00 AM" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="arrivalTime">Arrival Time</Label>
                  <Input 
                    id="arrivalTime" 
                    value={newFlight.arrivalTime}
                    onChange={(e) => setNewFlight({...newFlight, arrivalTime: e.target.value})}
                    placeholder="e.g. 12:10 PM" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input 
                    id="duration" 
                    value={newFlight.duration}
                    onChange={(e) => setNewFlight({...newFlight, duration: e.target.value})}
                    placeholder="e.g. 2h 10m" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input 
                    id="price" 
                    value={newFlight.price}
                    onChange={(e) => setNewFlight({...newFlight, price: e.target.value})}
                    placeholder="e.g. 5,499" 
                  />
                </div>
              </div>
              <Button className="w-full mt-4 bg-travel-blue hover:bg-travel-blue-dark" onClick={handleAddFlight}>
                Add Flight
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold">Route</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Airline</th>
              <th className="px-4 py-3 font-semibold">Times</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} className="border-b">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Plane size={14} className="mr-2 text-travel-blue rotate-45" />
                    {flight.from} → {flight.to}
                  </div>
                </td>
                <td className="px-4 py-3">{flight.date}</td>
                <td className="px-4 py-3">{flight.airline}</td>
                <td className="px-4 py-3">{flight.departureTime} - {flight.arrivalTime}</td>
                <td className="px-4 py-3">{flight.duration}</td>
                <td className="px-4 py-3 font-medium">₹{flight.price}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-white hover:bg-red-500"
                      onClick={() => handleDeleteFlight(flight.id)}
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

export default AdminFlights;
