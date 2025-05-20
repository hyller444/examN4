
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, AlertCircle, Clock, CheckCircle, Package, Truck } from 'lucide-react';

const RecentOrdersList: React.FC = () => {
  // Données d'exemple améliorées
  const recentOrders = [
    { 
      id: "ORD-2305", 
      customer: "Pierre Martin", 
      date: "2025-05-18", 
      total: 87.50, 
      status: "pending",
      items: [
        { name: "Produit exemple 1", quantity: 1 },
        { name: "Produit exemple 3", quantity: 2 }
      ]
    },
    { 
      id: "ORD-2304", 
      customer: "Marie Dupont", 
      date: "2025-05-17", 
      total: 156.00,
      status: "processing",
      items: [
        { name: "Produit exemple 2", quantity: 3 }
      ]
    },
    { 
      id: "ORD-2303", 
      customer: "Jean Durand", 
      date: "2025-05-16", 
      total: 42.95,
      status: "shipped",
      items: [
        { name: "Produit exemple 1", quantity: 1 }
      ]
    },
    { 
      id: "ORD-2302", 
      customer: "Sophie Lefort", 
      date: "2025-05-15", 
      total: 129.90,
      status: "delivered",
      items: [
        { name: "Produit exemple 2", quantity: 2 },
        { name: "Produit exemple 3", quantity: 1 }
      ]
    }
  ];

  // Fonction pour obtenir l'icône et la couleur du statut
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          icon: <Clock className="h-5 w-5 text-yellow-500" />, 
          text: 'En attente',
          color: 'text-yellow-500 bg-yellow-50 border-yellow-200'
        };
      case 'processing':
        return { 
          icon: <Package className="h-5 w-5 text-blue-500" />, 
          text: 'En préparation',
          color: 'text-blue-500 bg-blue-50 border-blue-200'
        };
      case 'shipped':
        return { 
          icon: <Truck className="h-5 w-5 text-indigo-500" />, 
          text: 'Expédiée',
          color: 'text-indigo-500 bg-indigo-50 border-indigo-200'
        };
      case 'delivered':
        return { 
          icon: <CheckCircle className="h-5 w-5 text-green-500" />, 
          text: 'Livrée',
          color: 'text-green-500 bg-green-50 border-green-200'
        };
      case 'cancelled':
        return { 
          icon: <AlertCircle className="h-5 w-5 text-red-500" />, 
          text: 'Annulée',
          color: 'text-red-500 bg-red-50 border-red-200'
        };
      default:
        return { 
          icon: <Clock className="h-5 w-5 text-gray-500" />, 
          text: 'Inconnue',
          color: 'text-gray-500 bg-gray-50 border-gray-200'
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2" />
          Commandes récentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {recentOrders.map((order) => {
            const statusDetails = getStatusDetails(order.status);
            
            return (
              <div key={order.id} className="flex justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center">
                    <div className="mr-3">{statusDetails.icon}</div>
                    <div>
                      <div className="text-sm font-medium flex items-center">
                        {order.id} 
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${statusDetails.color}`}>
                          {statusDetails.text}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {order.customer} • {order.date}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.quantity}x {item.name}
                            {idx < order.items.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">{order.total.toFixed(2)} €</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/seller/orders">Voir toutes les commandes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentOrdersList;
