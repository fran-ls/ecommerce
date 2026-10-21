import type { ClientAddress, ClientAddressDTO } from '../types/address.types';
import type { SupabaseResponse } from '../../shared/types';
import supabase from '../../shared/utils/supabase'
import { normalizeToJS } from '../../shared/utils/normalizeData';

class ClientAddressService {
   async getAddresses(): Promise<SupabaseResponse<ClientAddress[]>> {
      const { data, error } = await supabase.from('addresses').select('*');
      const addresss = !data ? data : data.map(d => normalizeToJS<ClientAddress>(d));
      return { data: addresss, error }
   }

   async getAddressesByClient(clientId: string): Promise<SupabaseResponse<ClientAddress[]>> {
      const { data, error } = await supabase
         .from('addresses')
         .select('*')
         .eq('client_id', clientId);
      const addresss = !data ? data : data.map(d => normalizeToJS<ClientAddress>(d));
      return { data: addresss, error }
   }

   async getAddressesByPhone(phone: string): Promise<SupabaseResponse<ClientAddress[]>> {
      const { data, error } = await supabase
         .from('addresses')
         .select('*')
         .eq('phone', phone);
      const addresss = !data ? data : data.map(d => normalizeToJS<ClientAddress>(d));
      return { data: addresss, error }
   }

   async insertAddress(address: ClientAddressDTO): Promise<SupabaseResponse<ClientAddress>> {
      const { data, error } = await supabase
         .from('addresses')
         .insert([address])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<ClientAddress>(data);
      return { data: item, error }
   }

   async updateAddress(id: string, updates: Partial<ClientAddressDTO>): Promise<SupabaseResponse<ClientAddress>> {
      const { data, error } = await supabase
         .from('addresses')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<ClientAddress>(data);
      return { data: item, error }
   }

   async deleteAddress(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('addresses')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const addressService = new ClientAddressService();

export default addressService;