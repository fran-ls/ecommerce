import { useState } from "react";
import type { Order, OrderStatus } from "../types/order.types";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { getFormatDate } from "../../shared/utils/getDate";
import useOrder from "../hooks/useOrder";

const STATUS_COLORS = {
   pendiente: 'text-amber-600 bg-amber-50',
   procesando: 'text-violet-600 bg-violet-50',
   enviado: 'text-blue-600 bg-blue-50',
   entregado: 'text-emerald-600 bg-emerald-50'
}

type Status = keyof typeof STATUS_COLORS;

interface OrderItemProps {
   item: Order;
   orderStatus: OrderStatus[];
   onActiveItem: () => void;
}

const OrderItem = ({ item, orderStatus, onActiveItem }: OrderItemProps) => {
   const { updateOrder } = useOrder();

   const getColor = (status: OrderStatus) => {
      const s = status.toLowerCase() as Status;
      return STATUS_COLORS[s];
   }

   const [values, setValues] = useState({
      status: item.status,
      color: getColor(item.status)
   });

   const onUpdateStatus = async (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
      const status = e.target.value as OrderStatus;
      const { error } = await updateOrder(item.id, { status });

      if (error) {
         return alert('Error al actualizar el estado de la orden');
      }

      setValues({
         status,
         color: getColor(status)
      });
   }

   return (
      <tr
         className="hover:bg-slate-50"
      >
         <td className="px-4 py-3 font-mono text-xs font-bold text-slate-400 truncate min-w-17.5">
            #{item.id}
         </td>
         <td
            className="px-4 py-3 font-medium text-slate-700 truncate max-w-70"
            title={item.client.name}
         >
            {item.client.name}
         </td>
         <td className="px-4 py-3 text-center min-w-20">
            <span className="inline-flex uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">
               {item.sale.items} uds.
            </span>
         </td>
         <td className="px-4 py-3 font-bold text-slate-800">
            {formatCurrency(item.sale.total)}
         </td>
         <td className="px-4 py-3">
            <select
               onChange={onUpdateStatus}
               value={values.status}
               className={`${values.color} text-[10px] font-bold uppercase px-2 py-1 rounded border border-slate-200 outline-none`}
            >
               {
                  orderStatus.map(status => (
                     <option
                        value={status} key={status}
                     >
                        {status}
                     </option>
                  ))
               }
            </select>
         </td>
         <td className="px-4 py-3 text-slate-400 text-xs">
            {getFormatDate(item.createdAt)}
         </td>
         <td className="px-4 py-3 text-right">
            <button
               onClick={() => onActiveItem()}
               className="cursor-pointer uppercase text-blue-600 hover:underline font-bold text-xs"
            >
               Ver detalle
            </button>
         </td>
      </tr>
   )
}

export default OrderItem;