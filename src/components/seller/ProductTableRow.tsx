
import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '@/services/localProductService';
import ProductStatusBadge from './ProductStatusBadge';
import ProductTableActions from './ProductTableActions';

interface ProductTableRowProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (productId: number) => void;
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
  onUpdateStatus?: (productId: number, status: 'published' | 'draft' | 'out_of_stock') => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onEditProduct,
  onDeleteProduct,
  onUpdateStatus
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <Package className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-xs">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{product.category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{product.stock}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ProductStatusBadge status={product.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ProductTableActions 
          productId={product.id}
          productStatus={product.status}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
          onUpdateStatus={onUpdateStatus}
        />
      </td>
    </tr>
  );
};

export default ProductTableRow;
