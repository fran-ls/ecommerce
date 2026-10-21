import { CircleDollarSign, Package, ShoppingCart } from "lucide-react";
import type { SaleStatTotals } from "../types/sale.types";
import StatCard from "../../product/components/StatCard";
import { formatCurrency } from "../../shared/utils/formatCurrency";

interface SaleStatsProps {
   totals: SaleStatTotals;
}

const SaleStats = ({ totals }: SaleStatsProps) => {
   return (
      <div className="mb-6 flex flex-wrap items-center gap-4 *:grow">
         <StatCard
            title="Total Ventas"
            value={totals.sales}
            icon={
               <ShoppingCart className="w-5 h-5" />
            }
         />

         <StatCard
            title="Total Ingresos"
            value={formatCurrency(totals.incomes)}
            icon={
               <CircleDollarSign className="w-5 h-5" />
            }
         />

         <StatCard
            title="Total Productos"
            value={totals.items}
            icon={
               <Package className="w-5 h-5" />
            }
         />
      </div>
   )
}

export default SaleStats;