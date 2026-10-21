import { useState } from "react";
import type { Product } from "../types/product.types";
import productService from "../services/product.service";

const useUserProduct = () => {
   const [products, setProducts] = useState<Product[]>([]);

   const getUserProducts = async (ids: string[] = []): Promise<Product[]> => {
      const { data, error } = await (
         ids.length > 0 ? productService.getProductsById(ids) : productService.getAllProducts()
      );

      if (error) {
         throw new Error(error.message);
      }

      data && setProducts(data);
      return data ?? [];
   }

   return {
      products,
      getUserProducts,
   }
}

export default useUserProduct;