import { useEffect } from "react";
import { RefreshCcw, SearchIcon } from "lucide-react";
import type { Product } from "../types/product.types";
import UpdateProduct from "../components/UpdateProduct";
import Header from "../../shared/components/Header";
import Loader from "../../shared/components/Loader";
import ProductItem from "../components/ProductItem";
import UpdateImage from "../components/UpdateImage";
import useManageProducts from "../hooks/useManageProducts";
import ProductStats from "../components/ProductStats";

const ManageProductsPage = () => {
   const hook = useManageProducts();
   const { query, products, productFiltereds, editProduct, isLoading, isUpdate, isUpdateImage } = hook;

   useEffect(() => { hook.getProducts() }, []);
   useEffect(() => { hook.getFilteredItems() }, [query]);

   if (isLoading) return <Loader />;

   const Item = ({ product }: { product: Product }) => (
      <ProductItem
         product={product}
         images={product.images}
         onLoad={hook.onLoad}
         onChange={hook.onChange}
         onUpdate={hook.updateProduct}
         onEdit={() => hook.setEditProduct(product)}
         onRemove={() => hook.deleteProduct(product.id)}
         onUpdateImage={() => {
            hook.setIsUpdateImage(true);
            hook.setEditProduct(product);
         }}
      />
   )

   return (
      <>
         <Header>
            <div className="w-full flex gap-2 justify-between items-center">
               <h1 className="text-xl text-slate-800 font-semibold">
                  Administrar <span className="font-bold">Catálogo</span>
               </h1>
               <button
                  onClick={() => !isLoading && hook.getProducts()}
                  className={`${isLoading ? 'cursor-progress' : 'cursor-pointer'} hidden uppercase A-flex items-center gap-2 bg-slate-800 text-white px-4 py-1.5 rounded font-bold hover:bg-slate-900 transition text-xs`}
               >
                  <RefreshCcw width={15} height={15} /> Actualizar lista
               </button>
            </div>
         </Header>

         <main className="space-y-6 p-8 pt-10 text-slate-500">
            {/* <div className="uppercase relative px-5 pt-5 pb-6 w-full bg-white border rounded-xl shadow-sm"> */}
            <div className="uppercase relative w-full bg-white">
               <label className="hidden text-[10px] font-bold text-slate-500 uppercase">
                  Buscar producto
               </label>

               <div className="flex items-center gap-3">
                  <div className="w-full relative">
                     <SearchIcon className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />

                     <input
                        onChange={(e) => hook.setQuery(e.target.value.trim())}
                        className="w-full border rounded pl-8 pr-3 py-2 text-sm"
                        placeholder="Buscar por nombre..."
                        type="search"
                     />
                  </div>

                  <button
                     onClick={() => {
                        hook.getProducts();
                        hook.setQuery('');
                     }}
                     className="cursor-pointer uppercase flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded font-bold hover:bg-slate-900 transition text-[12px]"
                     title="Actualizar lista"
                  >
                     <RefreshCcw width={16} height={16} /> Actualizar
                  </button>
               </div>
            </div>

            <ProductStats products={products} />

            <div className="overflow-x-auto rounded-lg border bg-white">
               <table className="w-full text-sm text-left products-table">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b">
                     <tr>
                        <th className="px-4 py-4">Información del Producto</th>
                        <th className="px-4 py-4">Precio Base</th>
                        <th className="px-4 py-4">Precio Oferta</th>
                        <th className="px-4 py-4 text-center">Stock</th>
                        <th className="px-4 py-4 text-center">Oferta</th>
                        <th className="px-4 py-4 text-right">Acciones</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {
                        (query.trim() ? productFiltereds : products).map((prod) => (
                           (editProduct?.id !== prod.id)
                              ?
                              <Item
                                 product={prod}
                                 key={prod.id}
                              />
                              :
                              (!isUpdateImage
                                 ?
                                 <UpdateProduct
                                    splitFeatures={hook.splitFeatures}
                                    product={editProduct}
                                    isLoading={isUpdate}
                                    onChange={hook.onChange}
                                    onUpdate={hook.onUpdate}
                                    onClose={() => hook.setEditProduct(null)}
                                    onFeaturesChange={hook.onFeaturesChange}
                                    key={prod.id}
                                 />
                                 :
                                 <Item
                                    product={prod}
                                    key={prod.id}
                                 />
                              )
                        ))
                     }
                  </tbody>
               </table>
            </div>

            {isUpdateImage &&
               <UpdateImage
                  editProduct={editProduct}
                  onLoad={hook.onLoad}
                  onClose={() => {
                     hook.setIsUpdateImage(false);
                     hook.setEditProduct(null);
                  }}
               />
            }
         </main>
      </>
   )
}

export default ManageProductsPage;