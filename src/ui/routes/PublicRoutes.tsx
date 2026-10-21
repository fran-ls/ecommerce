import { Route, Routes } from "react-router-dom";
import PublicLayout from "../../shared/components/layout/PublicLayout";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../../product/pages/ProductDetailPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CartPage from "../../cart/pages/CartPage";
import { publicRoutes } from "../../config/routes";
import ShopPage from "../pages/ShopPage";
import ErrorPage from "../pages/ErrorPage";
import AuthPage from "../pages/AuthPage";

const routes = publicRoutes;

const PublicRoutes = () => {
   return (
      <Routes>
         <Route path="" element={
            <PublicLayout>
               <HomePage />
            </PublicLayout>
         } />
         <Route path={`${routes.details}/:productId`} element={
            <PublicLayout>
               <ProductDetailPage />
            </PublicLayout>
         } />
         <Route path={routes.about} element={
            <PublicLayout>
               <AboutPage />
            </PublicLayout>
         } />
         <Route path={routes.contact} element={
            <PublicLayout>
               <ContactPage />
            </PublicLayout>
         } />
         <Route path={routes.cart} element={
            <PublicLayout>
               <CartPage />
            </PublicLayout>} />
         <Route path={routes.shop} element={
            <PublicLayout>
               <ShopPage />
            </PublicLayout>
         } />
         <Route path={routes.auth} element={<AuthPage />} />
         <Route path="*" element={<ErrorPage />} />
      </Routes>
   )
}

export default PublicRoutes;