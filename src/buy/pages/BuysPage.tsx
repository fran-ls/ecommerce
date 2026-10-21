import { useEffect } from "react";
import Header from "../../shared/components/Header";
import BuyForm from "../components/BuyForm";
import BuyStats from "../components/BuyStats";
import useBuy from "../hooks/useBuy";
import { formatCurrency } from "../../shared/utils/formatCurrency";

const BuysPage = () => {
   const { buys, totals, products, getBuys, getTotals, getProducts } = useBuy();

   useEffect(() => { getBuys() }, []);
   useEffect(() => { getTotals() }, []);
   useEffect(() => { getProducts() }, []);

   return (
      <>
         <Header>
            <h1 className="text-xl text-slate-800 font-semibold">
               Módulo de <span className="font-bold">Compras</span>
            </h1>
         </Header>

         <main className="p-8 pt-10 text-slate-500">
            <BuyForm
               products={products}
               onLoad={() => {
                  getBuys();
                  getTotals();
               }}
            />

            <BuyStats totals={totals} />

            <section>
               <h2 className="text-lg font-bold mb-4 text-slate-700">
                  Historial de Compras
               </h2>

               <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
                        <tr>
                           <th className="px-4 py-3">Producto</th>
                           <th className="px-4 py-3 text-center">Cantidad</th>
                           <th className="px-4 py-3 text-center">Precio Unit.</th>
                           <th className="px-4 py-3 text-center">Subtotal</th>
                           <th className="px-4 py-3">Proveedor</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 bg-white">
                        {buys.map((item, index) => (
                           <tr
                              className="hover:bg-slate-50"
                              key={index}
                           >
                              <td className="px-4 py-3 font-medium truncate max-w-75">
                                 {item.product.name}
                              </td>
                              <td className="px-4 py-3 text-center">
                                 {item.stock}
                              </td>
                              <td className="px-4 py-3 text-center">
                                 {formatCurrency(item.unitPrice)}
                              </td>
                              <td className="px-4 py-3 text-center font-semibold">
                                 {formatCurrency(item.subtotal)}
                              </td>
                              <td className="px-4 py-3 truncate max-w-60">
                                 -
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
         </main>
      </>
   )
}

export default BuysPage;