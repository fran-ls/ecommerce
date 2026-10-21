import { Package, PackageCheck, PackageSearch, PackageX, Truck } from "lucide-react";
import type { OrderStatTotals } from "../types/order.types";
import StatCard from "../../product/components/StatCard";

interface OrderStatsProps {
   totals: OrderStatTotals;
}

const OrderStats = ({ totals }: OrderStatsProps) => {
   return (
      <div className="mb-6 flex flex-wrap items-center gap-4 *:grow">
         <StatCard
            title="Total pedidos"
            value={totals.items}
            icon={
               <Package className="w-5 h-5" />
            }
         />

         <StatCard
            title="Pendientes"
            value={totals.pending}
            icon={
               <PackageX className="w-5 h-5" />
            }
         />

         <StatCard
            title="Procesando"
            value={totals.processing}
            icon={
               <PackageSearch className="w-5 h-5" />
            }
         />

         <StatCard
            title="Enviados"
            value={totals.sent}
            icon={
               <Truck className="w-5 h-5" />
            }
         />

         <StatCard
            title="Entregados"
            value={totals.delivered}
            icon={
               <PackageCheck className="w-5 h-5" />
            }
         />
      </div>
   )
}

export default OrderStats;