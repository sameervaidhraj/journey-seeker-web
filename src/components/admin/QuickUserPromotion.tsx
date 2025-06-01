
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
      // Update or create app_users record
      const { error } = await supabase
        .from('app_users')
        .upsert({
          email: email.trim().toLowerCase(),
          role: role,
          status: 'active',
          name: email.split('@')[0], // Default name from email
        }, {
          onConflict: 'email'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `User ${email} has been promoted to ${role} role`,
      });

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
          Promote existing Supabase users or create new admin accounts
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
            {loading ? 'Promoting...' : 'Promote User'}
          </Button>
          <div className="text-xs text-gray-500">
            <p>Note: The user must already exist in Supabase Auth or you can create them there first.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickUserPromotion;
