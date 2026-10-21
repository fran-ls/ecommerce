import { useState } from "react";
import type { ProductCategory, ProductCategoryDTO } from "../types/category.types";
import CategoryItem from "./CategoryItem";
import UpdateCategory from "./UpdateCategory";
import Loader from "../../shared/components/Loader";

interface CategoryListProps {
   categories: ProductCategory[];
   isLoading: boolean;
   onLoad: () => Promise<ProductCategory[] | null>;
   onUpdate: (id: string, category: Partial<ProductCategoryDTO>) => Promise<ProductCategory | null>;
   onRemove: (id: string) => Promise<string | null>;
}

const CategoryList = ({ categories, isLoading, onLoad, onUpdate, onRemove }: CategoryListProps) => {
   const [editCategory, setEditCategory] = useState<ProductCategory | null>(null);
   const [isUpdate, setIsUpdate] = useState(false);

   const actions = {
      onUpdate: async () => {
         if (!editCategory) return;
         setIsUpdate(true);

         await onUpdate(editCategory.id, editCategory);
         await onLoad();

         setEditCategory(null);
         setIsUpdate(false);
      },
      onChange: (field: keyof ProductCategory, value: string) => {
         editCategory && setEditCategory({ ...editCategory, [field]: value });
      },
      onEdit: (category: ProductCategory) => setEditCategory(category),
      onCancel: () => setEditCategory(null)
   }

   return (
      <div className="md:col-span-2 overflow-x-auto rounded-xl border shadow-sm bg-white" id="category-list">
         <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold border-b">
               <tr>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
               </tr>
            </thead>
            <tbody className="divide-yy divide-slate-100">
               {
                  isLoading
                     ?
                     <tr>
                        <td className="px-4 py-2" colSpan={2}>
                           <Loader width={35} height={35} />
                        </td>
                     </tr>
                     :
                     categories.map(category => (
                        editCategory?.id !== category.id
                           ?
                           <CategoryItem
                              key={category.id}
                              category={category}
                              actions={{
                                 onLoad,
                                 onEdit: () => actions.onEdit(category),
                                 onRemove: () => onRemove(category.id)
                              }}
                           />
                           :
                           <UpdateCategory
                              key={category.id}
                              category={editCategory}
                              isLoading={isUpdate}
                              actions={{
                                 onChange: actions.onChange,
                                 onUpdate: actions.onUpdate,
                                 onCancel: actions.onCancel
                              }}
                           />
                     ))
               }
            </tbody>
         </table>
      </div>
   )
}

export default CategoryList;