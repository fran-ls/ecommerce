import { ImageOff, Pencil, Trash2 } from "lucide-react";
import type { Product, ProductDTO } from "../types/product.types";
import type { ProductImage } from "../types/productImage.types";
import Loader from "../../shared/components/Loader";
import useProductItem from "../hooks/useProductItem";

export interface ProductItemProps {
   product: Product;
   images: ProductImage[];
   onLoad: () => void;
   onEdit: () => void;
   onChange: (field: keyof Product, value: any) => void;
   onUpdate: (id: string, product: Partial<ProductDTO>) => Promise<Product | null>;
   onRemove: () => void;
   onUpdateImage: () => void;
}

const ProductItem = (props: ProductItemProps) => {
   const hook = useProductItem(props);
   const { product, mainImage, isOffer, isStock, isRemove } = hook;

   if (isRemove) return (
      <tr>
         <td className="h-16.25 px-4 py-2" colSpan={6}>
            <Loader size={3} width={25} height={25} />
         </td>
      </tr>
   )

   return (
      <tr
         className="relative hover:bg-slate-50 transition-colors"
      >
         <td className="px-4 py-3">
            <div className="flex items-center gap-3">
               {mainImage
                  ? <img
                     onClick={hook.onUpdateImage}
                     className="w-10 h-10 object-cover cursor-pointer rounded border border-slate-200 shadow-sm"
                     src={hook.mainImage.url}
                     alt={product.name}
                  />
                  :
                  <ImageOff
                     onClick={hook.onUpdateImage}
                     className="w-10 h-10 p-2 rounded cursor-pointer"
                  />
               }
               <div>
                  <p className=" text-slate-800 leading-tight">{product.name}</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-50">{product.description}</p>
               </div>
            </div>
         </td>
         <td className="px-4 py-3 font-semibold text-slate-700">$ {product.salePrice}</td>
         <td className="px-4 py-3">
            {
               isOffer
                  ?
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded text-xs">
                     $ {product.offerPrice}
                  </span>
                  :
                  <span className="block text-slate-300 italic text-[10px]">
                     Sin oferta activa
                  </span>
            }
         </td>
         <td className="px-4 py-3 text-center">
            <button
               onClick={hook.onToggleStock}
               className={`toggle-btn relative inline-flex h-5 w-10 items-center rounded-full transition-colors bg-slate-${isStock ? 800 : 200}`}
            >
               <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isStock ? 'toggle-active translate-x-6' : 'translate-x-1'}`}></span>
            </button>
         </td>
         <td className="px-4 py-3 text-center">
            <button
               onClick={hook.onToggleOffer}
               className={`toggle-btn relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${isOffer ? 'bg-orange-500' : 'bg-slate-200'}`}
            >
               <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isOffer ? 'toggle-active translate-x-6' : 'translate-x-1'}`}></span>
            </button>
         </td>
         <td className="px-4 py-3 text-right">
            <div className="flex justify-end gap-1">
               <button
                  onClick={hook.onEdit}
                  className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition"
                  title="Editar Producto"
               >
                  <Pencil width={16} height={16} />
               </button>
               <button
                  onClick={hook.onRemoveItem}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                  title="Eliminar"
               >
                  <Trash2 width={16} height={16} />
               </button>
            </div>
         </td>
      </tr>
   )
}

export default ProductItem;