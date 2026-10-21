import { useEffect, useState } from "react";
import type { ProductCategoryDTO, ProductCategory } from "../types/category.types";
import CategoryList from "../components/CategoryList";
import useCategory from "../hooks/useCategory";
import CategoryForm from "../components/CategoryForm";

interface CategoryViewProps {
   onSetCategories: (items: ProductCategory[]) => void;
}

const CategoryView = ({ onSetCategories }: CategoryViewProps) => {
   const [categories, setCategories] = useState<ProductCategory[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const { getCategories, newCategory, updateCategory, deleteCategory } = useCategory();

   const getItems = async () => {
      const data = await getCategories();
      setCategories(data ?? []);
      return data;
   }

   const loadItems = () => {
      setIsLoading(true);
      getItems();
      setIsLoading(false);
   }

   const actions = {
      onSave: (category: ProductCategoryDTO) => {
         newCategory(category);
         getItems();
      },
      onLoad: getItems,
      onUpdate: updateCategory,
      onRemove: deleteCategory,
   }

   useEffect(() => { loadItems() }, []);
   useEffect(() => { onSetCategories(categories) }, [categories]);

   return (
      <div className="mb-10">
         <h2 className="text-lg font-bold mb-4 text-slate-700">Gestión de Categorías</h2>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryForm onSave={actions.onSave} />

            <CategoryList
               isLoading={isLoading}
               categories={categories}
               onLoad={actions.onLoad}
               onRemove={actions.onRemove}
               onUpdate={actions.onUpdate}
            />
         </div>
      </div>
   )
}

export default CategoryView;