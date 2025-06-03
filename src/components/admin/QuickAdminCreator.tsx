
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const QuickAdminCreator = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'viewer'>('admin');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(password);
  };

  const createUser = async () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Creating new user:', email, 'with role:', role);
      
      // Create auth user first using admin.createUser
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email.trim().toLowerCase(),
        password: password,
        email_confirm: true,
        user_metadata: {
          name: name.trim()
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      console.log('Auth user created:', authData);

      // Create app_users record
      const { error: insertError } = await supabase
        .from('app_users')
        .insert({
          auth_user_id: authData.user.id,
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: role,
          status: 'active',
          created_by: adminUser?.id
        });

      if (insertError) {
        console.error('Error creating app_users record:', insertError);
        throw insertError;
      }

      toast({
        title: "Success",
        description: `${role === 'admin' ? 'Admin' : 'User'} ${email} has been created successfully`,
      });

      // Clear form
      setEmail('');
      setPassword('');
      setName('');
      setRole('admin');
      
      // Trigger a refresh of the user list if parent component listens for this
      window.dispatchEvent(new CustomEvent('userCreated'));
      
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
  };

  // Only super_admin can use this feature
  if (adminUser?.role !== 'super_admin') {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick User Creator</CardTitle>
        <CardDescription>
          Create new users with admin or viewer permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="user_name">Full Name *</Label>
            <Input
              id="user_name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="user_email">Email *</Label>
            <Input
              id="user_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="user_password">Password *</Label>
            <div className="flex gap-2">
              <Input
                id="user_password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <Label htmlFor="user_role">Role *</Label>
            <Select value={role} onValueChange={(value: any) => setRole(value)} disabled={loading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={createUser} disabled={loading || !email || !password || !name} className="w-full">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </div>
            ) : `Create ${role === 'admin' ? 'Admin' : 'User'}`}
          </Button>
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Admin users can access the admin panel and manage content</p>
            <p>• Viewer users can only view content on the main website</p>
            <p>• Passwords must be at least 6 characters long</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAdminCreator;
