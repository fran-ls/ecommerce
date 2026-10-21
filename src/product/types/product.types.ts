import type { ProductCategory } from "../../category/types/category.types";
import type { ProductImage } from "./productImage.types";

export interface DBProduct {
   id: string;
   name: string;
   description: string;
   key_features: string;
   stock: number;
   purchase_price: number;
   sale_price: number;
   offer_price: number;
   brand: string;
   color: string;
   stock_status: ProductStockStatus;
   status_tag: ProductStatusTag;
   category_id: string;
   is_offer: boolean;
   is_stock: boolean;
}

export interface Product {
   id: string;
   name: string;
   description: string;
   keyFeatures: string;
   stock: number;
   purchasePrice: number;
   salePrice: number;
   offerPrice: number;
   brand: string;
   color: string;
   stockStatus: ProductStockStatus;
   statusTag: ProductStatusTag;
   isOffer: boolean;
   isStock: boolean;
   images: ProductImage[];
   imgs: ProductImgs;
   category: ProductCategory;
   createdAt: Date;
}

export type ProductDTO = {
   name: string;
   description: string;
   keyFeatures: string;
   stock: number;
   purchasePrice: number;
   salePrice: number;
   offerPrice: number;
   brand: string;
   color: string;
   stockStatus: ProductStockStatus;
   statusTag: ProductStatusTag;
   isOffer: boolean;
   isStock: boolean;
   categoryId: string;
}

export const STOCK_STATUS = {
   ok: 'Normal',
   low: 'Bajo',
   spent: 'Agotado',
} as const;

export const PRODUCT_STATUS_TAGS = {
   new: 'Nuevo',
   offer: 'Oferta',
   featured: 'Destacado',
} as const;

export type ProductStockStatus = typeof STOCK_STATUS[keyof typeof STOCK_STATUS];
export type StockStatusKey = keyof typeof STOCK_STATUS;

export type ProductStatusTag = typeof PRODUCT_STATUS_TAGS[keyof typeof PRODUCT_STATUS_TAGS];
export type ProductStatusTagKey = keyof typeof PRODUCT_STATUS_TAGS;

export type PriceRange = [number, number];

export interface ProductImgs {
   main: ProductImage;
   all: ProductImage[];
   optionals: ProductImage[];
}