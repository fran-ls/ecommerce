import { useState } from "react";
import type { Product } from "../types/product.types";
import useProductImage from "./useProductImage";
import { imageConfig } from "../utils/getProductImageSlots";

interface Data {
   editProduct: Product | null;
   onClose: () => void;
   onLoad: () => void;
}

const useUpdateProductImage = ({ editProduct, onClose, onLoad }: Data) => {
   const [files, setFiles] = useState<Record<string, File>>({});
   const [isSaving, setIsSaving] = useState(false);

   const productImages = editProduct?.images ?? [];
   const imageIds: Record<string, string> = {};
   const mainImageSlotKey = imageConfig.MAIN_SLOT_KEY;

   const { saveImages, updateImage } = useProductImage();

   const onUpdateImage = async () => {
      if (!editProduct || isSaving) return;

      else if (!files[mainImageSlotKey] && !imageIds[mainImageSlotKey]) {
         return alert('Cargar imagen principal');
      }

      setIsSaving(true);
      await saveImages(editProduct.id, files, imageIds);
      onLoad();

      setIsSaving(false);
      onClose();
   }

   const onUpdate = async (key: string) => {
      setIsSaving(true);

      for (const k in imageIds) {
         const imageId = imageIds[k];
         imageId && await updateImage(imageId, { isPrimary: k === key })
      }

      setIsSaving(false);
      onLoad();
      onClose();
   }

   return {
      files, setFiles,
      isSaving, setIsSaving,
      productImages, imageIds,
      onUpdateImage, onUpdate
   }
}

export default useUpdateProductImage;