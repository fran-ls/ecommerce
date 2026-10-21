interface BuyInputProps {
   label: string;
   placeholder?: string;
   name?: string;
   type: string;
   classSelector?: string;
   value?: string;
   onChange: (value: any) => void;
}

const BuyInput = (props: BuyInputProps) => {
   return (
      <div className={props.classSelector || ''}>
         <label className="text-xs font-bold text-slate-500">
            {props.label}
         </label>

         <input
            onChange={(e) => props.onChange(e.target.value)}
            className="w-full border rounded px-2 py-1.5"
            placeholder={props.placeholder}
            defaultValue={props.value ? props.value : ''}
            name={props.name}
            type={props.type}
         />
      </div>
   )
}

export default BuyInput;