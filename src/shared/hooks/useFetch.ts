import { useState } from "react";

const useFetch = <T>(state: T, callback: () => Promise<any>) => {
   const [data, setData] = useState<T | null>(state ?? null);
   const [error, setError] = useState<string>('');

   const petition = async () => {
      const response = await callback();
      const json = response.json();

      if (!response.ok) {
         setError(response.error);
         throw new Error(response.error);
      }

      setData(json);
      return json;
   }

   return {
      petition,
      data, setData,
      error, setError
   }
}

export default useFetch;