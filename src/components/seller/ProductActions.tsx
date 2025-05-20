
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ProductActionsProps {
  selectedProducts: number[];
  onPublishProducts: () => void;
  onDeleteProducts: () => void;
  onUpdateStatus?: (status: 'published' | 'draft' | 'out_of_stock') => void;
}

// Fonction utilitaire pour obtenir les informations du statut
export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'published':
      return { 
        icon: <CheckCircle className="h-4 w-4 text-green-500" />, 
        label: "Publier", 
        textColor: "text-green-500" 
      };
    case 'draft':
      return { 
        icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />, 
        label: "Brouillon", 
        textColor: "text-yellow-500" 
      };
    case 'out_of_stock':
      return { 
        icon: <XCircle className="h-4 w-4 text-red-500" />, 
        label: "Rupture", 
        textColor: "text-red-500" 
      };
    default:
      return { 
        icon: <AlertTriangle className="h-4 w-4 text-gray-500" />, 
        label: "Inconnu", 
        textColor: "text-gray-500" 
      };
  }
};

const ProductActions: React.FC<ProductActionsProps> = ({
  selectedProducts,
  onPublishProducts,
  onDeleteProducts,
  onUpdateStatus
}) => {
  if (selectedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onPublishProducts}
      >
        Publier
      </Button>
      
      {onUpdateStatus && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Statut
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUpdateStatus('published')}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>Publier</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus('draft')}>
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Brouillon</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus('out_of_stock')}>
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
              <span>Rupture</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={onDeleteProducts}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default ProductActions;
