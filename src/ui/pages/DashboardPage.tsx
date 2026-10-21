import { useEffect, useState } from 'react';
import { ShoppingCart, Package, Menu, Calendar, TrendingUp, CircleDollarSign, DollarSign, AlertCircle } from 'lucide-react';
import type { DashboardFilters, PeriodFilter } from '../../shared/types';
import Header from '../../shared/components/Header';
import DashboardCard from '../../shared/components/DashboardCard';
import DashboardFinancialSummary from '../../shared/components/DashboardFinancialSummary';
import { getDate } from '../../shared/utils/getDate';
import useDashboard from '../hooks/useDashboard';
import { formatCurrency } from '../../shared/utils/formatCurrency';

const filterItems: { label: string, filter: PeriodFilter }[] = [
   {
      label: 'Hoy',
      filter: 'day'
   },
   {
      label: 'Semana',
      filter: 'week'
   },
   {
      label: 'Mes',
      filter: 'month'
   },
   {
      label: 'Año',
      filter: 'year'
   }
];

const hideDate = false;

export default function DashboardPage() {
   const [filters, setFilters] = useState<DashboardFilters>({
      period: filterItems[1].filter,
      date: ''
   });

   const { counts, getData, getTotals } = useDashboard();

   useEffect(() => { getData(filters) }, []);
   useEffect(() => { getTotals(filters) }, [filters]);

   return (
      <>
         <Header>
            <h1 className="text-xl text-slate-800 font-semibold">
               Panel de Control
            </h1>

            <div className="flex gap-2">
               {
                  filterItems.map((item) => (
                     <button
                        onClick={() => setFilters({
                           period: item.filter,
                        })}
                        className={`px-3 py-1 rounded text-sm ${filters.period === item.filter ? 'bg-gray-900 text-white' : 'text-gray-600 bg-slate-100-no'}`}
                        key={item.filter}
                     >
                        {item.label}
                     </button>
                  ))
               }
            </div>

            <div className="hidden items-center space-x-2">
               <button className="p-2 hover:bg-gray-100 rounded">
                  <Menu className="w-4 h-4 text-gray-400" />
               </button>
            </div>
         </Header >

         <main className="p-8 pt-10 text-slate-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
               <DashboardCard
                  title='Total Productos'
                  value={counts.totalProducts}
                  icon={
                     <Package className="w-7 h-7 text-amber-700" />
                  }
               />

               <DashboardCard
                  title='Ingresos Totales'
                  value={formatCurrency(counts.totalIncomes)}
                  icon={
                     <CircleDollarSign className="w-7 h-7 text-green-500" />
                  }
               />

               <DashboardCard
                  title='Ganancia Real'
                  value={formatCurrency(counts.totalRevenue)}
                  icon={
                     <TrendingUp className="w-7 h-7 text-purple-500" />
                  }
               />

               <DashboardCard
                  title='Ventas Realizadas'
                  value={counts.totalSales}
                  icon={
                     <ShoppingCart className="w-7 h-7 text-blue-500" />
                  }
               />

               <DashboardCard
                  title='Precio Promedio'
                  value='$30.00'
                  icon={
                     <DollarSign className="w-7 h-7 text-slate-500" />
                  }
               />

               <DashboardCard
                  title='Productos sin stock'
                  value={counts.unStockProducs}
                  icon={
                     <AlertCircle className="w-7 h-7 text-red-500" />
                  }
               />
            </div>

            <DashboardFinancialSummary counts={counts} />

            {!hideDate &&
               <div className="mt-6 flex gap-2 items-center justify-end text-sm text-slate-400">
                  <Calendar className="w-4 h-4" /> Última actualización: {getDate()}
               </div>
            }
         </main>
      </>
   )
}