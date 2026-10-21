import type { DBProduct, PriceRange, Product } from '../types/product.types';
import type { SupabaseResponse } from '../../shared/types';
import type { ProductCategory } from '../../category/types/category.types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';
import { fromProduct } from '../utils/fromProduct';
import { MIN_STOK } from '../utils/getStockStatus';

class ProductService {
   async countLowStockProducts(): Promise<SupabaseResponse<number>> {
      const { count, error } = await supabase
         .from('products')
         .select('*', { count: 'exact', head: true })
         .gt('stock', 0)
         .lt('stock', MIN_STOK);

      return { data: count, error }
   }

   async countUnStockProducts(): Promise<SupabaseResponse<number>> {
      const { count, error } = await supabase
         .from('products')
         .select('*', { count: 'exact', head: true })
         .eq('stock', 0);

      return { data: count, error }
   }

   async countProducts(): Promise<SupabaseResponse<number>> {
      const { count, error } = await supabase
         .from('products')
         .select('*', { count: 'exact', head: true });

      return { data: count, error }
   }

   async getProductsByCategories(values: { categoryIds: string[], priceRange: PriceRange, query?: string }): Promise<SupabaseResponse<Product[]>> {
      const { categoryIds, priceRange, query = '' } = values;

      const { data, error } = await supabase
         .from('products')
         .select(`
            *,
            images: images(id, url, is_primary),
            category: categories(id, name)
         `)
         .in('category_id', categoryIds)
         .gte('sale_price', priceRange[0])
         .lte('sale_price', priceRange[1])
         .ilike('name', `%${query}%`);

      const products = !data ? data : data.map(d => ({
         ...normalizeToJS<Product>(d),
         images: d.images?.map((img: any) => normalizeToJS(img)) ?? [],
         category: normalizeToJS<ProductCategory>(d.category)
      }));

      return { data: products, error }
   }

   async getFilteredProducts(values: { priceRange: PriceRange, query?: string }): Promise<SupabaseResponse<Product[]>> {
      const { priceRange, query = '' } = values;

      const { data, error } = await supabase
         .from('products')
         .select(`
            *,
            images: images(id, url, is_primary),
            category: categories(id, name)
         `)
         .gte('sale_price', priceRange[0])
         .lte('sale_price', priceRange[1])
         .ilike('name', `%${query}%`);

      const products = !data ? data : data.map(d => ({
         ...normalizeToJS<Product>(d),
         images: d.images?.map((img: any) => normalizeToJS(img)) ?? [],
         category: normalizeToJS<ProductCategory>(d.category)
      }));

      return { data: products, error }
   }

   async getProducts(): Promise<SupabaseResponse<Product[]>> {
      const { data, error } = await supabase
         .from('products')
         .select(`
            *,
            images(id, url, is_primary),
            category: categories(id, name)
         `)
         .order('name', { ascending: true })

      const products = !data ? data : data.map(d => ({
         ...normalizeToJS<Product>(d),
         images: d.images?.map((img: any) => normalizeToJS(img)) ?? [],
         category: normalizeToJS<ProductCategory>(d.category)
      }));

      return { data: products, error }
   }

   async getAllProducts(): Promise<SupabaseResponse<Product[]>> {
      const { data, error } = await supabase
         .from('products')
         .select(`
            *,
            images(id, url, is_primary),
            category: categories(id, name)
         `)
         .order('created_at', { ascending: false })
         .eq('images.is_primary', true);

      const products = !data ? data : data.map(d => ({
         ...normalizeToJS<Product>(d),
         images: d.images?.map((img: any) => normalizeToJS(img)) ?? [],
         category: normalizeToJS<ProductCategory>(d.category)
      }));

      return { data: products, error }
   }

   async getProductsById(ids: string[]): Promise<SupabaseResponse<Product[]>> {
      const { data, error } = await supabase
         .from('products')
         .select(`
            *,
            images(id, url, is_primary),
            category: categories(id, name)
         `)
         .order('name', { ascending: true })
         .eq('images.is_primary', true)
         .in('id', ids);

      const products = fromProduct(data);
      return { data: products, error }
   }

   async getProductById(id: string): Promise<SupabaseResponse<Product>> {
      const { data, error } = await supabase
         .from('products')
         .select(`
            *,
            images(id, url, is_primary),
            category: categories(id, name)
         `)
         .eq('id', id);

      let product: any = null;

      if (data && data[0]) {
         product = normalizeToJS<Product>(data[0]);
         product.images = product.images?.map((img: any) => normalizeToJS(img)) ?? [];
         product.category = normalizeToJS<ProductCategory>(product.category);
      }

      return { data: product, error }
   }

   async insertProduct(product: DBProduct): Promise<SupabaseResponse<Product>> {
      const { data, error } = await supabase
         .from('products')
         .insert([product])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Product>(data);
      return { data: item, error }
   }

   async updateProduct(id: string, updates: Partial<DBProduct>): Promise<SupabaseResponse<Product>> {
      const { data, error } = await supabase
         .from('products')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Product>(data);
      return { data: item, error }
   }

   async deleteProduct(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('products')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const productService = new ProductService();

export default productService;