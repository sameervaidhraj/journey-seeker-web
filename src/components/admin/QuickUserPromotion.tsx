
import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import UserCreationForm from './UserCreationForm';

const QuickUserPromotion = React.memo(() => {
  const { adminUser } = useAdminAuth();

  const handleUserCreated = useCallback(() => {
    // Trigger refresh if needed
    window.dispatchEvent(new CustomEvent('userCreated'));
  }, []);

  // Only show this component to admin users
  if (adminUser?.role !== 'admin') {
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
        <UserCreationForm 
          onUserCreated={handleUserCreated}
          adminUserId={adminUser?.id}
        />
      </CardContent>
    </Card>
  );
});

QuickUserPromotion.displayName = 'QuickUserPromotion';

export default QuickUserPromotion;
