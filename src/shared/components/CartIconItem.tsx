import { Link } from "react-router-dom";
import { publicRoutes } from "../../config/routes";
import { CartIcon } from "../../ui/components/Icons";

export const CartIconItem = ({ count }: { count: number }) => (
   <Link
      to={publicRoutes.cart}
      className="relative cursor-pointer text-orange-400"
   >
      <CartIcon />

      {count > 0 && (
         <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {count}
         </span>
      )}
   </Link>
);