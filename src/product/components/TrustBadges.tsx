import { GlobeIcon, ShieldIcon, UserIcon } from "../../ui/components/Icons";

const TrustBadges = () => {
   return (
      <div className="space-y-2.5">
         {[
            { icon: <GlobeIcon />, text: "Realizamos envíos a todo el país" },
            { icon: <ShieldIcon />, text: "Pago 100% seguro" },
            { icon: <UserIcon />, text: "Vendedor confiable" },
         ].map((b) => (
            <div key={b.text} className="flex items-center gap-2.5 text-sm text-gray-500">
               {b.icon}
               <span>{b.text}</span>
            </div>
         ))}
      </div>
   )
}

export default TrustBadges;