import { Link } from "react-router-dom";
import { EmptyCartIcon } from "./Icons";
import { publicRoutes } from "../../config/routes";

const EmptyMessage = () => {
   return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 rounded-2xl p-12 text-center">
         <div className="flex justify-center mb-4">
            <EmptyCartIcon />
         </div>
         <h2 className="text-xl font-bold text-gray-700 mb-2">
            Tu carrito está vacío
         </h2>
         <p className="text-gray-400 mb-6">
            Agrega productos para continuar con tu compra
         </p>
         <Link
            to={publicRoutes.shop}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
         >
            Ver productos
         </Link>
      </div>
   )
}

export default EmptyMessage;