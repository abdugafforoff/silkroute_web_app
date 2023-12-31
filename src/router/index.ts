import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dash_board.vue";
import Forms from "../views/Forms.vue";
import Tables from "../views/Tables.vue";
import UIElements from "../views/UIElements.vue";
import Login from "../views/Pages/Login.vue";
import Modal from "../views/Modal.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";
import Employee from '@/views/Employee/index.vue'
import CreateOrder from "@/views/Order/CreateOrder.vue";
import Layout from '@/views/Order/OrderNavs.vue';
import BecomDriverVue from "@/views/Driver/BecomDriver.vue";
import BaseAppViewVue from "@/views/BaseApp/BaseAppView.vue";
import BaseLoaderVue from "@/components/BaseLoader.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  }, 
  {
    path: "/dashboard",
    name: "dashboard",
    component: BaseAppViewVue,
    meta: {
      layout: "empty"
    }
  },
  {
    path:'/loading',
    name: 'loading',
    component: BaseLoaderVue,
    meta: {layout: "empty"}
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
    meta: {layout:''}
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  {
    path:'/create-order',
    name:'order',
    component: CreateOrder,
    meta: {layout: "empty"}
  },
  {
    path:'/become-driver',
    name:'become-driver',
    component: BecomDriverVue,
  },
  
  { path: "/:pathMatch(.*)*", component: NotFound },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || 'default';

  to.matched.forEach((record) => {
    if (record.meta.layout) {
      record.meta.layoutComponent = import(`@/views/Order/OrderNavs.vue`);
    }
  });
  to.meta.layoutComponent = layout === 'empty' ? import('@/views/Order/OrderNavs.vue') : Layout;
  next();
});


export default router;
