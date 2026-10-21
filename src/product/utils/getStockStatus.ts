import { STOCK_STATUS, type ProductStockStatus, type StockStatusKey } from "../types/product.types";

export const MIN_STOK = 50;

interface StockStatusData {
   status: ProductStockStatus;
   key: StockStatusKey;
}

export const getStockValues = (stock: string | number): StockStatusData => {
   const value = parseInt(`${stock}`);

   if (value > MIN_STOK) return {
      status: STOCK_STATUS.ok,
      key: 'ok'
   }
   else if (value > 0) return {
      status: STOCK_STATUS.low,
      key: 'low'
   }

   return {
      status: STOCK_STATUS.spent,
      key: 'spent'
   }
}

export const getStockStatus = (stock: string | number): ProductStockStatus => {
   const value = parseInt(`${stock}`);
   return (value > MIN_STOK) ?
      STOCK_STATUS.ok : (value > 0) ?
         STOCK_STATUS.low : STOCK_STATUS.spent;
}

export const getStockStatusKey = (stock: string | number): StockStatusKey => {
   const value = parseInt(`${stock}`);
   return (value > MIN_STOK) ? 'ok' : (value > 0) ? 'low' : 'spent';
}