
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, Heart, Share2, ArrowLeft, Truck, Shield, Package, Star, ChevronRight 
} from 'lucide-react';
import Loader from '@/components/ui/Loader';
import { useCart } from '@/context/CartContext';
import { MOCK_PRODUCTS } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  
  // Mock product images array
  const productImages = [
    'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2340&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?q=80&w=2264&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2340&auto=format&fit=crop',
  ];
  
  // Mock related products
  const relatedProducts = MOCK_PRODUCTS.slice(0, 4);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real app, fetch from API with the actual product ID
        // For now, just find the product in our mock data
        const foundProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(id || '0'));
        
        // Simulate API delay
        setTimeout(() => {
          setProduct(foundProduct || MOCK_PRODUCTS[0]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="large" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Package className="h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Accueil
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link to="/products" className="text-gray-500 hover:text-gray-700">
                  {product.category}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-900 font-medium truncate max-w-xs">
                {product.name}
              </li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
                <img 
                  src={productImages[selectedImage] || product.image}
                  alt={product.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-md bg-gray-100 overflow-hidden ${selectedImage === idx ? 'ring-2 ring-brand' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - Image ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:sticky lg:top-20 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-brand rounded-full">
                  {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                </span>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.0 (128 avis)</span>
              </div>
              
              <p className="text-2xl font-bold text-brand">
                {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </p>
              
              <div className="border-t border-b border-gray-200 py-6">
                <p className="text-base text-gray-700 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Quantité</label>
                  <div className="mt-2 flex items-center border border-gray-300 rounded-md w-40">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center py-2">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to cart */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <Button 
                    className="flex-1 bg-brand hover:bg-brand/90"
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter au panier
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-brand mr-3" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Livraison gratuite</span>
                    {' '}pour les commandes supérieures à 50€
                  </p>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-brand mr-3" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Garantie 2 ans</span>
                    {' '}sur tous nos produits
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Produits similaires</h2>
              <Link to="/products" className="text-brand hover:text-brand/80 font-medium flex items-center">
                Voir tout
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden card-hover"
                >
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {relatedProduct.name}
                      </h3>
                      <p className="mt-2 text-brand font-semibold">
                        {relatedProduct.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
