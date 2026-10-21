import type { ClientDTO } from "../types/client.types";
import { CheckCircleIcon, MailIcon, MapPinIcon, PhoneIcon, TruckIcon, UserIcon } from "../../cart/components/Icons";
import type { ClientAddress } from "../types/address.types";

interface ShippingCardProps {
   client: ClientDTO;
   address: ClientAddress;
   shippingFilled: string;
   onShowModal: () => void;
}

const ShippingCard = ({ shippingFilled, client, address, onShowModal }: ShippingCardProps) => {
   const fullAddress = `${address.department}, ${address.city}, ${address.address}`;

   return shippingFilled ? (
      <div className="p-4 space-y-2.5" >
         {
            [
               { icon: <UserIcon />, val: client.name },
               { icon: <MapPinIcon />, val: fullAddress },
               { icon: <PhoneIcon />, val: client.phone },
               { icon: <MailIcon />, val: client.email },
            ].map((row, i) => (
               <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0">{row.icon}</span>
                  <span className="text-sm text-gray-700 break-all">{row.val}</span>
               </div>
            ))
         }
         < div className="flex items-center gap-1.5 pt-1 text-green-600 text-xs font-semibold" >
            <CheckCircleIcon /> Datos de envío completos
         </div >
      </div >
   ) : (
      <div className="p-4">
         <p className="text-sm text-gray-400 mb-3">
            Agrega tu información de entrega para continuar
         </p>
         <button
            onClick={onShowModal}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-orange-300 hover:border-orange-400 hover:bg-orange-50 text-orange-500 font-semibold text-sm py-3 rounded-xl transition-all"
         >
            <TruckIcon /> Agregar datos de envío
         </button>
      </div>
   )
}

export default ShippingCard;