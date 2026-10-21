import { createContext, useEffect, useState, type Dispatch, type ReactElement, type SetStateAction } from "react";

export type Role = 'user' | 'admin';

export interface User {
   id: string;
   name: string;
   role: Role;
}

interface AuthCtx {
   authUser: User | null;
   authUserIsAdmin: boolean;
   setAuthUser: Dispatch<SetStateAction<User | null>>;
   onRoleChange: (role: Role) => void;
}

export const AuthContext = createContext<AuthCtx>({
   authUser: null,
   authUserIsAdmin: false,
   setAuthUser: () => { },
   onRoleChange: () => { },
});

const AuthProvider = ({ children }: { children: ReactElement }) => {
   const [authUser, setAuthUser] = useState<User | null>(null);
   const ID = '8417de3b-eeb5-49e9-95ce-751621d72412';

   const value: AuthCtx = {
      authUser, setAuthUser,
      authUserIsAdmin: authUser?.role === 'admin',
      onRoleChange: (role: Role) => authUser && setAuthUser({ ...authUser, role })
   }

   const getUser = () => {
      const user: User = {
         id: ID,
         name: 'Fran',
         role: 'user'
      }

      setAuthUser(user);
      return user;
   }

   useEffect(() => { getUser() }, []);

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider;