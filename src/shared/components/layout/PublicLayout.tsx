import Footer from "../../../ui/components/Footer";
import { WhatsAppIcon } from "../../../ui/components/Icons";
import Navbar from "../../../ui/components/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="min-h-screen bg-white font-sans">
         <Navbar />

         {children}

         <Footer />

         <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110 z-50">
            <WhatsAppIcon />
         </button>
      </div>
   )
}

export default PublicLayout;