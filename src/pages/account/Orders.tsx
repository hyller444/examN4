
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, ChevronRight, Package } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import localOrderService from '@/services/localOrderService';
import type { Order } from '@/services/localOrderService';

const getStatusLabel = (status: string) => {
  switch(status) {
    case 'delivered':
      return { text: 'Livré', color: 'bg-green-100 text-green-800' };
    case 'shipped':
      return { text: 'Expédié', color: 'bg-blue-100 text-blue-800' };
    case 'processing':
      return { text: 'En traitement', color: 'bg-yellow-100 text-yellow-800' };
    case 'pending':
      return { text: 'En attente', color: 'bg-yellow-100 text-yellow-800' };
    case 'cancelled':
      return { text: 'Annulé', color: 'bg-red-100 text-red-800' };
    default:
      return { text: status, color: 'bg-gray-100 text-gray-800' };
  }
};

const Orders = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      toast({
        variant: 'destructive',
        title: 'Accès refusé',
        description: 'Vous devez être connecté pour accéder à cette page',
      });
      navigate('/login');
    }
  }, [user, loading, navigate, toast]);
  
  // Charger les commandes
  useEffect(() => {
    if (user) {
      // Simuler un délai de chargement
      setTimeout(() => {
        const userOrders = localOrderService.getOrders();
        setOrders(userOrders);
        setIsLoading(false);
      }, 500);
    }
  }, [user]);
  
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-brand">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
          
          <h1 className="text-2xl font-bold mb-8">Mes commandes</h1>
          
          {orders.length > 0 ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {orders.map((order) => {
                const status = getStatusLabel(order.status);
                
                return (
                  <div key={order.id} className="border-b last:border-b-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium">
                            Commande #{order.id}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Passée le {new Date(order.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-center">
                          <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {order.items.length} {order.items.length > 1 ? 'articles' : 'article'}
                          </span>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center justify-between w-full sm:w-auto">
                          <div className="sm:mr-8">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-medium">{order.totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                          </div>
                          <Button variant="outline" asChild className="inline-flex items-center">
                            <Link to={`/account/orders/${order.id}`}>
                              Détails
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune commande</h3>
              <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
              <Button className="bg-brand hover:bg-brand/90" asChild>
                <Link to="/products">Commencer vos achats</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
