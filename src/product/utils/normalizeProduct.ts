import type { DBProduct, ProductDTO, Product } from "../types/product.types";
import { convertToCamelCase } from "../../shared/utils/convertToCamelCase";
import { snakeCase } from "../../shared/utils/convertToSnakeCase";

export const jsNormalizeProduct = (product: DBProduct): Product => {
   const data: any = {}

   for (const [k, v] of Object.entries(product)) {
      const dbK = convertToCamelCase(k, '_');
      data[dbK] = v;
   }

   return data;
}

export const dbNormalizeProduct = (product: ProductDTO): DBProduct => {
   const data: any = {}

   for (const [k, v] of Object.entries(product)) {
      const dbK = snakeCase(k);
      data[dbK] = v;
   }

   return data;
}