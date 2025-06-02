
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
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
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
      
      // Try to get the user by auth_user_id first
      let { data: appUser, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('auth_user_id', user.id)
        .maybeSingle();

      console.log('Found user by auth_user_id:', appUser);

      // If not found by auth_user_id, try by email
      if (!appUser && !error) {
        console.log('User not found by auth_user_id, trying by email...');
        const { data: userByEmail, error: emailError } = await supabase
          .from('app_users')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();
        
        appUser = userByEmail;
        error = emailError;
        console.log('Found user by email:', appUser);

        // If found by email but missing auth_user_id, update it
        if (appUser && !appUser.auth_user_id) {
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
      }

      // If no app_users record exists, create one
      if (!appUser && !error) {
        console.log('Creating new app_users record...');
        
        // Check if this is the super admin email
        const isSuperAdmin = user.email === 'sameervaidhraj@gmail.com';
        
        const { data: newAppUser, error: insertError } = await supabase
          .from('app_users')
          .insert({
            auth_user_id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            email: user.email,
            role: isSuperAdmin ? 'super_admin' : 'viewer',
            status: 'active'
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating app_users record:', insertError);
          
          // If it's a unique constraint error, try to fetch the existing record
          if (insertError.code === '23505') {
            const { data: existingUser } = await supabase
              .from('app_users')
              .select('*')
              .eq('email', user.email)
              .single();
            
            if (existingUser) {
              appUser = existingUser;
            } else {
              toast({
                title: "Setup Error",
                description: "Failed to set up user profile. Please contact support.",
                variant: "destructive",
              });
              await supabase.auth.signOut();
              return;
            }
          } else {
            toast({
              title: "Setup Error",
              description: "Failed to set up user profile. Please contact support.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
            return;
          }
        } else {
          appUser = newAppUser;
          console.log('Created new user:', appUser);
          
          if (isSuperAdmin) {
            toast({
              title: "Welcome Super Admin",
              description: "Your super admin account has been set up successfully!",
            });
          }
        }
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
        role: appUser.role,
        status: appUser.status,
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
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
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
