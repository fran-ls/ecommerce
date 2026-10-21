type Data = { [key: string]: any };

const useLocalStorage = () => {
   const STORAGE_ITEM = 'app-ferreteria';

   const setItem = (key: string, value: any) => {
      const item = getItem();
      const data: Data = item || {};
      data[key] = value;
      localStorage.setItem(STORAGE_ITEM, JSON.stringify(data));
   }

   const getItem = (key = '') => {
      const item = localStorage.getItem(STORAGE_ITEM);
      if (!item) return null;

      try {
         const data = JSON.parse(item);
         const value = key !== '' ? data[key] : data;
         return value || null;
      } catch (e) {
         console.error('JSON parsing error:', e);
         return null;
      }
   }

   const removeItem = (key: string) => {
      const item = getItem();
      delete item[key];
      if (item) localStorage.setItem(STORAGE_ITEM, JSON.stringify(item));
   }

   return {
      setItem,
      getItem,
      removeItem
   }
}

export default useLocalStorage;