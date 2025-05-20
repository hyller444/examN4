
import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const ProductTableHeader: React.FC<{
  onSelectAll: (selected: boolean) => void;
  allSelected: boolean;
  hasProducts: boolean;
}> = ({ onSelectAll, allSelected, hasProducts }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
              checked={allSelected && hasProducts}
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </div>
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            Produit
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </div>
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            Catégorie
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </div>
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            Prix
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </div>
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center">
            Stock
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </div>
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Statut
        </th>
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default ProductTableHeader;
