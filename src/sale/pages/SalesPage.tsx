import { useEffect } from "react";
import Header from "../../shared/components/Header";
import SaleInput from "../components/SaleInput";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import SaleStats from "../components/SaleStats";
import useSale from "../hooks/useSale";

const SalesPage = () => {
   const { sales, totals, getSales, getTotals } = useSale();

   useEffect(() => { getSales() }, []);
   useEffect(() => { getTotals() }, []);

   return (
      <>
         <Header>
            <h1 className="text-xl text-slate-800 font-semibold">
               Módulo de <span className="font-bold">Ventas</span>
            </h1>
         </Header>

         <main className="p-8 pt-10 text-slate-500">
            <section className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10 bg-white border rounded-xl p-6 items-end">
               <SaleInput
                  label="Producto"
                  placeholder="Buscar..."
                  type="search"
               />

               <SaleInput
                  classSelector="sale-price"
                  label="Cantidad"
                  placeholder="1"
                  type="number"
               />

               <SaleInput
                  label="Precio Venta (Auto)"
                  placeholder="70"
                  type="number"
               />

               <SaleInput
                  label="Fecha"
                  type="date"
               />

               <button
                  className="bg-slate-800 text-white px-2 py-1.75 rounded font-bold hover:bg-slate-900 transition"
               >
                  Registrar venta
               </button>
            </section>

            <SaleStats totals={totals} />

            <section>
               <h2 className="text-lg font-semibold mb-4 text-slate-800">Historial de Ventas</h2>

               <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
                        <tr>
                           <th className="px-4 py-3">Cliente</th>
                           <th className="px-4 py-3 text-center">Items</th>
                           <th className="px-4 py-3 text-center">Total</th>
                           <th className="px-4 py-3 text-center">Fecha</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 bg-white">
                        {sales.map((sale, index) => {
                           const splitDate = new Date(sale.createdAt).toLocaleDateString('es-SV', {
                              dateStyle: 'medium'
                           }).split(' ');

                           const date = `${splitDate[0].padStart(2, '0')}/${splitDate.slice(1).join('/')}`;

                           return (
                              <tr
                                 className="hover:bg-slate-50"
                                 key={index}
                              >
                                 <td
                                    className="px-4 py-3 font-medium truncate max-w-75"
                                    title={sale.client.name}
                                 >
                                    {sale.client.name}
                                 </td>
                                 <td className="px-4 py-3 text-center">
                                    {sale.items}
                                 </td>
                                 <td className="px-4 py-3 text-center font-semibold">
                                    {formatCurrency(sale.total)}
                                 </td>
                                 <td className="px-4 py-3 text-center">
                                    {date}
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               </div>
            </section>
         </main>
      </>
   )
}

export default SalesPage;