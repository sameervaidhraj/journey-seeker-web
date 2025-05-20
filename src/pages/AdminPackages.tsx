
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from '@/components/admin/ImageUpload';

// Sample data structure for packages
interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  imageUrl: string;
}

// Sample packages data
const initialPackages: PackageData[] = [
  {
    id: "pkg-001",
    title: "Kerala Backwaters",
    description: "Experience the serene backwaters of Kerala with this 5-day tour package.",
    price: "₹24,999",
    duration: "5 days, 4 nights",
    imageUrl: "https://images.unsplash.com/photo-1602215399818-8747805976a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
  },
  {
    id: "pkg-002",
    title: "Goa Beach Vacation",
    description: "Relax on the beautiful beaches of Goa with this all-inclusive package.",
    price: "₹18,500",
    duration: "4 days, 3 nights",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
  },
  {
    id: "pkg-003",
    title: "Rajasthan Heritage Tour",
    description: "Explore the rich cultural heritage and royal palaces of Rajasthan.",
    price: "₹32,999",
    duration: "7 days, 6 nights",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
  }
];

const AdminPackages = () => {
  const [packages, setPackages] = useState<PackageData[]>(initialPackages);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [newPackage, setNewPackage] = useState<Omit<PackageData, 'id'>>({
    title: '',
    description: '',
    price: '',
    duration: '',
    imageUrl: ''
  });
  
  const handleAddNewSubmit = () => {
    if (!newPackage.title || !newPackage.description || !newPackage.price || !newPackage.duration || !newPackage.imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newId = `pkg-${(packages.length + 1).toString().padStart(3, '0')}`;
    setPackages([...packages, { ...newPackage, id: newId }]);
    setIsAddingNew(false);
    setNewPackage({
      title: '',
      description: '',
      price: '',
      duration: '',
      imageUrl: ''
    });

    toast({
      title: "Success",
      description: "Package added successfully",
    });
    
    // In a real app, this would also update the database
  };
  
  const handleDeletePackage = (id: string) => {
    // In a real app, this would confirm deletion and delete from database
    setPackages(packages.filter(pkg => pkg.id !== id));
    toast({
      title: "Success",
      description: "Package deleted successfully",
    });
  };
  
  const handleSaveEdit = (id: string, editedData: Partial<PackageData>) => {
    // In a real app, this would update the database
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, ...editedData } : pkg
    ));
    setIsEditing(null);
    toast({
      title: "Success",
      description: "Package updated successfully",
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewPackage({
      ...newPackage,
      imageUrl
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Holiday Packages</h2>
        <Button 
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="bg-travel-blue hover:bg-travel-blue-dark"
        >
          {isAddingNew ? "Cancel" : "Add New Package"}
        </Button>
      </div>

      {/* Add New Package Form */}
      {isAddingNew && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Add New Package</CardTitle>
            <CardDescription>Create a new holiday package to offer to customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Package Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Kerala Backwaters"
                  value={newPackage.title}
                  onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  placeholder="e.g. ₹24,999"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration" 
                  placeholder="e.g. 5 days, 4 nights"
                  value={newPackage.duration}
                  onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                />
              </div>
              <ImageUpload 
                onImageUpload={handleImageUpload}
                label="Package Image"
                className="space-y-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the package details..."
                rows={4}
                value={newPackage.description}
                onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>Cancel</Button>
            <Button onClick={handleAddNewSubmit} className="bg-travel-blue hover:bg-travel-blue-dark">
              Save Package
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* List of Existing Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={pkg.imageUrl} 
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform hover:scale-105" 
              />
            </div>
            <CardHeader>
              <CardTitle>{pkg.title}</CardTitle>
              <div className="flex justify-between">
                <p className="text-lg font-bold text-travel-blue">{pkg.price}</p>
                <p className="text-sm text-gray-500">{pkg.duration}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{pkg.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsEditing(pkg.id)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDeletePackage(pkg.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Packages Message */}
      {packages.length === 0 && (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <h3 className="text-lg font-medium text-gray-600">No packages found</h3>
          <p className="text-gray-500 mt-1">Click "Add New Package" to create your first package</p>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
