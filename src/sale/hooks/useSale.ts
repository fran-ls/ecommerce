import { useState } from "react";
import type { Sale, SaleStatTotals } from "../types/sale.types";
import type { DashboardFilters } from "../../shared/types";
import saleService from "../services/sale.service";

export default function useSale() {
   const [sales, setSales] = useState<Sale[]>([]);
   const [totals, setTotals] = useState<SaleStatTotals>({
      sales: 0,
      incomes: 0,
      items: 0,
   });

   const getSales = async () => {
      const { data, error } = await saleService.getSales();

      if (error) {
         const message = 'Error al obtener ventas';
         alert(message);
         throw new Error(message);
      }

      data && setSales(data);

      return data;
   }

   const getTotals = async () => {
      const filters: DashboardFilters = {
         period: 'month'
      }

      const salesResp = await saleService.countSales(filters);
      const incomeResp = await saleService.countSaleIncomes(filters);
      const itemsResp = await saleService.countSaleItems(filters);

      if (salesResp.error || incomeResp.error || itemsResp.error) {
         const message = 'Error al obtener totales';
         alert(message);
         throw new Error(message);
      }

      setTotals({
         sales: salesResp.data ?? 0,
         incomes: incomeResp.data ?? 0,
         items: itemsResp.data ?? 0,
      });
   }

   return {
      sales, totals,
      getSales, getTotals
   }
}