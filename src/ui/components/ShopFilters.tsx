import type { ProductCategory } from "../../category/types/category.types";
import type { Filters, SortFilter } from "../hooks/useSearch";
import { StarIcon } from "./Icons";

interface ShopFiltersProps {
   sortBy: SortFilter;
   filters: Filters;
   categories: ProductCategory[];
   children: React.ReactNode;
   handlePriceChange: (e: any, price: number) => void;
   handleCategoryChange: (id: string) => void;
   onRating: (rating: number) => void;
   onStock: () => void;
   onClearFilters: () => void;
   onSortBy: (filter: SortFilter) => void;
}

const ShopFilters = ({
   children, categories, filters, sortBy, onSortBy, onClearFilters,
   onStock, onRating, handlePriceChange, handleCategoryChange
}: ShopFiltersProps) => {
   const sortFilters: { label: string; filter: SortFilter }[] = [
      {
         label: 'Más nuevos',
         filter: 'newest'
      },
      {
         label: 'Precio: Menor - Mayor',
         filter: 'price-low'
      },
      {
         label: 'Precio: Mayor - Menor',
         filter: 'price-high'
      },
      {
         label: 'Mejor calificados',
         filter: 'rating'
      },
   ];

   return (
      <div className="lg:flex-col gap-x-5 flex-wrap flex space-y-8 sticky top-24 *:grow">
         {children}

         <div>
            <h3 className="font-bold text-sm mb-4">
               Ordenar
            </h3>
            <div className="space-y-1.5">
               {
                  sortFilters.map(item => (
                     <label
                        className="cursor-pointer flex items-center gap-3 text-gray-700"
                        key={item.filter}
                     >
                        <input
                           onChange={() => onSortBy(item.filter)}
                           checked={item.filter === sortBy}
                           className="accent-black"
                           name="filter"
                           type="radio"
                        />

                        {item.label}
                     </label>
                  ))
               }
            </div>
         </div>

         <div>
            <h3 className="font-bold text-sm mb-4">
               Categorías
            </h3>
            <div className="space-y-3">
               {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                     <input
                        type="checkbox"
                        checked={filters.categories.includes(cat.id)}
                        onChange={() => handleCategoryChange(cat.id)}
                        className="w-4 h-4 accent-black"
                     />
                     <span className="text-sm text-gray-700 hover:text-black transition">
                        {cat.name}
                     </span>
                  </label>
               ))}
            </div>
         </div>

         <div>
            <h3 className="font-bold text-sm mb-4">
               Rango de Precio
            </h3>
            <div className="space-y-4">
               <div>
                  <label className="text-xs text-gray-700 mb-2 block">Mínimo: ${filters.priceRange[0]}</label>
                  <input
                     type="range"
                     min="0"
                     max="200"
                     value={filters.priceRange[0]}
                     onChange={(e) => handlePriceChange(e, 0)}
                     className="w-full accent-black"
                  />
               </div>
               <div>
                  <label className="text-xs text-gray-700 mb-2 block">Máximo: ${filters.priceRange[1]}</label>
                  <input
                     type="range"
                     min="0"
                     max="400"
                     value={filters.priceRange[1]}
                     onChange={(e) => handlePriceChange(e, 1)}
                     className="w-full accent-black"
                  />
               </div>
            </div>
         </div>

         <div>
            <h3 className="font-bold text-sm mb-4">
               Calificación
            </h3>
            <div className="space-y-2">
               {[5, 4, 3].map(rating => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer">
                     <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => onRating(rating)}
                        className="w-4 h-4 accent-black"
                     />

                     <div className="flex gap-px">
                        {Array.from({ length: rating }).map((_, i) => (
                           <StarIcon
                              filled={i <= rating}
                              w={20}
                              h={20}
                              key={i}
                           />
                        ))}

                        <span className="ml-2 text-sm text-gray-700">
                           {rating}+ estrellas
                        </span>
                     </div>
                  </label>
               ))}
            </div>
         </div>

         <div className="hidden lg:block">
            <label className="flex items-center gap-3 cursor-pointer">
               <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={onStock}
                  className="w-4 h-4 accent-black"
               />
               <span className="text-sm font-medium text-gray-700">Solo en stock</span>
            </label>
         </div>

         <button
            onClick={onClearFilters}
            className="cursor-pointer w-full px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
         >
            Limpiar Filtros
         </button>
      </div>
   )
}

export default ShopFilters;