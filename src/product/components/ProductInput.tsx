interface ProductInputProps {
   label: string;
   placeholder?: string;
   name?: string;
   type?: 'text' | 'number';
   required?: boolean
   defaultValue?: string | number;
   onChange: (value: string) => void;
}

const ProductInput = (props: ProductInputProps) => {
   return (
      <div>
         <label className="text-[10px] font-bold text-slate-500 uppercase">
            {props.label}
         </label>
         <input
            className="w-full border rounded px-3 py-2 focus:ring-1 focus:ring-slate-400 outline-none transition-all"
            placeholder={props.placeholder || ''}
            onChange={e => props.onChange(e.target.value)}
            name={props.name ?? ''}
            type={props.type ?? 'text'}
            defaultValue={props.defaultValue}
            required={props.required ?? true}
         />
      </div>
   )
}

export default ProductInput;