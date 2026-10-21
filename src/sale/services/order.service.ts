import type { Order, DBOrder, OrderSale } from '../types/order.types';
import type { SupabaseResponse } from '../../shared/types';
import type { Client } from '../../client/types/client.types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class OrderService {
   async getOrders(): Promise<SupabaseResponse<Order[]>> {
      const { data, error } = await supabase
         .from('orders')
         .select(`
            id, status, created_at,
            sale: sales(id, items, total, shipping_cost),
            client: clients(*),
            address: addresses(*)
         `)
         .order('created_at', { ascending: false });

      const orders = !data ? data : data.map(d => {
         const order = normalizeToJS<Order>(d);
         return {
            ...order,
            client: normalizeToJS<Client>(order.client),
            sale: normalizeToJS<OrderSale>(order.sale)
         }
      });
      return { data: orders, error }
   }

   async insertOrder(order: DBOrder): Promise<SupabaseResponse<Order>> {
      const { data, error } = await supabase
         .from('orders')
         .insert([order])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Order>(data);
      return { data: item, error }
   }

   async updateOrder(id: string, updates: Partial<DBOrder>): Promise<SupabaseResponse<Order>> {
      const { data, error } = await supabase
         .from('orders')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Order>(data);
      return { data: item, error }
   }

   async deleteOrder(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('orders')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const orderService = new OrderService();

export default orderService;