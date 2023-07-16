import VueRouter from "vue-router";
import CarPage from "@/pages/CarPage";
import LoginPage from "@/pages/LoginPage";
import ChangePage from "@/pages/ChangePage";
import Vue from "vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: CarPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/change/:model/:id',
    component: ChangePage,
    name: 'change',
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


router.beforeEach((to, from, next) => {
  const token = store.state.car.token

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router;