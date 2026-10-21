import type { SupabaseResponse } from '../../shared/types';
import type { DBSaleOrder, SaleOrder } from '../types/saleOrder.types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class SaleOrderService {
   async getOrderDetails(orderId: string): Promise<SupabaseResponse<SaleOrder[]>> {
      const { data, error } = await supabase
         .from('sale_orders')
         .select(`
            id, order_id, quantity, price, subtotal, created_at,
            product: products(id, name)
         `)
         .eq('order_id', orderId);
      const orders = !data ? data : data.map(d => normalizeToJS<SaleOrder>(d));
      return { data: orders, error }
   }

   async insertSaleOrder(saleOrder: DBSaleOrder): Promise<SupabaseResponse<SaleOrder>> {
      const { data, error } = await supabase
         .from('sale_orders')
         .insert([saleOrder])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<SaleOrder>(data);
      return { data: item, error }
   }

   async updateSaleOrder(id: string, updates: Partial<DBSaleOrder>): Promise<SupabaseResponse<SaleOrder>> {
      const { data, error } = await supabase
         .from('sale_orders')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<SaleOrder>(data);
      return { data: item, error }
   }

   async deleteSaleOrder(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('sale_orders')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const saleOrderService = new SaleOrderService();

export default saleOrderService;