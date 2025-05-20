
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import ProductForm from '@/components/seller/ProductForm';
import ImageUpload from '@/components/seller/ImageUpload';
import localProductService from '@/services/localProductService';

const NewProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  // État du formulaire
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    isPublished: true,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProductData({
      ...productData,
      [name]: checked
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    // Pour une démo, on simule un chargement d'image
    setIsSubmitting(true);
    setTimeout(() => {
      const newImages = Array.from(e.target.files || []).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Créer le produit avec le service local
      const newProduct = localProductService.addProduct({
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        stock: parseInt(productData.stock),
        image: images.length > 0 ? images[0] : undefined
      });
      
      toast({
        title: "Produit créé avec succès",
        description: `Le produit "${newProduct.name}" a été ajouté à votre catalogue.`,
        variant: "default"
      });
      
      navigate('/seller/products');
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création du produit.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Ajouter un nouveau produit</h1>
            <Button variant="outline" onClick={() => navigate('/seller/products')}>Retour</Button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informations produit</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductForm 
                    isSubmitting={isSubmitting}
                    productData={productData}
                    onInputChange={handleInputChange}
                    onSelectChange={handleSelectChange}
                    onSwitchChange={handleSwitchChange}
                  />
                </CardContent>
              </Card>
              
              <ImageUpload 
                images={images}
                isSubmitting={isSubmitting}
                onImageUpload={handleImageUpload}
                onSubmit={handleSubmit}
              />
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewProduct;
