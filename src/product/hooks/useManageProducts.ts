import { useMemo, useState } from "react";
import type { Product } from "../types/product.types";
import useProduct from "./useProduct";
import { getStockStatus } from "../utils/getStockStatus";
import formatKeyFeatures from "../utils/formatKeyFeatures";

const useManageProducts = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [isUpdate, setIsUpdate] = useState(false);
   const [products, setProducts] = useState<Product[]>([]);
   const [editProduct, setEditProduct] = useState<Product | null>(null);
   const [isUpdateImage, setIsUpdateImage] = useState(false);
   const [features, setFeatures] = useState<Record<number, string>>({});

   const [query, setQuery] = useState<string>('');
   const [productFiltereds, setProductFiltereds] = useState<Product[]>([]);

   const hook = useProduct();

   const splitFeatures = useMemo(() => (
      editProduct?.keyFeatures.split('\n') ?? []
   ), [editProduct]);

   const getProducts = async () => {
      setIsLoading(true);
      const data = await hook.getProducts();
      setProducts(data ?? []);
      setIsLoading(false);
   }

   const onLoad = async () => {
      const data = await hook.getProducts();
      setProducts(data ?? []);
   }

   const onChange = (field: keyof Product, value: any) => {
      editProduct && setEditProduct({ ...editProduct, [field]: value });
   }

   const onUpdate = async () => {
      if (!editProduct) return;
      setIsUpdate(true);

      const status = getStockStatus(editProduct.stock);
      editProduct.stockStatus = status;
      editProduct.isStock = parseInt(`${editProduct.stock}`) !== 0;

      const feats: any = {}
      splitFeatures.forEach((f, i) => feats[i] = features[i] ?? f);

      const formatFeats = formatKeyFeatures(feats);

      await hook.updateProduct(editProduct.id, { ...editProduct, keyFeatures: formatFeats });
      await onLoad();

      setEditProduct(null);
      setIsUpdate(false);
   }

   const getFilteredItems = () => {
      const data = products.filter(item => {
         const name = item.name.toLowerCase();
         return name.includes(query.toLowerCase())
      });

      setProductFiltereds(data);
   }

   const onFeaturesChange = (value: string, index: number) => {
      setFeatures({ ...features, [index]: value });
   }

   return {
      isLoading, setIsLoading,
      isUpdate, setIsUpdate,
      products, productFiltereds,
      features, setFeatures,
      setProducts,
      editProduct, setEditProduct,
      isUpdateImage, setIsUpdateImage,
      query, setQuery,
      onChange, onUpdate,
      getFilteredItems, onLoad,
      updateProduct: hook.updateProduct,
      deleteProduct: hook.deleteProduct,
      getProducts, onFeaturesChange,
      splitFeatures
   }
}

export default useManageProducts;