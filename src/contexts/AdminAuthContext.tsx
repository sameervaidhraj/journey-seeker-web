
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Define the context type
type AdminAuthContextType = {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Admin user type
export type AdminUser = {
  id: string;
  name: string;
  email: string;
};

// Create the context with default values
const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  adminUser: null,
  login: async () => false,
  logout: () => {},
});

// Custom hook to use the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Sample admin users (in a real app, this would be stored securely on a backend)
const ADMIN_USERS = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@asbtravels.com',
    password: 'admin123', // In a real app, passwords would be hashed
  },
];

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing admin session on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setAdminUser(parsedAdmin);
        setIsAuthenticated(true);
      } catch (e) {
        // Handle invalid stored data
        localStorage.removeItem('adminUser');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Find admin with matching credentials (in a real app, this would be an API call)
    const admin = ADMIN_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (admin) {
      const { password, ...adminWithoutPassword } = admin;
      setAdminUser(adminWithoutPassword);
      setIsAuthenticated(true);
      
      // Store admin session
      localStorage.setItem('adminUser', JSON.stringify(adminWithoutPassword));
      
      toast({
        title: "Admin Login Successful",
        description: `Welcome back, ${admin.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
