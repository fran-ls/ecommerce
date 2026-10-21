export const imageConfig = {
   MAIN_SLOT_KEY: 'main',
   MAX_IMAGES: 4
} as const;

export const getIsPrimaryImageSlot = (key: string) => (
   key.toLowerCase() === imageConfig.MAIN_SLOT_KEY
);

const getSlotKey = (key: string, index: number) => {
   key = key.toLowerCase();
   return key === imageConfig.MAIN_SLOT_KEY ? key : (key + index);
}

export const getProductImageSlots = (count: number = imageConfig.MAX_IMAGES) => {
   const mapfn = (_: any, i: number) => ({
      label: 'Opcional',
      key: getSlotKey('optional', i + 1)
   });

   return [
      { label: 'Principal', key: imageConfig.MAIN_SLOT_KEY },
      ...Array.from({ length: count - 1 }, mapfn)
   ]
}