import type { ClientAddress } from "../types/address.types";
import type { ShippingData } from "../../cart/types";
import { CloseIcon, TruckIcon } from "../../cart/components/Icons";
import ClientForm from "./ClientForm";

interface ClientModalProps {
   clientAddresses: ClientAddress[];
   shippingData: ShippingData;
   setShippingData: React.Dispatch<React.SetStateAction<ShippingData>>;
   onClose: () => void;
   onSave: () => void;
}

const ShippingModal = ({ clientAddresses, shippingData, setShippingData, onClose, onSave }: ClientModalProps) => {
   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      >
         <div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]"
            style={{ animation: "modalIn 0.2s ease-out" }}
         >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                     <TruckIcon />
                  </div>
                  <div>
                     <h2 className="font-bold text-gray-900">Datos de Envío</h2>
                     <p className="text-xs text-gray-500">Completa tu información de entrega</p>
                  </div>
               </div>
               <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500"
               >
                  <CloseIcon />
               </button>
            </div>

            <ClientForm
               shippingData={shippingData}
               setShippingData={setShippingData}
               clientAddresses={clientAddresses}
            />

            <div className="flex gap-3 p-6 pt-0">
               <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
               >
                  Cancelar
               </button>
               <button
                  onClick={onSave}
                  className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95"
                  style={{ boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}
               >
                  Guardar datos
               </button>
            </div>
         </div>
      </div>
   )
}

export default ShippingModal;