import { Link, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Truck, PackageSearch, SquarePlus, SquarePen, CircleDollarSign } from 'lucide-react';
import { privateRoutes, publicRoutes } from '../../config/routes';
import { images } from '../../ui/data/images.data';
import { appData } from '../../ui/data/app.data';
import useAuth from '../hooks/useAuth';

const routes = privateRoutes;

const items = [
   {
      label: 'Panel',
      route: routes.dashboard,
      icon: <Home className="w-5 h-5" />,
   },
   {
      label: 'Ventas',
      route: routes.sales,
      icon: <CircleDollarSign className="w-5 h-5" />,
   },
   {
      label: 'Pedidos',
      route: routes.orders,
      icon: <Truck className="w-5 h-5" />,
   },
   {
      label: 'Compras',
      route: routes.buys,
      icon: <ShoppingCart className="w-5 h-5" />,
   },
   {
      label: 'Inventario',
      route: routes.inventory,
      icon: <PackageSearch className="w-5 h-5" />,
   },
   {
      label: 'Agregar producto',
      route: routes.newProduct,
      icon: <SquarePlus className="w-5 h-5" />,
   },
   {
      label: 'Administrar productos',
      route: routes.manageProducts,
      icon: <SquarePen className="w-5 h-5" />
   }
]

interface DashboardSidebarProps {
   currentTab: string;
   setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardSidebar = ({ currentTab, setCurrentTab }: DashboardSidebarProps) => {
   const { onRoleChange } = useAuth();

   const navigate = useNavigate();

   const onRedirect = () => {
      onRoleChange('user');
      navigate(publicRoutes.home);
   }

   return (
      <div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-64 bg-white">
         <div className="flex flex-col gap-3 justify-center items-center pt-8 pb-4 max-sm:hidden">
            <div
               onClick={onRedirect}
               className="cursor-pointer relative"
            >
               <img
                  src={images.logo1}
                  className="object-cover aspect-square min-w-16 w-16 h-16 rounded-full shadow-sm border-2 border-slate-100"
                  alt="logo"
               />
               <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <p className="text-slate-800 font-bold text-sm tracking-tight">
               {appData.name}
            </p>
         </div>

         <nav className="flex flex-col max-sm:mt-6 overflow-y-auto">
            {
               items.map(({ route, label, icon }) => (
                  <Link
                     onClick={() => setCurrentTab(label)}
                     className={`${currentTab.toLowerCase() === label.toLowerCase() ? 'bg-slate-100 text-slate-900 border-r-3 border-slate-900' : ''} group relative flex items-center gap-3 pl-7 p-3.5 transition-colors duration-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700`}
                     to={route}
                     key={label}
                  >
                     {icon}
                     <span className="text-sm max-sm:hidden">
                        {label}
                     </span>
                  </Link>
               ))
            }
         </nav>

         <div className="mt-auto p-4 border-t border-slate-100 max-sm:hidden">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest text-center">
               SISTEMA DE GESTIÓN V1.0
            </p>
         </div>
      </div>
   )
}

export default DashboardSidebar;