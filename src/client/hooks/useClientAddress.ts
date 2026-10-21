import addressService from "../services/address.service";
import type { ClientAddressDTO } from "../types/address.types";
import { normalizeToDB } from "../../shared/utils/normalizeData";
import { ADDRESS_DB_FIELDS } from "../utils/client.fields";

const useClientAddress = () => {
   const getAddresses = async (clientId = '') => {
      const { data, error } = await (
         clientId ? addressService.getAddressesByClient(clientId) : addressService.getAddresses()
      );

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const newAddress = async (address: ClientAddressDTO) => {
      const dto = normalizeToDB<any>(address, ADDRESS_DB_FIELDS);
      const { data, error } = await addressService.insertAddress(dto);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const updateAddress = async (id: string, address: Partial<ClientAddressDTO>) => {
      const updates = normalizeToDB<any>(address, ADDRESS_DB_FIELDS);
      const { data, error } = await addressService.updateAddress(id, updates);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const deleteAddress = async (id: string) => {
      const { data, error } = await addressService.deleteAddress(id);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   return {
      getAddresses,
      newAddress,
      updateAddress,
      deleteAddress,
   }
}

export default useClientAddress;