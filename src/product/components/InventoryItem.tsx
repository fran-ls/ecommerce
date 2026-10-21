import { formatCurrency } from "../../shared/utils/formatCurrency";
import type { Product, StockStatusKey } from "../types/product.types";
import { getStockValues } from "../utils/getStockStatus";

const stockTextColor: Record<StockStatusKey, string> = {
   ok: 'text-slate-600',
   low: 'text-amber-600',
   spent: 'text-red-600'
}

const stockStatusColor: Record<StockStatusKey, string> = {
   ok: `text-emerald-600 bg-emerald-50 border-emerald-100`,
   low: `text-amber-600 bg-amber-50 border-amber-100`,
   spent: `text-red-600 bg-red-50 border-red-100`
}

const InventoryItem = ({ product }: { product: Product }) => {
   const data = getStockValues(product.stock);
   const stockStatus = data.status;
   const stockColor = stockStatusColor[data.key];

   return (
      <tr className="hover:bg-slate-50 transition-colors group">
         <td className="px-4 py-3 flex flex-col">
            <span className="py-2 font-medium truncate max-w-37.5 sm:max-w-full">
               {product.name}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
               {product.category.name}
            </span>
         </td>
         <td className="px-4 py-3 text-center">
            <span className={`text-sm font-black ${stockTextColor[data.key]}`}>
               {product.stock}
            </span>
         </td>
         <td className="px-4 py-3 text-slate-500 italic">
            {formatCurrency(product.purchasePrice)}
         </td>
         <td className="px-4 py-3 text-slate-800 font-semibold text-base">
            {formatCurrency(product.salePrice)}
         </td>
         <td className="px-4 py-3">
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
               {formatCurrency(product.offerPrice)}
            </span>
         </td>
         <td className="px-4 py-3 text-center">
            <span className={`${stockColor} uppercase inline-block px-3 py-1 rounded-full text-[9px] font-black border`}>
               {stockStatus}
            </span>
         </td>
      </tr>
   )
}

export default InventoryItem;