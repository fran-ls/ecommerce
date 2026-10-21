import { useState } from "react";
import type { ProductItemProps } from "../components/ProductItem";

const useProductItem = (data: ProductItemProps) => {
   const { product, images, onChange, onUpdate, onRemove, onLoad } = data;

   const [isStock, setIsStock] = useState(product.isStock ?? product.stock !== 0);
   const [isOffer, setIsOffer] = useState(product.isOffer);
   const [isRemove, setIsRemove] = useState(false);

   const mainImage = images.filter(img => img.isPrimary && img)[0];

   const onRemoveItem = async () => {
      setIsRemove(true);
      await onRemove();
      await onLoad();
      setIsRemove(false);
   }

   const onToggleStock = async () => {
      if (product.stock === 0) return alert('¡Stock agotado! Verificar existencias.');
      setIsRemove(true);

      const value = !isStock;
      setIsStock(value);

      const data = await onUpdate(product.id, { isStock: value });
      onChange('isStock', data?.isStock ?? value);
      setIsRemove(false);
   }

   const onToggleOffer = async () => {
      setIsRemove(true);

      const value = !isOffer;
      setIsOffer(value);

      const data = await onUpdate(product.id, { isOffer: value });
      onChange('isOffer', data?.isOffer ?? value);
      setIsRemove(false);
   }

   return {
      ...data,
      mainImage,
      isStock, setIsStock,
      isOffer, setIsOffer,
      isRemove, setIsRemove,
      onToggleStock, onToggleOffer,
      onRemoveItem
   }
}

export default useProductItem;