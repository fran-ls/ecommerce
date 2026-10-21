import { type ProductDTO, STOCK_STATUS } from "../types/product.types";

export const productState: ProductDTO = {
   name: '',
   description: '',
   keyFeatures: '',
   stock: 0,
   purchasePrice: 0,
   salePrice: 0,
   offerPrice: 0,
   brand: '',
   color: '',
   stockStatus: STOCK_STATUS.spent,
   statusTag: 'Nuevo',
   categoryId: '',
   isOffer: false,
   isStock: false
}