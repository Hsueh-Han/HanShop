import Vue from 'vue';
import VueRouter from 'vue-router';

// import components ...
import Login from '../views/login.vue';
import Dashboard from '../views/dashboard.vue';
import Products from '../views/backstage/products.vue';
import ProductsList from '../views/backstage/productsList.vue';
import OrderList from '../views/backstage/orderList.vue';
import Index from '../views/index.vue';
import CustomProductsList from '../views/shop/customProductsList.vue';
import SingleProduct from '../views/shop/singleProduct.vue';
import Cart from '../views/shop/cart.vue';
import CustomOrder from '../views/shop/customOrder.vue';
import CheckOut from '../views/shop/checkout.vue';

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          name: 'customProductsList',
          path: '',
          component: CustomProductsList,
        },
        {
          name: 'singleProduct',
          path: 'product/:id',
          component: SingleProduct,
        },
        {
          name: 'login',
          path: 'login',
          component: Login,
        },
        {
          name: 'cart',
          path: 'cart',
          component: Cart,
        },
        {
          name: 'order',
          path: 'order',
          component: CustomOrder,
        },
        {
          name: 'checkout',
          path: 'checkout/:orderId',
          component: CheckOut,
        },
      ],
    },
    {
      path: '/admin',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'ProductsList',
          path: '',
          component: ProductsList,
          meta: { requiresAuth: true },
        },
        {
          name: 'addProducts',
          path: 'addProducts',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          name: 'orderList',
          path: 'orderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
