import { Check, Save, X } from "lucide-react";
import type { Product } from "../types/product.types";
import { getProductImageSlots } from "../utils/getProductImageSlots";
import ProductImage from "./ProductImage";
import Loader from "../../shared/components/Loader";
import useUpdateProductImage from "../hooks/useUpdateProductImage";

interface UpdateImageProps {
   editProduct: Product | null;
   onClose: () => void;
   onLoad: () => void;
}

const UpdateImage = (props: UpdateImageProps) => {
   const {
      files, isSaving, imageIds, productImages, setFiles, onUpdateImage, onUpdate,
   } = useUpdateProductImage(props);

   if (isSaving) return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/40">
         <div className="bg-white border-zinc-900 rounded-2xl px-10 py-8 flex flex-col items-center gap-5 shadow-[0px_0px_2px_#1a1a1a] min-w-70 max-w-sm">
            <Loader size={4} width={40} height={40} />

            <p className="text-zinc-900 text-sm font-medium text-center leading-relaxed tracking-tight">
               Actualizando imagenes...
            </p>
         </div>
      </div>
   )

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-white/40">
         <div className="m-5 max-w-107.5 min-w-70 w-full flex items-center justify-center shadow-sm bg-white border-[1.5px] rounded-2xl">
            <div className="w-full bg-white rounded-2xl">
               <div className="flex items-center justify-between p-4 overflow-hidden bg-slate-50 border-b rounded-t-2xl">
                  <p className="text-xs font-bold text-slate-500 uppercase">
                     Multimedia del producto
                  </p>

                  <div>
                     <button
                        onClick={onUpdateImage}
                        className="cursor-pointer p-1 bg-slate-800 text-white rounded hover:bg-black transition shadow-sm"
                        title="Guardar"
                     >
                        <Save width={16} height={16} />
                     </button>
                     <button
                        onClick={props.onClose}
                        className="cursor-pointer ml-2 p-1 bg-white border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition"
                        title="Cancelar"
                     >
                        <X width={16} height={16} />
                     </button>
                  </div>
               </div>

               <div>
                  <div className="relative p-5 overflow-auto max-h-107.5 grid grid-cols-2 gap-4">
                     {
                        getProductImageSlots().map((item, index) => {
                           const k = item.key;
                           const image = productImages[index];
                           imageIds[k] = image?.id;

                           return (
                              <ProductImage
                                 key={index}
                                 label={item.label}
                                 url={productImages[index]?.url}
                                 onFileChange={(file) => {
                                    setFiles({ ...files, [k]: file });
                                 }}
                                 children={
                                    image?.id
                                       ?
                                       <label
                                          className="top-2.5 left-2.5 absolute flex items-center cursor-pointer"
                                          title={image?.isPrimary ? 'Imagen principal' : ''}
                                       >
                                          <input
                                             onClick={() => onUpdate(k)}
                                             className="hidden peer"
                                             name="isPrimary"
                                             type="radio"
                                          />

                                          <div className={`relative overflow-hidden w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-green-500 peer-checked:bg-green-500 transition ${image.isPrimary ? 'border-green-500 bg-green-500 m-1' : ''}`}>
                                             {image?.isPrimary &&
                                                <Check className={`w-5 h-5 text-[18px] font-bold absolute top-1/2 left-1/2 -translate-1/2 ${image.isPrimary ? 'text-white' : ''}`} />
                                             }
                                          </div>
                                       </label>
                                       :
                                       <></>
                                 }
                              />
                           )
                        })
                     }
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

export default UpdateImage;