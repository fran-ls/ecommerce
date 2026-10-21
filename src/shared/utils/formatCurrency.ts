type FormatCurrencyOptions = {
   locale?: string
   currency?: string
   minimumFractionDigits?: number
   maximumFractionDigits?: number
   useGrouping?: boolean
   currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol'
}

export function formatCurrency(
   value: number | string, formatCurrencyOptions: FormatCurrencyOptions = {}
): string {
   const MIN_FRACTION_DIGITS = 2;

   const {
      locale = 'es-SV',
      currency = 'USD',
      minimumFractionDigits = MIN_FRACTION_DIGITS,
      maximumFractionDigits = MIN_FRACTION_DIGITS,
      useGrouping = true,
      currencyDisplay = 'symbol'
   } = formatCurrencyOptions;

   const number = typeof value === 'string' ? Number(value) : value;
   if (isNaN(number)) return '0';

   return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
      currencyDisplay,
   }).format(number);
}