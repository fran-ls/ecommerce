import { Save, X } from "lucide-react";
import type { Product } from "../types/product.types";
import Loader from "../../shared/components/Loader";
import { getProductFeatureSlots } from "../utils/getProductFeatureSlots";

interface UpdateProductProps {
   product: Product;
   isLoading: boolean;
   splitFeatures: string[];
   onChange: (field: keyof Product, value: any) => void;
   onFeaturesChange: (value: string, index: number) => void;
   onUpdate: () => void;
   onClose: () => void;
}

const UpdateProduct = ({ product, isLoading, splitFeatures, onChange, onUpdate, onClose, onFeaturesChange }: UpdateProductProps) => {
   const onHandleKey = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') onUpdate();
   }

   if (isLoading) return (
      <tr>
         <td className="h-16.25 px-4 py-2" colSpan={6}>
            <Loader size={3} width={25} height={25} />
         </td>
      </tr>
   )

   /*return (
      <tr className="bg-white hover:bg-slate-50 transition-colors">
         <td className="px-4 py-3 min-w-62.5">
            <div className="space-y-2">
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Nombre
                  </label>
                  <input
                     onChange={(e) => onChange('name', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.name}
                     type="text"
                  />
               </div>
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Descripción
                  </label>
                  <textarea
                     onChange={(e) => onChange('description', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="min-h-15 w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.description}
                     rows={3}
                  />
               </div>
            </div>
         </td>
         <td className="px-4 py-3">
            <div>
               <label className="text-[9px] font-bold text-slate-400 uppercase">
                  Monto
               </label>
               <input
                  onChange={(e) => onChange('salePrice', e.target.value)}
                  onKeyDown={onHandleKey}
                  className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                  defaultValue={product.salePrice}
                  type="number"
               />
            </div>
         </td>
         <td className="px-4 py-3">
            <div>
               <label className="text-[9px] font-bold text-slate-400 uppercase">
                  Oferta
               </label>
               <input
                  onChange={(e) => onChange('offerPrice', e.target.value)}
                  onKeyDown={onHandleKey}
                  className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                  defaultValue={product.offerPrice}
                  type="number"
               />
            </div>
         </td>
         <td className="px-4 py-3">
            <div>
               <label className="text-[9px] font-bold text-slate-400 uppercase">
                  Cantidad
               </label>
               <input
                  onChange={(e) => onChange('stock', e.target.value)}
                  onKeyDown={onHandleKey}
                  className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                  defaultValue={product.stock}
                  type="number"
               />
            </div>
         </td>
         <td className="px-4 py-3 text-center italic text-slate-400 text-[10px] bg-slate-50">
            Guardar cambios para ver reflejado
         </td>
         <td className="px-4 py-3 text-right">
            <div className="flex justify-end gap-2">
               <button
                  onClick={onUpdate}
                  className="p-2 bg-slate-800 text-white rounded hover:bg-black transition shadow-sm"
               >
                  <Save width={16} height={16} />
               </button>
               <button
                  onClick={onClose}
                  className="p-2 bg-white border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition"
               >
                  <X width={16} height={16} />
               </button>
            </div>
         </td>
      </tr>
   )*/

   return (
      <tr className="bg-white hover:bg-slate-50 transition-colors">
         <td className="px-4 py-3 min-w-62.5">
            <div className="space-y-2">
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Nombre
                  </label>
                  <input
                     onChange={(e) => onChange('name', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.name}
                     type="text"
                  />
               </div>
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Descripción
                  </label>
                  <textarea
                     onChange={(e) => onChange('description', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="min-h-15 w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.description}
                     rows={7}
                  />
               </div>
            </div>
         </td>
         <td className="px-4 py-3 space-y-2" colSpan={3}>
            <div className="grid grid-cols-3 gap-3">
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Monto
                  </label>
                  <input
                     onChange={(e) => onChange('salePrice', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.salePrice}
                     type="number"
                  />
               </div>
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Oferta
                  </label>
                  <input
                     onChange={(e) => onChange('offerPrice', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.offerPrice}
                     type="number"
                  />
               </div>
               <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                     Cantidad
                  </label>
                  <input
                     onChange={(e) => onChange('stock', e.target.value)}
                     onKeyDown={onHandleKey}
                     className="w-full border rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-slate-400 outline-none"
                     defaultValue={product.stock}
                     type="number"
                  />
               </div>
            </div>
            <div>
               <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                  Características Destacadas
               </label>
               <ul className="space-y-2">
                  {
                     getProductFeatureSlots().map((item, index) => (
                        <li key={item.key}>
                           <input
                              onChange={e => onFeaturesChange(e.target.value.trim(), index)}
                              defaultValue={splitFeatures?.[index] ?? ''}
                              className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
                              placeholder={`${item.label} ${index + 1}`}
                              type="text"
                              key={index}
                           />
                        </li>
                     ))
                  }
               </ul>
            </div>
         </td>
         <td className="px-4 py-3 text-center italic text-slate-400 text-[10px] bg-slate-50">
            Guardar cambios para ver reflejado
         </td>
         <td className="px-4 py-3 text-right">
            <div className="flex justify-end gap-2">
               <button
                  onClick={onUpdate}
                  className="p-2 bg-slate-800 text-white rounded hover:bg-black transition shadow-sm"
               >
                  <Save width={16} height={16} />
               </button>
               <button
                  onClick={onClose}
                  className="p-2 bg-white border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition"
               >
                  <X width={16} height={16} />
               </button>
            </div>
         </td>
      </tr>
   )
}

export default UpdateProduct;