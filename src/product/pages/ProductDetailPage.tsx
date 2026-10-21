import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartBtnIcon, ChevronRight, TagIcon } from "../../ui/components/Icons";
import TrustBadges from "../components/TrustBadges";
import useProductDetail from "../hooks/useProductDetail";
import SmartImage from "../../shared/components/SmartImage";
import useCart from "../../cart/hooks/useCart";
import { scrollTop } from "../../shared/utils/scrollTop";

const StarIcon = ({ filled, half }: { filled: boolean; half?: boolean }) => (
   <svg className={`w-5 h-5 ${filled || half ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 24 24">
      {half ? (
         <>
            <defs>
               <linearGradient id="half">
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="50%" stopColor="#d1d5db" />
               </linearGradient>
            </defs>
            <path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
         </>
      ) : (
         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      )}
   </svg>
);

const Stars = ({ rating }: { rating: number }) => (
   <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
         <StarIcon key={i} filled={i <= Math.floor(rating)} half={!!(i === Math.ceil(rating) && rating % 1 !== 0)} />
      ))}
   </div>
);

const ProductDetailPage = () => {
   const { productId } = useParams();
   const {
      product, prices, selectedImg, productImage, added,
      setSelectedImg, getProduct, handleAddToCart
   } = useProductDetail(productId);

   const rating = Math.floor(Math.random() * 6);

   const { onNewCartItem } = useCart();

   useEffect(() => {
      getProduct();
      scrollTop()
   }, [productId]);

   return (
      <div className="min-h-screen mt-header bg-gray-50 font-sans">
         {/* ── Breadcrumb ── */}
         <div className="hidden mx-auto px-4 pt-6 pb-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
               <a href="#" className="hover:text-orange-500 transition-colors">Inicio</a>
               <ChevronRight />
               <a href="#" className="hover:text-orange-500 transition-colors">Comercio</a>
               <ChevronRight />
               <a href="#" className="hover:text-orange-500 transition-colors">Herramientas</a>
               <ChevronRight />
               <span className="text-gray-800 font-medium truncate">Taladro Eléctrico Profesional</span>
            </div>
         </div>

         <div className="mx-auto px-4 py-6">
            <div className="rounded-2xl overflow-hidden">
               <div className="place-items-center items-start grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="flex-col sm:flex-row flex gap-3 p-6 gap-y-6">
                     <div className="flex flex-row order-2 sm:order-1 sm:flex-col gap-3 w-16 shrink-0">
                        {product?.images.map((img, i) => (
                           <button
                              key={img.id}
                              onClick={() => setSelectedImg(i)}
                              onMouseEnter={() => setSelectedImg(i)}
                              className={`min-w-12.5 min-h-12.5 max-w-15 max-h-15 overflow-hidden aspect-square rounded-xl flex items-center justify-center text-2xl transition-all border-2 ${selectedImg === i
                                 ? "border-orange-400 shadow-md scale-105"
                                 : "border-gray-200 hover:border-gray-300"
                                 }`}
                           >
                              <SmartImage
                                 url={img.url}
                                 className="object-contain"
                              />
                           </button>
                        ))}
                     </div>

                     <div
                        className="order-1 sm:order-2 flex-1 rounded-2xl aspect-square flex items-center justify-center overflow-hidden w-full max-h-400 max-w-100 sm:max-w-112.5 lg:min-w-115 md:max-h-115"
                     >
                        <SmartImage
                           url={productImage?.url}
                           className={`transition-all duration-300 aspect-square object-cover ${productImage?.isPrimary ? 'order-1' : 'order-2'}`}
                        />
                     </div>
                  </div>

                  <div className="w-full p-8 flex flex-col justify-center border-gray-100">
                     <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
                        {product?.name}
                     </h1>

                     <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {product?.description}
                     </p>

                     <div className="flex items-center gap-3 mb-5">
                        <Stars rating={rating} />
                        <span className="text-gray-500 text-sm">{rating} estrellas</span>
                     </div>

                     <div className="flex items-baseline gap-3 mb-2">
                        {product?.isOffer
                           ?
                           <div className="flex items-center gap-3">
                              <span className="text-3xl font-black text-gray-900">
                                 {prices?.offerPrice.format}
                              </span>
                              <span className="text-xl text-slate-400 line-through">
                                 {prices?.salePrice.format}
                              </span>
                           </div>
                           :
                           <span className="text-3xl font-black text-gray-900">
                              {prices?.salePrice.format}
                           </span>
                        }
                     </div>

                     {/* Discount badge */}
                     {product?.isOffer &&
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-6">
                           <TagIcon />
                           <span>Ahorra {prices?.savings.percentage}%</span>
                        </div>
                     }

                     <button
                        onClick={() => {
                           if (product) {
                              onNewCartItem({ product, prices: prices! });
                              handleAddToCart();
                           }
                        }}
                        className={`cursor-pointer w-full flex items-center justify-center gap-2 font-bold text-base py-4 rounded-xl transition-all duration-200 ${added
                           ? "bg-green-500 text-white scale-95"
                           : "bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-[1.01] active:scale-95"
                           }`}
                        style={{ boxShadow: added ? "0 4px 20px rgba(34,197,94,0.4)" : "0 4px 20px rgba(250,204,21,0.4)" }}
                     >
                        <CartBtnIcon />
                        {added ? "¡Agregado!" : "Agregar al carrito"}
                     </button>

                     <div className="border-t border-gray-100 my-6" />

                     {product?.keyFeatures &&
                        <div className="mb-5">
                           <p className="font-bold text-gray-800 mb-3">Características:</p>
                           <ul className="space-y-2">
                              {product.keyFeatures.split('\n').map((item) => (
                                 <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     }

                     <TrustBadges />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductDetailPage;