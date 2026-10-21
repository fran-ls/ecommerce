import { CircleDollarSign, Package, ShoppingCart } from "lucide-react";
import type { BuyStatTotals } from "../types/buy.types";
import StatCard from "../../product/components/StatCard";
import { formatCurrency } from "../../shared/utils/formatCurrency";

interface BuyStatsProps {
   totals: BuyStatTotals;
}

const BuyStats = ({ totals }: BuyStatsProps) => {
   return (
      <div className="mb-6 flex flex-wrap items-center gap-4 *:grow">
         <StatCard
            title="Total Compras"
            value={totals.buys}
            icon={
               <ShoppingCart className="w-5 h-5" />
            }
         />

         <StatCard
            title="Total Inversión"
            value={formatCurrency(totals.inversion)}
            icon={
               <CircleDollarSign className="w-5 h-5" />
            }
         />

         <StatCard
            title="Total Inventario"
            value={totals.stock}
            icon={
               <Package className="w-5 h-5" />
            }
         />
      </div>
   )
}

export default BuyStats;