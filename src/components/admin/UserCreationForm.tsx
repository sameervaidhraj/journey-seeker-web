
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UserCreationFormProps {
  onUserCreated: () => void;
  adminUserId?: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'viewer';
}

const UserCreationForm = React.memo(({ onUserCreated, adminUserId }: UserCreationFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'viewer'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  }, []);

  const validateForm = useCallback(() => {
    const { name, email, password } = formData;
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [formData, toast]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate user creation - replace with actual Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `User ${formData.email} has been created with ${formData.role} role`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'viewer'
      });

      onUserCreated();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm, toast, onUserCreated]);

  const updateFormData = useCallback((field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="Enter full name"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="user@example.com"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="flex gap-2">
          <Input
            id="password"
            type="text"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="Enter password (min 6 chars)"
            disabled={loading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={generatePassword}
            disabled={loading}
          >
            Generate
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select 
          value={formData.role} 
          onValueChange={(value: 'viewer') => updateFormData('role', value)} 
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={loading || !formData.email || !formData.password || !formData.name} 
        className="w-full"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Creating...
          </div>
        ) : 'Create User'}
      </Button>

      <div className="text-xs text-gray-500">
        <p>Note: Viewer users can access the main website only.</p>
      </div>
    </div>
  );
});

UserCreationForm.displayName = 'UserCreationForm';

export default UserCreationForm;
