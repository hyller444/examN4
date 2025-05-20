
import React from 'react';
import ProductActions from './ProductActions';

interface ProductSelectionHeaderProps {
  selectedProducts: number[];
  filteredProducts: Array<{ id: number }>;
  onSelectAll: (select: boolean) => void;
  onPublishProducts: () => void;
  onDeleteProducts: () => void;
  onUpdateStatus?: (status: 'published' | 'draft' | 'out_of_stock') => void;
}

const ProductSelectionHeader: React.FC<ProductSelectionHeaderProps> = ({
  selectedProducts,
  filteredProducts,
  onSelectAll,
  onPublishProducts,
  onDeleteProducts,
  onUpdateStatus
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
          checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
        <span className="text-sm text-gray-500">
          {selectedProducts.length} produit(s) sélectionné(s)
        </span>
      </div>
      
      <ProductActions 
        selectedProducts={selectedProducts} 
        onPublishProducts={onPublishProducts} 
        onDeleteProducts={onDeleteProducts}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
};

export default ProductSelectionHeader;
