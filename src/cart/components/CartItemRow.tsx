import SmartImage from "../../shared/components/SmartImage";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import type { CartItem } from "../types";
import { MinusIcon, PlusIcon, TrashIcon } from "./Icons";

interface CartItemRowProps {
   item: CartItem;
   onQtyChange: (id: string, delta: number) => void;
   onRemove: (id: string) => void;
}

const CartItemRow = ({ item, onQtyChange, onRemove }: CartItemRowProps) => {
   return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-100 transition-all hover:shadow-sm group">
         <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl shrink-0"
         >
            <SmartImage url={item.image} />
         </div>

         <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm leading-snug mb-1 truncate">
               {item.name}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
               <span className="text-orange-500 font-bold text-base">
                  {item.strPrice}
               </span>

               {item.isOffer && (
                  <>
                     <span className="text-gray-400 text-sm line-through">
                        {item.strSalePrice}
                     </span>

                     <span className="text-xs bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">
                        -{item.discount}%
                     </span>
                  </>
               )}
            </div>
         </div>

         <div className="flex items-center gap-1 rounded-xl p-1 shrink-0">
            <button
               onClick={() => onQtyChange(item.id, item.qty - 1)}
               disabled={item.qty <= 1}
               className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
               <MinusIcon />
            </button>
            <span className="w-7 text-center text-sm font-bold text-gray-800">
               {item.qty}
            </span>
            <button
               onClick={() => onQtyChange(item.id, item.qty + 1)}
               className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors shadow-sm"
            >
               <PlusIcon />
            </button>
         </div>

         <p className="font-bold text-gray-900 text-right shrink-0 w-20">
            {formatCurrency((item.price * item.qty))}
         </p>

         <button
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shrink-0 opacity-0 group-hover:opacity-100"
         >
            <TrashIcon />
         </button>
      </div>
   )
}

export default CartItemRow;