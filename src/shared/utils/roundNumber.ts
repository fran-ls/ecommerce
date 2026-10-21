export type RoundedResult = {
   rounded: number;
   integer: number;
   decimals: number | string;
}

export function roundNumber(value: number, decimals: number = 2): RoundedResult {
   const factor = Math.pow(10, decimals);
   const rounded = Math.round(value * factor) / factor;

   const [integerPart, decimalPart] = rounded.toString().split('.');

   return {
      rounded,
      integer: parseInt(integerPart, 10),
      decimals: decimalPart ? parseInt(decimalPart.padEnd(decimals, '0'), 10) : '00'
   }
}