import type { Client } from "../types/client.types";
import type { ClientAddress } from "../types/address.types";
import { CheckIcon } from "../../ui/components/Icons";

interface ClientAddressListProps {
   client: Client;
   addressId: string;
   items: ClientAddress[];
   onSelectAddress: (address: ClientAddress) => void;
}

const ClientAddressList = ({ client, items, addressId, onSelectAddress }: ClientAddressListProps) => {
   return (
      <div
         className="rounded-2xl border border-orange-200 bg-orange-50 overflow-hidden"
         style={{ animation: "slideDown 0.2s ease-out" }}
      >
         <div className="px-4 py-3 bg-orange-100 border-b border-orange-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
               {client.name.charAt(0)}
            </div>

            <div className="min-w-0">
               <p className="font-bold text-gray-800 text-sm truncate">
                  {client.name}
               </p>

               <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                     </svg>
                     {client.phone}
                  </span>

                  <span className="text-xs text-gray-500 flex items-center gap-1 truncate">
                     <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                     </svg>
                     {client.email}
                  </span>
               </div>
            </div>
         </div>

         <div className="p-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
               Direcciones guardadas ({items.length})
            </p>

            <div className="space-y-2">
               {items.map((addr) => {
                  const isSelected = addressId === addr.id;

                  return (
                     <button
                        key={addr.id}
                        onClick={() => onSelectAddress(addr)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all flex items-start gap-2.5 ${isSelected
                           ? "border-orange-400 bg-white shadow-sm"
                           : "border-transparent bg-white/60 hover:bg-white hover:border-orange-200"
                           }`}
                     >
                        <svg className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-orange-500" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <span className={`leading-snug flex-1 ${isSelected ? "text-gray-800 font-semibold" : "text-gray-600"}`}>
                           {addr.address}
                        </span>

                        {isSelected && (
                           <span className="shrink-0 mt-0.5">
                              <CheckIcon />
                           </span>
                        )}
                     </button>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default ClientAddressList;