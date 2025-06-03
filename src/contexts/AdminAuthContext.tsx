
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

// Define the context type
type AdminAuthContextType = {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

// Admin user type
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
};

// Create the context with default values
const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  adminUser: null,
  session: null,
  login: async () => false,
  logout: () => {},
  loading: true,
});

// Custom hook to use the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing session and set up auth state listener
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setAdminUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (user: User) => {
    try {
      console.log('Fetching profile for user:', user.email);
      
      // First check if user exists in app_users
      let { data: appUser, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      console.log('Found user:', appUser, 'Error:', error);

      // If user doesn't exist in app_users, create them automatically
      if (!appUser && !error) {
        console.log('User not found in app_users, creating...');
        
        // Determine role based on email - only sameervaidhraj@gmail.com is super_admin
        let role = 'admin'; // Default role for users created in Supabase
        if (user.email === 'sameervaidhraj@gmail.com') {
          role = 'super_admin';
        }
        
        const { data: newAppUser, error: insertError } = await supabase
          .from('app_users')
          .insert({
            auth_user_id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            email: user.email,
            role: role,
            status: 'active'
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating app_users record:', insertError);
          toast({
            title: "Setup Error",
            description: "Failed to set up user profile. Please contact support.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }

        appUser = newAppUser;
        console.log('Created new user:', appUser);
      }

      if (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Access Error",
          description: "There was an error accessing your account. Please try again.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      if (!appUser) {
        console.log('No app user found');
        toast({
          title: "Account Setup Required",
          description: "Your account needs to be set up. Please contact an administrator.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      // Update auth_user_id if missing
      if (!appUser.auth_user_id) {
        console.log('Updating auth_user_id for existing user...');
        const { error: updateError } = await supabase
          .from('app_users')
          .update({ auth_user_id: user.id })
          .eq('id', appUser.id);
        
        if (updateError) {
          console.error('Error updating auth_user_id:', updateError);
        } else {
          appUser.auth_user_id = user.id;
        }
      }

      if (appUser.status !== 'active') {
        console.log('User status is not active:', appUser.status);
        toast({
          title: "Account Pending",
          description: "Your account is pending approval from an administrator.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      console.log('Setting authenticated user:', appUser);
      setAdminUser({
        id: appUser.id,
        name: appUser.name,
        email: appUser.email,
        role: appUser.role as 'super_admin' | 'admin' | 'viewer',
        status: appUser.status as 'active' | 'pending' | 'suspended',
      });
      setIsAuthenticated(true);
      
      console.log('User authenticated successfully:', {
        role: appUser.role,
        status: appUser.status,
        email: appUser.email
      });
      
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to authenticate. Please try logging in again.",
        variant: "destructive",
      });
      setAdminUser(null);
      setIsAuthenticated(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and click the verification link before logging in.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid Credentials",
            description: "Please check your email and password and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return false;
      }

      console.log('Login successful:', data);
      // The auth state change listener will handle setting the user profile
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setAdminUser(null);
      setIsAuthenticated(false);
      setSession(null);
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ 
      isAuthenticated, 
      adminUser, 
      session,
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
