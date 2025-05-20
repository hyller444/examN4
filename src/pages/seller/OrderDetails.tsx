
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, TruckIcon, Box, User, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import localOrderService from '@/services/localOrderService';
import type { Order } from '@/services/localOrderService';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    const loadedOrder = localOrderService.getOrder(id);
    
    if (loadedOrder) {
      setOrder(loadedOrder);
    } else {
      toast({
        title: "Commande introuvable",
        description: `La commande avec l'ID ${id} n'existe pas.`,
        variant: "destructive"
      });
      navigate('/seller/orders');
    }
    
    setIsLoading(false);
  }, [id, navigate, toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: "En attente", 
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          color: "bg-yellow-100 text-yellow-800 border-yellow-300" 
        };
      case 'processing':
        return { 
          label: "En préparation", 
          icon: <Box className="w-5 h-5 text-blue-500" />,
          color: "bg-blue-100 text-blue-800 border-blue-300" 
        };
      case 'shipped':
        return { 
          label: "Expédié", 
          icon: <TruckIcon className="w-5 h-5 text-indigo-500" />,
          color: "bg-indigo-100 text-indigo-800 border-indigo-300" 
        };
      case 'delivered':
        return { 
          label: "Livré", 
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          color: "bg-green-100 text-green-800 border-green-300" 
        };
      case 'cancelled':
        return { 
          label: "Annulé", 
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          color: "bg-red-100 text-red-800 border-red-300" 
        };
      default:
        return { 
          label: status, 
          icon: <Clock className="w-5 h-5 text-gray-500" />,
          color: "bg-gray-100 text-gray-800 border-gray-300" 
        };
    }
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    if (!order || !id) return;
    
    try {
      const updatedOrder = localOrderService.updateOrderStatus(id, newStatus);
      
      if (updatedOrder) {
        setOrder(updatedOrder);
        
        const statusInfo = getStatusBadge(newStatus);
        toast({
          title: "Statut mis à jour",
          description: `La commande est maintenant "${statusInfo.label}"`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la commande.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 py-8 flex flex-col items-center justify-center">
          <Package className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold">Commande introuvable</h2>
          <p className="text-gray-600 mt-2 mb-6">La commande avec l'ID {id} n'existe pas.</p>
          <Button asChild>
            <Link to="/seller/orders">Retour aux commandes</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const statusInfo = getStatusBadge(order.status);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/seller/orders" className="inline-flex items-center text-gray-600 hover:text-brand">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux commandes
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Commande #{order.id}</h1>
              <p className="text-gray-600">
                Passée le {new Date(order.date).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full border ${statusInfo.color}`}>
                {statusInfo.icon}
                <span className="ml-2">{statusInfo.label}</span>
              </div>
              
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <Select 
                  value={order.status} 
                  onValueChange={(value) => handleStatusChange(value as Order['status'])}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Changer le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="processing">En préparation</SelectItem>
                    <SelectItem value="shipped">Expédié</SelectItem>
                    <SelectItem value="delivered">Livré</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Information Client */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="h-5 w-5 mr-2" />
                  Information Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">client@example.com</p>
                  <p className="text-sm text-gray-500">+33 6 12 34 56 78</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Détails de la commande */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Détails de la commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span>{new Date(order.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Statut</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nombre d'articles</span>
                    <span>{order.items.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Paiement */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Méthode</span>
                    <span>Carte bancaire</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Carte</span>
                    <span>•••• •••• •••• 4242</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{order.totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Liste des articles */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Articles commandés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Produit</th>
                      <th className="text-center py-3 px-4">Quantité</th>
                      <th className="text-center py-3 px-4">Prix unitaire</th>
                      <th className="text-right py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                  <Package className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">ID: {item.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">{item.quantity}</td>
                        <td className="text-center py-3 px-4">
                          {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </td>
                        <td className="text-right py-3 px-4 font-medium">
                          {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="text-right py-3 px-4 font-medium">Total</td>
                      <td className="text-right py-3 px-4 font-bold">
                        {order.totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetails;
