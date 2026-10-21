import { useEffect, useState } from "react";
import { scrollTop } from "../../shared/utils/scrollTop";
import { WhatsAppIcon } from "../components/Icons";
import { appData } from "../data/app.data";

const ClockIcon = () => (
   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
   </svg>
);

const PhoneIcon = () => (
   <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
   </svg>
);

const SendIcon = () => (
   <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
   </svg>
);

const ContactPage = () => {
   const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
   const [sent, setSent] = useState(false);

   const handleSubmit = () => {
      if (!form.name || !form.email) return;
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", phone: "", email: "", message: "" });
   }

   useEffect(() => { scrollTop() }, []);

   return (
      <div className="max-w-[1000px] mt-header mx-auto px-4 py-10">
         <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Contacto</h1>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
               En {appData.name} estamos listos para ayudarte con herramientas, materiales y asesoría para tus proyectos.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Schedule & Phone */}
            <div className="space-y-4">
               {/* Schedule */}
               <div
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
               >
                  <div className="p-5">
                     <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                           <ClockIcon />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">Horario de Atención</h3>
                     </div>
                     <div className="space-y-0">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                           <span className="text-gray-600 text-sm">Lunes - Sábado</span>
                           <span className="font-bold text-gray-800 text-sm">7:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                           <span className="text-gray-600 text-sm">Domingo</span>
                           <span className="font-bold text-gray-800 text-sm">Cerrado</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div
                  className="bg-white rounded-2xl border border-gray-200 p-5"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
               >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                        <PhoneIcon />
                     </div>
                     <div>
                        <p className="text-gray-500 text-xs mb-0.5">Teléfono</p>
                        <p className="font-bold text-gray-800">{appData.phone}</p>
                     </div>
                  </div>
               </div>

               <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95" style={{ boxShadow: "0 4px 16px rgba(34,197,94,0.3)" }}>
                  <WhatsAppIcon />
                  Chatear por WhatsApp
               </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
               <h3 className="font-bold text-gray-900 text-xl mb-5">Envíanos un mensaje</h3>
               <div className="space-y-3">
                  <input
                     type="text"
                     placeholder="Nombre completo"
                     value={form.name}
                     onChange={(e) => setForm({ ...form, name: e.target.value })}
                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all placeholder-gray-400"
                  />
                  <input
                     type="tel"
                     placeholder={appData.phone}
                     value={form.phone}
                     onChange={(e) => setForm({ ...form, phone: e.target.value })}
                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all placeholder-gray-400"
                  />
                  <input
                     type="email"
                     placeholder="correo@google.com"
                     value={form.email}
                     onChange={(e) => setForm({ ...form, email: e.target.value })}
                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all placeholder-gray-400"
                  />
                  <textarea
                     placeholder="Escribe tu mensaje..."
                     value={form.message}
                     onChange={(e) => setForm({ ...form, message: e.target.value })}
                     rows={4}
                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all placeholder-gray-400 resize-none"
                  />
                  <button
                     onClick={handleSubmit}
                     className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 ${sent ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
                     style={{ boxShadow: sent ? "0 4px 16px rgba(34,197,94,0.3)" : "0 4px 16px rgba(249,115,22,0.3)" }}
                  >
                     <SendIcon />
                     {sent ? "¡Mensaje enviado!" : "Enviar mensaje"}
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactPage;