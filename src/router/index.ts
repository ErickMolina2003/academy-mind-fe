// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/LandingPage/LandingPage.vue"),
  },
  {
    path: "/login",
    component: () => import("@/layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("@/components/Login/Login.vue"),
      },
      {
        path: "reset",
        name: "reset",
        component: () => import("@/components/Login/Reset.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/components/UserProfile/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
