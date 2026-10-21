import { formatCurrency } from "../../shared/utils/formatCurrency";
import type { CartTotals } from "../types";

interface OrderSummaryProps {
   totals: CartTotals;
   shippingFilled: string;
   onPay: () => void;
}

const OrderSummary = (props: OrderSummaryProps) => {
   const { totals, onPay, shippingFilled } = props;

   return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
         <div className="p-4 border-b border-gray-100">
            <span className="font-bold text-gray-800">Resumen del pedido</span>
         </div>

         <div className="p-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
               <span>Subtotal ({totals.totalItems} items)</span>
               <span className="font-semibold text-gray-800">
                  {formatCurrency(totals.subtotal)}
               </span>
            </div>

            {totals.savings > 0 && (
               <div className="flex justify-between text-sm">
                  <span className="text-green-600">Ahorro total</span>
                  <span className="text-green-600 font-semibold">
                     {formatCurrency(totals.savings)}
                  </span>
               </div>
            )}

            <div className="flex justify-between text-sm text-gray-600">
               <span>Envío</span>
               {totals.shippingCost === 0 ? (
                  <span className="text-green-600 font-semibold">Gratis</span>
               ) : (
                  <span className="font-semibold text-gray-800">
                     {formatCurrency(totals.shippingCost)}
                  </span>
               )}
            </div>

            {totals.subtotal < 100 && (
               <div className="bg-blue-50 rounded-xl px-3 py-2 text-xs text-blue-600">
                  💡 Agrega <strong>{formatCurrency(100 - totals.subtotal)}</strong> más para envío gratis
               </div>
            )}

            <div className="border-t border-gray-100 pt-3 flex justify-between">
               <span className="font-bold text-gray-900">Total</span>
               <span className="font-black text-xl text-gray-900">{formatCurrency(totals.total)}</span>
            </div>
         </div>

         <div className="px-4 pb-4">
            <button
               onClick={onPay}
               disabled={!shippingFilled}
               className={`w-full py-4 rounded-xl font-bold text-base transition-all ${shippingFilled
                  ? "bg-orange-500 hover:bg-orange-600 text-white hover:scale-[1.02] active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
               style={shippingFilled ? { boxShadow: "0 4px 16px rgba(249,115,22,0.35)" } : {}}
            >
               {shippingFilled ? "Confirmar pedido →" : "Completa los datos de envío"}
            </button>

            {!shippingFilled && (
               <p className="text-xs text-center text-gray-400 mt-2">
                  Agrega tus datos de envío para continuar
               </p>
            )}
         </div>
      </div>
   )
}

export default OrderSummary;