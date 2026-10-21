import { Check, X } from "lucide-react";
import type { ProductCategory } from "../types/category.types";
import Loader from "../../shared/components/Loader";

interface UpdateCategoryProps {
   category: ProductCategory;
   isLoading: boolean;
   actions: {
      onChange: (field: keyof ProductCategory, value: string) => void;
      onUpdate: () => void;
      onCancel: () => void;
   }
}

const UpdateCategory = ({ category, isLoading, actions }: UpdateCategoryProps) => {
   const onHandleKey = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') actions.onUpdate();
   }

   if (isLoading) return (
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
            <input
               className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
               onChange={e => actions.onChange('name', e.target.value)}
               onKeyDown={onHandleKey}
               defaultValue={category.name ?? ''}
               type="text"
               autoFocus
            />
         </td>
         <td className="px-4 py-2 text-right flex items-center justify-end gap-3">
            <button
               onClick={actions.onUpdate}
               className="my-2 text-green-600 hover:scale-110 transition"
            >
               <Check width={20} height={20} />
            </button>
            <button
               onClick={actions.onCancel}
               className="my-2 text-slate-400 hover:scale-110 transition"
            >
               <X width={20} height={20} />
            </button>
         </td>
      </tr>
   )
}

export default UpdateCategory;