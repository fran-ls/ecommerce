import { useState } from "react";
import { ChevronDownIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import type { ClientDTO } from "../types/client.types";
import type { ClientAddress } from "../types/address.types";
import type { ShippingData } from "../../cart/types";
import ClientAddressList from "./ClientAddressList";
import ClientAddressForm from "./ClientAddressForm";

interface ClientFormProps {
   clientAddresses: ClientAddress[];
   shippingData: ShippingData;
   setShippingData: React.Dispatch<React.SetStateAction<ShippingData>>;
}

const ClientForm = ({ clientAddresses, shippingData, setShippingData }: ClientFormProps) => {
   const [isOpenAddress, setIsOpenAddress] = useState(false);
   const { client, clientErrors: errors } = shippingData;

   const phoneDigits = client.phone.replace(/\D/g, '');
   const phoneComplete = phoneDigits.length >= 8;
   const isAddress = clientAddresses.length > 0;

   const onInputChange = (field: keyof ClientDTO, value: string) => {
      setShippingData({
         ...shippingData,
         client: {
            ...client,
            [field]: value
         },
         clientFilled: client.name && client.phone && client.email,
         clientErrors: { ...errors, [field]: '' }
      });
   }

   const onSelectAddress = (address: ClientAddress) => {
      setShippingData({
         ...shippingData,
         address: { ...address, clientId: client.id },
         addressId: address.id,
         addressFilled: (
            address.department &&
            address.city &&
            address.address
         )
      });

      setIsOpenAddress(false);
   }

   const fields = [
      {
         key: "name" as keyof ClientDTO,
         label: "Nombre completo",
         placeholder: "Ej: Juan García",
         icon: <UserIcon className="w-4 h-4 text-gray-400" />
      },
      {
         key: "email" as keyof ClientDTO,
         label: "Correo electrónico",
         placeholder: "correo@google.com",
         icon: <MailIcon className="w-4 h-4 text-gray-400" />
      },
   ];

   return (
      <div className="overflow-y-auto flex-1 p-5 space-y-4">
         <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
               Teléfono
            </label>

            <div className="flex gap-2">
               <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                     <PhoneIcon className="w-4 h-4 text-gray-400" />
                  </span>
                  <input
                     type="tel"
                     placeholder="Ej: 5556 7890"
                     value={client.phone}
                     onChange={(e) => onInputChange('phone', e.target.value)}
                     className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-all placeholder-gray-400 ${errors.phone
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : phoneComplete
                           ? "border-green-400 bg-green-50 focus:ring-2 focus:ring-green-200"
                           : "border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
                        }`}
                  />
               </div>

               {phoneComplete && isAddress && (
                  <button
                     onClick={() => setIsOpenAddress((o) => !o)}
                     className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap shrink-0 ${isOpenAddress
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100"
                        }`}
                     style={{ animation: "fadeIn 0.2s ease-out" }}
                  >
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     Ver perfil
                     <span className={`transition-transform duration-200 ${isOpenAddress ? "rotate-180" : ""}`}>
                        <ChevronDownIcon />
                     </span>
                  </button>
               )}

               {phoneComplete && !isAddress && (
                  <div
                     className="flex items-center gap-1 text-xs text-gray-400 px-2 shrink-0"
                     style={{ animation: "fadeIn 0.2s ease-out" }}
                  >
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     Sin historial
                  </div>
               )}
            </div>

            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            <p className="text-xs text-gray-400 mt-1">
               {client.phone.length}/8 dígitos
               {phoneComplete && isAddress && " · Se encontró un perfil guardado"}
            </p>
         </div>

         {isOpenAddress && isAddress && (
            <ClientAddressList
               items={clientAddresses}
               client={{ ...client, id: client.id }}
               addressId={shippingData.addressId}
               onSelectAddress={onSelectAddress}
            />
         )}

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
                     className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-all placeholder-gray-400 ${errors[f.key] ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"}`}
                     value={client[f.key]}
                     placeholder={f.placeholder}
                     type={f.key === 'email' ? 'email' : f.key === 'phone' ? 'tel' : 'text'}
                     maxLength={f.key === "phone" ? 8 : 300}
                  />
               </div>

               {errors[f.key] &&
                  <p className="text-xs text-red-500 mt-1">
                     {errors[f.key]}
                  </p>
               }
            </div>
         ))}

         <ClientAddressForm
            shippingData={shippingData}
            setShippingData={setShippingData}
         />
      </div>
   )
}

export default ClientForm;