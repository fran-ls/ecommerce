interface OrderInputProps {
   label: string;
   placeholder?: string;
   name?: string;
   type: string;
   icon?: React.ReactNode;
   onChange: (value: string) => void;
}

const OrderInput = (props: OrderInputProps) => {
   return (
      <div className="group-input-order">
         <label className="text-xs font-bold text-slate-500 uppercase">
            {props.label}
         </label>

         {
            !props.icon
               ?
               <input
                  onChange={(e) => props.onChange(e.target.value)}
                  className="w-full border rounded px-8 py-1.5 text-sm"
                  placeholder={props.placeholder}
                  name={props.name}
                  type={props.type}
               />
               :
               <div className="relative">
                  {props.icon}

                  <input
                     onChange={(e) => props.onChange(e.target.value)}
                     className="w-full border rounded px-8 py-1.5 text-sm"
                     placeholder={props.placeholder}
                     name={props.name}
                     type={props.type}
                  />
               </div>
         }
      </div>
   )
}

export default OrderInput;