
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

// Admin user type - updated to support multiple admin roles
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  status: 'active';
};

// Fixed admin emails
const ADMIN_EMAILS = [
  'sameervaidhraj@gmail.com',
  'asbtravelssjp@gmail.com'
];

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
        console.log('Admin auth state changed:', event, session?.user?.email);
        setSession(session);
        
        if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
          await fetchAdminProfile(session.user);
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
      if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
        fetchAdminProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminProfile = async (user: User) => {
    try {
      if (!ADMIN_EMAILS.includes(user.email || '')) {
        console.log('User is not an admin:', user.email);
        setAdminUser(null);
        setIsAuthenticated(false);
        return;
      }

      console.log('Fetching admin profile for:', user.email);
      
      // Check if user exists in app_users
      let { data: appUser, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      console.log('Found admin user:', appUser, 'Error:', error);

      // If user doesn't exist in app_users, create them as admin
      if (!appUser && !error) {
        console.log('Creating admin user in database...');
        
        // Set role based on email - sameervaidhraj@gmail.com is super_admin
        const role = user.email === 'sameervaidhraj@gmail.com' ? 'super_admin' : 'admin';
        
        const { data: newAppUser, error: insertError } = await supabase
          .from('app_users')
          .insert({
            auth_user_id: user.id,
            name: user.email === 'sameervaidhraj@gmail.com' ? 'Sameer Vaidhraj' : 'ASB Travels Admin',
            email: user.email,
            role: role,
            status: 'active'
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating admin user:', insertError);
          toast({
            title: "Setup Error",
            description: "Failed to set up admin profile. Please contact support.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }

        appUser = newAppUser;
        console.log('Created new admin user:', appUser);
      }

      if (error) {
        console.error('Error fetching admin profile:', error);
        toast({
          title: "Access Error",
          description: "There was an error accessing your account. Please try again.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      if (!appUser) {
        console.log('No admin user found');
        toast({
          title: "Access Denied",
          description: "You don't have admin access to this system.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      // Update auth_user_id if missing
      if (!appUser.auth_user_id) {
        console.log('Updating auth_user_id for existing admin...');
        const { error: updateError } = await supabase
          .from('app_users')
          .update({ auth_user_id: user.id })
          .eq('id', appUser.id);
        
        if (!updateError) {
          appUser.auth_user_id = user.id;
        }
      }

      console.log('Setting authenticated admin user:', appUser);
      setAdminUser({
        id: appUser.id,
        name: appUser.name,
        email: appUser.email,
        role: appUser.role as 'admin' | 'super_admin',
        status: 'active',
      });
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Error in fetchAdminProfile:', error);
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
      console.log('Attempting admin login for:', email);

      // Check if email is an admin email
      if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
        toast({
          title: "Access Denied",
          description: "You don't have admin access to this system.",
          variant: "destructive",
        });
        return false;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        console.error('Admin login error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
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

      console.log('Admin login successful:', data);
      return true;
    } catch (error) {
      console.error('Admin login error:', error);
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
