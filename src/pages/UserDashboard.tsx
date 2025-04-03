
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-travel-blue">My Account</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-center py-8">
                  <p className="text-gray-500">You don't have any bookings yet.</p>
                  <Button 
                    className="mt-4 bg-travel-blue hover:bg-travel-blue-dark"
                    onClick={() => navigate('/')}
                  >
                    Browse Holiday Packages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
                      <p>Demo User</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                      <p>user@example.com</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                      <p>+91 9876543210</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                      <p>New Delhi, India</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline"
                      className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-center py-8">
                  <p className="text-gray-500">Your wishlist is empty.</p>
                  <Button 
                    className="mt-4 bg-travel-blue hover:bg-travel-blue-dark"
                    onClick={() => navigate('/')}
                  >
                    Browse Packages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
