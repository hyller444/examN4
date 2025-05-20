
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";

import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

// Importing all the pages we need
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/account/Profile";
import Orders from "./pages/account/Orders";
import OrderDetail from "./pages/account/OrderDetail";
import SellerDashboard from "./pages/seller/Dashboard";
import ProductManagement from "./pages/seller/ProductManagement";
import SellerOrders from "./pages/seller/Orders";
import OrderDetails from "./pages/seller/OrderDetails";
import NewProduct from "./pages/seller/NewProduct";  
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Product Routes (Accessibles à tous) */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              
              {/* Customer Routes (Nécessite rôle client) */}
              <Route path="/cart" element={
                <RoleBasedRoute allowedRoles={['customer']} redirectPath="/seller/dashboard">
                  <Cart />
                </RoleBasedRoute>
              } />
              <Route path="/checkout" element={
                <RoleBasedRoute allowedRoles={['customer']} redirectPath="/seller/dashboard">
                  <Checkout />
                </RoleBasedRoute>
              } />
              <Route path="/account/profile" element={
                <RoleBasedRoute allowedRoles={['customer', 'seller', 'admin']} redirectPath="/login">
                  <Profile />
                </RoleBasedRoute>
              } />
              <Route path="/account/orders" element={
                <RoleBasedRoute allowedRoles={['customer']} redirectPath="/seller/orders">
                  <Orders />
                </RoleBasedRoute>
              } />
              <Route path="/account/orders/:id" element={
                <RoleBasedRoute allowedRoles={['customer']} redirectPath="/seller/orders">
                  <OrderDetail />
                </RoleBasedRoute>
              } />
              
              {/* Seller Routes (Nécessite rôle vendeur) */}
              <Route path="/seller/dashboard" element={
                <RoleBasedRoute allowedRoles={['seller', 'admin']} redirectPath="/">
                  <SellerDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/seller/products" element={
                <RoleBasedRoute allowedRoles={['seller', 'admin']} redirectPath="/">
                  <ProductManagement />
                </RoleBasedRoute>
              } />
              <Route path="/seller/products/new" element={
                <RoleBasedRoute allowedRoles={['seller', 'admin']} redirectPath="/">
                  <NewProduct />
                </RoleBasedRoute>
              } />
              <Route path="/seller/orders" element={
                <RoleBasedRoute allowedRoles={['seller', 'admin']} redirectPath="/">
                  <SellerOrders />
                </RoleBasedRoute>
              } />
              <Route path="/seller/orders/:id" element={
                <RoleBasedRoute allowedRoles={['seller', 'admin']} redirectPath="/">
                  <OrderDetails />
                </RoleBasedRoute>
              } />
              
              {/* Admin Routes (Nécessite rôle admin) */}
              <Route path="/admin/dashboard" element={
                <RoleBasedRoute allowedRoles={['admin']} redirectPath="/">
                  <AdminDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/admin/users" element={
                <RoleBasedRoute allowedRoles={['admin']} redirectPath="/">
                  <AdminUsers />
                </RoleBasedRoute>
              } />
              <Route path="/admin/products" element={
                <RoleBasedRoute allowedRoles={['admin']} redirectPath="/">
                  <AdminProducts />
                </RoleBasedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
