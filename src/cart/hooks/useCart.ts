import { useContext, useMemo } from "react";
import type { Product } from "../../product/types/product.types";
import type { IPrices } from "../../product/hooks/useProductDetail";
import type { CartData, CartTotals, LocalCartItem, LocalStorageCart } from "../types";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
import { CartContext } from "../../shared/context/CartContext";
import useUserProduct from "../../product/hooks/useUserProduct";
import formatPrices from "../../product/utils/formatPrices";
import { roundNumber } from "../../shared/utils/roundNumber";

export const useCart = () => {
   const { data, cart, setCart, onResetCart, onCartChange } = useContext(CartContext);
   const { getItem, setItem, removeItem } = useLocalStorage();
   const { getUserProducts } = useUserProduct();

   const totals: CartTotals = useMemo(() => {
      const d = data.items.reduce((acc, item) => {
         const percentage = item.discount / 100;
         acc.subtotal += item.price * item.qty;
         acc.savings = item.isOffer ? acc.savings + (item.salePrice * percentage * item.qty) : acc.savings;
         return acc;
      }, {
         subtotal: 0,
         savings: 0,
      });

      const t = {
         ...d,
         shippingCost: 5,
         total: 0,
         totalItems: data.totalItems
      }

      if (d) {
         t.shippingCost = d.subtotal >= 100 ? 0 : t.shippingCost;
         t.total += d.subtotal + t.shippingCost;
      }

      return {
         ...t,
         total: roundNumber(t.total, 2).rounded,
         shippingCost: roundNumber(t.shippingCost, 2).rounded,
      }
   }, [cart]);

   const getCartId = () => {
      return 'cart';
   }

   const getDBCart = async () => {
      const localCart = getCart();

      const itemIds = Object.keys(localCart);
      if (itemIds.length <= 0) return {}

      const products = await getUserProducts(itemIds);
      const data: CartData = {};

      products.forEach((p) => {
         const prices = formatPrices({
            salePrice: p.salePrice,
            offerPrice: p.offerPrice
         });

         const id = p.id;

         data[id] = {
            id: p.id,
            name: p.name,
            image: p.imgs?.main?.url ?? p.images[0]?.url,
            offerPrice: p.offerPrice,
            salePrice: p.salePrice,
            strSalePrice: prices.salePrice.format,
            price: p.isOffer ? prices.offerPrice.rounded : prices.salePrice.rounded,
            strPrice: p.isOffer ? prices.offerPrice.format : prices.salePrice.format,
            isOffer: p.isOffer,
            qty: localCart[id].qty,
            discount: prices.savings.percentage,
            time: localCart[id].time
         }
      });

      setCart(data);
      return data;
   }

   const getCart = () => {
      const cartId = getCartId();
      const localCart: LocalStorageCart = getItem(cartId) || {};
      return localCart;
   }

   const getCartItem = (id: string) => {
      const localCart = getCart();
      const item = localCart[id] || null;
      return { localCart, item }
   }

   const formatCartItem = (data: { product: Product, prices: IPrices, qty?: number }) => {
      const { product: p, prices, qty = 1 } = data;

      return {
         id: p.id,
         name: p.name,
         image: p.images.filter(img => img.isPrimary)[0].url,
         price: p.isOffer ? prices.offerPrice.rounded : prices.salePrice.rounded,
         strPrice: p.isOffer ? prices.offerPrice.format : prices.salePrice.format,
         salePrice: prices.salePrice.rounded,
         offerPrice: prices.offerPrice.rounded,
         strSalePrice: prices.salePrice.format,
         discount: prices.savings.percentage,
         qty,
         isOffer: p.isOffer,
         time: Date.now()
      }
   }

   const onNewCartItem = (data: { product: Product, prices: IPrices }) => {
      const { product, prices } = data;

      const item: LocalCartItem = {
         id: product.id,
         qty: 1,
         time: Date.now(),
         discount: prices.savings.percentage
      }

      const cartItem = formatCartItem({ product, prices, qty: item.qty })

      const localCart = getCart();
      const itemId = item.id;
      const localItem = localCart[itemId];

      if (Object.keys(localCart).length <= 0) return onSetCart({
         cartItems: { [itemId]: cartItem },
         localCart: { [itemId]: item }
      });

      if (localItem) {
         item.qty += localItem.qty;
      }

      onSetCart({
         cartItems: { ...cart, [itemId]: cartItem },
         localCart: { ...localCart, [itemId]: item }
      });
   }

   const onChangeQuantity = (id: string, quantity: number) => {
      const { localCart, item } = getCartItem(id);
      if (!item) return;
      if (quantity <= 0) return onRemove(id);

      onSetCart({
         cartItems: {
            ...cart, [id]: {
               ...cart[id], qty: quantity
            }
         },
         localCart: {
            ...localCart, [id]: {
               ...item, qty: quantity
            }
         }
      });
   }

   const onRemove = (id: string) => {
      const localCart = getCart();
      const updatedCartItems: CartData = {};
      const updatedLocalCart: LocalStorageCart = {};

      data.items.forEach(p => {
         if (id !== p.id) {
            updatedLocalCart[p.id] = localCart[p.id];
            updatedCartItems[p.id] = cart[p.id];
         }
      });

      onSetCart({
         cartItems: updatedCartItems,
         localCart: updatedLocalCart
      });
   }

   const onSetCart = (data: { cartItems: CartData, localCart: LocalStorageCart }) => {
      const { cartItems, localCart } = data;
      const cartId = getCartId();
      setCart(cartItems);
      setItem(cartId, localCart);
   }

   const clearCart = () => {
      const cartId = getCartId();
      removeItem(cartId);
      onResetCart();
   }

   return {
      cart: data, totals,
      getCart: getDBCart,
      onNewCartItem, onChangeQuantity,
      onRemove, onResetCart: clearCart, onCartChange,
   }
}

export default useCart;