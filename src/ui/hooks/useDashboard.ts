import { useState } from "react";
import type { DashboardCounts, DashboardFilters } from "../../shared/types";
import productService from "../../product/services/product.service";
import saleService from "../../sale/services/sale.service";
import buyService from "../../buy/services/buy.service";

const useDashboard = () => {
   const [counts, setCounts] = useState<DashboardCounts>({
      totalProducts: 0,
      totalIncomes: 0,
      totalExpenses: 0,
      totalRevenue: 0,
      totalSales: 0,
      averagePrice: 0,
      unStockProducs: 0,
   });

   const errorMessage = 'Error al obtener datos del dashboard';

   const onCountsChange = (field: keyof typeof counts, value: number) => {
      setCounts({
         ...counts,
         [field]: value
      })
   }

   const getTotals = async (filters: DashboardFilters) => {
      const incomesResp = await saleService.countSaleIncomes(filters);
      const saleResp = await saleService.countSales(filters);
      const expenseResp = await buyService.countBuyInversion(filters);

      if (incomesResp.error || saleResp.error || expenseResp.error) {
         alert(errorMessage);
         throw new Error(errorMessage);
      }

      const incomes = incomesResp.data ? incomesResp.data : 0;
      const expenses = expenseResp.data ? expenseResp.data : 0;

      setCounts({
         ...counts,
         totalIncomes: incomes,
         totalExpenses: expenses,
         totalRevenue: incomes - expenses,
         totalSales: saleResp.data ? saleResp.data : 0
      });
   }

   const getData = async (filters: DashboardFilters) => {
      const productResp = await productService.countProducts();
      const unStockResp = await productService.countUnStockProducts();
      const saleResp = await saleService.countSales(filters);
      const incomesResp = await saleService.countSaleIncomes(filters);
      const expenseResp = await buyService.countBuyInversion(filters);

      if (
         productResp.error || unStockResp.error ||
         saleResp.error || incomesResp.error ||
         expenseResp.error
      ) {
         alert(errorMessage);
         throw new Error(errorMessage);
      }

      const incomes = incomesResp.data ? incomesResp.data : 0;
      const expenses = expenseResp.data ? expenseResp.data : 0;

      setCounts({
         totalProducts: productResp.data ? productResp.data : 0,
         totalIncomes: incomes,
         totalExpenses: expenses,
         totalRevenue: incomes - expenses,
         totalSales: saleResp.data ? saleResp.data : 0,
         averagePrice: 0,
         unStockProducs: unStockResp.data ? unStockResp.data : 0,
      })
   }

   return {
      counts, onCountsChange,
      getData, getTotals
   }
}

export default useDashboard;