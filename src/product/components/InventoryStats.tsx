import { CircleDollarSignIcon, PackageCheckIcon, PackageIcon, PackageMinusIcon, PackageXIcon } from "lucide-react";
import type { Product } from "../types/product.types";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import useInventoryTotals from "../hooks/useInventoryTotals";
import StatCard from "./StatCard";

interface InventoryStatsProps {
   products: Product[];
}

const InventoryStats = ({ products }: InventoryStatsProps) => {
   const totals = useInventoryTotals(products);

   return (
      <div className="flex flex-wrap items-center gap-4 *:grow">
         <StatCard
            title="Total Inversión"
            value={formatCurrency(totals.stockInversion)}
            icon={
               <CircleDollarSignIcon className="w-5 h-5" />
            }
         />

         <StatCard
            title="Total Inventario"
            value={totals.units}
            unitMeasure="uds."
            icon={
               <PackageIcon className="w-5 h-5" />
            }
         />

         <StatCard
            title="En Stock"
            value={totals.inStock}
            icon={
               <PackageCheckIcon className="w-5 h-5" />
            }
         />

         <StatCard
            title="Sin Stock"
            value={totals.unStock}
            icon={
               <PackageXIcon className="w-5 h-5" />
            }
         />

         <StatCard
            title="Stock Bajo"
            value={totals.lowStock}
            icon={
               <PackageMinusIcon className="w-5 h-5" />
            }
         />
      </div>
   )
}

export default InventoryStats;