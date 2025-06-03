
import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in email and password",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && (!name || !phone || !city)) {
      toast({
        title: "Error",
        description: "Please fill in all fields for registration",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log('Attempting login for:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          console.error('Login error:', error);
          
          // Handle specific error cases
          if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Email Not Confirmed",
              description: "Please check your email and click the confirmation link, or contact support if you need help.",
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
              description: error.message || "An error occurred during login",
              variant: "destructive",
            });
          }
          return;
        }

        console.log('Login successful:', data);
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate('/user-dashboard');
      } else {
        // Register new user as viewer
        console.log('Attempting registration for:', email);
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              name: name.trim(),
              phone: phone.trim(),
              city,
            },
            emailRedirectTo: `${window.location.origin}/user-dashboard`
          }
        });

        if (error) {
          console.error('Registration error:', error);
          
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account Exists",
              description: "An account with this email already exists. Please try logging in instead.",
              variant: "destructive",
            });
            setIsLogin(true);
          } else {
            toast({
              title: "Registration Failed",
              description: error.message || "An error occurred during registration",
              variant: "destructive",
            });
          }
          return;
        }

        // Create user profile in app_users as viewer
        if (data.user) {
          console.log('Creating user profile for:', data.user.email);
          const { error: profileError } = await supabase
            .from('app_users')
            .insert({
              auth_user_id: data.user.id,
              email: email.trim().toLowerCase(),
              name: name.trim(),
              role: 'viewer',
              status: 'active'
            });

          if (profileError) {
            console.error('Error creating user profile:', profileError);
            toast({
              title: "Profile Creation Error",
              description: "Account created but profile setup failed. Please contact support.",
              variant: "destructive",
            });
          }
        }

        toast({
          title: "Success",
          description: "Account created successfully! Please check your email for confirmation, then you can sign in.",
        });
        
        setIsLogin(true);
        // Clear form
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setCity('');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-travel-gray-light py-12">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {isLogin ? 'User Login' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? 'Enter your email and password to access your account'
                  : 'Fill in your details to create a new account'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        placeholder="10-digit mobile number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select onValueChange={setCity} required disabled={loading}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="kolkata">Kolkata</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password *</Label>
                    {isLogin && (
                      <a href="/forgot-password" className="text-sm text-travel-blue hover:underline">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder={isLogin ? "Enter your password" : "Choose a password (min 6 chars)"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-travel-blue hover:bg-travel-blue-dark"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm text-gray-600 mt-2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setEmail('');
                    setPassword('');
                    setName('');
                    setPhone('');
                    setCity('');
                  }}
                  className="text-travel-blue hover:underline"
                  disabled={loading}
                >
                  {isLogin ? 'Create an account' : 'Sign in'}
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
