import type { Sale, DBSale } from '../types/sale.types';
import type { DashboardFilters, SupabaseResponse } from '../../shared/types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class SaleService {
   async countSaleItems(filters: DashboardFilters): Promise<SupabaseResponse<number>> {
      const { period, date = '' } = filters;

      const values: any = {
         period,
         target_date: date
      }

      if (!date) delete values.target_date;

      const { data, error } = await supabase.rpc('total_sale_items', values);
      return { data, error }
   }

   async countSaleIncomes(filters: DashboardFilters): Promise<SupabaseResponse<number>> {
      const { period, date = '' } = filters;

      const values: any = {
         period,
         target_date: date
      }

      if (!date) delete values.target_date;

      const { data, error } = await supabase.rpc('total_sales', values);
      return { data, error }
   }

   async countSales(filters: DashboardFilters): Promise<SupabaseResponse<number>> {
      const { period, date = '' } = filters;

      const values: any = {
         period,
         target_date: date
      }

      if (!date) delete values.target_date;

      const { data, error } = await supabase.rpc('count_sales', values);
      return { data, error }
   }

   async getSales(): Promise<SupabaseResponse<Sale[]>> {
      const { data, error } = await supabase
         .from('sales')
         .select(`
            id, items, total, created_at,
            client:clients(*)
         `)
         .order('created_at', { ascending: false });
      const sales = !data ? data : data.map(d => normalizeToJS<Sale>(d));
      return { data: sales, error }
   }

   async insertSale(sale: DBSale): Promise<SupabaseResponse<Sale>> {
      const { data, error } = await supabase
         .from('sales')
         .insert([sale])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Sale>(data);
      return { data: item, error }
   }

   async updateSale(id: string, updates: Partial<DBSale>): Promise<SupabaseResponse<Sale>> {
      const { data, error } = await supabase
         .from('sales')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Sale>(data);
      return { data: item, error }
   }

   async deleteSale(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('sales')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const saleService = new SaleService();

export default saleService;