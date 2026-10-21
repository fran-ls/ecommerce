import { useState } from "react";
import type { Cart, CartTotals, ShippingData } from "../types";
import type { ClientAddress } from "../../client/types/address.types";
import type { ClientDTO } from "../../client/types/client.types";
import useClientAddress from "../../client/hooks/useClientAddress";
import { addressState, clientState } from "../../client/utils/client.state";
import useClient from "../../client/hooks/useClient";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
import saleService from "../../sale/services/sale.service";
import orderService from "../../sale/services/order.service";
import useSaleOrder from "../../sale/hooks/useSaleOrder";

interface Data {
   cart: Cart;
   totals: CartTotals;
   onResetCart: () => void;
}

const useShipping = ({ cart, totals, onResetCart }: Data) => {
   const [clientAddresses, setClientAddresses] = useState<ClientAddress[]>([]);
   const [orderPlaced, setOrderPlaced] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);

   const [shippingData, setShippingData] = useState<ShippingData>({
      client: { ...clientState, id: '' },
      address: addressState,
      clientFilled: '',
      addressFilled: '',
      addressId: '',
      clientErrors: {},
      addressErrors: {},
   });

   const client = shippingData.client;
   const address = shippingData.address;
   const ids = {
      addressId: shippingData.addressId,
      clientId: shippingData.client.id,
   }

   const { setItem } = useLocalStorage();
   const { newAddress, updateAddress, getAddresses } = useClientAddress();
   const { newClient, getClients } = useClient();
   const { newSaleOrder } = useSaleOrder();

   const getClient = async () => {
      const phone = client.phone.replace(/\D/g, '');
      if (phone.length < 8) return null;
      const data = await getClients(phone);
      if (!data || data.length <= 0) return null;
      return data[0];
   }

   const getShippingData = async () => {
      const dbClient = await getClient();

      if (!dbClient || !dbClient.id) {
         setShippingData((prev) => ({
            ...prev,
            client: {
               ...clientState,
               phone: prev.client.phone,
               id: '',
            },
            address: addressState,
            clientFilled: '',
            addressFilled: ''
         }));

         setClientAddresses([]);
         return;
      }

      const data = await getAddresses(dbClient.id);

      if (!data || data.length <= 0) {
         setShippingData((prev) => ({
            ...prev,
            address: addressState,
            client: dbClient,
            addressFilled: '',
            clientFilled: dbClient.id && dbClient.name && dbClient.phone && dbClient.email,
         }));

         setClientAddresses([]);
         return;
      }

      setClientAddresses(data);

      setShippingData({
         ...shippingData,
         client: dbClient,
         clientFilled: dbClient.id && dbClient.name && dbClient.phone && dbClient.email,
      });
   }

   const validate = () => {
      const e: Partial<ClientDTO> = {};
      const e1: Partial<ClientAddress> = {};

      if (!client.name.trim()) e.name = "El nombre es requerido";
      if (!client.phone.trim()) e.phone = "El teléfono es requerido";
      if (!client.email.trim()) e.email = "El correo es requerido";
      else if (!/\S+@\S+\.\S+/.test(client.email)) e.email = "Correo inválido";

      if (!address.department.trim()) e1.department = "El departamento es requerido";
      if (!address.city.trim()) e1.city = "La ciudad es requerida";
      if (!address.address.trim()) e1.address = "La dirección es requerida";

      setShippingData({
         ...shippingData,
         clientErrors: e,
         addressErrors: e1,
      });

      return Object.keys(e).length === 0 && Object.keys(e1).length === 0;
   }

   const onSave = async () => {
      if (!validate() || cart.totalItems === 0) return;

      const addressId = ids.addressId;
      let clientId = client.id;

      if (clientId && !addressId) {
         const data = await newAddress({ ...address, clientId })
         if (!data?.id) throw new Error('Error al guardar dirección');
         setModalOpen(false);
         return;
      }

      if (clientId && addressId) {
         const update = await updateAddress(addressId, address);
         if (!update?.id) throw new Error('Error al actualizar dirección');
         setModalOpen(false);
         return;
      }

      const clientDTO: ClientDTO & { id?: string } = { ...client };
      delete clientDTO.id;

      const dbClient = await newClient(clientDTO);
      if (!dbClient?.id) throw new Error('Error al guardar cliente');

      clientId = dbClient?.id;

      const data = await newAddress({ ...address, clientId })
      if (!data?.id) throw new Error('Error al guardar dirección');
      setModalOpen(false);

      setItem('user', client.phone);
   }

   const onPay = async () => {
      if (!client.id) return ('El cliente es requerido');

      const sale = await saleService.insertSale({
         client_id: client.id,
         items: totals.totalItems,
         total: totals.total,
         shipping_cost: totals.shippingCost
      });

      if (sale.error || !sale.data?.id) {
         throw new Error('Error al procesar venta');
      }

      const order = await orderService.insertOrder({
         client_id: client.id,
         sale_id: sale.data.id,
         address_id: ids.addressId,
         status: 'Pendiente',
      });

      if (order.error || !order.data?.id) {
         throw new Error('Error al procesar orden venta');
      }

      const saleOrders = await newSaleOrder({
         cartItems: cart.items,
         orderId: order.data.id
      });

      for (const { error } of saleOrders) {
         if (error) return alert('Error al procesar orden');
      }

      setOrderPlaced(true);
      onResetCart();
      return saleOrders;
   }

   return {
      modalOpen, setModalOpen,
      orderPlaced, setOrderPlaced,
      shippingData, setShippingData,
      clientAddresses, setClientAddresses,
      getShippingData, onSave, onPay
   }
}

export default useShipping;