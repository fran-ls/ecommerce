import type { ProductCategory, DBProductCategory } from '../types/category.types';
import type { SupabaseResponse } from '../../shared/types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class CategoryService {
   async getCategories(): Promise<SupabaseResponse<ProductCategory[]>> {
      const { data, error } = await supabase.from('categories').select('*');
      const categories = !data ? data : data.map(d => normalizeToJS<ProductCategory>(d));
      return { data: categories, error }
   }

   async insertCategory(category: DBProductCategory): Promise<SupabaseResponse<ProductCategory>> {
      const { data, error } = await supabase
         .from('categories')
         .insert([category])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<ProductCategory>(data);
      return { data: item, error }
   }

   async updateCategory(id: string, updates: Partial<DBProductCategory>): Promise<SupabaseResponse<ProductCategory>> {
      const { data, error } = await supabase
         .from('categories')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<ProductCategory>(data);
      return { data: item, error }
   }

   async deleteCategory(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('categories')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const categoryService = new CategoryService();

export default categoryService;