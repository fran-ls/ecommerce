import { Link } from "react-router-dom";
import { images } from "../data/images.data";
import { PhoneIcon } from "./Icons";
import { publicRoutes } from "../../config/routes";
import { appData } from "../data/app.data";

const items = [
   {
      label: 'Inicio',
      link: publicRoutes.home
   },
   {
      label: 'Tienda',
      link: publicRoutes.shop
   },
   {
      label: 'Quiénes somos',
      link: publicRoutes.about
   },
   {
      label: 'Contacto',
      link: publicRoutes.contact
   },
]

const Footer = () => {
   return (
      <footer className="bg-[#0f172a] pt-12 pb-6 px-6">
         <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                  <Link to={publicRoutes.home}>
                     <img
                        src={images.logo}
                        className="w-24 h-7 object-cover"
                        alt="logo"
                     />
                  </Link>
               </div>
               <p className="text-gray-400 text-sm leading-relaxed">
                  En <strong className="text-white">{appData.name}</strong> te ofrecemos herramientas, materiales de construcción, productos eléctricos y de plomería para el hogar y proyectos profesionales. Compra de forma rápida, segura y confiable.
               </p>
            </div>

            <div>
               <h4 className="text-white font-bold mb-4">Productos</h4>
               <ul className="space-y-2 text-gray-400 text-sm">
                  {["Herramientas", "Materiales de construcción", "Electricidad", "Plomería"].map(l => (
                     <li key={l}>
                        <a
                           href="#"
                           className="hover:text-orange-400 transition-colors"
                        >
                           {l}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-4">{appData.name}</h4>
               <ul className="space-y-2 text-gray-400 text-sm">
                  {items.map(l => (
                     <li key={l.label}>
                        <Link
                           to={l.link}
                           className="hover:text-orange-400 transition-colors"
                        >
                           {l.label}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-4">Contacto</h4>
               <p className="text-gray-400 text-sm flex items-center">
                  <PhoneIcon /> {appData.phone}
               </p>
            </div>
         </div>

         <div className="max-w-[1300px] mx-auto border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
            © 2026 {appData.name} Todos los derechos reservados.
         </div>
      </footer>
   )
}

export default Footer;