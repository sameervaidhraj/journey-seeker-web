
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

const QuickUserPromotion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'viewer'>('viewer');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const createUser = async () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Creating new user:', email, 'with role:', role);
      
      // Create auth user first
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
        description: `User ${email} has been created with ${role} role`,
      });

      setEmail('');
      setPassword('');
      setName('');
      setRole('viewer');
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

  // Only show this component to super_admin users
  if (adminUser?.role !== 'super_admin') {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Create new users who can access the website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: any) => setRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={createUser} disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create User'}
          </Button>
          <div className="text-xs text-gray-500">
            <p>Note: Viewer users can access the main website only.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickUserPromotion;
