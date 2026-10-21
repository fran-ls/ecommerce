import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product.types";
import useCart from "../../cart/hooks/useCart";
import formatPrices from "../utils/formatPrices";
import { publicRoutes } from "../../config/routes";
import SmartImage from "../../shared/components/SmartImage";
import Stars from "../../ui/components/Stars";

interface ShopProductCardProps {
   product: Product;
   wishlist: string[];
   idx: number;
   viewMode: 'grid' | 'list';
   toggleWishlist: (id: string) => void;
}

const ShopProductCard = ({ product, wishlist, idx, viewMode, toggleWishlist }: ShopProductCardProps) => {
   const prices = formatPrices({
      salePrice: product.salePrice,
      offerPrice: product.offerPrice
   });

   const image = product.images.filter(img => img.isPrimary)[0];

   const { onNewCartItem } = useCart();

   return (
      <div
         className={`group animate-in fade-in duration-500 ${viewMode === 'list' ? 'flex gap-4 border border-gray-200 p-4 hover:border-black transition' : ''}`}
         style={{ animationDelay: `${idx * 50}ms` }}
      >
         <div className={`relative overflow-hidden group-hover:bg-gray-100 transition ${viewMode === 'grid' ? 'mb-4 max-h-72' : 'w-40 h-40 shrink-0'}`}>
            <Link
               to={`${publicRoutes.details}/${product.id}`}
            >
               <SmartImage
                  url={image?.url}
                  alt={product?.name}
                  className="aspect-square w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  iconClassName="mx-auto w-7 h-50 text-slate-400"
               />
            </Link>

            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
               {product.statusTag === 'Nuevo' && (
                  <div className="bg-black text-white px-3 py-1 text-xs font-bold">
                     NUEVO
                  </div>
               )}

               {product.isOffer && (
                  <div className="bg-red-600 text-white px-3 py-1 text-xs font-bold">
                     -{prices.savings.percentage}%
                  </div>
               )}
            </div>

            <button
               onClick={() => toggleWishlist(product.id)}
               className={`cursor-pointer absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:text-white transition ${wishlist.includes(product.id) ? 'hover:bg-white' : 'hover:bg-orange-500'}`}
            >
               <Heart
                  size={18}
                  className={wishlist.includes(product.id) ? 'fill-orange-500 text-orange-500' : ''}
               />
            </button>

            <button
               onClick={() => onNewCartItem({ product, prices: prices! })}
               className={`cursor-pointer rounded-xl duration-200 absolute bottom-4 left-4 right-4 bg-orange-500 text-white py-2 font-bold text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0 ${viewMode === 'list' ? 'opacity-100 translate-y-0' : ''}`}
            >
               <ShoppingCart strokeWidth={3} size={18} />
               AGREGAR AL CARRITO
            </button>
         </div>

         <div className="flex-1">
            <div className="space-y-2">
               <Link
                  to={`${publicRoutes.details}/${product.id}`}
               >
                  <h3
                     className="truncate font-bold text-sm leading-tight group-hover:text-gray-600 transition"
                     title={product.name}
                  >
                     {product.name}
                  </h3>
               </Link>

               <div className="flex items-center gap-2">
                  <div className="mt-1">
                     <Stars rating={Math.floor(Math.random() * 6)} />
                  </div>
                  <span className="text-xs text-gray-600">({0} reseñas)</span>
               </div>

               <div className="flex items-center gap-2">
                  <span className="text-lg font-black">
                     {product.isOffer ? prices.offerPrice.format : prices.salePrice.format}
                  </span>

                  {product.isOffer && (
                     <span className="text-sm text-gray-500 line-through">
                        {prices.salePrice.format}
                     </span>
                  )}
               </div>

               <p className="text-xs text-green-600 font-medium">
                  {product.isStock ? '✓ En Stock' : 'Agotado'}
               </p>
            </div>
         </div>
      </div>
   )
}

export default ShopProductCard;