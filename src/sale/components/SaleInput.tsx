interface SaleInputProps {
   label: string;
   placeholder?: string;
   name?: string;
   type: string;
   classSelector?: string;
}

const SaleInput = (props: SaleInputProps) => {
   return (
      <div className={props.classSelector || ''}>
         <label className="text-xs font-bold text-slate-500">
            {props.label}
         </label>

         <input
            className="w-full border rounded px-2 py-1.5"
            placeholder={props.placeholder}
            name={props.name}
            type={props.type}
         />
      </div>
   )
}

export default SaleInput;