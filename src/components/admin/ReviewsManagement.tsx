
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
import { Edit, Trash2, Plus, Star, Upload, X } from 'lucide-react';

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
  const [imagePreview, setImagePreview] = useState<string>('');
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
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `review-images/${fileName}`;

      console.log('Uploading image:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('review-images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear the URL field when a file is selected
      setFormData(prev => ({ ...prev, user_image: '' }));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, user_image: '' }));
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
        } else {
          // If image upload fails, don't proceed
          return;
        }
      }

      const reviewData = {
        user_name: formData.user_name.trim(),
        user_location: formData.user_location.trim() || null,
        user_image: imageUrl || null,
        rating: formData.rating,
        review_text: formData.review_text.trim(),
        package_name: formData.package_name.trim() || null,
        status: formData.status
      };

      console.log('Submitting review data:', reviewData);

      if (editingReview) {
        const { error } = await supabase
          .from('reviews')
          .update(reviewData)
          .eq('id', editingReview.id);

        if (error) {
          console.error('Error updating review:', error);
          throw error;
        }
        
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('reviews')
          .insert([reviewData]);

        if (error) {
          console.error('Error creating review:', error);
          throw error;
        }
        
        toast({
          title: "Success",
          description: "Review created successfully",
        });
      }

      resetForm();
      await fetchReviews();
    } catch (error: any) {
      console.error('Error saving review:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save review",
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
    setImagePreview('');
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
      
      await fetchReviews();
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete review",
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
    setImagePreview('');
    setShowForm(false);
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
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-orange"></div>
        <span className="ml-2">Loading reviews...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews Management</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-travel-orange hover:bg-travel-orange/90"
        >
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
                    disabled={submitting}
                  />
                </div>
                <div>
                  <Label htmlFor="user_location">Location</Label>
                  <Input
                    id="user_location"
                    value={formData.user_location}
                    onChange={(e) => setFormData({...formData, user_location: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <Label htmlFor="package_name">Package Name</Label>
                  <Input
                    id="package_name"
                    value={formData.package_name}
                    onChange={(e) => setFormData({...formData, package_name: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <Select 
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}
                    disabled={submitting}
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
                    disabled={submitting}
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
                  <Label htmlFor="user_image_file">Profile Image (Upload from Device)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="user_image_file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                      disabled={submitting}
                    />
                    <Upload size={16} className="text-gray-500" />
                  </div>
                  {imageFile && (
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-sm text-green-600">Selected: {imageFile.name}</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={clearImage}
                        disabled={submitting}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  )}
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Supported formats: JPG, PNG, GIF</p>
                </div>
                
                <div>
                  <Label htmlFor="user_image">Or Profile Image URL</Label>
                  <Input
                    id="user_image"
                    value={formData.user_image}
                    onChange={(e) => setFormData({...formData, user_image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    disabled={!!imageFile || submitting}
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
                  disabled={submitting}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (editingReview ? 'Update Review' : 'Create Review')}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} disabled={submitting}>
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
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews found. Add your first review to get started.
            </div>
          ) : (
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
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/32x32?text=?";
                              }}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsManagement;
