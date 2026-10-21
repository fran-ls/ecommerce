interface StatCardProps {
   title: string;
   value: number | string;
   icon: React.ReactElement;
   unitMeasure?: string;
}

const StatCard = ({ title, icon, value, unitMeasure }: StatCardProps) => {
   return (
      <div className="min-w-43.75 bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
         <div className="bg-slate-100 p-2 rounded">
            {icon}
         </div>

         <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase leading-none">
               {title}
            </h4>
            <p
               className="flex gap-2 text-xl font-bold text-slate-800"
               title={`${value}`}
            >
               {value}

               {unitMeasure &&
                  <span className="text-[11px] text-slate-400 mt-auto mb-0.5">
                     {unitMeasure}
                  </span>
               }
            </p>
         </div>
      </div>
   )
}

export default StatCard;