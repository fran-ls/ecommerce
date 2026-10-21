import { useState } from "react";

export default function useForm<T>(state: T) {
   const [formState, setFormState] = useState<T>(state);

   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({ ...prev, [name]: value }));
   }

   const onFieldChange = (key: keyof T, value: any) => {
      setFormState({ ...formState, [key]: value });
   }

   return {
      formState,
      ...formState,
      onInputChange,
      onFieldChange,
      setFormState,
   }
}