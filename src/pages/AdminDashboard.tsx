
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Plane, Building2, Package, Tag, LogOut, Bell, User, Calendar, CreditCard } from 'lucide-react';
import AdminPackages from './AdminPackages';
import AdminHotels from './AdminHotels';
import AdminFlights from './AdminFlights';
import AdminOffers from './AdminOffers';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  // Sample data for the admin dashboard
  const dashboardData = {
    totalBookings: 157,
    totalRevenue: "₹12,45,890",
    pendingBookings: 12,
    newUsers: 34,
    recentBookings: [
      { id: "BK-2023-001", customer: "Raj Sharma", package: "Kerala Backwaters", date: "25 Apr 2025", amount: "₹24,999" },
      { id: "BK-2023-002", customer: "Priya Patel", package: "Goa Beach Vacation", date: "24 Apr 2025", amount: "₹18,500" },
      { id: "BK-2023-003", customer: "Amit Singh", package: "Flight: Delhi-Mumbai", date: "24 Apr 2025", amount: "₹5,499" },
      { id: "BK-2023-004", customer: "Deepa Gupta", package: "Hotel: The Oberoi", date: "23 Apr 2025", amount: "₹15,999" },
      { id: "BK-2023-005", customer: "Kiran Reddy", package: "Rajasthan Heritage Tour", date: "22 Apr 2025", amount: "₹32,999" },
    ]
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "packages":
        return <AdminPackages />;
      case "hotels":
        return <AdminHotels />;
      case "flights":
        return <AdminFlights />;
      case "offers":
        return <AdminOffers />;
      default:
        // Dashboard tab content
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Total Bookings</CardTitle>
                  <Package className="h-5 w-5 text-travel-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.totalBookings}</div>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Revenue</CardTitle>
                  <CreditCard className="h-5 w-5 text-travel-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.totalRevenue}</div>
                  <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Pending Bookings</CardTitle>
                  <Calendar className="h-5 w-5 text-travel-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.pendingBookings}</div>
                  <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">New Users</CardTitle>
                  <User className="h-5 w-5 text-travel-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardData.newUsers}</div>
                  <p className="text-xs text-green-600 mt-1">+23% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Bookings */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Booking ID</th>
                      <th className="px-4 py-3 font-semibold">Customer</th>
                      <th className="px-4 py-3 font-semibold">Package/Service</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentBookings.map((booking, index) => (
                      <tr key={booking.id} className="border-b">
                        <td className="px-4 py-3 font-medium">{booking.id}</td>
                        <td className="px-4 py-3">{booking.customer}</td>
                        <td className="px-4 py-3">{booking.package}</td>
                        <td className="px-4 py-3">{booking.date}</td>
                        <td className="px-4 py-3">{booking.amount}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="px-6 py-5 border-b">
          <h1 className="text-xl font-bold text-travel-blue">ASB Travels <span className="text-travel-orange">Admin</span></h1>
        </div>
        <div className="flex-1 py-6 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm ${activeTab === "dashboard" ? "bg-travel-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <span className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("packages")}
            className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm ${activeTab === "packages" ? "bg-travel-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <Package size={16} className="mr-3" />
            Holiday Packages
          </button>
          <button 
            onClick={() => setActiveTab("hotels")}
            className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm ${activeTab === "hotels" ? "bg-travel-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <Building2 size={16} className="mr-3" />
            Hotels
          </button>
          <button 
            onClick={() => setActiveTab("flights")}
            className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm ${activeTab === "flights" ? "bg-travel-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <Plane size={16} className="mr-3" />
            Flights
          </button>
          <button 
            onClick={() => setActiveTab("offers")}
            className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm ${activeTab === "offers" ? "bg-travel-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <Tag size={16} className="mr-3" />
            Special Offers
          </button>
          <hr className="my-4" />
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-md text-left text-sm text-red-500 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="md:hidden text-xl font-bold text-travel-blue">
              ASB Travels <span className="text-travel-orange">Admin</span>
            </div>
            {/* Mobile Nav Toggle */}
            <button className="block md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center">
              {/* Notification */}
              <button className="p-2 relative mr-4 text-gray-600 hover:text-travel-blue">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {/* Admin Avatar */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-2 text-sm">
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-gray-500">admin@asbtravels.com</div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex overflow-x-auto py-3 px-3 border-t">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-md mr-2 ${activeTab === "dashboard" ? "bg-travel-blue text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("packages")}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-md mr-2 ${activeTab === "packages" ? "bg-travel-blue text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Packages
            </button>
            <button 
              onClick={() => setActiveTab("hotels")}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-md mr-2 ${activeTab === "hotels" ? "bg-travel-blue text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Hotels
            </button>
            <button 
              onClick={() => setActiveTab("flights")}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-md mr-2 ${activeTab === "flights" ? "bg-travel-blue text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Flights
            </button>
            <button 
              onClick={() => setActiveTab("offers")}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-md ${activeTab === "offers" ? "bg-travel-blue text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Offers
            </button>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
