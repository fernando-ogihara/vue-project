import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import LoginView from '../views/LoginView.vue';
import UserView from '../views/users/UserView.vue';
import UserProducts from '../views/users/UserProducts.vue';
import UserBuy from '../views/users/UserBuy.vue';
import UserSell from '../views/users/UserSell.vue';
import UserAccount from '../views/users/UserAccount.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    props: true
  },
  {
    path: '/user',
    component: UserView,
    meta: {
      login: true
    },
    children: [
      {
        path: '',
        name: 'user',
        component: UserProducts,
      },
      {
        path: 'buy',
        name: 'buy',
        component: UserBuy,
      },
      {
        path: 'sell',
        name: 'sell',
        component: UserSell,
      },
      {
        path: 'account',
        name: 'account',
        component: UserAccount,
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({top: 0, behavior: "smooth"})
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if(!window.localStorage.token) {
      next("/login")
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;
