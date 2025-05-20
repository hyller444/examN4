
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/services/localProductService';
import localProductService from '@/services/localProductService';

import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';

interface ProductsTableProps {
  products: Product[];
  selectedProducts: number[];
  onToggleSelect: (productId: number) => void;
  onSelectAll: (select: boolean) => void;
  onProductsChanged?: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  selectedProducts,
  onToggleSelect,
  onSelectAll,
  onProductsChanged
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditProduct = (productId: number) => {
    navigate(`/seller/products/${productId}`);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const success = localProductService.deleteProduct(productId);
      
      if (success) {
        toast({
          title: "Produit supprimé",
          description: "Le produit a été supprimé avec succès",
          variant: "default"
        });
        
        // Rafraîchir la liste des produits
        if (onProductsChanged) {
          onProductsChanged();
        }
      }
    }
  };

  const handleUpdateStatus = (productId: number, newStatus: 'published' | 'draft' | 'out_of_stock') => {
    const updatedProduct = localProductService.updateProductStatus(productId, newStatus);
    
    if (updatedProduct) {
      toast({
        title: "Statut mis à jour",
        description: "Le statut du produit a été mis à jour avec succès",
        variant: "default"
      });
      
      // Rafraîchir la liste des produits
      if (onProductsChanged) {
        onProductsChanged();
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <ProductTableHeader 
          onSelectAll={onSelectAll} 
          allSelected={selectedProducts.length === products.length} 
          hasProducts={products.length > 0} 
        />
        
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onToggleSelect={onToggleSelect}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                Aucun produit trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
