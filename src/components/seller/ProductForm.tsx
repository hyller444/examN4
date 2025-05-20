
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  isPublished: boolean;
}

interface ProductFormProps {
  isSubmitting: boolean;
  productData: ProductFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  isSubmitting,
  productData,
  onInputChange,
  onSelectChange,
  onSwitchChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du produit*</Label>
        <Input 
          id="name" 
          name="name" 
          placeholder="Entrez le nom du produit" 
          value={productData.name} 
          onChange={onInputChange} 
          required 
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Décrivez votre produit en détail" 
          value={productData.description} 
          onChange={onInputChange} 
          required 
          className="min-h-32"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Prix (€)*</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01" 
            min="0" 
            placeholder="0.00" 
            value={productData.price} 
            onChange={onInputChange} 
            required 
            disabled={isSubmitting}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie*</Label>
          <Select 
            value={productData.category} 
            onValueChange={(value) => onSelectChange('category', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Électronique</SelectItem>
              <SelectItem value="clothing">Vêtements</SelectItem>
              <SelectItem value="home">Maison</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="others">Autres</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">Stock disponible*</Label>
          <Input 
            id="stock" 
            name="stock" 
            type="number" 
            min="0" 
            placeholder="0" 
            value={productData.stock} 
            onChange={onInputChange} 
            required 
            disabled={isSubmitting}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="block mb-2">Statut de publication</Label>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={productData.isPublished}
              onCheckedChange={(checked) => onSwitchChange('isPublished', checked)}
              disabled={isSubmitting}
            />
            <span>
              {productData.isPublished ? 'Publié' : 'Brouillon'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
