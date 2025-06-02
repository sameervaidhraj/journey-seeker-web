
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserDebugInfo = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [authUsers, setAuthUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch app_users
      const { data: appUsers, error: appError } = await supabase
        .from('app_users')
        .select('*');
      
      if (appError) {
        console.error('Error fetching app users:', appError);
      } else {
        setUsers(appUsers || []);
      }

      // Try to fetch auth.users (this might not work due to RLS)
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
      } else {
        setAuthUsers(authData.users || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Debug: User Information</CardTitle>
        <Button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">App Users ({users.length})</h3>
            <div className="text-sm space-y-1">
              {users.map((user) => (
                <div key={user.id} className="p-2 border rounded">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <p><strong>Auth ID:</strong> {user.auth_user_id || 'Missing'}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold">Auth Users ({authUsers.length})</h3>
            <div className="text-sm space-y-1">
              {authUsers.map((user) => (
                <div key={user.id} className="p-2 border rounded">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDebugInfo;
