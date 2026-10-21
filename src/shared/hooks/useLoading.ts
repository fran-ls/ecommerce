import { useState } from "react";

const useLoading = () => {
   const [isLoading, setIsLoading] = useState(false);

   const loadingTypes = {
      error: '',
      success: '',
      warning: ''
   }

   const onLoading = () => setIsLoading(true);

   const offLoading = () => setIsLoading(false);

   return {
      isLoading,
      onLoading,
      offLoading,
      loadingTypes
   }
}

export default useLoading;