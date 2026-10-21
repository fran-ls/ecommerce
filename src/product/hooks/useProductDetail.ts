import { useState } from "react";
import type { Product } from "../types/product.types";
import { type RoundedResult } from "../../shared/utils/roundNumber";
import { type SavingsResult } from "../../shared/utils/calculateSavings";
import useProduct from "./useProduct";
import formatPrices from "../utils/formatPrices";

export interface IPrices {
   salePrice: RoundedResult & { format: string };
   offerPrice: RoundedResult & { format: string };
   savings: SavingsResult;
}

const useProductDetail = (productId: string | undefined) => {
   const [product, setProduct] = useState<Product | null>(null);
   const [prices, setPrices] = useState<IPrices | null>(null);
   const [selectedImg, setSelectedImg] = useState(0);
   const [added, setAdded] = useState(false);

   const { getProductById } = useProduct();

   const getProduct = async () => {
      if (!productId) return;

      const data = await getProductById(productId);
      if (!data) return;

      const formats = formatPrices({
         salePrice: data?.salePrice!,
         offerPrice: data?.offerPrice!
      });

      if (data.images.length > 0) {
         data.images.forEach((img, i) => img?.isPrimary && setSelectedImg(i));
      }

      setProduct(data);
      setPrices(formats);
   }

   const handleAddToCart = () => {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
   }

   return {
      product, prices, productImage: product?.images[selectedImg],
      selectedImg, setSelectedImg,
      added,
      getProduct, handleAddToCart
   }
}

export default useProductDetail;