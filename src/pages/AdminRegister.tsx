
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Strong, secure admin registration code
  const ADMIN_REGISTRATION_CODE = "ASB_SECURE_2024_ADMIN_CODE_9X7P";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name || !email || !phone || !password || !confirmPassword || !adminCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    // Check admin registration code
    if (adminCode !== ADMIN_REGISTRATION_CODE) {
      toast({
        title: "Error",
        description: "Invalid admin registration code. Please contact the system administrator.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Creating admin account:', email);
      
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email.trim().toLowerCase(),
        password: password,
        email_confirm: true,
        user_metadata: {
          name: name.trim(),
          phone: phone
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      console.log('Auth user created:', authData);

      // Create app_users record with admin role
      const { error: insertError } = await supabase
        .from('app_users')
        .insert({
          auth_user_id: authData.user.id,
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: 'admin',
          status: 'active'
        });

      if (insertError) {
        console.error('Error creating app_users record:', insertError);
        throw insertError;
      }

      toast({
        title: "Success",
        description: "Admin account created successfully! You can now sign in.",
      });

      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setAdminCode('');

      // Redirect to admin login after successful registration
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);

    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create admin account",
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
        <div className="w-full max-w-lg px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create Admin Account</CardTitle>
              <CardDescription className="text-center">
                Enter your details to create a new admin account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="Admin Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <Label htmlFor="password">Password *</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminCode">Admin Registration Code *</Label>
                  <Input 
                    id="adminCode" 
                    type="password"
                    placeholder="Enter secure admin registration code" 
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Contact the system administrator for the registration code
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="h-4 w-4 border-gray-300 rounded text-travel-orange focus:ring-travel-orange"
                    required
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="/terms" className="text-travel-orange hover:underline">Terms of Service</a> and <a href="/privacy" className="text-travel-orange hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-travel-orange hover:bg-travel-orange/90"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Account...
                    </div>
                  ) : 'Create Admin Account'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Already have an admin account?{" "}
                <a href="/admin/login" className="text-travel-orange hover:underline">
                  Sign in
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminRegister;
