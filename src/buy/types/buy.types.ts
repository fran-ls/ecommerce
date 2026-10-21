import type { Supplier } from "./supplier.types";

export interface DBBuy {
   product_id: string;
   supplier_id?: string;
   stock: number;
   unit_price: number;
   subtotal: number;
   purchase_date: string;
}

export interface Buy {
   id: string;
   product: Product;
   stock: number;
   unitPrice: number;
   subtotal: number;
   supplier: Supplier;
   purchaseDate: string;
}

export interface BuyDTO {
   productId: string;
   supplierId: string;
   stock: number;
   unitPrice: number;
   subtotal: number;
   purchaseDate: string;
}

interface Product {
   id: string;
   name: string;
}

export interface BuyStatTotals {
   buys: number;
   inversion: number;
   stock: number;
}