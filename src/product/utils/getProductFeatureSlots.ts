export const MAX_FEATURE_SLOTS = 3;

const getSlotKey = (key: string, index: number) => {
   key = key.toLowerCase();
   return key + index;
}

export const getProductFeatureSlots = (count: number = MAX_FEATURE_SLOTS) => {
   const mapfn = (_: any, i: number) => ({
      label: 'Característica',
      key: getSlotKey('feature', i + 1)
   });

   return Array.from({ length: count }, mapfn);
}