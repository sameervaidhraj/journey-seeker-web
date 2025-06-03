
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const QuickAdminCreator = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const createAdmin = async () => {
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
      console.log('Creating new admin user:', email);
      
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

      // Create app_users record with admin role
      const { error: insertError } = await supabase
        .from('app_users')
        .insert({
          auth_user_id: authData.user.id,
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: 'admin',
          status: 'active',
          created_by: adminUser?.id
        });

      if (insertError) {
        console.error('Error creating app_users record:', insertError);
        throw insertError;
      }

      toast({
        title: "Success",
        description: `Admin user ${email} has been created successfully`,
      });

      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      console.error('Error creating admin user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create admin user",
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
        <CardTitle>Quick Admin Creator</CardTitle>
        <CardDescription>
          Quickly create admin users who can access the admin panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="admin_name">Full Name</Label>
            <Input
              id="admin_name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="admin_email">Email</Label>
            <Input
              id="admin_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <Label htmlFor="admin_password">Password</Label>
            <Input
              id="admin_password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <Button onClick={createAdmin} disabled={loading} className="w-full">
            {loading ? 'Creating Admin...' : 'Create Admin User'}
          </Button>
          <div className="text-xs text-gray-500">
            <p>Note: This creates an admin user who can access the admin panel and manage content.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAdminCreator;
