
import localStorageService from './localStorageService';
import { MOCK_PRODUCTS } from '@/context/CartContext';

// Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  status?: 'published' | 'draft' | 'out_of_stock';
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  status?: 'published' | 'draft' | 'out_of_stock';
}

const PRODUCTS_STORAGE_KEY = 'marketplace_products';

const localProductService = {
  // Initialisation des produits s'ils n'existent pas encore
  initProducts: (): void => {
    const existingProducts = localStorageService.getItem<Product[]>(PRODUCTS_STORAGE_KEY, []);
    if (existingProducts.length === 0) {
      // Ajouter le statut aux produits mockés
      const productsWithStatus = MOCK_PRODUCTS.map(product => ({
        ...product,
        status: product.stock > 0 ? 'published' : 'draft'
      }));
      localStorageService.setItem(PRODUCTS_STORAGE_KEY, productsWithStatus);
    }
  },

  // Récupérer tous les produits
  getProducts: (): Product[] => {
    return localStorageService.getItem<Product[]>(PRODUCTS_STORAGE_KEY, []);
  },

  // Récupérer un produit par son ID
  getProduct: (id: number): Product | undefined => {
    const products = localProductService.getProducts();
    return products.find(product => product.id === id);
  },

  // Ajouter un nouveau produit
  addProduct: (productData: ProductInput): Product => {
    const products = localProductService.getProducts();
    
    // Générer un nouvel ID (simple incrément du plus grand ID existant)
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;

    const newProduct: Product = {
      id: newId,
      ...productData,
      image: productData.image || '/placeholder.svg',
      status: productData.stock > 0 ? 'published' : 'draft'
    };

    products.push(newProduct);
    localStorageService.setItem(PRODUCTS_STORAGE_KEY, products);
    
    return newProduct;
  },

  // Mettre à jour un produit existant
  updateProduct: (id: number, productData: Partial<ProductInput>): Product | undefined => {
    let products = localProductService.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      // Mettre à jour le statut en fonction du stock si nécessaire
      if (productData.stock !== undefined) {
        productData.status = productData.stock > 0 ? 'published' : 'out_of_stock';
      }
      
      products[index] = { ...products[index], ...productData };
      localStorageService.setItem(PRODUCTS_STORAGE_KEY, products);
      return products[index];
    }
    
    return undefined;
  },

  // Changer le statut d'un produit
  updateProductStatus: (id: number, status: 'published' | 'draft' | 'out_of_stock'): Product | undefined => {
    let products = localProductService.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      products[index] = { ...products[index], status };
      localStorageService.setItem(PRODUCTS_STORAGE_KEY, products);
      return products[index];
    }
    
    return undefined;
  },

  // Supprimer un produit
  deleteProduct: (id: number): boolean => {
    let products = localProductService.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length !== products.length) {
      localStorageService.setItem(PRODUCTS_STORAGE_KEY, filteredProducts);
      return true;
    }
    
    return false;
  },
  
  // Filtrer les produits
  filterProducts: (query: string, category?: string, status?: string): Product[] => {
    let products = localProductService.getProducts();
    
    return products.filter(product => {
      const matchesQuery = !query || 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
        
      const matchesCategory = !category || product.category === category;
      
      const matchesStatus = !status || product.status === status;
      
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }
};

// Initialiser les produits au chargement du service
localProductService.initProducts();

export default localProductService;
