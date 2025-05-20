
import React from 'react';
import { Check, AlertTriangle, XCircle } from 'lucide-react';

interface ProductStatusBadgeProps {
  status?: string;
}

const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'published':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          <Check className="w-3 h-3 mr-1" /> Publié
        </span>
      );
    case 'draft':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangle className="w-3 h-3 mr-1" /> Brouillon
        </span>
      );
    case 'out_of_stock':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" /> Rupture
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          {status || 'Inconnu'}
        </span>
      );
  }
};

export default ProductStatusBadge;
