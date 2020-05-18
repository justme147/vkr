import Vue from "vue";
import VueRouter from "vue-router";

import firebase, { app } from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main", auth: true },
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/new_order",
    name: "order",
    meta: { layout: "main", auth: true },
    component: () => import("../components/NewOrder.vue"),
    children: [
      {
        path: "",
        name: "positions",
        meta: { layout: "main", auth: true },
        component: () => import("../components/OrderChoosePosition.vue"),
      },
      {
        path: "info",
        name: "info",
        meta: { layout: "main", auth: true },
        component: () => import("../components/OrderInfo.vue"),
      },
      {
        path: "accept",
        name: "accept",
        meta: { layout: "main", auth: true },
        component: () => import("../components/OrderAccept.vue"),
      },
    ],
  },
  {
    path: "/order_list",
    name: "order list",
    meta: { layout: "main", auth: true },
    component: () => import("../components/OrderList.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", auth: true },
    component: () => import("../components/OrderDetail.vue"),
  },
  {
    path: "/new_position",
    name: "new position",
    meta: { layout: "main", auth: true },
    component: () => import("../components/NewPosition"),
  },
  {
    path: "/position_list",
    name: "position list",
    meta: { layout: "main", auth: true },
    component: () => import("../components/PositionList"),
  },
  {
    path: "/discounts",
    name: "discounts",
    meta: { layout: "main", auth: true },
    component: () => import("../components/Discounts"),
  },
  {
    path: "/statistics",
    name: "statistics",
    meta: { layout: "main", auth: true },
    component: () => import("../components/Statistics"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    meta: { layout: "empty" },
    component: () => import("../components/Registration"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
