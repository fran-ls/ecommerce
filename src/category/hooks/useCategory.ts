import type { ProductCategoryDTO, DBProductCategory } from "../../category/types/category.types";
import categoryService from "../services/category.service";
import { normalizeToDB } from "../../shared/utils/normalizeData";
import { PRODUCT_CATEGORY_DB_FIELDS } from "../utils/category.fields";

const useCategory = () => {
   const getCategories = async () => {
      const { data, error } = await categoryService.getCategories();

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const newCategory = async (category: ProductCategoryDTO) => {
      const dto = normalizeToDB<DBProductCategory>(category, PRODUCT_CATEGORY_DB_FIELDS);
      const { data, error } = await categoryService.insertCategory(dto);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const updateCategory = async (id: string, category: Partial<ProductCategoryDTO>) => {
      const updates = normalizeToDB<DBProductCategory>(category, PRODUCT_CATEGORY_DB_FIELDS);
      const { data, error } = await categoryService.updateCategory(id, updates);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const deleteCategory = async (id: string) => {
      const { data, error } = await categoryService.deleteCategory(id);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   return {
      getCategories,
      newCategory,
      updateCategory,
      deleteCategory,
   }
}

export default useCategory;