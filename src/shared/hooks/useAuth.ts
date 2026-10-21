import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
   const ctx = useContext(AuthContext)
   return ctx;
}

export default useAuth;