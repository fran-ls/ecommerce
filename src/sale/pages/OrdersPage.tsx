import { useEffect, useState } from "react";
import { RefreshCcw, SearchIcon } from "lucide-react";
import type { OrderStatus } from "../types/order.types";
import OrderInput from "../components/OrderInput";
import OrderDetails from "../components/OrderDetails";
import Header from "../../shared/components/Header";
import OrderItem from "../components/OrderItem";
import useOrder from "../hooks/useOrder";
import Loader from "../../shared/components/Loader";
import OrderStats from "../components/OrderStats";

const orderStatus: OrderStatus[] = ['Pendiente', 'Procesando', 'Enviado', 'Entregado'];

const OrdersPage = () => {
   const [filters, setFilters] = useState({
      filter: 'status',
      value: ''
   });

   const {
      filteredOrders, totals, loading, currentOrder,
      getOrders, setCurrentOrder, getFilteredOrders
   } = useOrder();

   useEffect(() => { getOrders() }, []);
   useEffect(() => { getFilteredOrders(filters) }, [filters]);

   if (loading) return <Loader />;

   return (
      <>
         <Header>
            <h1 className="text-xl text-slate-800 font-semibold">
               Gestión de <span className="font-bold">Pedidos</span>
            </h1>
         </Header>

         <main className="p-8 pt-10 text-slate-500">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 bg-white items-end">
               <div className="uppercase md:col-span-2">
                  <OrderInput
                     label="Buscar pedido o cliente"
                     placeholder="Buscar..."
                     type="search"
                     icon={
                        <SearchIcon className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
                     }
                     onChange={(value) => setFilters({
                        filter: 'id, client',
                        value
                     })}
                  />
               </div>

               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Fitrar por estado</label>
                  <select
                     onChange={(e) => setFilters({
                        filter: 'status',
                        value: e.target.value
                     })}
                     className="w-full border rounded px-2 py-[5.5px] text-sm bg-white"
                  >
                     <option value="">Todos los pedidos</option>
                     {
                        orderStatus.map(status => (
                           <option value={status} key={status}>
                              {status !== 'Procesando' ? `${status}s` : status}
                           </option>
                        ))
                     }
                  </select>
               </div>

               <button
                  onClick={getOrders}
                  className="cursor-pointer flex gap-2 items-center justify-center bg-slate-800 text-white px-2 py-1.75 rounded font-bold hover:bg-slate-900 transition text-sm"
               >
                  <RefreshCcw width={16} height={16} /> Actualizar
               </button>
            </section>

            <OrderStats totals={totals} />

            <section>
               <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
                  <table className="w-full text-sm text-left">
                     <thead className="border-b bg-slate-50 text-slate-600 uppercase text-xs font-bold">
                        <tr>
                           <th className="px-4 py-3">ID</th>
                           <th className="px-4 py-3">Cliente</th>
                           <th className="px-4 py-3 text-center">Items</th>
                           <th className="px-4 py-3">Total</th>
                           <th className="px-4 py-3">Estado</th>
                           <th className="px-4 py-3">Fecha</th>
                           <th className="px-4 py-3 text-right">Acción</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 bg-white">
                        {filteredOrders.map((order) => (
                           <OrderItem
                              item={order}
                              orderStatus={orderStatus}
                              onActiveItem={() => setCurrentOrder(order)}
                              key={order.id}
                           />
                        ))}
                     </tbody>
                  </table>
               </div>

               {currentOrder &&
                  <OrderDetails
                     order={currentOrder}
                     onClose={() => setCurrentOrder(null)}
                  />
               }
            </section>
         </main>
      </>
   )
}

export default OrdersPage;