import { useState } from "react";

export interface SelectItemValue {
   index: number | null;
   id: string;
}

interface SelectItemProps {
   label: string;
   fieldName: string;
   value?: string;
   items: Record<string, any>[];
   onChange: (value: SelectItemValue) => void;
}

const SelectItem = ({ label, value, items, fieldName, onChange }: SelectItemProps) => {
   const [selectedItem, setSelectedItem] = useState<string>(value ?? '');

   const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
      const index = e.currentTarget.selectedIndex;
      const value = e.target.value;

      const condition = index > 0;

      setSelectedItem(value)

      onChange({
         index: condition ? (index - 1) : null,
         id: value
      })
   }

   return (
      <div>
         <label className="text-[10px] font-bold text-slate-500 uppercase">
            {label}
         </label>
         <select
            onChange={onSelectChange}
            value={selectedItem}
            className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
            name={fieldName}
            required
         >
            <option value="">Seleccionar</option>
            {
               items.map((item) => (
                  <option
                     value={item.id}
                     key={item.id}
                  >
                     {item[fieldName]}
                  </option>
               ))
            }
         </select>
      </div>
   )
}

export default SelectItem;