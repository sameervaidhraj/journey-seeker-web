
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const SuperAdminSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const { toast } = useToast();

  const createSuperAdmin = async () => {
    setIsLoading(true);
    try {
      // Create the auth user with the specified credentials
      const { data, error } = await supabase.auth.signUp({
        email: 'asbtravelssjp@gmail.com',
        password: 'Aisha@bh01S',
        options: {
          data: {
            name: 'ASB Travels Super Admin'
          },
          emailRedirectTo: `${window.location.origin}/admin/login`
        }
      });

      if (error) {
        // If user already exists, try to update their role
        if (error.message.includes('already registered')) {
          const { error: updateError } = await supabase
            .from('app_users')
            .upsert({ 
              email: 'asbtravelssjp@gmail.com',
              role: 'super_admin',
              status: 'active',
              name: 'ASB Travels Super Admin'
            }, {
              onConflict: 'email'
            });

          if (updateError) {
            console.error('Error updating user role:', updateError);
            toast({
              title: "Info", 
              description: "User already exists. Please try logging in with your credentials.",
            });
          } else {
            toast({
              title: "Success",
              description: "Super admin role updated! You can now login.",
            });
            setSetupComplete(true);
          }
        } else {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      // The trigger will automatically create the app_users record
      // But we need to update it to super_admin role
      if (data.user) {
        // Wait a moment for the trigger to execute
        setTimeout(async () => {
          const { error: updateError } = await supabase
            .from('app_users')
            .update({ 
              role: 'super_admin',
              status: 'active',
              name: 'ASB Travels Super Admin'
            })
            .eq('email', 'asbtravelssjp@gmail.com');

          if (updateError) {
            console.error('Error updating user role:', updateError);
          }
        }, 2000);
      }

      setSetupComplete(true);
      toast({
        title: "Success",
        description: "Super admin account created successfully! Check your email to confirm, then you can login.",
      });

    } catch (error: any) {
      console.error('Error creating super admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create super admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (setupComplete) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center text-green-600">Setup Complete!</CardTitle>
          <CardDescription className="text-center">
            Super admin account has been created successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            You can now login with:<br />
            <strong>Email:</strong> asbtravelssjp@gmail.com<br />
            <strong>Password:</strong> Aisha@bh01S
          </p>
          <Button 
            onClick={() => window.location.href = '/admin/login'}
            className="bg-travel-blue hover:bg-travel-blue-dark"
          >
            Go to Admin Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Setup Super Admin</CardTitle>
        <CardDescription className="text-center">
          Create the first super admin account for ASB Travels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Email:</strong> asbtravelssjp@gmail.com</p>
            <p><strong>Password:</strong> Aisha@bh01S</p>
            <p><strong>Role:</strong> Super Admin</p>
          </div>
          <Button 
            onClick={createSuperAdmin}
            disabled={isLoading}
            className="w-full bg-travel-blue hover:bg-travel-blue-dark"
          >
            {isLoading ? "Creating Account..." : "Create Super Admin Account"}
          </Button>
          <div className="text-xs text-gray-500">
            <p>Note: You may need to confirm your email before logging in.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperAdminSetup;
