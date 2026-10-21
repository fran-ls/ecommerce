import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "./Icons";
import { publicRoutes } from "../../config/routes";
import { images } from "../data/images.data";
import { CartIconItem } from "../../shared/components/CartIconItem";
import useCart from "../../cart/hooks/useCart";

const navItems = [
   {
      label: "Tienda",
      link: publicRoutes.shop
   },
   {
      label: "Sobre Nosotros",
      link: publicRoutes.about
   },
   {
      label: "Contacto",
      link: publicRoutes.contact
   },
]

const Navbar = () => {
   const [query, setQuery] = useState<string>('');
   const { cart } = useCart();

   const navigate = useNavigate();

   const onNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const q = query.trim();
      if (e.key.toLowerCase() !== 'enter') return;
      else if (!q) return navigate(publicRoutes.shop);
      navigate(`${publicRoutes.shop}?q=${q}`);
   }

   return (
      <nav className="bg-[#0f172a] w-full max-w-[1360px] fixed top-0 z-50 px-6 py-3 flex items-center gap-6">
         <div className="flex items-center gap-2 cursor-pointer">
            <Link to={publicRoutes.home}>
               <img
                  src={images.logo}
                  className="w-24 h-7 object-cover"
                  alt="logo"
               />
            </Link>
         </div>
         <div className="flex-1 max-w-xl mx-auto">
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
               </span>
               <input
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onNavigate}
                  placeholder="Buscar productos..."
                  className="w-full bg-white rounded-full pl-9 pr-4 py-2 text-sm outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
                  type="search"
               />
            </div>
         </div>

         <div className="flex items-center gap-8 ml-auto">
            {navItems.map((item) => (
               <Link
                  className="text-white text-sm hover:text-orange-400 transition-colors whitespace-nowrap hidden md:block"
                  to={item.link}
                  key={item.label}
               >
                  {item.label}
               </Link>
            ))}

            <Link
               to={publicRoutes.auth}
               className="cursor-pointer border border-orange-500 text-orange-400 text-sm px-4 py-1.5 rounded-full hover:bg-orange-500 hover:text-white transition-all whitespace-nowrap"
            >
               Admin
            </Link>

            <CartIconItem count={cart.totalItems} />
         </div>
      </nav>
   )
}

export default Navbar;