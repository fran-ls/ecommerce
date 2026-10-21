import type { Client } from "../../client/types/client.types";

export interface DBSale {
   client_id: string;
   items: number;
   total: number;
   shipping_cost: number;
}

export interface Sale {
   id: string;
   client: Client;
   items: number;
   total: number;
   shippingCost: number;
   createdAt: Date;
}

export interface SaleDTO {
   clientId: string;
   items: number;
   total: number;
   shippingCost: number;
}

export interface SaleStatTotals {
   sales: number;
   incomes: number;
   items: number;
}