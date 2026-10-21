import useAuth from "../../shared/hooks/useAuth";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
   const { authUser } = useAuth();

   const role: string = authUser?.role ?? 'user';

   return (
      role === 'admin'
         ?
         <PrivateRoutes />
         :
         <PublicRoutes />
   )
}

export default AppRouter;