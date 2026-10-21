import { Link } from "react-router-dom";
import type { ClientDTO } from "../../client/types/client.types";
import { publicRoutes } from "../../config/routes";

interface SuccessMessageProps {
   client: ClientDTO;
   onNext: () => void;
}

const SuccessMessage = ({ client, onNext }: SuccessMessageProps) => {
   return (
      <div className=" rounded-2xl text-center">
         <div className="px-6 absolute top-1/2 left-1/2 -translate-1/2">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
               ¡Pedido confirmado!
            </h2>
            <p className="text-gray-500 mb-1">
               Gracias, <strong>{client.name}</strong>. Tu pedido ha sido recibido.
            </p>
            <p className="text-gray-400 text-sm mb-6">
               Te contactaremos a <strong>{client.email}</strong> con los detalles de envío.
            </p>
            <Link
               to={publicRoutes.shop}
               onClick={onNext}
               className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
               Seguir comprando
            </Link>
         </div>
      </div>
   )
}

export default SuccessMessage;