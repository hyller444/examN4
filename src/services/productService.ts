
import useApi from '../hooks/useApi';

// Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  user_id: number;
  stock: number;
  image: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
  };
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category_id: number;
  stock: number;
  image?: File;
}

export const productService = () => {
  const { fetchData } = useApi();

  // Get all products
  const getProducts = async () => {
    return await fetchData<{ products: Product[] }>('/products');
  };

  // Get single product
  const getProduct = async (id: number) => {
    return await fetchData<{ product: Product }>(`/products/${id}`);
  };

  // Create a new product
  const createProduct = async (productData: ProductInput) => {
    const formData = new FormData();
    
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return await fetchData<{ product: Product }>('/products', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set the content type with boundary
    });
  };

  // Update a product
  const updateProduct = async (id: number, productData: Partial<ProductInput>) => {
    const formData = new FormData();
    
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    formData.append('_method', 'PUT'); // Laravel form method spoofing

    return await fetchData<{ product: Product }>(`/products/${id}`, {
      method: 'POST', // Using POST with _method for file uploads
      body: formData,
      headers: {} // Let browser set the content type with boundary
    });
  };

  // Delete a product
  const deleteProduct = async (id: number) => {
    return await fetchData<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };
};

export default productService;
