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
        path: "/estudiantes",
        name: "estudiantes",
        component: () => import("@/components/Students.vue"),
      },
      {
        path: "/matricula",
        name: "matricula",
        redirect: { name: "historial-academico" },
        component: () => import("@/layouts/RegistrationLayout.vue"),
        children: [
          {
            path: "/historial-academico",
            name: "historial-academico",
            component: () => import("@/components/AcademicHistory/Grades.vue"),
          },
          {
            path: "/matricular",
            name: "matricular",
            component: () => import("@/components/ClassRegistration/Registration.vue"),
          },
          {
            path: "/cancelar",
            name: "cancelar",
            component: () => import("@/components/ClassCancellation/Cancellation.vue"),
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
