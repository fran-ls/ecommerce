import { useState } from 'react';
import DashboardSidebar from '../DashboardSidebar';

interface PrivateLayoutProps {
   children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
   const [currentTab, setCurrentTab] = useState('panel');

   return (
      <div className="flex h-screen">
         <DashboardSidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
         />

         <div className="flex-1 overflow-auto">
            {children}
         </div>
      </div>
   )
}