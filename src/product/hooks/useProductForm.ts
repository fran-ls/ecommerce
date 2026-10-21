import { useState } from "react";
import type { ProductDTO, ProductStatusTagKey } from "../types/product.types";
import formatKeyFeatures from "../utils/formatKeyFeatures";
import { getStockStatus } from "../utils/getStockStatus";
import { productState } from "../utils/product.state";
import useForm from "../../shared/hooks/useForm";
import useProduct from "./useProduct";
import { imageConfig } from "../utils/getProductImageSlots";
import { STATUS_TAGS } from "../utils/productStatusTags";

type StatusTag = Record<ProductStatusTagKey, boolean>;

const useProductForm = () => {
   const [files, setFiles] = useState<Record<string, File>>({});
   const [productFeatures] = useState<Record<number, string>>({});
   const [statusTags, setStatusTags] = useState<Partial<StatusTag>>({});
   const [isSaving, setIsSaving] = useState(false);

   const { formState, onFieldChange } = useForm<ProductDTO>(productState);
   const { saveProduct } = useProduct();

   const getProductFeatures = (index: number, value: string) => {
      productFeatures[index] = value.trim();
      const keyFeatures = formatKeyFeatures(productFeatures);
      onFieldChange('keyFeatures', keyFeatures);
   }

   const onStatusTagChange = (key: ProductStatusTagKey, checked: boolean) => {
      setStatusTags({ ...statusTags, [key]: checked });
   }

   const onSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const mainImageSlotKey = imageConfig.MAIN_SLOT_KEY;

      if (isSaving) return;
      else if (!files[mainImageSlotKey]) return alert('Cargar imagen principal');
      setIsSaving(true);

      const itemStatus: string[] = [];
      let isOffer = false;

      for (const { key, status, checked } of STATUS_TAGS) {
         const isActive = statusTags[key] ?? checked;
         if (isActive) itemStatus.push(status);
         if (key === 'offer') isOffer = isActive;
      }

      const stock = parseInt(`${formState.stock}`);
      const stockStatus = getStockStatus(formState.stock);

      await saveProduct(
         {
            ...formState,
            stockStatus,
            isStock: stock !== 0,
            isOffer,
            statusTag: JSON.stringify(itemStatus) as any,
         }, files
      );

      setIsSaving(false);
   }

   return {
      formState, onFieldChange,
      files, setFiles,
      statusTags, onStatusTagChange,
      isSaving, productFeatures,
      getProductFeatures, onSave,
   }
}

export default useProductForm;