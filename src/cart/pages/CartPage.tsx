import { useEffect } from "react";
import CartItemRow from "../components/CartItemRow";
import { EditIcon, TruckIcon } from "../components/Icons";
import OrderSummary from "../components/OrderSummary";
import ShippingModal from "../../client/components/ShippingModal";
import EmptyMessage from "../components/EmptyMessage";
import SuccessMessage from "../components/SuccessMessage";
import ShippingCard from "../../client/components/ShippingCard";
import { scrollTop } from "../../shared/utils/scrollTop";
import useShipping from "../hooks/useShipping";
import useCart from "../hooks/useCart";

const CartPage = () => {
   const { cart, totals, getCart, onResetCart, onChangeQuantity, onRemove } = useCart();

   const {
      shippingData, clientAddresses, modalOpen, orderPlaced, getShippingData,
      setShippingData, setModalOpen, setOrderPlaced, onSave, onPay
   } = useShipping({ cart, totals, onResetCart });

   const { client, address, clientFilled, addressFilled, addressId } = shippingData;
   const shippingFilled = clientFilled && addressFilled;

   useEffect(() => {
      scrollTop();
      getCart();
   }, []);

   useEffect(() => { getShippingData() }, [client.phone]);

   return (
      <div className="mt-header min-h-screen font-sans cart-container">
         <div className="max-w-275 mx-auto px-4 py-10">
            {orderPlaced ? (
               <SuccessMessage
                  client={client}
                  onNext={() => setOrderPlaced(false)}
               />
            ) : cart.totalItems === 0 ? (
               <EmptyMessage />
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2 space-y-3">
                     <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Mi Carrito
                        <span className="ml-2 text-base font-normal text-gray-400">
                           ({cart.totalItems} {cart.totalItems === 1 ? "producto" : "productos"})
                        </span>
                     </h1>

                     {
                        cart.items.map((item) => (
                           <CartItemRow
                              item={item}
                              onQtyChange={onChangeQuantity}
                              onRemove={onRemove}
                              key={item.id}
                           />
                        ))
                     }
                  </div>

                  <div className="lg:mt-[56px] space-y-4">
                     <div
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                     >
                        <div className="p-4 border-b border-gray-100">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <TruckIcon />
                                 </div>
                                 <span className="font-bold text-gray-800 text-sm">
                                    Datos de Envío
                                 </span>
                              </div>

                              {shippingFilled &&
                                 <button
                                    onClick={() => setModalOpen(true)}
                                    className="flex items-center gap-1 text-orange-500 text-xs font-semibold hover:text-orange-600 transition-colors"
                                 >
                                    <EditIcon /> Editar
                                 </button>
                              }
                           </div>
                        </div>

                        <ShippingCard
                           client={client}
                           address={{ ...address, id: addressId }}
                           shippingFilled={shippingFilled}
                           onShowModal={() => setModalOpen(true)}
                        />
                     </div>

                     <OrderSummary
                        totals={{ ...totals, totalItems: cart.totalItems }}
                        onPay={onPay}
                        shippingFilled={shippingFilled}
                     />

                     <div className="hidden grid- grid-cols-2 gap-2">
                        {[
                           { icon: "🔒", text: "Pago seguro" },
                           { icon: "🚚", text: "Envío garantizado" },
                           { icon: "↩️", text: "Devoluciones" },
                           { icon: "📞", text: "Soporte 24/7" },
                        ].map((b) => (
                           <div
                              className="bg-white rounded-xl p-2.5 flex items-center gap-2 border border-gray-100"
                              key={b.text}
                           >
                              <span className="text-base">{b.icon}</span>
                              <span className="text-xs text-gray-500 font-medium">{b.text}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>

         {modalOpen &&
            <ShippingModal
               shippingData={shippingData}
               clientAddresses={clientAddresses}
               setShippingData={setShippingData}
               onSave={onSave}
               onClose={() => setModalOpen(false)}
            />
         }
      </div>
   )
}

export default CartPage;