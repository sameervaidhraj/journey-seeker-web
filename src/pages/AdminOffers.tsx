
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Percent } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface OfferData {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  original_price?: string;
  discount?: number;
  validity?: string;
  highlight?: string;
  limited?: boolean;
}

const AdminOffers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    original_price: "",
    discount: "",
    validity: "",
    highlight: "",
    limited: false
  });

  // Fetch offers from Supabase
  const { data: offers = [], isLoading, error } = useQuery({
    queryKey: ['special_offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('special_offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as OfferData[];
    }
  });

  // Add offer mutation
  const addOfferMutation = useMutation({
    mutationFn: async (offerData: any) => {
      const { data, error } = await supabase
        .from('special_offers')
        .insert([offerData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special_offers'] });
      toast({
        title: "Success",
        description: "Offer added successfully!"
      });
      setNewOffer({
        category: "",
        title: "",
        description: "",
        price: "",
        original_price: "",
        discount: "",
        validity: "",
        highlight: "",
        limited: false
      });
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add offer: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Delete offer mutation
  const deleteOfferMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('special_offers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special_offers'] });
      toast({
        title: "Success",
        description: "Offer deleted successfully!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete offer: " + error.message,
        variant: "destructive"
      });
    }
  });

  const handleAddOffer = () => {
    // Validate inputs
    if (!newOffer.title || !newOffer.category || !newOffer.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Calculate discount if not provided
    let discount = newOffer.discount ? parseInt(newOffer.discount) : 0;
    if (!discount && newOffer.original_price && newOffer.price) {
      const original = parseFloat(newOffer.original_price.replace(/,/g, ''));
      const current = parseFloat(newOffer.price.replace(/,/g, ''));
      if (original > current) {
        discount = Math.round(((original - current) / original) * 100);
      }
    }

    const offerData = {
      category: newOffer.category,
      title: newOffer.title,
      description: newOffer.description,
      price: newOffer.price,
      original_price: newOffer.original_price || null,
      discount: discount || null,
      validity: newOffer.validity || null,
      highlight: newOffer.highlight || null,
      limited: newOffer.limited
    };

    addOfferMutation.mutate(offerData);
  };

  const handleDeleteOffer = (id: string) => {
    deleteOfferMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading offers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-red-600">Error loading offers: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Special Offers</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-travel-blue hover:bg-travel-blue-dark">
              <Plus size={18} className="mr-2" /> Add New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Special Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setNewOffer({...newOffer, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Holiday Package">Holiday Package</SelectItem>
                    <SelectItem value="Flight Deal">Flight Deal</SelectItem>
                    <SelectItem value="Hotel Offer">Hotel Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input 
                  id="title" 
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  placeholder="e.g. Goa Beach Getaway" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                  placeholder="Describe the offer" 
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Current Price (₹)</Label>
                  <Input 
                    id="price" 
                    value={newOffer.price}
                    onChange={(e) => setNewOffer({...newOffer, price: e.target.value})}
                    placeholder="e.g. 25,999" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input 
                    id="originalPrice" 
                    value={newOffer.original_price}
                    onChange={(e) => setNewOffer({...newOffer, original_price: e.target.value})}
                    placeholder="e.g. 32,500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    id="discount" 
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                    placeholder="e.g. 20" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validity">Valid Till</Label>
                  <Input 
                    id="validity" 
                    value={newOffer.validity}
                    onChange={(e) => setNewOffer({...newOffer, validity: e.target.value})}
                    placeholder="e.g. 31 July 2025" 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="highlight">Highlight</Label>
                <Input 
                  id="highlight" 
                  value={newOffer.highlight}
                  onChange={(e) => setNewOffer({...newOffer, highlight: e.target.value})}
                  placeholder="e.g. Complimentary water sports session" 
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="limited" 
                  checked={newOffer.limited}
                  onChange={(e) => setNewOffer({...newOffer, limited: e.target.checked})}
                  className="h-4 w-4 border-gray-300 rounded text-travel-blue focus:ring-travel-blue"
                />
                <Label htmlFor="limited" className="text-sm font-normal">Limited Time Offer</Label>
              </div>
              <Button 
                className="w-full mt-4 bg-travel-blue hover:bg-travel-blue-dark" 
                onClick={handleAddOffer}
                disabled={addOfferMutation.isPending}
              >
                {addOfferMutation.isPending ? "Adding..." : "Add Offer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-travel-orange/10 text-travel-orange mb-2">
                    {offer.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-3">{offer.description}</p>
                  
                  <div className="space-y-1 text-sm mb-3">
                    {offer.validity && (
                      <p className="text-gray-600">Valid till: {offer.validity}</p>
                    )}
                    {offer.highlight && (
                      <p className="text-travel-blue font-medium">{offer.highlight}</p>
                    )}
                    {offer.limited && (
                      <p className="text-travel-orange">Limited Time Offer</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    {offer.original_price && (
                      <span className="line-through text-gray-400 mr-2">₹{offer.original_price}</span>
                    )}
                    <span className="text-xl font-bold text-travel-blue">₹{offer.price}</span>
                    {offer.discount && offer.discount > 0 && (
                      <span className="ml-2 flex items-center text-green-600 text-sm font-medium">
                        <Percent size={14} className="mr-1" /> {offer.discount}% off
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 hover:text-white hover:bg-red-500"
                    onClick={() => handleDeleteOffer(offer.id)}
                    disabled={deleteOfferMutation.isPending}
                  >
                    <Trash2 size={16} className="mr-1" /> 
                    {deleteOfferMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Offers Message */}
      {offers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <h3 className="text-lg font-medium text-gray-600">No offers found</h3>
          <p className="text-gray-500 mt-1">Click "Add New Offer" to create your first offer</p>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;
