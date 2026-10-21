import type { Client, ClientDTO } from '../types/client.types';
import type { SupabaseResponse } from '../../shared/types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class ClientService {
   async getClients(): Promise<SupabaseResponse<Client[]>> {
      const { data, error } = await supabase.from('clients').select('*');
      const clients = !data ? data : data.map(d => normalizeToJS<Client>(d));
      return { data: clients, error }
   }

   async getClientsByPhone(phone: string): Promise<SupabaseResponse<Client[]>> {
      const { data, error } = await supabase
         .from('clients')
         .select('*')
         .eq('phone', phone);
      const clients = !data ? data : data.map(d => normalizeToJS<Client>(d));
      return { data: clients, error }
   }

   async insertClient(client: ClientDTO): Promise<SupabaseResponse<Client>> {
      const { data, error } = await supabase
         .from('clients')
         .insert([client])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Client>(data);
      return { data: item, error }
   }

   async updateClient(id: string, updates: Partial<ClientDTO>): Promise<SupabaseResponse<Client>> {
      const { data, error } = await supabase
         .from('clients')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<Client>(data);
      return { data: item, error }
   }

   async deleteClient(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('clients')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const clientService = new ClientService();

export default clientService;