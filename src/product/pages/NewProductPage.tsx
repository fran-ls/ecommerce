import { useState } from "react";
import type { ProductCategory } from "../../category/types/category.types";
import Header from "../../shared/components/Header";
import CategoryView from "../../category/views/CategoryView";
import ProductForm from "../components/ProductForm";

const NewProductPage = () => {
   const [categories, setCategories] = useState<ProductCategory[]>([]);

   return (
      <>
         <Header>
            <h1 className="text-xl text-slate-800 font-semibold">
               Agregar <span className="font-bold">Producto</span>
            </h1>
         </Header>

         <main className="p-8 pt-10 text-slate-500">
            <CategoryView onSetCategories={(items: ProductCategory[]) => {
               setCategories(items);
            }} />

            <h2 className="text-lg font-bold mb-4 text-slate-700">
               Registrar Nuevo Producto
            </h2>

            <ProductForm categories={categories} />
         </main>
      </>
   )
}

export default NewProductPage;