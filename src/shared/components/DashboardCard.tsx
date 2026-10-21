interface DashboardCardProps {
   title: string;
   value: string | number;
   icon: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
   return (
      <div className="bg-white border rounded-xl p-6 shadow-sm flex justify-between items-center">
         <div>
            <p className="text-[12px] text-gray-500 uppercase">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
         </div>

         {icon}
      </div>
   )
}

export default DashboardCard;