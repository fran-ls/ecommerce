import { useEffect } from "react";
import { CheckIcon } from "../components/Icons";
import { scrollTop } from "../../shared/utils/scrollTop";
import { OFFERINGS } from "../data/offerings.data";
import { images } from "../data/images.data";
import { appData } from "../data/app.data";

const AboutPage = () => {
   useEffect(() => { scrollTop() }, []);

   return (
      <div className="max-w-[1100px] mt-header mx-auto px-4 py-10">
         <div className="text-center mb-12 mx-auto max-w-2xl">
            <h1 className=" text-3xl font-bold text-gray-900 mb-3">
               Sobre <span className="text-orange-500">{appData.name}</span>
            </h1>
            <p className="text-gray-600 leading-relaxed">
               En {appData.name} somos tu aliado confiable en herramientas y materiales de construcción. Atendemos proyectos del hogar, mantenimiento y obras profesionales, ofreciendo productos de calidad, precios justos y atención cercana.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
               className="rounded-2xl overflow-hidden"
            >
               <div
                  className="w-full max-h-115 flex items-center justify-center relative"
               >
                  <div className="inset-0 flex items-center justify-center">
                     <img
                        className="lg:aspect-square object-cover"
                        src={images.about}
                        alt="About"
                     />
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                     Nuestra <span className="text-orange-500">Misión</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                     Brindar soluciones prácticas y confiables a nuestros clientes, ofreciendo herramientas y materiales duraderos que faciliten cada proyecto, desde pequeñas reparaciones hasta grandes construcciones.
                  </p>
               </div>

               <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                     Lo que <span className="text-orange-500">Ofrecemos</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                     {OFFERINGS.map((o) => (
                        <div key={o.title} className="flex items-start gap-3">
                           <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
                              style={{ background: o.bg }}
                           >
                              {o.icon}
                           </div>
                           <div>
                              <p className="font-bold text-gray-800 text-sm">{o.title}</p>
                              <p className="text-gray-500 text-xs leading-snug mt-0.5">{o.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                     <CheckIcon />
                     <p className="font-bold text-gray-800">Compromiso Ferretero</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                     Trabajamos con marcas confiables y productos seleccionados para garantizar durabilidad, seguridad y satisfacción en cada compra.
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
export default AboutPage;