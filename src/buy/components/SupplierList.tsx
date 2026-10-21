import { useState } from "react";
import type { Supplier } from "../types/supplier.types";
import SelectItem, { type SelectItemValue } from "../../shared/components/SelectItem";

export const MOCK_SUPPLIER: Supplier = {
   id: crypto.randomUUID(),
   name: 'Mock Proveedor'
}

export const MOCK_SUPPLIERS: Supplier[] = Array.from({ length: 5 }, (_, i) => ({
   id: crypto.randomUUID(),
   name: `Mock Proveedor ${i + 1}`
}));

const SupplierList = () => {
   const [_, setSelectedSupplier] = useState<Supplier | null>(null);

   const ID = '4d85a8b5-3865-49d3-b66e-17a31ac494b0';

   const onChangeItem = (value: SelectItemValue) => {
      if (value.index === null) return setSelectedSupplier(null);
      setSelectedSupplier(MOCK_SUPPLIERS[value.index]);
   }

   return (
      <div className="mx-8 mt-6">
         <SelectItem
            label="Proveedor"
            value={ID}
            fieldName="name"
            items={MOCK_SUPPLIERS}
            onChange={onChangeItem}
         />
      </div>
   )
}

export default SupplierList;