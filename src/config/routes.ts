export const privateRoutes = {
   dashboard: '',
   sales: '/sales',
   orders: '/orders',
   buys: '/buys',
   inventory: '/inventory',
   newProduct: '/new-product',
   manageProducts: '/manage-products',
}

export const publicRoutes = {
   home: '/',
   details: '/details',
   about: '/about',
   contact: '/contact',
   cart: '/cart',
   search: '/search',
   shop: '/shop',
   auth: '/auth',
}

const urls = {
   private: privateRoutes,
   public: publicRoutes
}

export default urls;