
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductsTable from '@/components/seller/ProductsTable';
import Pagination from '@/components/seller/Pagination';
import ProductFilter from '@/components/seller/ProductFilter';
import ProductSelectionHeader from '@/components/seller/ProductSelectionHeader';
import { useProductManagement } from '@/hooks/useProductManagement';
import { Tabs, TabsContent } from "@/components/ui/tabs";

const ProductManagement = () => {
  const navigate = useNavigate();
  const { 
    searchTerm,
    setSearchTerm,
    selectedProducts,
    currentPage,
    setCurrentPage,
    currentTab,
    setCurrentTab,
    filteredProducts,
    handleToggleSelect,
    handleSelectAll,
    handleDeleteProducts,
    handlePublishProducts,
    handleUpdateProductsStatus,
    loadProducts
  } = useProductManagement();
  
  const itemsPerPage = 10;
  
  const handleAddProduct = () => {
    navigate('/seller/products/new');
  };
  
  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des produits</h1>
              <p className="text-gray-600">Gérez votre catalogue de produits</p>
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
          
          <ProductFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setCurrentPage={setCurrentPage}
          />
          
          {/* Wrap TabsContent in a Tabs component with the current value */}
          <Tabs value={currentTab}>
            <TabsContent value={currentTab} className="space-y-4">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <ProductSelectionHeader
                  selectedProducts={selectedProducts}
                  filteredProducts={filteredProducts}
                  onSelectAll={handleSelectAll}
                  onPublishProducts={handlePublishProducts}
                  onDeleteProducts={handleDeleteProducts}
                  onUpdateStatus={handleUpdateProductsStatus}
                />
                
                <ProductsTable 
                  products={currentProducts}
                  selectedProducts={selectedProducts}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onProductsChanged={loadProducts}
                />
                
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductManagement;
