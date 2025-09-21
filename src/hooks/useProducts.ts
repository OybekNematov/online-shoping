import { useState, useEffect } from 'react';
import { ProductService } from '../service/productService';
import { mockProducts } from '../data/mockData';

interface UseProductsOptions {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  useMockData?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use mock data if specified or if Supabase is not configured
        if (options.useMockData || !import.meta.env.VITE_SUPABASE_URL) {
          let filtered = [...mockProducts];

          if (options.category && options.category !== 'All Categories') {
            filtered = filtered.filter(p => p.category === options.category);
          }

          if (options.search) {
            const query = options.search.toLowerCase();
            filtered = filtered.filter(p => 
              p.name.toLowerCase().includes(query) ||
              p.category.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query)
            );
          }

          if (options.minPrice !== undefined) {
            filtered = filtered.filter(p => p.price >= options.minPrice!);
          }

          if (options.maxPrice !== undefined) {
            filtered = filtered.filter(p => p.price <= options.maxPrice!);
          }

          if (options.limit) {
            filtered = filtered.slice(0, options.limit);
          }

          setProducts(filtered);
        } else {
          // Use real database
          const data = await ProductService.getProducts({
            category: options.category,
            search: options.search,
            minPrice: options.minPrice,
            maxPrice: options.maxPrice,
            limit: options.limit
          });
          setProducts(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        // Fallback to mock data on error
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.search, options.minPrice, options.maxPrice, options.limit]);

  return { products, loading, error, refetch: () => fetchProducts() };
};

export const useProduct = (id: string, useMockData = true) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (useMockData || !import.meta.env.VITE_SUPABASE_URL) {
          const found = mockProducts.find(p => p.id === id);
          setProduct(found || null);
        } else {
          const data = await ProductService.getProductById(id);
          setProduct(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        // Fallback to mock data
        const found = mockProducts.find(p => p.id === id);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, useMockData]);

  return { product, loading, error };
};