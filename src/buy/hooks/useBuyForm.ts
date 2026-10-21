import { useMemo, useState } from "react";
import type { Product } from "../../product/types/product.types";
import useForm from "../../shared/hooks/useForm";
import buyService from "../services/buy.service";
import { roundNumber } from "../../shared/utils/roundNumber";

const state = {
   productId: '',
   supplierId: '',
   unitPrice: '',
   stock: '',
   subtotal: '',
   purchaseDate: ''
}

const useBuyForm = (products: Product[]) => {
   const [query, setQuery] = useState('');
   const [isSearch, setIsSearch] = useState(false);

   const { formState, onFieldChange } = useForm(state);

   const items = useMemo(() => {
      const q = query.trim();

      return (q.length <= 0)
         ? []
         : products.filter(
            p => p.name.toLowerCase().includes(q.toLowerCase())
         )
   }, [query]);


   const validateForm = () => {
      const fields = ['productId', 'unitPrice', 'stock', 'purchaseDate'];
      const data: any = formState;

      let isValid = true;

      for (const k of fields) {
         if (!data[k]) {
            isValid = false
         }
      }

      return isValid;
   }

   const onSave = async () => {
      if (!validateForm()) return alert('Completa todos los campos');

      const stock = parseInt(`${formState.stock}`);
      const unitPrice = roundNumber(Number(`${formState.unitPrice}`)).rounded;

      const dto = {
         product_id: formState.productId,
         unit_price: unitPrice,
         stock,
         subtotal: roundNumber(stock * unitPrice).rounded,
         purchase_date: formState.purchaseDate
      }

      const { error } = await buyService.insertBuy(dto);

      if (error) {
         const msg = 'Error al guardar registro de compra';
         alert(msg);
         throw new Error(msg);
      }

      alert('Guardado');
   }

   return {
      items,
      query, setQuery,
      isSearch, setIsSearch,
      formState, onFieldChange,
      onSave,
   }
}

export default useBuyForm;