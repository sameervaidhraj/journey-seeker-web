
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// User Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPackages from "./pages/AdminPackages";
import AdminHotels from "./pages/AdminHotels";
import AdminFlights from "./pages/AdminFlights";
import AdminOffers from "./pages/AdminOffers";

// Shared Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          <Route path="/admin/flights" element={<AdminFlights />} />
          <Route path="/admin/offers" element={<AdminOffers />} />
          
          {/* Redirect old admin routes to new ones */}
          <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin-register" element={<Navigate to="/admin/register" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin-packages" element={<Navigate to="/admin/packages" replace />} />
          <Route path="/admin-hotels" element={<Navigate to="/admin/hotels" replace />} />
          <Route path="/admin-flights" element={<Navigate to="/admin/flights" replace />} />
          <Route path="/admin-offers" element={<Navigate to="/admin/offers" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
