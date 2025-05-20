
import localStorageService from './localStorageService';
import { CartItem } from '@/context/CartContext';

// Types
export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  customer: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface OrderInput {
  items: CartItem[];
  totalPrice: number;
  customer: string;
}

const ORDERS_STORAGE_KEY = 'marketplace_orders';

const localOrderService = {
  // Récupérer toutes les commandes
  getOrders: (): Order[] => {
    return localStorageService.getItem<Order[]>(ORDERS_STORAGE_KEY, []);
  },

  // Récupérer une commande par son ID
  getOrder: (id: string): Order | undefined => {
    const orders = localOrderService.getOrders();
    return orders.find(order => order.id === id);
  },

  // Ajouter une nouvelle commande
  createOrder: (orderData: OrderInput): Order => {
    const orders = localOrderService.getOrders();
    
    // Générer un ID unique pour la commande
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    const newOrder: Order = {
      id: orderId,
      ...orderData,
      date: new Date().toISOString(),
      status: 'pending'
    };

    orders.push(newOrder);
    localStorageService.setItem(ORDERS_STORAGE_KEY, orders);
    
    return newOrder;
  },

  // Mettre à jour le statut d'une commande
  updateOrderStatus: (id: string, status: Order['status']): Order | undefined => {
    let orders = localOrderService.getOrders();
    const index = orders.findIndex(o => o.id === id);
    
    if (index !== -1) {
      orders[index] = { ...orders[index], status };
      localStorageService.setItem(ORDERS_STORAGE_KEY, orders);
      return orders[index];
    }
    
    return undefined;
  },

  // Supprimer une commande (pour admin seulement)
  deleteOrder: (id: string): boolean => {
    let orders = localOrderService.getOrders();
    const filteredOrders = orders.filter(o => o.id !== id);
    
    if (filteredOrders.length !== orders.length) {
      localStorageService.setItem(ORDERS_STORAGE_KEY, filteredOrders);
      return true;
    }
    
    return false;
  },
  
  // Filtrer les commandes
  filterOrders: (query: string = '', status?: Order['status'] | 'all'): Order[] => {
    const orders = localOrderService.getOrders();
    
    return orders.filter(order => {
      const matchesQuery = !query || 
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.customer.toLowerCase().includes(query.toLowerCase());
        
      const matchesStatus = !status || status === 'all' || order.status === status;
      
      return matchesQuery && matchesStatus;
    });
  }
};

export default localOrderService;
