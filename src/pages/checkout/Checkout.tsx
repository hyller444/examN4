
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  CreditCard, Check, ArrowLeft, Package, ChevronDown, ChevronUp
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Checkout = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: 'Commande confirmée',
        description: 'Votre commande a été traitée avec succès',
        variant: 'default',
      });
      
      clearCart();
      navigate('/account/orders');
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Package className="h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            Vous ne pouvez pas procéder au paiement car votre panier est vide.
          </p>
          <Button className="bg-brand hover:bg-brand/90" asChild>
            <Link to="/">Parcourir les produits</Link>
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
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-gray-600 hover:text-brand">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au panier
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              <form onSubmit={handleSubmit}>
                {/* Shipping Address */}
                <div className="bg-white border rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input 
                        id="address"
                        name="address"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input 
                        id="city"
                        name="city"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input 
                        id="postalCode"
                        name="postalCode"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white border rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Méthode de paiement</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <RadioGroupItem value="card" id="card" />
                        </div>
                        <div className="ml-3">
                          <Label htmlFor="card" className="text-gray-900 font-medium cursor-pointer">
                            Carte bancaire
                          </Label>
                          <p className="text-gray-500 text-sm">
                            Paiement sécurisé avec Stripe. Nous acceptons Visa, Mastercard et American Express.
                          </p>
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="pl-7 pt-4 space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Numéro de carte</Label>
                            <Input 
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              required
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Date d'expiration</Label>
                              <Input 
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM / YY"
                                required
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input 
                                id="cvc"
                                name="cvc"
                                placeholder="123"
                                required
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <RadioGroupItem value="paypal" id="paypal" />
                        </div>
                        <div className="ml-3">
                          <Label htmlFor="paypal" className="text-gray-900 font-medium cursor-pointer">
                            PayPal
                          </Label>
                          <p className="text-gray-500 text-sm">
                            Vous serez redirigé vers PayPal pour finaliser votre paiement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-brand hover:bg-brand/90 font-medium" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payer {totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </>
                  )}
                </Button>
              </form>
              
              <div className="text-sm text-gray-600">
                <p>
                  En validant votre commande, vous acceptez nos{' '}
                  <a href="#" className="text-brand hover:underline">Conditions d'utilisation</a>{' '}
                  et notre{' '}
                  <a href="#" className="text-brand hover:underline">Politique de confidentialité</a>.
                </p>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              {/* Mobile Order Summary Toggle */}
              <div className="block lg:hidden mb-6">
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                >
                  <span>
                    Résumé de la commande ({totalItems} {totalItems > 1 ? 'articles' : 'article'})
                  </span>
                  {showOrderSummary ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <div className={`lg:block ${showOrderSummary ? 'block' : 'hidden'}`}>
                <div className="bg-gray-50 border rounded-lg p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">
                    Résumé de la commande
                  </h2>
                  
                  {/* Cart Items */}
                  <ul className="divide-y divide-gray-200 mb-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-3 flex justify-between">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Image</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm line-clamp-1 font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </p>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Sous-total</span>
                      <span>{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Frais de livraison</span>
                      <span>Gratuit</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxes</span>
                      <span>Incluses</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                  </div>
                  
                  {/* Guaranteed */}
                  <div className="mt-6 flex items-center text-sm text-brand">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Livraison garantie sous 2-5 jours ouvrables</span>
                  </div>
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

export default Checkout;
