
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Add a product to cart
  const addToCart = (product: any, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if product is already in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if product exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new product to cart
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        }];
      }
    });
    
    toast.success(`${product.name} ajouté au panier`);
  };
  
  // Remove a product from cart
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info('Produit supprimé du panier');
  };
  
  // Update product quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.info('Panier vidé');
  };
  
  // Calculate total items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Mock data for development
export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    description: 'Un smartphone puissant avec appareil photo de haute qualité',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2342&auto=format&fit=crop',
    category: 'Électronique',
    stock: 15
  },
  {
    id: 2,
    name: 'Ordinateur portable Ultra',
    description: 'Performant et léger pour tous vos besoins professionnels',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2342&auto=format&fit=crop',
    category: 'Informatique',
    stock: 10
  },
  {
    id: 3,
    name: 'Chaussures de sport Alpha',
    description: 'Idéales pour la course et le fitness',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2340&auto=format&fit=crop',
    category: 'Sport',
    stock: 25
  },
  {
    id: 4,
    name: 'Montre connectée Pulse',
    description: 'Suivez votre activité et restez connecté',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2399&auto=format&fit=crop',
    category: 'Accessoires',
    stock: 20
  },
  {
    id: 5,
    name: 'Tablette GraphicPro',
    description: 'Pour les designers et artistes numériques',
    price: 849.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2340&auto=format&fit=crop',
    category: 'Informatique',
    stock: 8
  },
  {
    id: 6,
    name: 'Enceinte Bluetooth WavePro',
    description: 'Son immersif et batterie longue durée',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2369&auto=format&fit=crop',
    category: 'Audio',
    stock: 18
  },
  {
    id: 7,
    name: 'Appareil photo Reflex Pro',
    description: 'Pour des photos professionnelles en toutes conditions',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2340&auto=format&fit=crop',
    category: 'Photographie',
    stock: 5
  },
  {
    id: 8,
    name: 'Drone Explorer',
    description: 'Caméra 4K et autonomie de 45 minutes',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=2340&auto=format&fit=crop',
    category: 'Électronique',
    stock: 7
  }
];
