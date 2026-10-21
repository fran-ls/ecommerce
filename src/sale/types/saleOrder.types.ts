import type { OrderProduct } from "./order.types";

export interface DBSaleOrder {
   id: string;
   order_id: string;
   product_id: string;
   quantity: number;
   price: number;
   subtotal: number;
}

export interface SaleOrder {
   id: string;
   orderId: string;
   product: OrderProduct;
   quantity: number;
   price: number;
   subtotal: number;
   createdAt: Date;
}

export interface SaleOrderDTO {
   orderId: string;
   productId: string;
   quantity: number;
   price: number;
   subtotal: number;
}