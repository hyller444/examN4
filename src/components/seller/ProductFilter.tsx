
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setCurrentPage: (page: number) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  currentTab, 
  setCurrentTab, 
  setCurrentPage 
}) => {
  return (
    <Tabs 
      defaultValue="all" 
      className="space-y-4"
      value={currentTab}
      onValueChange={(value) => {
        setCurrentTab(value);
        setCurrentPage(1); // Reset pagination when tab changes
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <TabsList>
          <TabsTrigger value="all">Tous les produits</TabsTrigger>
          <TabsTrigger value="published">Publiés</TabsTrigger>
          <TabsTrigger value="drafts">Brouillons</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset pagination when search term changes
              }}
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Tabs>
  );
};

export default ProductFilter;
