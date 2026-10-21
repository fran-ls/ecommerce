import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "../../ui/components/Icons";
import ProductCard from "./ProductCard";
import useUserProduct from "../hooks/useUserProduct";
import { publicRoutes } from "../../config/routes";

const FeaturedProducts = () => {
   const [productStart, setProductStart] = useState(0);
   const { products, getUserProducts } = useUserProduct();

   useEffect(() => { getUserProducts() }, []);

   return (
      <div className="rounded-2xl p-6">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase">Productos Destacados</h2>
            <Link
               to={publicRoutes.shop}
               className="cursor-pointer bg-white text-gray-600 text-sm font-medium flex items-center gap-1 hover:text-orange-500 transition-colors border border-gray-200 px-4 py-1.5 rounded-full"
            >
               Ver todo <ChevronRight />
            </Link>
         </div>

         <div className="relative">
            <button
               onClick={() => setProductStart(Math.max(0, productStart - 1))}
               className="cursor-pointer absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow text-gray-600 hover:text-orange-500"
            >
               <ChevronLeft />
            </button>

            <div className="flex gap-5 overflow-hidden py-1">
               {products.map((p) => (
                  <div
                     key={p.id}
                     className="flex-1 min-w-0"
                     style={{ display: products.indexOf(p) >= productStart && products.indexOf(p) < productStart + 5 ? "block" : "none" }}
                  >
                     <ProductCard product={p} />
                  </div>
               ))}
            </div>

            <button
               onClick={() => setProductStart(Math.min(products.length - 4, productStart + 1))}
               className="cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow text-gray-600 hover:text-orange-500"
            >
               <ChevronRight />
            </button>
         </div>
      </div>
   )
}

export default FeaturedProducts;