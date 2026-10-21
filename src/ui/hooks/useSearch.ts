import { useState } from "react";
import type { ProductCategory } from "../../category/types/category.types";
import type { PriceRange, Product } from "../../product/types/product.types";
import useCategory from "../../category/hooks/useCategory";
import useProduct from "../../product/hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "../../config/routes";

export type SortFilter = 'newest' | 'price-low' | 'price-high' | 'rating';

export interface Filters {
   categories: string[];
   priceRange: PriceRange;
   rating: number;
   inStock: boolean;
}

const useSearch = () => {
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // 'grid' o 'list'
   const [sortBy, setSortBy] = useState<SortFilter>('newest');
   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
   const [wishlist, setWishlist] = useState<string[]>([]);

   const [categories, setCategories] = useState<ProductCategory[]>([]);
   const [products, setProducts] = useState<Product[]>([]);

   // Filtros
   const [filters, setFilters] = useState({
      categories: [] as string[],
      priceRange: [0, 200] as [number, number],
      rating: 0,
      inStock: true
   });

   const { getCategories } = useCategory();
   const { searchProducts } = useProduct();

   const navigate = useNavigate();

   const getCategoryItems = async () => {
      const data = await getCategories();
      data && setCategories(data);
   }

   const getProducts = async (q = '') => {
      const data = await searchProducts({
         categoryIds: filters.categories,
         priceRange: filters.priceRange,
         query: q
      });

      data && setProducts(data);
   }

   const toggleWishlist = (productId: string) => {
      setWishlist((prev) =>
         prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
      );
   }

   const handleCategoryChange = (categoryId: string) => {
      setFilters((prev) => ({
         ...prev,
         categories: prev.categories.includes(categoryId)
            ? prev.categories.filter(c => c !== categoryId)
            : [...prev.categories, categoryId]
      }));
   }

   const handlePriceChange = (e: any, index: number) => {
      const newRange: PriceRange = [...filters.priceRange];
      newRange[index] = parseFloat(e.target.value);
      setFilters((prev) => ({ ...prev, priceRange: newRange }));
   }

   const onRating = (rating: number) => {
      setFilters((prev) => ({
         ...prev, rating: filters.rating === rating ? 0 : rating
      }))
   }

   const onStock = () => {
      setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))
   }

   const onClearFilters = () => {
      setFilters({
         categories: [],
         priceRange: [0, 200],
         rating: 0,
         inStock: true
      });

      setSortBy('newest');

      navigate(publicRoutes.shop);
   }

   const sortProducts = () => {
      if (sortBy === 'newest') {
         const sorted = [...products].sort((a, b) => {
            const date1 = new Date(a.createdAt).getTime();
            const date2 = new Date(b.createdAt).getTime();
            return date2 - date1;
         })

         return sorted;
      }
      if (sortBy === 'price-low') {
         const sorted = [...products].sort((a, b) => {
            const price1 = a.isOffer ? a.offerPrice : a.salePrice;
            const price2 = b.isOffer ? b.offerPrice : b.salePrice;
            return price1 - price2;
         })

         return sorted;
      }
      else if (sortBy === 'price-high') {
         const sorted = [...products].sort((a, b) => {
            const price1 = a.isOffer ? a.offerPrice : a.salePrice;
            const price2 = b.isOffer ? b.offerPrice : b.salePrice;
            return price2 - price1;
         })

         return sorted;
      }
      // else if (sortBy === 'rating') {
      //    const sorted = [...products].sort((a, b) => {
      //       const price1 = a.isOffer ? a.offerPrice : a.salePrice;
      //       const price2 = b.isOffer ? b.offerPrice : b.salePrice;
      //       return price2 - price1;
      //    })

      //    return sorted;
      // }

      return products;
   }

   return {
      products: sortProducts(),
      categories,
      viewMode, setViewMode,
      sortBy, setSortBy,
      mobileFiltersOpen, setMobileFiltersOpen,
      wishlist, setWishlist,
      filters, setFilters,
      toggleWishlist, handleCategoryChange, handlePriceChange,
      onRating, onStock, onClearFilters,
      getCategoryItems, searchProducts: getProducts,
   }
}

export default useSearch;