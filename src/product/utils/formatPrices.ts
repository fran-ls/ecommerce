import { calculateSavings } from "../../shared/utils/calculateSavings";
import { roundNumber } from "../../shared/utils/roundNumber";
import { formatCurrency } from "../../shared/utils/formatCurrency";

interface FormatPricesArgs {
   salePrice: number;
   offerPrice: number;
   decimals?: number;
}

const formatPrices = ({ salePrice, offerPrice, decimals = 2 }: FormatPricesArgs) => {
   const prices = {
      sale: salePrice ?? 0,
      offer: offerPrice ?? 0,
   }

   const saleP = roundNumber(prices.sale, decimals);
   const offerP = roundNumber(prices.offer, decimals);
   const savings = calculateSavings(prices.sale, prices.offer);

   return {
      salePrice: {
         ...saleP,
         format: formatCurrency(saleP.rounded),
      },
      offerPrice: {
         ...offerP,
         format: formatCurrency(offerP.rounded),
      },
      savings
   }
}

export default formatPrices;