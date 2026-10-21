import type { ClientAddressDTO } from "../../client/types/address.types";
import type { Client, ClientDTO } from "../../client/types/client.types";

export interface CartItem {
   id: string;
   name: string;
   image: string;
   price: number;
   strPrice: string;
   salePrice: number;
   offerPrice: number;
   strSalePrice: string;
   discount: number;
   qty: number;
   isOffer: boolean;
   time: number;
}

export interface CartTotals {
   shippingCost: number;
   total: number;
   subtotal: number;
   savings: number;
   totalItems: number;
}

export type LocalStorageCart = Record<string, LocalCartItem>
export type CartData = Record<string, CartItem>

export interface Cart {
   items: CartItem[];
   total: number;
   totalItems: number;
}

export interface ShippingData {
   client: Client;
   address: ClientAddressDTO;
   clientFilled: string;
   addressFilled: string;
   addressId: string;
   clientErrors: Partial<ClientDTO>;
   addressErrors: Partial<ClientAddressDTO>;
}

export type ShippingDataValue = ClientDTO | ClientAddressDTO;

export type ShippingDataChange = (
   field: keyof ShippingData,
   value: ShippingDataValue
) => void;

export interface LocalCartItem {
   id: string;
   qty: number;
   time: number;
   discount: number;
}