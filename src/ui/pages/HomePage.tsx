import { useEffect } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import FeaturedProducts from "../../product/components/FeaturedProducts";
import { scrollTop } from "../../shared/utils/scrollTop";

export default function HomePage() {
   useEffect(() => { scrollTop() }, []);

   return (
      <div className="max-w-[1300px] mt-header mx-auto px-4 py-6 space-y-10">
         <Hero />

         <FeaturedProducts />

         <Features />
      </div>
   )
}