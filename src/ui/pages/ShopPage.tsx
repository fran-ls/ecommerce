import queryString from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter, Grid3x3, List, Search } from "lucide-react";
import ShopFilters from "../components/ShopFilters";
import ShopProductCard from "../../product/components/ShopProductCard";
import useSearch from "../hooks/useSearch";
import { scrollTop } from "../../shared/utils/scrollTop";

const ShopPage = () => {
   const location = useLocation();
   const { q: Q = '' } = queryString.parse(location.search);

   const q = Q as string;

   const {
      viewMode, setViewMode, sortBy, setSortBy, mobileFiltersOpen, setMobileFiltersOpen,
      wishlist, filters, toggleWishlist, handleCategoryChange, handlePriceChange, onRating,
      onStock, onClearFilters, products, categories, getCategoryItems, searchProducts
   } = useSearch();

   useEffect(() => {
      scrollTop();
      getCategoryItems();
   }, []);

   useEffect(() => { searchProducts(q) }, [q, filters]);

   const SearchInput = () => (
      <div className="hidden">
         <h3 className="font-bold text-sm mb-4">Buscar</h3>
         <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
               onChange={() => { }}
               className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors text-sm"
               placeholder="Buscar productos..."
               value={q}
               type="search"
            />
         </div>
      </div>
   )

   return (
      <div className="max-w-[1300px] mt-header mx-auto px-4 py-6 space-y-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               <aside className="hidden lg:block">
                  <ShopFilters
                     sortBy={sortBy}
                     filters={filters}
                     categories={categories}
                     handlePriceChange={handlePriceChange}
                     handleCategoryChange={handleCategoryChange}
                     onRating={onRating}
                     onStock={onStock}
                     onClearFilters={onClearFilters}
                     onSortBy={(value) => setSortBy(value)}
                  >
                     <SearchInput />
                  </ShopFilters>
               </aside>

               <div className="lg:col-span-3">
                  {/* Top Bar */}
                  <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                     <div className="flex lg:hidden items-center gap-2">
                        <button
                           onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                           className="cursor-pointer p-2 hover:bg-gray-50 transition"
                        >
                           <Filter className="text-gray-700" size={20} />
                        </button>
                        <h2 className="text-gray-700">Filtrar</h2>
                     </div>

                     {/* View Mode Toggle */}
                     <div className="hidden flex--A items-center gap-2 border border-gray-300 p-1">
                        <button
                           onClick={() => setViewMode('grid')}
                           className={`cursor-pointer p-2 transition ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}
                           title="Vista de grid"
                        >
                           <Grid3x3 size={18} />
                        </button>
                        <button
                           onClick={() => setViewMode('list')}
                           className={`cursor-pointer p-2 transition ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}
                           title="Vista de lista"
                        >
                           <List size={18} />
                        </button>
                     </div>
                  </div>

                  {mobileFiltersOpen && (
                     <div className="absolute z-2 w-[90%] max-w-[950px] bg-white lg:hidden mb-6 p-4 border border-gray-200 space-y-6">
                        <ShopFilters
                           sortBy={sortBy}
                           filters={filters}
                           categories={categories}
                           handlePriceChange={handlePriceChange}
                           handleCategoryChange={handleCategoryChange}
                           onRating={onRating}
                           onStock={onStock}
                           onClearFilters={onClearFilters}
                           onSortBy={(value) => setSortBy(value)}
                        >
                           <SearchInput />
                        </ShopFilters>
                     </div>
                  )}

                  {products.length > 0 ? (
                     <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 A-lg:grid-cols-3 gap-6' : 'space-y-4'}>
                        {products.map((product, idx) => (
                           <ShopProductCard
                              wishlist={wishlist}
                              viewMode={viewMode}
                              product={product}
                              toggleWishlist={toggleWishlist}
                              idx={idx}
                              key={product.id}
                           />
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-12">
                        <p className="text-gray-600 text-lg mb-4">No hay productos que coincidan con tus filtros</p>
                        <button
                           onClick={onClearFilters}
                           className="cursor-pointer px-6 py-2 border border-black font-medium text-sm hover:bg-black hover:text-white transition"
                        >
                           Limpiar Filtros
                        </button>
                     </div>
                  )}

                  {products.length > 0 && (
                     <div className="text-center mt-12">
                        <button className="px-8 py-3 border-2 border-black font-bold text-sm tracking-wide hover:bg-black hover:text-white transition">
                           CARGAR MÁS PRODUCTOS
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShopPage;