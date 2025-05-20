import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, SlidersHorizontal, ArrowUpDown, Package, Plus, 
  MoreVertical, Edit, Trash2, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Sample product data
const products = Array(24).fill(null).map((_, i) => ({
  id: i + 1,
  name: `Produit ${i + 1}`,
  description: `Description du produit ${i + 1}`,
  price: Math.floor(Math.random() * 200) + 10,
  category: i % 4 === 0 ? 'Électronique' : i % 4 === 1 ? 'Vêtements' : i % 4 === 2 ? 'Maison' : 'Accessoires',
  stock: Math.floor(Math.random() * 50),
  status: i % 6 === 0 ? 'draft' : i % 10 === 0 ? 'out_of_stock' : 'published',
  seller: `Vendeur ${Math.floor(i / 5) + 1}`
}));

// Function to generate status badges
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
          Publié
        </span>
      );
    case 'draft':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangle className="h-3.5 w-3.5 mr-1 text-yellow-500" />
          Brouillon
        </span>
      );
    case 'out_of_stock':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3.5 w-3.5 mr-1 text-red-500" />
          Rupture
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      );
  }
};

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const handleToggleSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleAddProduct = () => {
    // Dans un vrai scénario, cette fonction redirigerait vers la page de création de produit
    alert('Redirection vers la page d\'ajout de produit');
  };

  const handlePublishProducts = () => {
    alert(`Publication de ${selectedProducts.length} produit(s)`);
    // Dans un vrai scénario, cette fonction mettrait à jour les statuts dans la base de données
  };

  const handleDeleteProducts = () => {
    alert(`Suppression de ${selectedProducts.length} produit(s)`);
    // Dans un vrai scénario, cette fonction supprimerait les produits de la base de données
  };

  const handleUpdateProductStatus = (productId: number, status: 'published' | 'draft' | 'out_of_stock') => {
    alert(`Mise à jour du statut du produit ${productId} à "${status}"`);
    // Dans un vrai scénario, cette fonction mettrait à jour le statut du produit
  };

  const handleEditProduct = (productId: number) => {
    alert(`Modification du produit ${productId}`);
    // Dans un vrai scénario, cette fonction redirigerait vers la page d'édition du produit
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      alert(`Produit ${productId} supprimé`);
      // Dans un vrai scénario, cette fonction supprimerait le produit de la base de données
    }
  };
  
  // Filtrer les produits par terme de recherche, catégorie et statut
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStatus = !statusFilter || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Obtenir les catégories uniques
  const categories = [...new Set(products.map(product => product.category))];
  const statuses = [
    { value: 'published', label: 'Publié' },
    { value: 'draft', label: 'Brouillon' },
    { value: 'out_of_stock', label: 'Rupture' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des produits</h1>
              <p className="text-gray-600">Administrez tous les produits de la plateforme</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button 
                className="bg-brand hover:bg-brand/90"
                onClick={handleAddProduct}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
            <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="published">Publiés</TabsTrigger>
                <TabsTrigger value="drafts">Brouillons</TabsTrigger>
                <TabsTrigger value="outOfStock">Rupture</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher un produit..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filtrer
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm mb-1">Catégorie</p>
                      <select 
                        className="w-full p-1.5 border rounded text-sm"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm mb-1">Status</p>
                      <select 
                        className="w-full p-1.5 border rounded text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">Tous les statuts</option>
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <TabsContent value="all" className="space-y-4">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <span className="text-sm text-gray-500">
                      {selectedProducts.length} produit(s) sélectionné(s)
                    </span>
                  </div>
                  
                  {selectedProducts.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handlePublishProducts}
                      >
                        Publier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleDeleteProducts}
                      >
                        Supprimer
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                              checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                              onChange={(e) => handleSelectAll(e.target.checked)}
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
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vendeur
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-brand border-gray-300 rounded focus:ring-brand"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleToggleSelect(product.id)}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                  <Package className="h-5 w-5 text-gray-400" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{product.category}</Badge>
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
                            {getStatusBadge(product.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.seller}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <span className="sr-only">Ouvrir le menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Modifier</span>
                                </DropdownMenuItem>
                                {product.status === 'published' ? (
                                  <DropdownMenuItem onClick={() => handleUpdateProductStatus(product.id, 'draft')}>
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    <span>Dépublier</span>
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleUpdateProductStatus(product.id, 'published')}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    <span>Publier</span>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Supprimer</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">1</span> à <span className="font-medium">{Math.min(20, filteredProducts.length)}</span> sur <span className="font-medium">{filteredProducts.length}</span> produits
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>Précédent</Button>
                    <Button variant="outline" size="sm" className="bg-brand text-white hover:bg-brand/90">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Suivant</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="published" className="bg-white shadow rounded-lg p-6">
              <p>Liste des produits publiés</p>
            </TabsContent>
            
            <TabsContent value="drafts" className="bg-white shadow rounded-lg p-6">
              <p>Liste des produits en brouillon</p>
            </TabsContent>
            
            <TabsContent value="outOfStock" className="bg-white shadow rounded-lg p-6">
              <p>Liste des produits en rupture de stock</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminProducts;
