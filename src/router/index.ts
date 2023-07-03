// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "",
    redirect: { name: "perfil" },
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/perfil",
        name: "perfil",
        component: () => import("@/components/UserProfile/UserProfile.vue"),
      },
      {
        path: "/configuracion",
        name: "configuracion",
        component: () => import("@/components/UserProfile/UserSettings.vue"),
      },
      {
        path: "/matricula",
        name: "matricula",
        redirect: { name: "historial" },
        component: () => import("@/layouts/RegistrationLayout.vue"),
        children: [
          {
            path: "/historial",
            name: "historial",
            component: () => import("@/components/AcademicHistory/Grades.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/inicio",
    component: () => import("@/components/LandingPage/LandingPage.vue"),
  },
  {
    path: "/registrarse",
    component: () => import("@/layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("@/components/Login/Login.vue"),
      },
      {
        path: "reinicio",
        name: "reset",
        component: () => import("@/components/Login/Reset.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
