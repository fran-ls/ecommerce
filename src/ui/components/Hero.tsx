import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "./Icons";
import { HERO_SLIDES } from "../data/heroSlides.data";
import { publicRoutes } from "../../config/routes";
import HeroSideCards from "./HeroSideCards";

const Hero = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const slides = HERO_SLIDES;
   const slide = slides[currentIndex];

   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

   // const prevSlide = () => setCurrentIndex(
   //    (prev) => (prev - 1 + slides.length) % slides.length
   // );

   useEffect(() => { setInterval(() => { nextSlide() }, 3000); }, []);

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div
            className="h-[250px] md:h-[320px] lg:h-[400px] xl:h-[450px] md:col-span-2 rounded-2xl p-8 sm:px-12 lg:px-16 relative overflow-hidden min-h-[300px] flex items-center"
            style={{ background: `linear-gradient(135deg, ${slide.color1} 50%, ${slide.color2})` }}
         >
            {/* Grid pattern overlay */}
            <div
               className="absolute inset-0 opacity-10"
               style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
               }}
            />

            <div className="relative z-10 flex-1 md:min-w-[250px] xl:min-w-[370px]">
               <h1 className="font-bold text-white leading-[1.1] tracking-tight text-xl md:text-2xl lg:text-4xl xl:text-5xl">
                  {slide.title}
               </h1>
               <p className="text-gray-300 text-sm mt-6 mb-4">
                  {slide.subtitle}
               </p>
               <p className="text-gray-400 text-[9px] lg:text-xs uppercase tracking-widest mt-7 mb-1 font-semibold">
                  PRECIOS DESDE
               </p>
               <p className="text-white font-black text-lg md:text-xl lg:text-4xl xl:text-5xl mb-6">
                  $ {slide.price}<sup className="text-[0.6em]">.00</sup>
               </p>
               <Link
                  to={publicRoutes.shop}
                  className="w-fit bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
               >
                  Ver ofertas <ArrowRight />
               </Link>
            </div>

            <div
               className="text-[120px] ml-10 select-none hidden hero-img-div"
               style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))" }}
            >
               <img
                  src={slide.image}
                  className="w-full h-auto relative z-10 max-h-[140px] md:max-h-[220px] lg:max-h-[350px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 opacity-100 scale-110"
                  alt="Hero"
               />
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
               {slides.map((_, i) => (
                  <button
                     key={i}
                     onClick={() => setCurrentIndex(i)}
                     className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                  />
               ))}
            </div>
         </div>

         <HeroSideCards />
      </div>
   )
}

export default Hero;