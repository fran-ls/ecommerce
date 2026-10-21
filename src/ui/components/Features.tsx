import { BoltIcon, ClockIcon, ShoppingBagIcon, TruckIcon } from "./Icons";

const features = [
   {
      icon: <TruckIcon />,
      title: "Envíos a todo el país",
      desc: "Despachamos herramientas y materiales de ferretería a todo El Salvador de forma segura."
   },
   {
      icon: <BoltIcon />,
      title: "Compra rápida",
      desc: "Encuentra herramientas y materiales fácilmente y completa tu pedido en minutos."
   },
   {
      icon: <ShoppingBagIcon />,
      title: "Calidad garantizada",
      desc: "Productos resistentes y duraderos para construcción, mantenimiento y hogar."
   },
   {
      icon: <ClockIcon />,
      title: "Precios ferreteros",
      desc: "Ofertas constantes y precios justos en herramientas, electricidad y plomería."
   },
];

const Features = () => {
   return (
      <div className="pt-6 mb-8">
         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Tu ferretería de confianza</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
               <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 text-center relative hover:shadow-md transition-shadow"
                  style={{ border: "1px solid #e5e7eb" }}
               >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto -mt-9 mb-4 shadow-lg shadow-orange-200">
                     {f.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Features;