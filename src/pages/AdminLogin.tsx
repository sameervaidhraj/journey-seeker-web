
import React, { useState, useEffect, useCallback } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ForgotPassword from '@/components/auth/ForgotPassword';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAdminAuth();

  // Check if form is complete - optimized with useCallback
  const checkFormComplete = useCallback(() => {
    setIsFormComplete(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  useEffect(() => {
    checkFormComplete();
  }, [checkFormComplete]);

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormComplete) {
      toast({
        title: "Error",
        description: "Please fill in all fields before attempting to login",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email.trim(), password);
      
      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isFormComplete, login, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-travel-gray-light py-12">
          <div className="text-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-travel-orange"></div>
            Loading...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-travel-gray-light py-12">
        <div className="w-full max-w-md px-4">
          {showForgotPassword ? (
            <ForgotPassword onBack={() => setShowForgotPassword(false)} />
          ) : (
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
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full ${isFormComplete 
                      ? 'bg-travel-orange hover:bg-travel-orange/90' 
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isFormComplete || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Signing In...
                      </div>
                    ) : isFormComplete ? 'Admin Sign In' : 'Please Fill All Fields'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-travel-orange hover:underline"
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
                <div className="text-center text-sm text-gray-600">
                  Need help accessing your account?{" "}
                  <a href="/contact" className="text-travel-orange hover:underline">
                    Contact Support
                  </a>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
