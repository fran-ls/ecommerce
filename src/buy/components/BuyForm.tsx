import type { Product } from "../../product/types/product.types";
import useBuyForm from "../hooks/useBuyForm";
import BuyInput from "./BuyInput";

interface BuyFormProps {
   products: Product[];
   onLoad: () => void;
}

const BuyForm = ({ products, onLoad }: BuyFormProps) => {
   const {
      items, query, isSearch, formState, setQuery,
      setIsSearch, onFieldChange, onSave
   } = useBuyForm(products);

   return (
      <section className="relative grid grid-cols-1 md:grid-cols-5 gap-3 mb-10 bg-white border rounded-xl p-6 shadow-sm items-end">
         <div className="relative">
            <div>
               <label className="text-xs font-bold text-slate-500">
                  Producto
               </label>

               <input
                  onChange={(e) => {
                     setQuery(e.target.value);
                     setIsSearch(true);
                  }}
                  className="w-full border rounded px-2 py-1.5"
                  defaultValue={query}
                  placeholder="Buscar..."
                  type="search"
                  required
               />
            </div>
         </div>

         <BuyInput
            onChange={(value) => onFieldChange('stock', value)}
            value={formState.stock}
            label="Cantidad"
            placeholder="1"
            type="number"
         />

         <BuyInput
            onChange={(value) => onFieldChange('unitPrice', value)}
            value={formState.unitPrice}
            label="Precio Unitario"
            placeholder="$0.00"
            type="number"
         />

         <BuyInput
            onChange={(value) => onFieldChange('purchaseDate', value)}
            value={formState.purchaseDate}
            label="Fecha"
            type="date"
         />

         {isSearch && items.length > 0 &&
            <div className="col-span-4 absolute px-6 top-26.25 left-0 max-w-max w-full">
               <div className="bg-white absolute left-12 -top-2 border-l border-t rotate-45 border-slate-400 w-4 h-4"></div>
               <ul className="mx-auto bg-white border border-slate-400 rounded py-2 px-3 w-full max-w-242.5">
                  {
                     items.map(p => (
                        <li
                           onClick={() => {
                              setQuery(p.name);
                              onFieldChange('productId', p.id);
                              setIsSearch(false);
                           }}
                           className="flex flex-col py-1 truncate"
                           title={p.name}
                           key={p.id}
                        >
                           {p.name}
                        </li>
                     ))
                  }
               </ul>
            </div>
         }

         <button
            onClick={async () => {
               await onSave();
               onLoad();
            }}
            className="bg-slate-800 text-white px-2 py-1.75 rounded font-bold hover:bg-slate-900 transition"
         >
            Registrar
         </button>
      </section>
   )
}

export default BuyForm;