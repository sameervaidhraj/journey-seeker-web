
import React, { useState, useEffect, useCallback } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/integrations/supabase/client';

interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image_url: string;
}

const AdminPackages = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [newPackage, setNewPackage] = useState<Omit<PackageData, 'id'>>({
    title: '',
    description: '',
    price: '',
    duration: '',
    image_url: ''
  });

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching packages:', error);
        throw error;
      }

      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch packages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);
  
  const handleAddNewSubmit = useCallback(async () => {
    if (!newPackage.title || !newPackage.description || !newPackage.price || !newPackage.duration || !newPackage.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('packages')
        .insert([newPackage])
        .select()
        .single();

      if (error) {
        console.error('Error adding package:', error);
        throw error;
      }

      setPackages(prev => [data, ...prev]);
      setIsAddingNew(false);
      setNewPackage({
        title: '',
        description: '',
        price: '',
        duration: '',
        image_url: ''
      });

      toast({
        title: "Success",
        description: "Package added successfully",
      });
    } catch (error) {
      console.error('Error adding package:', error);
      toast({
        title: "Error",
        description: "Failed to add package",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  }, [newPackage, toast]);
  
  const handleDeletePackage = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting package:', error);
        throw error;
      }

      setPackages(prev => prev.filter(pkg => pkg.id !== id));
      toast({
        title: "Success",
        description: "Package deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive"
      });
    }
  }, [toast]);
  
  const handleSaveEdit = useCallback(async (id: string, editedData: Partial<PackageData>) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update(editedData)
        .eq('id', id);

      if (error) {
        console.error('Error updating package:', error);
        throw error;
      }

      setPackages(prev => prev.map(pkg => 
        pkg.id === id ? { ...pkg, ...editedData } : pkg
      ));
      setIsEditing(null);
      toast({
        title: "Success",
        description: "Package updated successfully",
      });
    } catch (error) {
      console.error('Error updating package:', error);
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleImageUpload = useCallback((imageUrl: string) => {
    setNewPackage(prev => ({
      ...prev,
      image_url: imageUrl
    }));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-orange"></div>
        <span className="ml-2">Loading packages...</span>
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
          disabled={submitting}
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
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  placeholder="e.g. ₹24,999"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration" 
                  placeholder="e.g. 5 days, 4 nights"
                  value={newPackage.duration}
                  onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                  disabled={submitting}
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
                disabled={submitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsAddingNew(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNewSubmit} 
              className="bg-travel-blue hover:bg-travel-blue-dark"
              disabled={submitting}
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : 'Save Package'}
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
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x200?text=Package+Image";
                }}
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
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(pkg.id)}
                disabled={submitting}
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDeletePackage(pkg.id)}
                disabled={submitting}
              >
                Delete
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
