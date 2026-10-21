export interface DBProductImage {
   id: string;
   product_id: string;
   url: string;
   is_primary: boolean;
}

export interface ProductImage {
   id: string;
   productId: string;
   url: string;
   isPrimary: boolean;
}

export interface ProductImageDTO {
   productId: string;
   url: string;
   isPrimary: boolean;
}

export interface UploadImageDTO {
   productId: string;
   file: File;
}