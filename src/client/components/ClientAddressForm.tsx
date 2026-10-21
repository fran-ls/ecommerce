import { MapPinIcon } from "lucide-react";
import type { ClientAddressDTO } from "../types/address.types";
import type { ShippingData } from "../../cart/types";

interface ClientAddressFormProps {
   shippingData: ShippingData;
   setShippingData: React.Dispatch<React.SetStateAction<ShippingData>>;
}

const ClientAddressForm = ({ shippingData, setShippingData }: ClientAddressFormProps) => {
   const { address, addressErrors } = shippingData;

   const onInputChange = (field: keyof ClientAddressDTO, value: string) => {
      setShippingData({
         ...shippingData,
         address: {
            ...address,
            [field]: value
         },
         addressFilled: address.department && address.city && address.address,
         addressErrors: { ...addressErrors, [field]: '' }
      });
   }

   const fields = [
      {
         key: 'department' as keyof ClientAddressDTO,
         label: 'Departamento',
         placeholder: 'Ej: San Salvador',
         icon: <MapPinIcon className="w-4 h-4 text-gray-400" />
      },
      {
         key: 'city' as keyof ClientAddressDTO,
         label: 'Ciudad',
         placeholder: 'Ej: San Salvador',
         icon: <MapPinIcon className="w-4 h-4 text-gray-400" />
      },
      {
         key: 'address' as keyof ClientAddressDTO,
         label: 'Dirección',
         placeholder: 'Ej: San Salvador, Centro, Calle X',
         icon: <MapPinIcon className="w-4 h-4 text-gray-400" />
      },
   ];

   return (
      <div className="space-y-4">
         {fields.map((f) => (
            <div key={f.key}>
               <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {f.label}
               </label>

               <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                     {f.icon}
                  </span>
                  <input
                     onChange={(e) => onInputChange(f.key, e.target.value)}
                     className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-all placeholder-gray-400 ${addressErrors[f.key] ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"}`}
                     value={address[f.key]}
                     placeholder={f.placeholder}
                     type="text"
                  />
               </div>

               {addressErrors[f.key] &&
                  <p className="text-xs text-red-500 mt-1">
                     {addressErrors[f.key]}
                  </p>
               }
            </div>
         ))}
      </div>
   )
}

export default ClientAddressForm;