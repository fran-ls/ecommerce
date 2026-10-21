import { useEffect, useState } from "react";
import { RefreshCcw, SearchIcon } from "lucide-react";
import type { Product } from "../types/product.types";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import Header from "../../shared/components/Header";
import InventoryItem from "../components/InventoryItem";
import useProduct from "../hooks/useProduct";
import Loader from "../../shared/components/Loader";
import useInventoryTotals from "../hooks/useInventoryTotals";
import InventoryStats from "../components/InventoryStats";

const InventoryPage = () => {
   const [query, setQuery] = useState<string>('');
   const [products, setProducts] = useState<Product[]>([]);
   const [filtereds, setFiltereds] = useState<Product[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const { getProducts } = useProduct();

   const totals = useInventoryTotals(products);

   const getItems = async () => {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data ?? []);
      setIsLoading(false);
   }

   useEffect(() => { getItems() }, []);

   useEffect(() => {
      const data = products.filter(item => {
         const name = item.name.toLowerCase();
         return name.includes(query.toLowerCase())
      });

      setFiltereds(data);
   }, [query]);

   if (isLoading) return <Loader />;

   return (
      <>
         <Header>
            <h1 className="text-xl text-slate-800 font-semibold">
               Control de <span className="font-bold">Inventario</span>
            </h1>
         </Header>

         <main className="p-8 pt-10 text-slate-500 space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-full relative">
                  <SearchIcon className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />

                  <input
                     onChange={(e) => setQuery(e.target.value.trim())}
                     className="w-full border rounded pl-8 pr-3 py-2 text-sm"
                     placeholder="Buscar por nombre..."
                     type="search"
                  />
               </div>

               <button
                  onClick={getItems}
                  className="cursor-pointer uppercase flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded font-bold hover:bg-slate-900 transition text-[12px]"
                  title="Actualizar lista"
               >
                  <RefreshCcw width={16} height={16} /> Actualizar
               </button>
            </div>

            <InventoryStats products={products} />

            <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
               <table className="w-full text-sm text-left inventory-table">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold border-b">
                     <tr>
                        <th className="px-4 py-4">Producto / Categoría</th>
                        <th className="px-4 py-4 text-center">Stock</th>
                        <th className="px-4 py-4">Costo (P.C)</th>
                        <th className="px-4 py-4">Venta (P.V)</th>
                        <th className="px-4 py-4">Oferta</th>
                        <th className="px-4 py-4 text-center">Estado</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {
                        !isLoading
                           ?
                           (query.trim() !== '' ? filtereds : products).map((product) => (
                              <InventoryItem
                                 product={product}
                                 key={product.id}
                              />
                           ))
                           :
                           <tr>
                              <td className="px-4 py-2" colSpan={6}>
                                 <Loader size={3} width={25} height={25} />
                              </td>
                           </tr>
                     }
                  </tbody>
                  <tfoot className="hidden bg-slate-800 text-white font-bold border-t-2 border-slate-700">
                     <tr>
                        <td className="px-4 py-4 text-right text-xs uppercase tracking-wider text-slate-400">Total Inventario</td>
                        <td className="px-4 py-4 text-center text-yellow-400 text-[16px]">
                           {totals.units} <span className="text-[12px] text-white">uds.</span>
                        </td>
                        <td colSpan={2} className="px-4 py-4 text-right text-xs uppercase tracking-wider text-slate-400">Inversión en Stock:</td>
                        <td colSpan={2} className="px-4 py-4 text-emerald-400 text-[16px]">
                           {formatCurrency(totals.stockInversion)}
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </div>
         </main>
      </>
   )
}

export default InventoryPage;