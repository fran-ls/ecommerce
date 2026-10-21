import clientService from "../services/client.service";
import type { Client, ClientDTO } from "../types/client.types";
import { normalizeToDB } from "../../shared/utils/normalizeData";
import { CLIENT_DB_FIELDS } from "../utils/client.fields";

const useClient = () => {
   const getClients = async (phone = '') => {
      const { data, error } = await (
         !phone ? clientService.getClients() : clientService.getClientsByPhone(phone)
      );

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const newClient = async (client: ClientDTO) => {
      const dto = normalizeToDB<Client>(client, CLIENT_DB_FIELDS);
      const { data, error } = await clientService.insertClient(dto);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const updateClient = async (id: string, client: Partial<ClientDTO>) => {
      const updates = normalizeToDB<Client>(client, CLIENT_DB_FIELDS);
      const { data, error } = await clientService.updateClient(id, updates);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const deleteClient = async (id: string) => {
      const { data, error } = await clientService.deleteClient(id);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   return {
      getClients,
      newClient,
      updateClient,
      deleteClient,
   }
}

export default useClient;