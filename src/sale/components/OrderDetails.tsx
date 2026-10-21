import { useEffect } from "react";
import { Mail, Phone, User, X, MapPin, Printer } from "lucide-react";
import type { Order } from "../types/order.types";
import useOrder from "../hooks/useOrder";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import Loader from "../../shared/components/Loader";

interface OrderDetailsProps {
   order: Order;
   onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
   const { orderDetails, detailLoading, getOrderDetails } = useOrder();

   const total = formatCurrency(order.sale.total);
   const address = order.address;
   const fullAddress = `${address.department}, ${address.city}, ${address.address}`;
   const subtotal = order.sale.total - order.sale.shippingCost;

   useEffect(() => { getOrderDetails(order.id) }, []);

   return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
         {
            !detailLoading
               ?
               <div className="rounded-xl border shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-4 bg-slate-800 text-white flex justify-between items-center rounded-t-xl">
                     <h2 className="font-bold uppercase tracking-wider text-sm">
                        Detalle de Pedido #{order.id}
                     </h2>
                     <button
                        onClick={onClose}
                        className="cursor-pointer"
                     >
                        <X width={20} height={20} />
                     </button>
                  </div>

                  <div className="bg-white">
                     <div className="space-y-6 p-6 overflow-y-auto max-h-[70vh]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="border rounded-xl p-4 bg-slate-50">
                              <h3 className="text-xs font-black text-slate-500 uppercase mb-3 flex items-center gap-2">
                                 Datos del Cliente
                              </h3>
                              <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                 <User className="min-w-3" width={13} height={13} />
                                 <p
                                    className="font-semibold text-slate-800 truncate"
                                    title={order.client.name}
                                 >
                                    {order.client.name}
                                 </p>
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                 <Mail className="min-w-3" width={13} height={13} />
                                 <p
                                    className="truncate"
                                    title={order.client.email}
                                 >
                                    {order.client.email}
                                 </p>
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                 <Phone className="min-w-3" width={13} height={13} />
                                 <p
                                    className="truncate"
                                    title={order.client.phone}
                                 >
                                    {order.client.phone}
                                 </p>
                              </div>
                           </div>

                           <div className="border rounded-xl p-4 bg-slate-50">
                              <h3 className="text-xs font-black text-slate-500 uppercase mb-3 flex items-center gap-1">
                                 <MapPin className="min-w-3.5" width={14} height={14} />
                                 Dirección de entrega
                              </h3>
                              <div className="text-sm text-slate-500 mt-1">
                                 <p
                                    className="line-clamp-5"
                                    title={fullAddress}
                                 >
                                    {fullAddress}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden">
                           <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 text-slate-600 font-bold uppercase">
                                 <tr>
                                    <th className="px-4 py-2">Producto</th>
                                    <th className="px-4 py-2 text-center">Cant.</th>
                                    <th className="px-4 py-2 text-right">Precio</th>
                                    <th className="px-4 py-2 text-right">Subtotal</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y">
                                 {
                                    orderDetails.map((item) => (
                                       <tr key={item.id}>
                                          <td
                                             className="px-4 py-2"
                                             title={item.product.name}
                                          >
                                             {item.product.name}
                                          </td>
                                          <td className="px-4 py-2 text-center">
                                             {item.quantity}
                                          </td>
                                          <td className="px-4 py-2 text-right">
                                             {formatCurrency(item.price)}
                                          </td>
                                          <td className="px-4 py-2 text-right font-bold">
                                             {formatCurrency(item.subtotal)}
                                          </td>
                                       </tr>
                                    ))
                                 }
                              </tbody>
                              <tfoot className="bg-slate-50 font-bold border-t">
                                 <tr>
                                    <td colSpan={3} className="px-4 py-2 text-right text-slate-500">
                                       Subtotal
                                    </td>
                                    <td className="px-4 py-2 text-right font-bold">
                                       {formatCurrency(subtotal)}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td colSpan={3} className="px-4 py-2 text-right text-slate-500">Envío</td>
                                    <td className="px-4 py-2 text-right text-blue-600 font-bold">
                                       {formatCurrency(order.sale.shippingCost)}
                                    </td>
                                 </tr>
                                 <tr className="text-sm bg-slate-800 text-white">
                                    <td colSpan={3} className="px-4 py-3 text-right">TOTAL</td>
                                    <td className="px-4 py-3 text-right text-emerald-400">{total}</td>
                                 </tr>
                              </tfoot>
                           </table>
                        </div>
                     </div>

                     <div className="px-4 pb-4 pt-2 flex justify-end gap-3">
                        <button
                           onClick={() => window.print()}
                           className="cursor-pointer flex items-center gap-2 border-2 border-slate-800 text-slate-800 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-50"
                        >
                           <Printer width={16} height={16} /> Imprimir Ticket
                        </button>
                        <button
                           onClick={onClose}
                           className="cursor-pointer bg-slate-800 text-white px-8 py-2 rounded-xl font-bold text-xs hover:bg-slate-900"
                        >
                           Cerrar
                        </button>
                     </div>
                  </div>
               </div>
               :
               <Loader />
         }
      </div>
   )
}

export default OrderDetails;