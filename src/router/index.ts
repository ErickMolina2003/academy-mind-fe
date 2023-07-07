// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/store/app";

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
        path: "/admin",
        name: "adminLayout",
        redirect: { name: "estudiantes-view" },
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
          {
            path: "/estudiantes",
            name: "estudiantes-view",
            component: () => import("@/components/Students.vue"),
          },
          {
            path: "/docentes",
            name: "docentes-view",
            component: () => import("@/components/Teachers.vue"),
          },
        ],
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
            path: "/cambio-carrera/:tipo",
            name: "cambio-carrera",
            component: () => import("@/components/Applications/Majors.vue"),
          },
          {
            path: "/cambio-centro/:tipo",
            name: "cambio-centro",
            component: () => import("@/components/Applications/Centers.vue"),
          },
          {
            path: "/cancelacion-excepcional/:tipo",
            name: "cancelacion-excepcional",
            component: () =>
              import("@/components/Applications/SpecialCancellation.vue"),
          },
          {
            path: "/adicionar-asignatura",
            name: "adicionar-asignatura",
            component: () =>
              import("@/components/ClassRegistration/Registration.vue"),
          },
          {
            path: "/cancelar-asignatura",
            name: "cancelar-asignatura",
            component: () =>
              import("@/components/ClassCancellation/Cancellation.vue"),
          },
          {
            path: "/forma",
            name: "forma",
            component: () => import("@/components/Forma03/Forma03.vue"),
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
        path: "/login",
        name: "login",
        component: () => import("@/components/Login/Login.vue"),
        beforeEnter: (to, from, next) => {
          const userExists = window.localStorage.getItem("academy-user");

          if (userExists) {
            const store = useAppStore();
            store.getUser();

            next("/");
          }

          next();
        },
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

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  store.getUser();
  next();
})

export default router;
