import { useState } from "react";
import type { ClientAddress, ClientAddressDTO } from "../types/address.types";
import type { ShippingDataChange } from "../../cart/types";

interface Data {
   clientAddress: ClientAddressDTO;
   onShippingDataChange: ShippingDataChange;
}

const useClientAddressForm = ({ clientAddress, onShippingDataChange }: Data) => {
   const [errors, setErrors] = useState<Partial<ClientAddressDTO>>({});

   const clientAddressFilled = (
      clientAddress.department &&
      clientAddress.city &&
      clientAddress.address &&
      clientAddress.clientId
   );

   const validate = () => {
      const e: Partial<ClientAddress> = {};

      if (!clientAddress.department.trim()) e.department = "El departamento es requerido";
      if (!clientAddress.city.trim()) e.city = "La ciudad es requerida";
      if (!clientAddress.address.trim()) e.address = "La dirreción es requerida";
      if (!clientAddress.clientId.trim()) e.id = "El cliente es requerido";
      setErrors(e);

      return Object.keys(e).length === 0;
   }

   const onInputChange = (field: keyof ClientAddressDTO, value: string) => {
      onShippingDataChange('address', {
         ...clientAddress, [field]: value
      });

      setErrors({
         ...errors, [field]: ''
      });
   }

   const onSave = () => {
      if (validate()) console.log('saving address...');
   }

   return {
      clientAddressFilled, errors, clientAddress,
      onSave, onInputChange
   }
}

export default useClientAddressForm;