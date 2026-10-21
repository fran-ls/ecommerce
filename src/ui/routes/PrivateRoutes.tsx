import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import SalesPage from "../../sale/pages/SalesPage";
import OrdersPage from "../../sale/pages/OrdersPage";
import BuysPage from "../../buy/pages/BuysPage";
import InventoryPage from "../../product/pages/InventoryPage";
import NewProductPage from "../../product/pages/NewProductPage";
import ManageProductsPage from "../../product/pages/ManageProductsPage";
import PrivateLayout from "../../shared/components/layout/PrivateLayout";
import { privateRoutes } from "../../config/routes";
import ErrorPage from "../pages/ErrorPage";

const routes = privateRoutes;

const PrivateRoutes = () => {
   return (
      <PrivateLayout>
         <Routes>
            <Route path={routes.dashboard} element={<DashboardPage />} />
            <Route path={routes.sales} element={<SalesPage />} />
            <Route path={routes.orders} element={<OrdersPage />} />
            <Route path={routes.buys} element={<BuysPage />} />
            <Route path={routes.inventory} element={<InventoryPage />} />
            <Route path={routes.newProduct} element={<NewProductPage />} />
            <Route path={routes.manageProducts} element={<ManageProductsPage />} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
      </PrivateLayout>
   )
}

export default PrivateRoutes;