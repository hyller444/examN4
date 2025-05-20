
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/product/ProductGrid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal } from 'lucide-react';
import localProductService from '@/services/localProductService';
import type { Product } from '@/services/localProductService';

// Catégories disponibles
const CATEGORIES = [
  { id: 1, name: 'Électronique' },
  { id: 2, name: 'Informatique' },
  { id: 3, name: 'Sport' },
  { id: 4, name: 'Accessoires' },
  { id: 5, name: 'Audio' },
  { id: 6, name: 'Photographie' }
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    searchParams.get('category') ? parseInt(searchParams.get('category') as string) : null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Charger les produits au chargement du composant
  useEffect(() => {
    // Simuler un délai de chargement
    setTimeout(() => {
      const loadedProducts = localProductService.getProducts();
      setProducts(loadedProducts);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Filtrer les produits par catégorie et recherche
  const filteredProducts = products.filter(product => {
    // Filtre par catégorie
    const categoryMatch = selectedCategory
      ? CATEGORIES.find(c => c.id === selectedCategory)?.name === product.category
      : true;
    
    // Filtre par recherche
    const searchMatch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return categoryMatch && searchMatch;
  });

  // Gestion du changement de catégorie
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    
    if (categoryId) {
      searchParams.set('category', categoryId.toString());
    } else {
      searchParams.delete('category');
    }
    
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
              <p className="text-gray-600">Découvrez notre sélection de produits</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8 w-full md:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
          
          {/* Catégories */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange(null)}
            >
              Tous
            </Button>
            
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="rounded-full"
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Nombre de résultats */}
          <div className="mb-6">
            <p className="text-gray-600">
              {isLoading ? 'Chargement...' : `${filteredProducts.length} produit(s) trouvé(s)`}
              {selectedCategory && !isLoading && (
                <>
                  {' '}dans <Badge variant="outline" className="ml-1 font-normal">
                    {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  </Badge>
                </>
              )}
            </p>
          </div>
          
          {/* Grille de produits */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
