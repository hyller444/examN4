
import React from 'react';
import { Edit, Trash2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductTableActionsProps {
  productId: number;
  productStatus?: string;
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
  onUpdateStatus?: (productId: number, status: 'published' | 'draft' | 'out_of_stock') => void;
}

const ProductTableActions: React.FC<ProductTableActionsProps> = ({
  productId,
  productStatus = 'draft',
  onEditProduct,
  onDeleteProduct,
  onUpdateStatus
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => onEditProduct(productId)}
      >
        <Edit className="h-4 w-4 text-gray-500" />
      </Button>
      
      {onUpdateStatus && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {productStatus === 'published' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : productStatus === 'draft' ? (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onUpdateStatus(productId, 'published')}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>Publier</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(productId, 'draft')}>
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Brouillon</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(productId, 'out_of_stock')}>
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
              <span>Rupture</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => onDeleteProduct(productId)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

export default ProductTableActions;
