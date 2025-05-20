
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import localProductService, { Product } from '@/services/localProductService';

export function useProductManagement() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('all');
  
  // Load products on component mount
  const loadProducts = () => {
    const loadedProducts = localProductService.getProducts();
    setProducts(loadedProducts);
    // Reset selection when products change
    setSelectedProducts([]);
  };
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  // Product selection
  const handleToggleSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  const handleSelectAll = (select: boolean) => {
    if (select) {
      const visibleProductIds = filteredProducts.map(p => p.id);
      setSelectedProducts(visibleProductIds);
    } else {
      setSelectedProducts([]);
    }
  };
  
  // Product actions
  const handleDeleteProducts = () => {
    if (selectedProducts.length === 0) return;
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedProducts.length} produit(s) ?`)) {
      // Delete selected products
      let successCount = 0;
      selectedProducts.forEach(id => {
        const success = localProductService.deleteProduct(id);
        if (success) successCount++;
      });
      
      // Update product list
      loadProducts();
      
      toast({
        title: "Produits supprimés",
        description: `${successCount} produit(s) ont été supprimés.`,
        variant: "default"
      });
    }
  };
  
  const handlePublishProducts = () => {
    if (selectedProducts.length === 0) return;
    
    // Publish selected products
    let successCount = 0;
    selectedProducts.forEach(id => {
      const result = localProductService.updateProductStatus(id, 'published');
      if (result) successCount++;
    });
    
    // Update product list
    loadProducts();
    
    toast({
      title: "Produits publiés",
      description: `${successCount} produit(s) ont été publiés.`,
      variant: "default"
    });
  };
  
  const handleUpdateProductsStatus = (status: 'published' | 'draft' | 'out_of_stock') => {
    if (selectedProducts.length === 0) return;
    
    let successCount = 0;
    selectedProducts.forEach(id => {
      const result = localProductService.updateProductStatus(id, status);
      if (result) successCount++;
    });
    
    // Update product list
    loadProducts();
    
    const statusMessages = {
      'published': 'publiés',
      'draft': 'mis en brouillon',
      'out_of_stock': 'marqués en rupture de stock'
    };
    
    toast({
      title: `Produits ${statusMessages[status]}`,
      description: `${successCount} produit(s) ont été ${statusMessages[status]}.`,
      variant: "default"
    });
  };
  
  // Filter products by search term and status
  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status (tab)
      const matchesStatus = 
        currentTab === 'all' || 
        (currentTab === 'published' && product.status === 'published') ||
        (currentTab === 'drafts' && (product.status === 'draft' || product.stock === 0));
      
      return matchesSearch && matchesStatus;
    });
  };
  
  const filteredProducts = getFilteredProducts();

  return {
    products,
    searchTerm,
    setSearchTerm,
    selectedProducts,
    currentPage,
    setCurrentPage,
    currentTab,
    setCurrentTab,
    filteredProducts,
    handleToggleSelect,
    handleSelectAll,
    handleDeleteProducts,
    handlePublishProducts,
    handleUpdateProductsStatus,
    loadProducts
  };
}
