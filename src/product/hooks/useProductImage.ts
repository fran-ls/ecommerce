import type { DBProductImage, ProductImageDTO, UploadImageDTO } from "../types/productImage.types";
import productImageService from "../services/productImage.service";
import { normalizeToDB } from "../../shared/utils/normalizeData";
import { PRODUCT_IMAGE_DB_FIELDS } from "../utils/productImage.fields";
import { getIsPrimaryImageSlot } from "../utils/getProductImageSlots";

const imageService = productImageService;

const useProductImage = () => {
   const getImageById = async (id: string) => {
      const { data, error } = await imageService.getImageById(id);
      if (error) throw new Error(error.message);
      return data;
   }

   const deleteImage = async (imageId: string) => {
      const { data, error } = await imageService.deleteImage(imageId);
      if (error) throw new Error(error.message);
      return data;
   }

   const uploadImage = async (fileDTO: UploadImageDTO) => {
      const { data, error } = await imageService.uploadImage(fileDTO);
      if (error) throw new Error(error.message);
      return data || '';
   }

   const saveImage = async (image: ProductImageDTO, file: File, imageId?: string | null) => {
      const imageDTO = normalizeToDB<DBProductImage>(image, PRODUCT_IMAGE_DB_FIELDS);
      let imageUrl = '';

      if (file) imageUrl = await uploadImage({
         productId: image.productId, file
      });

      if (imageUrl !== '') imageDTO.url = imageUrl;

      if (imageId) {
         const { data, error } = await imageService.updateImage(imageId, imageDTO);
         if (error) throw new Error(error.message);
         return data;
      }

      const { data, error } = await imageService.insertImage(imageDTO);
      if (error) throw new Error(error.message);

      return data;
   }

   const saveImages = async (productId: string, files: Record<string, File>, imageIds?: Record<string, string>) => {
      for (const k in files) {
         const file = files[k];
         if (!file) return;

         const imageId = imageIds ? imageIds[k] : undefined;

         await saveImage({
            productId,
            url: '',
            isPrimary: getIsPrimaryImageSlot(k)
         }, file, imageId);
      }
   }

   const updateImage = async (id: string, image: Partial<ProductImageDTO>) => {
      const imageDTO = normalizeToDB<DBProductImage>(image, PRODUCT_IMAGE_DB_FIELDS);
      const { data, error } = await imageService.updateImage(id, imageDTO);
      if (error) throw new Error(error.message);
      return data;
   }

   return {
      getImageById,
      saveImages,
      deleteImage,
      updateImage
   }
}

export default useProductImage;