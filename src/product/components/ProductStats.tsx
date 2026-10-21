import { Package, PackageCheck, PackageMinus, PackageX, Percent } from "lucide-react";
import type { Product } from "../types/product.types";
import StatCard from "./StatCard";
import useInventoryTotals from "../hooks/useInventoryTotals";

interface ProductStatsProps {
   products: Product[];
}

const ProductStats = ({ products }: ProductStatsProps) => {
   const totals = useInventoryTotals(products);

   return (
      <div className="mb-6 flex flex-wrap items-center gap-4 *:grow">
         <StatCard
            title="Total Productos"
            value={totals.items}
            icon={
               <Package className="w-5 h-5" />
            }
         />

         <StatCard
            title="En Stock"
            value={totals.inStock}
            icon={
               <PackageCheck className="w-5 h-5" />
            }
         />

         <StatCard
            title="Sin Stock"
            value={totals.unStock}
            icon={
               <PackageX className="w-5 h-5" />
            }
         />

         <StatCard
            title="Stock Bajo"
            value={totals.lowStock}
            icon={
               <PackageMinus className="w-5 h-5" />
            }
         />

         <StatCard
            title="En oferta"
            value={totals.inOffer}
            icon={
               <Percent className="w-5 h-5" />
            }
         />
      </div>
   )
}

export default ProductStats;