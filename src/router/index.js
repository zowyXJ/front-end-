import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cart from '../components/Cart.vue';
// import Checkout from '../components/Checkout.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart },
  // { path: '/checkout', component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
