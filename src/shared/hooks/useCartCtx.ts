import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCartCtx = () => {
   const ctx = useContext(CartContext)
   return ctx;
}

export default useCartCtx;