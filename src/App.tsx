
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { createContext, useState } from 'react';

// User Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPackages from "./pages/AdminPackages";
import AdminHotels from "./pages/AdminHotels";
import AdminFlights from "./pages/AdminFlights";
import AdminOffers from "./pages/AdminOffers";
import AdminSecretLogin from "./pages/AdminSecretLogin";

// Shared Pages
import NotFound from "./pages/NotFound";

// Admin Auth Provider
import AdminAuthProvider from "./contexts/AdminAuthContext";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

// Create context for sharing data between admin and user sides
export interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  imageUrl: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  imageUrl: string;
}

export interface Flight {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  airline: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  imageUrl: string;
}

interface TravelDataContextType {
  packages: Package[];
  hotels: Hotel[];
  flights: Flight[];
  offers: Offer[];
  updatePackages: (packages: Package[]) => void;
  updateHotels: (hotels: Hotel[]) => void;
  updateFlights: (flights: Flight[]) => void;
  updateOffers: (offers: Offer[]) => void;
}

export const TravelDataContext = createContext<TravelDataContextType>({
  packages: [],
  hotels: [],
  flights: [],
  offers: [],
  updatePackages: () => {},
  updateHotels: () => {},
  updateFlights: () => {},
  updateOffers: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  // Initial sample data
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "pkg-001",
      title: "Kerala Backwaters",
      description: "Experience the serene backwaters of Kerala with this 5-day tour package.",
      price: "₹24,999",
      duration: "5 days, 4 nights",
      imageUrl: "https://images.unsplash.com/photo-1602215399818-8747805976a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
    },
    {
      id: "pkg-002",
      title: "Goa Beach Vacation",
      description: "Relax on the beautiful beaches of Goa with this all-inclusive package.",
      price: "₹18,500",
      duration: "4 days, 3 nights",
      imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
    },
    {
      id: "pkg-003",
      title: "Rajasthan Heritage Tour",
      description: "Explore the rich cultural heritage and royal palaces of Rajasthan.",
      price: "₹32,999",
      duration: "7 days, 6 nights",
      imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
    }
  ]);
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  
  // Context value
  const travelDataContextValue: TravelDataContextType = {
    packages,
    hotels,
    flights,
    offers,
    updatePackages: (newPackages) => setPackages(newPackages),
    updateHotels: (newHotels) => setHotels(newHotels),
    updateFlights: (newFlights) => setFlights(newFlights),
    updateOffers: (newOffers) => setOffers(newOffers),
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TravelDataContext.Provider value={travelDataContextValue}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AdminAuthProvider>
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
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Public Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin-secret-entrance" element={<AdminSecretLogin />} />
                
                {/* Protected Admin Routes */}
                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/packages" element={<AdminPackages />} />
                  <Route path="/admin/hotels" element={<AdminHotels />} />
                  <Route path="/admin/flights" element={<AdminFlights />} />
                  <Route path="/admin/offers" element={<AdminOffers />} />
                </Route>
                
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
            </AdminAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </TravelDataContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
