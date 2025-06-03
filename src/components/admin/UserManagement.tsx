
import React, { useState, useEffect } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Plus, Edit, Trash2, Check, X, RefreshCw } from 'lucide-react';
import QuickUserPromotion from './QuickUserPromotion';
import UserDebugInfo from './UserDebugInfo';
import QuickAdminCreator from './QuickAdminCreator';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  created_at: string;
  created_by: string | null;
}

const UserManagement = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'viewer' as const,
  });

  useEffect(() => {
    fetchUsers();
    
    // Listen for user creation events
    const handleUserCreated = () => {
      fetchUsers();
    };
    
    window.addEventListener('userCreated', handleUserCreated);
    return () => window.removeEventListener('userCreated', handleUserCreated);
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      setRefreshing(true);
      
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      
      console.log('Users fetched successfully:', data);
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (newUser.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Creating new user...');
      
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email.trim().toLowerCase(),
        password: newUser.password,
        email_confirm: true,
        user_metadata: {
          name: newUser.name.trim()
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
          email: newUser.email.trim().toLowerCase(),
          name: newUser.name.trim(),
          role: newUser.role,
          status: 'active',
          created_by: adminUser?.id
        });

      if (insertError) {
        console.error('Error creating app_users record:', insertError);
        throw insertError;
      }

      toast({
        title: "Success",
        description: "User created successfully",
      });

      setNewUser({ name: '', email: '', password: '', role: 'viewer' });
      setIsCreateDialogOpen(false);
      fetchUsers();
      
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

  const updateUserStatus = async (userId: string, status: 'active' | 'suspended') => {
    try {
      console.log('Updating user status:', userId, status);
      
      const { error } = await supabase
        .from('app_users')
        .update({ status })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user status:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: `User ${status === 'active' ? 'activated' : 'suspended'} successfully`,
      });

      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      console.log('Deleting user:', userId);
      
      const { error } = await supabase
        .from('app_users')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error deleting user:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Only super_admin can manage users
  if (adminUser?.role !== 'super_admin') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to manage users.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-gray-600">Manage system users and their permissions</p>
      </div>

      <UserDebugInfo />

      <QuickAdminCreator />

      <QuickUserPromotion />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">All Users ({users.length})</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </Button>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-travel-blue hover:bg-travel-blue-dark">
              <Plus size={16} className="mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system with specific role and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Enter password (min 6 chars)"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={createUser} disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </div>
                ) : 'Create User'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found. Create your first user above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Role</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-left font-semibold">Created</th>
                    <th className="px-4 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {user.status === 'suspended' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateUserStatus(user.id, 'active')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check size={14} />
                            </Button>
                          ) : user.status === 'active' && user.role !== 'super_admin' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateUserStatus(user.id, 'suspended')}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <X size={14} />
                            </Button>
                          ) : null}
                          {user.role !== 'super_admin' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
