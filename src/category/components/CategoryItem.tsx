import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { ProductCategory } from "../types/category.types";
import Loader from "../../shared/components/Loader";

interface CategoryItemProps {
   category: ProductCategory;
   actions: {
      onLoad: () => Promise<ProductCategory[] | null>;
      onEdit: () => void;
      onRemove: () => void;
   }
}

const CategoryItem = ({ category, actions }: CategoryItemProps) => {
   const [isRemove, setIsRemove] = useState(false);

   const onRemove = async () => {
      setIsRemove(true);
      await actions.onRemove();
      await actions.onLoad();
      setIsRemove(false);
   }

   if (isRemove) return (
      <tr>
         <td className="px-4 py-2" colSpan={2}>
            <Loader size={3} width={25} height={25} />
         </td>
      </tr>
   )

   return (
      <tr
         className="hover:bg-slate-50"
      >
         <td className="px-4 py-2">
            <span className="font-medium text-slate-700">{category.name}</span>
         </td>
         <td className="px-4 py-2 text-right flex justify-end gap-3">
            <button
               onClick={actions.onEdit}
               className="text-slate-500 hover:text-slate-800 transition"
            >
               <Pencil width={18} height={18} />
            </button>
            <button
               onClick={onRemove}
               className="text-red-400 hover:text-red-600 transition"
            >
               <Trash2 width={18} height={18} />
            </button>
         </td>
      </tr>
   )
}

export default CategoryItem;