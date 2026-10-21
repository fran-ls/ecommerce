import type { ProductCategory } from "../../category/types/category.types";
import { STATUS_TAGS } from "../utils/productStatusTags";
import { getProductImageSlots } from "../utils/getProductImageSlots";
import useProductForm from "../hooks/useProductForm";
import AlertModal from "../../shared/components/AlertModal";
import ProductImage from "./ProductImage";
import ProductInput from "./ProductInput";
import { getProductFeatureSlots } from "../utils/getProductFeatureSlots";

interface ProductFormProps {
   categories: ProductCategory[];
}

const ProductForm = ({ categories }: ProductFormProps) => {
   const {
      formState, files, productFeatures, isSaving,
      onFieldChange, setFiles, onSave, getProductFeatures, onStatusTagChange
   } = useProductForm();

   return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
         <div className="p-4 bg-slate-50 border-b">
            <p className="text-xs font-bold text-slate-500 uppercase">
               Multimedia del producto
            </p>
         </div>

         <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
               {
                  getProductImageSlots().map((item, index) => (
                     <ProductImage
                        key={index}
                        label={item.label}
                        onFileChange={(file) => {
                           setFiles({ ...files, [item.key]: file })
                        }}
                     />
                  ))
               }
            </div>

            <form
               onSubmit={onSave}
               className="space-y-6"
            >
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="md:col-span-2">
                     <ProductInput
                        onChange={(value: string) => onFieldChange('name', value)}
                        defaultValue={formState.name}
                        label="Nombre del producto"
                        placeholder="Ej. Martíllo"
                     />
                  </div>

                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">
                        Categoría
                     </label>
                     <select
                        onChange={e => onFieldChange('categoryId', e.target.value)}
                        value={formState.categoryId}
                        className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
                        required
                     >
                        <option value="">Seleccionar</option>
                        {
                           categories.map((category) => (
                              <option
                                 value={category.id}
                                 key={category.id}
                              >
                                 {category.name}
                              </option>
                           ))
                        }
                     </select>
                  </div>

                  <ProductInput
                     onChange={(value: string) => onFieldChange('stock', value)}
                     defaultValue={''}
                     label="Cantidad (stock)"
                     placeholder="0"
                     type="number"
                  />

                  <ProductInput
                     onChange={(value: string) => onFieldChange('purchasePrice', value)}
                     defaultValue={''}
                     label="Precio compra"
                     placeholder="$ 0.00"
                     type="number"
                  />

                  <ProductInput
                     onChange={(value: string) => onFieldChange('salePrice', value)}
                     defaultValue={''}
                     label="Precio venta"
                     placeholder="$ 0.00"
                     type="number"
                  />

                  <ProductInput
                     onChange={(value: string) => onFieldChange('offerPrice', value)}
                     defaultValue={''}
                     label="Precio oferta"
                     placeholder="$ 0.00"
                     type="number"
                     required={false}
                  />

                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase">
                        Marca / Color
                     </label>
                     <div className="flex gap-1">
                        <input
                           onChange={e => onFieldChange('brand', e.target.value)}
                           defaultValue={formState.brand}
                           className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
                           placeholder="Marca"
                           type="text"
                        />
                        <input
                           onChange={e => onFieldChange('color', e.target.value)}
                           defaultValue={formState.color}
                           className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
                           placeholder="Color"
                           type="text"
                        />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                        Características Destacadas
                     </label>
                     <ul className="space-y-2">
                        {
                           getProductFeatureSlots().map((item, index) => (
                              <li key={item.key}>
                                 <input
                                    onChange={e => {
                                       getProductFeatures(index, e.target.value);
                                    }}
                                    defaultValue={productFeatures[index]}
                                    className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
                                    placeholder={`${item.label} ${index + 1}`}
                                    type="text"
                                    key={index}
                                 />
                              </li>
                           ))
                        }
                     </ul>
                  </div>

                  <div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                        Etiquetas de Estado
                     </p>
                     <div className="flex flex-wrap gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 h-26.5 items-center">
                        {
                           STATUS_TAGS.map((tag) => (
                              <label
                                 className="flex items-center gap-2 cursor-pointer font-medium text-slate-600"
                                 key={tag.status}
                              >
                                 <input
                                    onChange={(e) => onStatusTagChange(tag.key, e.target.checked)}
                                    className="w-4 h-4 accent-slate-800"
                                    defaultChecked={tag.checked}
                                    type="checkbox"
                                 />
                                 {tag.status}
                              </label>
                           ))
                        }
                     </div>
                  </div>
               </div>

               <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                     Descripción ampliada
                  </label>
                  <textarea
                     onChange={e => onFieldChange('description', e.target.value)}
                     defaultValue={formState.description}
                     className="w-full min-h-15 border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all mt-1"
                     placeholder="Detalles del producto..."
                  />
               </div>

               <button
                  className="cursor-pointer w-full md:w-auto bg-slate-800 text-white px-10 py-3 rounded font-bold hover:bg-slate-900 transition-all shadow-md disabled:bg-slate-400"
               >
                  Guardar Producto en Inventario
               </button>
            </form>
         </div>

         {isSaving && <AlertModal text="Guardando..." />}
      </div>
   )
}

export default ProductForm;