import { useMemo, useState } from "react";
import type { Order, OrderStatTotals } from "../types/order.types";
import type { SaleOrder } from "../types/saleOrder.types";
import orderService from "../services/order.service";
import saleOrderService from "../services/saleOrder.service";

const useOrder = () => {
   const [orders, setOrders] = useState<Order[]>([]);
   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
   const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
   const [orderDetails, setOrderDetails] = useState<SaleOrder[]>([]);
   const [detailLoading, setDetailLoading] = useState(false);
   const [loading, setLoading] = useState(false);

   const getTotals = (): OrderStatTotals => {
      return orders.reduce((acc, o) => {
         if (o.status === 'Pendiente') {
            acc.pending += 1;
         }
         else if (o.status === 'Procesando') {
            acc.processing += 1;

         }
         else if (o.status === 'Enviado') {
            acc.sent += 1;

         }
         else if (o.status === 'Entregado') {
            acc.delivered += 1;
         }

         acc.items = orders.length;
         return acc;
      }, {
         items: 0,
         pending: 0,
         processing: 0,
         sent: 0,
         delivered: 0
      });
   }

   const totals = useMemo(() => (getTotals()), [orders]);

   const getOrders = async () => {
      setLoading(true);
      const { data, error } = await orderService.getOrders();

      if (error) {
         setLoading(false);
         throw new Error('Error al obtener ordenes');
      }

      if (data) {
         setOrders(data);
         setFilteredOrders(data);
      }

      setLoading(false);
      return data;
   }

   const getOrderDetails = async (orderId: string) => {
      setDetailLoading(true);
      const { data, error } = await saleOrderService.getOrderDetails(orderId);

      if (error) {
         setDetailLoading(false);
         throw new Error('Error al obtener el detalle de la orden');
      }

      data && setOrderDetails(data);
      setDetailLoading(false);
      return data;
   }

   const getFilteredOrders = ({ filter, value }: { filter: string, value: string }) => {
      if (!value) {
         setFilteredOrders(orders);
         return orders;
      }

      filter = filter.toLowerCase();
      value = value.toLowerCase();

      if (filter.includes(',')) {
         const filters = filter.split(',').map(f => f.trim());

         const data = filters.map(f => {
            const items = orders.filter((order: any) => {
               const name = order['client'].name.toLowerCase();
               return (f === 'client')
                  ? f in order && name.includes(value)
                  : f in order && order[f] === value
            });

            return items;
         });

         const filtereds = data.flat(data.length) as Order[];
         setFilteredOrders(filtereds);
         return;
      }

      const f = filter;

      const filtereds = orders.filter((order: any) => (
         f in order && order[f].toLowerCase() === value
      ));

      setFilteredOrders(filtereds);
      return filtereds;
   }

   return {
      filteredOrders, detailLoading,
      totals, getOrders,
      orders, setOrders,
      loading, setLoading,
      orderDetails, setOrderDetails,
      currentOrder, setCurrentOrder,
      newOrder: orderService.insertOrder,
      updateOrder: orderService.updateOrder,
      getOrderDetails, getFilteredOrders
   }
}

export default useOrder;