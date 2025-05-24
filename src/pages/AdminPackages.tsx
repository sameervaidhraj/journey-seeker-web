
import React, { useState, useEffect } from 'react';
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
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image_url: string;
}

const AdminPackages = () => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [newPackage, setNewPackage] = useState<Omit<PackageData, 'id'>>({
    title: '',
    description: '',
    price: '',
    duration: '',
    image_url: ''
  });

  // Fetch packages from Supabase
  const { data: packages = [], isLoading, error } = useQuery({
    queryKey: ['travel_packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PackageData[];
    }
  });

  // Add package mutation
  const addPackageMutation = useMutation({
    mutationFn: async (packageData: Omit<PackageData, 'id'>) => {
      const { data, error } = await supabase
        .from('travel_packages')
        .insert([packageData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel_packages'] });
      toast({
        title: "Success",
        description: "Package added successfully",
      });
      setIsAddingNew(false);
      setNewPackage({
        title: '',
        description: '',
        price: '',
        duration: '',
        image_url: ''
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add package: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Delete package mutation
  const deletePackageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('travel_packages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel_packages'] });
      toast({
        title: "Success",
        description: "Package deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete package: " + error.message,
        variant: "destructive"
      });
    }
  });
  
  const handleAddNewSubmit = () => {
    if (!newPackage.title || !newPackage.description || !newPackage.price || !newPackage.duration || !newPackage.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    addPackageMutation.mutate(newPackage);
  };
  
  const handleDeletePackage = (id: string) => {
    deletePackageMutation.mutate(id);
  };
  
  const handleSaveEdit = (id: string, editedData: Partial<PackageData>) => {
    // TODO: Implement edit functionality
    setIsEditing(null);
    toast({
      title: "Info",
      description: "Edit functionality will be implemented soon",
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewPackage({
      ...newPackage,
      image_url: imageUrl
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-red-600">Error loading packages: {error.message}</div>
      </div>
    );
  }

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
            <Button 
              onClick={handleAddNewSubmit} 
              className="bg-travel-blue hover:bg-travel-blue-dark"
              disabled={addPackageMutation.isPending}
            >
              {addPackageMutation.isPending ? "Saving..." : "Save Package"}
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
                src={pkg.image_url} 
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
              <Button 
                variant="destructive" 
                onClick={() => handleDeletePackage(pkg.id)}
                disabled={deletePackageMutation.isPending}
              >
                {deletePackageMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
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
