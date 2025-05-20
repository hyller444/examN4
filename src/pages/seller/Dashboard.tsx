
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, TrendingUp, Plus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import DashboardCard from '@/components/seller/DashboardCard';
import RecentOrdersList from '@/components/seller/RecentOrdersList';
import PopularProductsList from '@/components/seller/PopularProductsList';

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Données de démonstration
  const dashboardStats = {
    totalProducts: 24,
    activeProducts: 18,
    totalOrders: 156,
    pendingOrders: 7,
    totalRevenue: '8,450 €',
    monthlyRevenue: '1,240 €'
  };
  
  const handleAddProduct = () => {
    navigate('/seller/products/new');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord vendeur</h1>
              <p className="text-gray-600">Bienvenue, {user?.name || 'Vendeur'}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button 
                className="bg-brand hover:bg-brand/90"
                onClick={handleAddProduct}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard 
              title="Produits"
              description="Gestion de votre catalogue"
              icon={Package}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              primaryStat={dashboardStats.totalProducts}
              primaryLabel="Produits au total"
              secondaryStat={dashboardStats.activeProducts}
              secondaryLabel="Actifs"
              link="/seller/products"
              linkText="Gérer les produits"
            />
            
            <DashboardCard 
              title="Commandes"
              description="Suivi de vos ventes"
              icon={ShoppingBag}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              primaryStat={dashboardStats.totalOrders}
              primaryLabel="Commandes au total"
              secondaryStat={dashboardStats.pendingOrders}
              secondaryLabel="En attente"
              link="/seller/orders"
              linkText="Voir les commandes"
            />
            
            <DashboardCard 
              title="Revenus"
              description="Performance financière"
              icon={TrendingUp}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
              primaryStat={dashboardStats.totalRevenue}
              primaryLabel="Revenu total"
              secondaryStat={dashboardStats.monthlyRevenue}
              secondaryLabel="Ce mois-ci"
              link="/seller/analytics"
              linkText="Voir les analyses"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentOrdersList />
            <PopularProductsList />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
