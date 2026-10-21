export type SavingsResult = {
   salePrice: number;
   offerPrice: number;
   savings: number;
   percentage: number;
}

export function calculateSavings(salePrice: number, offerPrice: number): SavingsResult {
   if (salePrice <= 0) {
      throw new Error("El precio de venta debe ser mayor que 0");
   }
   if (offerPrice < 0) {
      throw new Error("El precio de oferta no puede ser negativo");
   }

   const savings = salePrice - offerPrice;
   const percentage = (savings / salePrice) * 100;

   return {
      salePrice,
      offerPrice,
      savings,
      percentage: Math.round(percentage * 100) / 100, // redondeado a 2 decimales
   }
}