import type { Supplier, SupplierDTO } from '../types/supplier.types';
import type { SupabaseResponse } from '../../shared/types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class SupplierService {
   async getSuppliers(): Promise<SupabaseResponse<Supplier[]>> {
      const { data, error } = await supabase
         .from('suppliers')
         .select('*');
      const suppliers = !data ? data : data.map(d => normalizeToJS<Supplier>(d));
      return { data: suppliers, error }
   }

   async insertSupplier(supplier: SupplierDTO): Promise<SupabaseResponse<Supplier>> {
      const { data, error } = await supabase
         .from('suppliers')
         .insert([supplier])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Supplier>(data);
      return { data: item, error }
   }

   async updateSupplier(id: string, updates: Partial<SupplierDTO>): Promise<SupabaseResponse<Supplier>> {
      const { data, error } = await supabase
         .from('suppliers')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Supplier>(data);
      return { data: item, error }
   }

   async deleteSupplier(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('suppliers')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const supplierService = new SupplierService();

export default supplierService;