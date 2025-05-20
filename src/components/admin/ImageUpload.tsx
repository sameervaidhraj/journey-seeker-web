
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  label = "Upload Image", 
  className = ""
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedImage(file);
    
    // Create preview URL
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
      
      // In a real app, this would upload to a server/storage
      // For demo purposes, we'll just pass the local preview URL
      onImageUpload(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={className}>
      <Label htmlFor="image-upload">{label}</Label>
      <div className="mt-2 flex flex-col space-y-4">
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <Button 
          variant="outline" 
          onClick={() => document.getElementById('image-upload')?.click()}
          className="w-full border-dashed border-2 py-8 flex flex-col items-center justify-center hover:bg-gray-50"
        >
          <upload className="h-6 w-6 mb-2" />
          <span className="text-sm text-gray-600">Click to select image</span>
          <span className="text-xs text-gray-400 mt-1">or drag and drop</span>
        </Button>
        
        {/* Image Preview */}
        {previewUrl && (
          <div className="mt-4 relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded-md object-cover"
              style={{ maxHeight: '200px' }}
            />
            <Button 
              variant="destructive" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => {
                setSelectedImage(null);
                setPreviewUrl(null);
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
