import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/product.types";
import { FlashIcon } from "../../ui/components/Icons";
import { publicRoutes } from "../../config/routes";
import SmartImage from "../../shared/components/SmartImage";
import Stars from "../../ui/components/Stars";
import formatPrices from "../utils/formatPrices";
import useCart from "../../cart/hooks/useCart";

interface ProductCardProps {
   product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
   const { onNewCartItem } = useCart();

   const prices = formatPrices({
      salePrice: product.salePrice,
      offerPrice: product.offerPrice
   });

   const rating = Math.floor(Math.random() * 6);

   return (
      <div
         className="group animate-in fade-in bg-white rounded-2xl p-4 min-w-55 max-w-55 shrink-0 cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative"
         style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
      >
         {product.isOffer && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
               {prices.savings.percentage}%
            </span>
         )}

         <div
            className="relative overflow-hidden h-47 rounded-xl my-2 flex items-center justify-center text-6xl"
            style={{ background: `linear-gradient(135deg, ${product.color}18, ${product.color}30)` }}
         >
            <Link
               to={`${publicRoutes.details}/${product.id}`}
            >
               <SmartImage
                  url={product.images[0]?.url}
                  className="w-full aspect-square object-cover"
                  alt={product.name}
               />
            </Link>

            <button
               onClick={() => onNewCartItem({ product, prices: prices! })}
               className={`cursor-pointer rounded-xl duration-200 bg-orange-500 text-white py-2 font-bold text-sm flex items-center justify-center gap-2 absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0`}
            >
               <ShoppingCart strokeWidth={3} size={18} />
               AGREGAR
            </button>
         </div>

         <Link
            to={`${publicRoutes.details}/${product.id}`}
         >
            <h3
               className="truncate text-sm font-semibold text-gray-800 leading-snug mb-1 overflow-hidden"
               title={product.name}
            >
               {product.name}
            </h3>
         </Link>

         <Stars rating={rating} />

         <div className="mt-2 flex items-baseline gap-2">
            <span className="text-orange-500 font-bold text-lg">
               <span className="text-2xl">
                  {product.isOffer ? prices.offerPrice.format.split('.')[0] : prices.salePrice.format.split('.')[0]}
               </span>
               <sup className="text-xs">
                  .{`${product.isOffer ? prices.offerPrice.decimals : prices.salePrice.decimals}`}
               </sup>
            </span>

            {product.isOffer && (
               <span className="text-gray-400 text-sm line-through">
                  {prices.salePrice.format}
               </span>
            )}
         </div>

         <div className="hidden mt-2 items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full w-fit">
            <FlashIcon />
            Entrega rápida
         </div>
      </div>
   )
}

export default ProductCard;