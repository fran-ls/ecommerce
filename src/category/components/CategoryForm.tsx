import { useState } from "react";
import type { ProductCategoryDTO } from "../types/category.types";
import { categoryState } from "../utils/category.state";
import Loader from "../../shared/components/Loader";
import useForm from "../../shared/hooks/useForm";

interface CategoryFormProps {
   onSave: (category: ProductCategoryDTO) => void;
}

const CategoryForm = ({ onSave }: CategoryFormProps) => {
   const [isSaving, setIsSaving] = useState(false);

   const { formState, onInputChange, setFormState } = useForm<ProductCategoryDTO>({ ...categoryState });

   const onNewCategory = async () => {
      if (!formState.name || isSaving) return;
      setIsSaving(true);
      onSave(formState);
      setFormState(categoryState);
      setIsSaving(false);
   }

   return (
      <div className="max-h-max bg-white p-5 rounded-xl border shadow-sm">
         <label className="text-xs font-bold text-slate-500 uppercase">Nueva Categoría</label>
         <div className="flex gap-2 mt-2">
            <input
               className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
               defaultValue={formState.name ?? ''}
               onChange={onInputChange}
               onKeyDown={e => {
                  if (e.key === 'Enter') onNewCategory();
               }}
               placeholder="Ej. Calzado"
               name="name"
               type="text"
            />

            <button
               onClick={onNewCategory}
               className={`min-w-20 text-white px-4 py-2 rounded font-semibold bg-slate-800 ${isSaving ? 'cursor-progress' : 'cursor-pointer hover:bg-slate-900'}`}
            >
               {!isSaving
                  ?
                  'Añadir'
                  :
                  <Loader size={2} width={20} height={20} />
               }
            </button>
         </div>
      </div>
   )
}

export default CategoryForm;