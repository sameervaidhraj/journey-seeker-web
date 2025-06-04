
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
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
import { Check, X, Eye } from 'lucide-react';

interface PendingAction {
  id: string;
  user_id: string;
  action_type: string;
  table_name: string;
  record_id: string | null;
  action_data: any;
  status: string;
  created_at: string;
  app_users: {
    name: string;
    email: string;
  };
}

const ApprovalManagement = () => {
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  useEffect(() => {
    fetchPendingActions();
  }, []);

  const fetchPendingActions = async () => {
    try {
      const { data, error } = await supabase
        .from('pending_actions')
        .select(`
          *,
          app_users (
            name,
            email
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingActions(data || []);
    } catch (error) {
      console.error('Error fetching pending actions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pending actions",
        variant: "destructive",
      });
    }
  };

  const handleAction = async (actionId: string, decision: 'approved' | 'rejected') => {
    setLoading(true);
    try {
      const action = pendingActions.find(a => a.id === actionId);
      if (!action) return;

      if (decision === 'approved') {
        // Apply the action to the actual table
        await applyAction(action);
      }

      // Update the pending action status
      const { error } = await supabase
        .from('pending_actions')
        .update({
          status: decision,
          reviewed_at: new Date().toISOString(),
          reviewed_by: adminUser?.id,
        })
        .eq('id', actionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Action ${decision} successfully`,
      });

      fetchPendingActions();
    } catch (error) {
      console.error('Error handling action:', error);
      toast({
        title: "Error",
        description: "Failed to process action",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyAction = async (action: PendingAction) => {
    const { table_name, action_type, action_data, record_id } = action;

    switch (action_type) {
      case 'create_package':
        await supabase.from(table_name).insert(action_data);
        break;
      case 'update_package':
        await supabase.from(table_name).update(action_data).eq('id', record_id);
        break;
      case 'delete_package':
        await supabase.from(table_name).delete().eq('id', record_id);
        break;
      case 'create_offer':
        await supabase.from(table_name).insert(action_data);
        break;
      case 'update_offer':
        await supabase.from(table_name).update(action_data).eq('id', record_id);
        break;
      case 'delete_offer':
        await supabase.from(table_name).delete().eq('id', record_id);
        break;
      default:
        throw new Error(`Unknown action type: ${action_type}`);
    }
  };

  const getActionDescription = (action: PendingAction) => {
    const actionType = action.action_type.replace('_', ' ').toLowerCase();
    const tableName = action.table_name.replace('_', ' ');
    return `${actionType} ${tableName}`;
  };

  // Only admins and super_admins can view approvals
  if (!adminUser || !['admin', 'super_admin'].includes(adminUser.role)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to view pending approvals.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pending Approvals</h2>
        <p className="text-gray-600">Review and approve or reject user actions</p>
      </div>

      {pendingActions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No pending actions to review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingActions.map((action) => (
            <Card key={action.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {getActionDescription(action)}
                    </CardTitle>
                    <CardDescription>
                      Requested by {action.app_users?.name} ({action.app_users?.email})
                      <br />
                      {new Date(action.created_at).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(action.id, 'approved')}
                      disabled={loading}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(action.id, 'rejected')}
                      disabled={loading}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Action Data:</h4>
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    {JSON.stringify(action.action_data, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalManagement;
