
import React from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  isSubmitting: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  isSubmitting,
  onImageUpload,
  onSubmit
}) => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            id="product-images"
            multiple
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
            disabled={isSubmitting}
          />
          <Label
            htmlFor="product-images"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Cliquez pour télécharger des images
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, GIF jusqu'à 5MB
            </p>
          </Label>
        </div>
        
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                <img 
                  src={img} 
                  alt={`Product preview ${index + 1}`} 
                  className="object-cover w-full h-full" 
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full bg-brand hover:bg-brand/90" 
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              <Package className="mr-2 h-4 w-4" />
              Créer le produit
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageUpload;
