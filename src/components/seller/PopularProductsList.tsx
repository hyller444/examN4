
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const PopularProductsList: React.FC = () => {
  const { user } = useAuth();
  
  // Données des produits populaires améliorées
  const popularProducts = [
    { 
      id: 1, 
      name: "Smartphone XYZ", 
      sales: 42, 
      price: 329.99,
      trend: "up",
      percentChange: 15,
      image: "/placeholder.svg",
      sellerId: 2 // ID du vendeur Jane Seller
    },
    { 
      id: 2, 
      name: "Écouteurs sans fil", 
      sales: 38, 
      price: 89.99,
      trend: "up",
      percentChange: 8,
      image: "/placeholder.svg",
      sellerId: 2
    },
    { 
      id: 3, 
      name: "Montre connectée", 
      sales: 27, 
      price: 149.99,
      trend: "down",
      percentChange: 3,
      image: "/placeholder.svg",
      sellerId: 2
    },
    { 
      id: 4, 
      name: "Enceinte bluetooth", 
      sales: 19, 
      price: 59.99,
      trend: "up",
      percentChange: 12,
      image: "/placeholder.svg",
      sellerId: 2
    },
  ];

  // Filtrer les produits par vendeur si nécessaire
  const filteredProducts = user?.role === 'seller' 
    ? popularProducts.filter(product => product.sellerId === user.id)
    : popularProducts;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Produits populaires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded bg-gray-100 mr-3 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <Package className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500">{product.sales} ventes ce mois</span>
                      <span className={`ml-2 flex items-center text-xs ${product.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {product.trend === 'up' ? '↑' : '↓'} {product.percentChange}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-medium">{product.price.toFixed(2)}€</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Aucun produit populaire à afficher pour le moment
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/seller/products">Gérer les produits</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PopularProductsList;
