
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();

  // Check if form is complete
  useEffect(() => {
    setIsFormComplete(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormComplete) {
      toast({
        title: "Error",
        description: "Please fill in all fields before attempting to login",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-travel-gray-light py-12">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Admin Portal Login</CardTitle>
              <CardDescription className="text-center">
                Please enter your admin credentials below to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@asbtravels.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password *</Label>
                    <a href="/admin/forgot-password" className="text-sm text-travel-orange hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className={`w-full ${isFormComplete 
                    ? 'bg-travel-orange hover:bg-travel-orange/90' 
                    : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isFormComplete}
                >
                  {isFormComplete ? 'Admin Sign In' : 'Please Fill All Fields'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm text-gray-600">
                Need an admin account?{" "}
                <a href="/admin/register" className="text-travel-orange hover:underline">
                  Register as Admin
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
