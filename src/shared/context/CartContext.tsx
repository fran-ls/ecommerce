import { createContext, useEffect, useMemo, useState, type Dispatch, type ReactElement, type SetStateAction } from "react";
import type { Cart, CartData, LocalStorageCart } from "../../cart/types";
import useCart from "../../cart/hooks/useCart";

type FieldT = keyof LocalStorageCart;
type ValueT = any;

interface CartCtx {
   data: Cart;
   cart: CartData;
   setCart: Dispatch<SetStateAction<CartData>>;
   onResetCart: () => void;
   onCartChange: (field: FieldT, value: ValueT) => void;
}

export const CartContext = createContext<CartCtx>({
   data: {
      items: [],
      total: 0,
      totalItems: 0,
   },
   cart: {},
   setCart: () => { },
   onResetCart: () => { },
   onCartChange: () => { },
});

export const CartProvider = ({ children }: { children: ReactElement }) => {
   const [cart, setCart] = useState<CartData>({});

   const { getCart } = useCart();

   const data = useMemo(() => {
      const d: Cart = {
         items: [],
         total: 0,
         totalItems: 0,
      }

      for (const id in cart) {
         const p = cart[id];
         d.total += p.qty * p.price;
         d.items.push(p);
      }

      return {
         ...d,
         items: d.items.sort((a, b) => b.time - a.time),
         totalItems: d.items.length
      }
   }, [cart]);

   useEffect(() => { getCart() }, []);

   return (
      <CartContext.Provider value={{
         data,
         cart,
         setCart,
         onResetCart: () => setCart({}),
         onCartChange: (field: FieldT, value: ValueT) => {
            setCart({ ...cart, [field]: value })
         }
      }}>
         {children}
      </CartContext.Provider>
   )
}

export default CartProvider;