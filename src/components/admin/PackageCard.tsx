
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from './ImageUpload';

interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image_url: string;
}

interface PackageCardProps {
  package: PackageData;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<PackageData>) => void;
  isLoading?: boolean;
}

const PackageCard = React.memo(({ package: pkg, onDelete, onUpdate, isLoading = false }: PackageCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PackageData>(pkg);

  const handleSave = useCallback(() => {
    onUpdate(pkg.id, editData);
    setIsEditing(false);
  }, [pkg.id, editData, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditData(pkg);
    setIsEditing(false);
  }, [pkg]);

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      onDelete(pkg.id);
    }
  }, [pkg.id, onDelete]);

  const handleImageUpload = useCallback((imageUrl: string) => {
    setEditData(prev => ({ ...prev, image_url: imageUrl }));
  }, []);

  if (isEditing) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Edit Package</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Package Title</Label>
            <Input
              id="edit-title"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                value={editData.price}
                onChange={(e) => setEditData(prev => ({ ...prev, price: e.target.value }))}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration</Label>
              <Input
                id="edit-duration"
                value={editData.duration}
                onChange={(e) => setEditData(prev => ({ ...prev, duration: e.target.value }))}
                disabled={isLoading}
              />
            </div>
          </div>

          <ImageUpload 
            onImageUpload={handleImageUpload}
            label="Package Image"
            className="space-y-2"
          />

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={pkg.image_url} 
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform hover:scale-105" 
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300x200?text=Package+Image";
          }}
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{pkg.title}</CardTitle>
        <div className="flex justify-between items-center">
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
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
});

PackageCard.displayName = 'PackageCard';

export default PackageCard;
