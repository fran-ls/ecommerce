import supabase from '../../shared/utils/supabase';
import type { SupabaseResponse, SupabaseStorageResponse } from '../../shared/types';
import type { DBProductImage, ProductImage, UploadImageDTO } from '../types/productImage.types';
import { normalizeToJS } from '../../shared/utils/normalizeData';

class ProductImageService {
   async getProducImages(productId: string): Promise<SupabaseResponse<ProductImage[]>> {
      const { data, error } = await supabase
         .from('images')
         .select(`*`)
         .eq('product_id', productId);
      const images = !data ? data : data.map(d => normalizeToJS<ProductImage>(d));
      return { data: images, error }
   }

   async getImageById(id: string): Promise<SupabaseResponse<ProductImage>> {
      const { data, error } = await supabase
         .from('images')
         .select(`*`)
         .eq('id', id)
         .single();
      const image = !data ? data : normalizeToJS<ProductImage>(data);
      return { data: image, error }
   }

   async insertImage(image: DBProductImage): Promise<SupabaseResponse<ProductImage>> {
      const { data, error } = await supabase
         .from('images')
         .insert([image])
         .select()
         .single();
      const item = !data ? data : normalizeToJS<ProductImage>(data);
      return { data: item, error }
   }

   async uploadImage({ productId, file }: UploadImageDTO): Promise<SupabaseStorageResponse<string>> {
      const filePath = `products/${productId}/${file.name}`;

      const { error } = await supabase.storage
         .from('products')
         .upload(filePath, file);

      if (error) return { data: null, error };

      const { data } = supabase.storage
         .from('products')
         .getPublicUrl(filePath);

      return { data: data.publicUrl, error: null }
   }

   async updateImage(id: string, updates: Partial<DBProductImage>): Promise<SupabaseResponse<ProductImage>> {
      const { data, error } = await supabase
         .from('images')
         .update(updates)
         .eq('id', id)
         .select()
         .single();
      const item = !data ? data : normalizeToJS<ProductImage>(data);
      return { data: item, error }
   }

   async deleteImage(id: string): Promise<SupabaseResponse<string>> {
      const { error } = await supabase
         .from('images')
         .delete()
         .eq('id', id);
      return { data: id, error }
   }
}

const productImageService = new ProductImageService();

export default productImageService;