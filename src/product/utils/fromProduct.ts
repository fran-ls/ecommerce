import type { ProductCategory } from "../../category/types/category.types";
import { normalizeToJS } from "../../shared/utils/normalizeData";
import type { Product, ProductImgs } from "../types/product.types";
import type { ProductImage } from "../types/productImage.types";

export const fromProduct = (data: Product[] | null) => {
   if (!data) return [];

   const products = data.map(d => {
      const optionalImgs: ProductImage[] = [];
      const imgs: any = {}

      const product = normalizeToJS<Product>(d);
      const category = normalizeToJS<ProductCategory>(d.category);

      const images = d.images?.map((img: any) => {
         const nImg = normalizeToJS<ProductImage>(img);
         img.is_primary ? imgs['main'] = nImg : optionalImgs.push(nImg);
         return nImg;
      });

      imgs['optionals'] = optionalImgs;
      imgs['all'] = images;

      return {
         ...product,
         images,
         category,
         imgs: imgs as ProductImgs,
      }
   });

   return products;
}