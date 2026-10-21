import type { ClientAddress } from "../../client/types/address.types";
import type { Client } from "../../client/types/client.types";

export interface DBOrder {
   sale_id: string;
   client_id: string;
   address_id: string;
   status: OrderStatus;
}

export interface Order {
   id: string;
   sale: OrderSale;
   client: Client;
   address: ClientAddress;
   status: OrderStatus;
   createdAt: Date;
}

export interface OrderDTO {
   saleId: string;
   clientId: string;
   addressId: string;
   status: OrderStatus;
}

export interface OrderProduct {
   id: string;
   name: string;
}

export interface OrderSale {
   id: string;
   items: number;
   total: number;
   shippingCost: number;
}

export type OrderStatus = 'Pendiente' | 'Procesando' | 'Enviado' | 'Entregado';

export interface OrderStatTotals {
   items: number;
   pending: number;
   processing: number;
   sent: number;
   delivered: number;
}