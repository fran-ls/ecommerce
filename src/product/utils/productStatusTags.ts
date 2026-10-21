import { type ProductStatusTagKey, type ProductStatusTag, PRODUCT_STATUS_TAGS } from "../types/product.types";

export const STATUS_TAGS: StatusTag[] = [
   {
      status: PRODUCT_STATUS_TAGS.new,
      key: 'new',
      checked: true,
   },
   {
      status: PRODUCT_STATUS_TAGS.offer,
      key: 'offer',
      checked: false,
   },
   {
      status: PRODUCT_STATUS_TAGS.featured,
      key: 'featured',
      checked: false,
   }
];

interface StatusTag {
   status: ProductStatusTag;
   key: ProductStatusTagKey,
   checked: boolean;
}