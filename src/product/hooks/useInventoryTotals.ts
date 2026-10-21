import { useMemo } from "react";
import type { Product } from "../types/product.types";
import { MIN_STOK } from "../utils/getStockStatus";

export default function useInventoryTotals(products: Product[]) {
   const getTotals = () => {
      return products.reduce((acc, p) => {
         acc.inOffer = p.isOffer ? acc.inOffer += 1 : acc.inOffer;
         acc.stockInversion += p.purchasePrice * p.stock;
         acc.units += p.stock;

         if (p.stock <= 0) {
            acc.unStock++;
         } else if (p.stock <= MIN_STOK) {
            acc.inStock++;
            acc.lowStock++;
         } else {
            acc.inStock++;
         }

         return acc;
      }, {
         inStock: 0,
         unStock: 0,
         lowStock: 0,
         inOffer: 0,
         units: 0,
         stockInversion: 0,
         items: products.length
      });
   }

   return useMemo(() => (getTotals()), [products]);
}