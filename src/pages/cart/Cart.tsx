
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import localOrderService from '@/services/localOrderService';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simuler un délai de traitement
    setTimeout(() => {
      try {
        // Créer une nouvelle commande
        const order = localOrderService.createOrder({
          items: cartItems,
          totalPrice: totalPrice,
          customer: "Utilisateur actuel" // Normalement, utiliser le nom de l'utilisateur connecté
        });
        
        // Vider le panier après la commande
        clearCart();
        
        toast.success("Commande passée avec succès!");
        navigate('/checkout', { state: { orderId: order.id } });
      } catch (error) {
        console.error("Erreur lors du traitement de la commande:", error);
        toast.error("Une erreur s'est produite lors du traitement de votre commande.");
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 py-16">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Il semble que vous n'avez pas encore ajouté d'articles à votre panier.
            </p>
            <Button className="bg-brand hover:bg-brand/90" asChild>
              <Link to="/">Continuer vos achats</Link>
            </Button>
          </div>
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
          <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Header */}
              <div className="hidden md:grid md:grid-cols-6 gap-4 py-2 border-b text-sm font-medium text-gray-500">
                <div className="md:col-span-3">Produit</div>
                <div className="text-center">Prix</div>
                <div className="text-center">Quantité</div>
                <div className="text-right">Total</div>
              </div>
              
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4 border-b items-center"
                >
                  {/* Product */}
                  <div className="md:col-span-3 flex space-x-4 items-center">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Link 
                        to={`/products/${item.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-brand line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-center">
                    <span className="text-gray-900">
                      {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="flex justify-center">
                    <div className="flex border border-gray-300 rounded-md">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="flex items-center justify-center w-10 text-gray-900">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="text-right font-medium text-gray-900">
                    {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-gray-50 border rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé de la commande</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total ({totalItems} articles)</span>
                    <span>{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frais de livraison</span>
                    <span>Gratuit</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>Incluses</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-brand hover:bg-brand/90 font-medium" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="mr-2">Traitement en cours</span>
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                      </>
                    ) : (
                      <>
                        Procéder au paiement
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    asChild
                  >
                    <Link to="/">Continuer vos achats</Link>
                  </Button>
                </div>
                
                <div className="mt-6 flex items-start space-x-2 text-sm text-gray-600">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-brand" />
                  <p>
                    Les détails d'expédition et les options de paiement seront validés à l'étape suivante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
