import { useState } from "react";
import type { Buy, BuyStatTotals } from "../types/buy.types";
import type { Product } from "../../product/types/product.types";
import type { DashboardFilters } from "../../shared/types";
import buyService from "../services/buy.service";
import useProduct from "../../product/hooks/useProduct";

export default function useBuy() {
   const [buys, setBuys] = useState<Buy[]>([]);
   const [totals, setTotals] = useState<BuyStatTotals>({
      buys: 0,
      inversion: 0,
      stock: 0,
   });

   const [products, setProducts] = useState<Product[]>([]);

   const { getProducts: getItems } = useProduct();

   const getBuys = async () => {
      const { data, error } = await buyService.getBuys();

      if (error) {
         const message = 'Error al obtener compras';
         alert(message);
         throw new Error(message);
      }

      data && setBuys(data);

      return data;
   }

   const getTotals = async () => {
      const filters: DashboardFilters = {
         period: 'month'
      }

      const buysResp = await buyService.countBuys(filters);
      const inversionResp = await buyService.countBuyInversion(filters);
      const itemsResp = await buyService.countBuyStock(filters);

      if (buysResp.error || inversionResp.error || itemsResp.error) {
         const message = 'Error al obtener totales';
         alert(message);
         throw new Error(message);
      }

      setTotals({
         buys: buysResp.data ?? 0,
         inversion: inversionResp.data ?? 0,
         stock: itemsResp.data ?? 0,
      });
   }

   const getProducts = async () => {
      const data = await getItems();
      data && setProducts(data);
   }

   return {
      buys, totals,
      products, getProducts,
      getBuys, getTotals,
   }
}