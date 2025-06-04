
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
  const [role, setRole] = useState<'super_admin' | 'admin' | 'editor' | 'viewer'>('admin');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const promoteUser = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Promoting user:', email, 'to role:', role);
      
      // First, check if the user exists in app_users by email
      const { data: existingUser, error: fetchError } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching user:', fetchError);
        throw fetchError;
      }

      if (existingUser) {
        // User exists, update their role
        console.log('User exists, updating role...');
        const { error: updateError } = await supabase
          .from('app_users')
          .update({ 
            role: role,
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('email', email.trim().toLowerCase());

        if (updateError) {
          console.error('Error updating user role:', updateError);
          throw updateError;
        }

        toast({
          title: "Success",
          description: `User ${email} has been updated to ${role} role`,
        });
      } else {
        // User doesn't exist, create a new record
        console.log('User does not exist, creating new record...');
        const { error: insertError } = await supabase
          .from('app_users')
          .insert({
            email: email.trim().toLowerCase(),
            role: role,
            status: 'active',
            name: email.split('@')[0], // Default name from email
          });

        if (insertError) {
          console.error('Error creating user:', insertError);
          throw insertError;
        }

        toast({
          title: "Success",
          description: `New user ${email} has been created with ${role} role. They can now login if they have a Supabase Auth account.`,
        });
      }

      setEmail('');
      setRole('admin');
    } catch (error: any) {
      console.error('Error promoting user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to promote user",
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
        <CardTitle>Quick User Promotion</CardTitle>
        <CardDescription>
          Promote existing users or create new admin accounts by email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: any) => setRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={promoteUser} disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Promote User'}
          </Button>
          <div className="text-xs text-gray-500">
            <p>Note: If the user doesn't exist in Supabase Auth, create them there first, then use this tool to assign roles.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickUserPromotion;
