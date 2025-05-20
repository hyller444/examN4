
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <div className="card-hover bg-white rounded-lg overflow-hidden border border-gray-200">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 bg-gray-200">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">Image indisponible</span>
            </div>
          )}
          <button 
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 transition-colors"
            title="Ajouter aux favoris"
          >
            <Heart size={18} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-1">
            <span className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-brand">
              {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </span>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-2 border-brand text-brand hover:bg-brand hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              <span>Ajouter</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
