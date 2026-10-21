import { useState } from "react";
import type { Order } from "../types/order.types";
import type { DBSaleOrder, SaleOrderDTO } from "../types/saleOrder.types";
import type { CartItem } from "../../cart/types";
import { normalizeToDB } from "../../shared/utils/normalizeData";
import { SALE_ORDER_DB_FIELDS } from "../utils/saleOrder.fields";
import orderService from "../services/order.service";
import saleOrderService from "../services/saleOrder.service";

const useSaleOrder = () => {
   const [orders, setOrders] = useState<Order[]>([]);

   const getOrders = async () => {
      const { data, error } = await orderService.getOrders();
      if (error) throw new Error(error.message);
      data && setOrders(data);
      return data;
   }

   const newSaleOrder = async (order: { cartItems: CartItem[], orderId: string }) => {
      const { cartItems, orderId } = order;

      const orders = cartItems.map(async (p) => {
         const item: SaleOrderDTO = {
            orderId,
            productId: p.id,
            quantity: p.qty,
            price: p.price,
            subtotal: p.qty * p.price
         }

         const dto = normalizeToDB<DBSaleOrder>(item, SALE_ORDER_DB_FIELDS);
         return await saleOrderService.insertSaleOrder(dto);
      });

      return await Promise.all(orders);
   }

   const updateSaleOrder = async (id: string, updates: Partial<SaleOrderDTO>) => {
      const dto = normalizeToDB<DBSaleOrder>(updates, SALE_ORDER_DB_FIELDS);
      const { data, error } = await saleOrderService.updateSaleOrder(id, dto);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const deleteSaleOrder = async (id: string) => {
      const { data, error } = await saleOrderService.deleteSaleOrder(id);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   return {
      orders, getOrders,
      newSaleOrder,
      updateSaleOrder,
      deleteSaleOrder,
   }
}

export default useSaleOrder;