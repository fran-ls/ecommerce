import type { DBProduct, PriceRange, ProductDTO } from "../types/product.types";
import { normalizeToDB } from "../../shared/utils/normalizeData";
import productService from "../services/product.service";
import useProductImage from "./useProductImage";
import { PRODUCT_DB_FIELDS } from "../utils/product.fields";

const useProduct = () => {
   const { saveImages } = useProductImage();

   const searchProducts = async (values: { categoryIds: string[], priceRange: PriceRange, query?: string }) => {
      const { data, error } = await (
         values.categoryIds.length > 0
            ? productService.getProductsByCategories(values)
            : productService.getFilteredProducts(values)
      )

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const getProducts = async () => {
      const { data, error } = await productService.getProducts();

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const getProductById = async (id: string) => {
      const { data, error } = await productService.getProductById(id);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const newProduct = async (product: ProductDTO) => {
      const dto = normalizeToDB<DBProduct>(product, PRODUCT_DB_FIELDS);
      const { data, error } = await productService.insertProduct(dto);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const updateProduct = async (id: string, product: Partial<ProductDTO>) => {
      const updates = normalizeToDB<DBProduct>(product, PRODUCT_DB_FIELDS);
      const { data, error } = await productService.updateProduct(id, updates);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const deleteProduct = async (id: string) => {
      const { data, error } = await productService.deleteProduct(id);

      if (error) {
         throw new Error(error.message);
      }

      return data;
   }

   const saveProduct = async (product: ProductDTO, images: Record<string, File>) => {
      const prod = await newProduct(product);
      if (!prod) return;
      await saveImages(prod.id, images);
   }

   return {
      getProducts,
      updateProduct,
      deleteProduct,
      saveProduct,
      getProductById,
      searchProducts
   }
}

export default useProduct;