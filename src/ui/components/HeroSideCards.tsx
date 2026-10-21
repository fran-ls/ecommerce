import { Link } from "react-router-dom";
import { publicRoutes } from "../../config/routes";
import { heroImages } from "../data/images.data";
import { ArrowRight } from "./Icons";

const heroSideCards = [
   {
      wrapperBackground: 'linear-gradient(135deg, #1e293b, #1e3a5f)',
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.4) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      title: {
         part1: 'Nuevos',
         part2: 'Lanzamientos',
      },
      linkTitle: 'Ver catálogo',
      link: publicRoutes.shop,
      image: heroImages.hero3,
   },
   {
      wrapperBackground: 'linear-gradient(135deg, #1e293b, #1a3320)',
      backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
      backgroundSize: '25px 25px',
      title: {
         part1: 'Ofertas',
         part2: 'Especiales',
      },
      linkTitle: 'Ir a la tienda',
      link: publicRoutes.shop,
      image: heroImages.hero4,
   },
]

const HeroSideCards = () => {
   return (
      <div className="flex flex-col sm:flex-row md:flex-col gap-4">
         {
            heroSideCards.map((card) => (
               <div
                  className="rounded-2xl p-6 flex items-center justify-between flex-1 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden"
                  style={{ background: card.wrapperBackground }}
                  key={card.linkTitle}
               >
                  <div
                     className="absolute inset-0 opacity-10"
                     style={{
                        backgroundImage: card.backgroundImage,
                        backgroundSize: card.backgroundSize
                     }}
                  />

                  <div className="z-10">
                     <h2 className="text-white font-bold text-xl leading-snug">
                        {card.title.part1} <br /> {card.title.part2}
                     </h2>
                     <Link
                        to={card.link}
                        className="text-orange-400 text-sm mt-2 flex items-center gap-1 hover:underline">
                        {card.linkTitle} <ArrowRight />
                     </Link>
                  </div>
                  <img
                     src={card.image}
                     className="w-16 h-16 lg:w-32 lg:h-32 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 -mr-2"
                     alt="Hero"
                  />
               </div>
            ))
         }
      </div>
   )
}

export default HeroSideCards;