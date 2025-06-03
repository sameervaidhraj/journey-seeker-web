
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Edit, Trash2, Plus, Star, Upload } from 'lucide-react';

interface Review {
  id: string;
  user_name: string;
  user_location: string;
  user_image: string;
  rating: number;
  review_text: string;
  package_name: string;
  status: string;
  created_at: string;
}

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    user_name: '',
    user_location: '',
    user_image: '',
    rating: 5,
    review_text: '',
    package_name: '',
    status: 'active'
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `review-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('review-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_name.trim() || !formData.review_text.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the required fields (Name and Review Text)",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    try {
      let imageUrl = formData.user_image;

      // Upload image if selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const reviewData = {
        ...formData,
        user_image: imageUrl,
        user_name: formData.user_name.trim(),
        review_text: formData.review_text.trim(),
        user_location: formData.user_location.trim() || null,
        package_name: formData.package_name.trim() || null,
      };

      if (editingReview) {
        const { error } = await supabase
          .from('reviews')
          .update(reviewData)
          .eq('id', editingReview.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('reviews')
          .insert([reviewData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Review created successfully",
        });
      }

      resetForm();
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
      toast({
        title: "Error",
        description: "Failed to save review",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      user_name: review.user_name,
      user_location: review.user_location || '',
      user_image: review.user_image || '',
      rating: review.rating,
      review_text: review.review_text,
      package_name: review.package_name || '',
      status: review.status
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
      
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      user_name: '',
      user_location: '',
      user_image: '',
      rating: 5,
      review_text: '',
      package_name: '',
      status: 'active'
    });
    setEditingReview(null);
    setImageFile(null);
    setShowForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Clear the URL field when a file is selected
      setFormData(prev => ({ ...prev, user_image: '' }));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
      />
    ));
  };

  if (loading) {
    return <div className="p-4">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews Management</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Add Review
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingReview ? 'Edit Review' : 'Add New Review'}</CardTitle>
            <CardDescription>
              {editingReview ? 'Update the review details' : 'Create a new customer review'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user_name">Customer Name *</Label>
                  <Input
                    id="user_name"
                    value={formData.user_name}
                    onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="user_location">Location</Label>
                  <Input
                    id="user_location"
                    value={formData.user_location}
                    onChange={(e) => setFormData({...formData, user_location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="package_name">Package Name</Label>
                  <Input
                    id="package_name"
                    value={formData.package_name}
                    onChange={(e) => setFormData({...formData, package_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <Select 
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Star{num !== 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user_image_file">Profile Image (Upload)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="user_image_file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                    <Upload size={16} className="text-gray-500" />
                  </div>
                  {imageFile && (
                    <p className="text-sm text-green-600 mt-1">Selected: {imageFile.name}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="user_image">Or Profile Image URL</Label>
                  <Input
                    id="user_image"
                    value={formData.user_image}
                    onChange={(e) => setFormData({...formData, user_image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    disabled={!!imageFile}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review_text">Review Text *</Label>
                <Textarea
                  id="review_text"
                  value={formData.review_text}
                  onChange={(e) => setFormData({...formData, review_text: e.target.value})}
                  required
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : (editingReview ? 'Update Review' : 'Create Review')}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Reviews ({reviews.length})</CardTitle>
          <CardDescription>Manage customer reviews and testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {review.user_image && (
                          <img 
                            src={review.user_image} 
                            alt={review.user_name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{review.user_name}</div>
                          {review.user_location && (
                            <div className="text-sm text-gray-500">{review.user_location}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{review.review_text}</div>
                    </TableCell>
                    <TableCell>{review.package_name || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : review.status === 'hidden'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(review)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {reviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reviews found. Add your first review to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsManagement;
