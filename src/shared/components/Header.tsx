interface HeaderProps {
   title?: string;
   children?: React.ReactNode;
}

const Header = ({ title = 'Ferretería', children }: HeaderProps) => {
   return (
      <header className="z-50 bg-white border-b border-gray-200 px-8 py-3.5 flex justify-between items-center sticky top-0">
         {title && !children &&
            <h1 className="text-xl text-slate-800 font-semibold">
               {title}
            </h1>
         }

         {children && children}
      </header>
   )
}

export default Header;