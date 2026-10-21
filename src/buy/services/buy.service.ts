import type { Buy, DBBuy } from '../types/buy.types';
import type { DashboardFilters, SupabaseResponse } from '../../shared/types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class BuyService {
   async countBuyStock(filters: DashboardFilters): Promise<SupabaseResponse<number>> {
      const { period, date = '' } = filters;

      const values: any = {
         period,
         target_date: date
      }

      if (!date) delete values.target_date;

      const { data, error } = await supabase.rpc('total_buy_stock', values);
      return { data, error }
   }

   async countBuyInversion(filters: DashboardFilters): Promise<SupabaseResponse<number>> {
      const { period, date = '' } = filters;

      const values: any = {
         period,
         target_date: date
      }

      if (!date) delete values.target_date;

      const { data, error } = await supabase.rpc('total_buy_inversion', values);
      return { data, error }
   }

   async countBuys(filters: DashboardFilters): Promise<SupabaseResponse<number>> {
      const { period, date = '' } = filters;

      const values: any = {
         period,
         target_date: date
      }

      if (!date) delete values.target_date;

      const { data, error } = await supabase.rpc('count_buys', values);
      return { data, error }
   }

   async getBuys(): Promise<SupabaseResponse<Buy[]>> {
      const { data, error } = await supabase
         .from('buys')
         .select(`
            id, stock, unit_price, subtotal,
            product: products(id, name)
         `)
         .order('created_at', { ascending: false });
      const buys = !data ? data : data.map(d => normalizeToJS<Buy>(d));
      return { data: buys, error }
   }

   async insertBuy(buy: DBBuy): Promise<SupabaseResponse<Buy>> {
      const { data, error } = await supabase
         .from('buys')
         .insert([buy])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Buy>(data);
      return { data: item, error }
   }

   async updateBuy(id: string, updates: Partial<DBBuy>): Promise<SupabaseResponse<Buy>> {
      const { data, error } = await supabase
         .from('buys')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Buy>(data);
      return { data: item, error }
   }

   async deleteBuy(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('buys')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const buyService = new BuyService();

export default buyService;