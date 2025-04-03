
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
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminPackages = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Kerala Backwaters",
      description: "5 days and 4 nights exploring the beauty of Kerala backwaters",
      price: "24,999",
      image: "https://source.unsplash.com/random/300x200/?kerala"
    },
    {
      id: 2,
      title: "Goa Beach Vacation",
      description: "4 days and 3 nights of beach fun in Goa",
      price: "18,500",
      image: "https://source.unsplash.com/random/300x200/?goa"
    },
    {
      id: 3,
      title: "Rajasthan Heritage Tour",
      description: "7 days exploring the royal heritage of Rajasthan",
      price: "32,999",
      image: "https://source.unsplash.com/random/300x200/?rajasthan"
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });

  const handleAddPackage = () => {
    // Validate inputs
    if (!newPackage.title || !newPackage.description || !newPackage.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Add new package with a unique ID
    const updatedPackages = [
      ...packages,
      {
        id: packages.length + 1,
        ...newPackage
      }
    ];

    setPackages(updatedPackages);
    setNewPackage({ title: "", description: "", price: "", image: "" });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Package added successfully!"
    });
  };

  const handleDeletePackage = (id: number) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== id);
    setPackages(updatedPackages);

    toast({
      title: "Success",
      description: "Package deleted successfully!"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Holiday Packages</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-travel-blue hover:bg-travel-blue-dark">
              <Plus size={18} className="mr-2" /> Add New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Package</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Package Title</Label>
                <Input 
                  id="title" 
                  value={newPackage.title}
                  onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                  placeholder="e.g. Kerala Backwaters Tour" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                  placeholder="Describe the package details" 
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input 
                  id="price" 
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                  placeholder="e.g. 24,999" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={newPackage.image}
                  onChange={(e) => setNewPackage({...newPackage, image: e.target.value})}
                  placeholder="URL to package image" 
                />
              </div>
              <Button className="w-full mt-4 bg-travel-blue hover:bg-travel-blue-dark" onClick={handleAddPackage}>
                Add Package
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              {pkg.image && <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />}
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{pkg.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
              <p className="font-bold text-travel-blue">₹{pkg.price}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-white hover:bg-red-500"
                  onClick={() => handleDeletePackage(pkg.id)}
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPackages;
