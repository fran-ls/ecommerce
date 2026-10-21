import { useEffect, useState } from "react";
import type { ClientDTO } from "../types/client.types";
import type { ShippingData } from "../../cart/types";
import useClient from "./useClient";

interface Data {
   shippingData: ShippingData;
   setShippingData: React.Dispatch<React.SetStateAction<ShippingData>>;
}

const useClientForm = ({ shippingData, setShippingData }: Data) => {
   const [errors, setErrors] = useState<Partial<ClientDTO>>({});
   const [profilePanelOpen, setProfilePanelOpen] = useState(false);
   const [clientId, setClientId] = useState<string>('');

   const client = shippingData.client;

   const { getClients } = useClient();

   const getData = async () => {
      const phone = client.phone.replace(/\D/g, '');
      if (phone.length < 8) return;

      const data = await getClients(client.phone);
      if (!data || phone.length <= 0) return;

      const dbClient = data[0];
      if (!dbClient) return;

      setShippingData({
         ...shippingData,
         client: dbClient,
         clientFilled: dbClient.id && dbClient.name && dbClient.phone && dbClient.email
      });

      setClientId(dbClient.id);
   }

   useEffect(() => { getData() }, [client.phone]);

   const validate = () => {
      const e: Partial<ClientDTO> = {};

      if (!client.name.trim()) e.name = "El nombre es requerido";
      if (!client.phone.trim()) e.phone = "El teléfono es requerido";
      if (!client.email.trim()) e.email = "El correo es requerido";
      else if (!/\S+@\S+\.\S+/.test(client.email)) e.email = "Correo inválido";
      setErrors(e);

      return Object.keys(e).length === 0;
   }

   const onInputChange = (field: keyof ClientDTO, value: string) => {
      setShippingData({
         ...shippingData,
         client: {
            ...client,
            [field]: value
         },
         clientFilled: client.id && client.name && client.phone && client.email
      });

      setErrors({
         ...errors, [field]: ''
      });
   }

   const onSave = async () => {
      if (!validate()) return console.log('saving client...');
      // return await newClient(client);
   }

   return {
      clientId, errors,
      client, onInputChange,
      profilePanelOpen, setProfilePanelOpen,
      onSave,
   }
}

export default useClientForm;