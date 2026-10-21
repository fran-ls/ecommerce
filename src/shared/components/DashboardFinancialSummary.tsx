import type { DashboardCounts } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

const DashboardFinancialSummary = ({ counts }: { counts: DashboardCounts }) => {
   return (
      <div className="bg-white border rounded-xl p-6">
         <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Resumen financiero
         </h2>

         <div className="space-y-2">
            <div className="flex justify-between items-center">
               <span className="text-gray-500">Ingresos</span>
               <p className="font-bold text-green-600">
                  {formatCurrency(counts.totalIncomes)}
               </p>
            </div>

            <div className="border-y py-2 border-gray-200 flex justify-between items-center">
               <span className="text-gray-500">Gastos</span>
               <b className="font-bold text-red-600">
                  {formatCurrency(counts.totalExpenses)}
               </b>
            </div>

            <div className="border-gray-200 flex justify-between items-center">
               <span className="text-gray-500">Ganancia real</span>
               <p className="font-bold text-purple-600">
                  {formatCurrency(counts.totalRevenue)}
               </p>
            </div>
         </div>
      </div>
   )
}

export default DashboardFinancialSummary;