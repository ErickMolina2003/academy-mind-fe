// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/store/app";

const routes = [
  {
    path: "/",
    name: "",
    redirect: { name: "perfil" },
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { middleware: true },
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
      {
        path: "/historial-estudiantil",
        name: "historial-estudiantil",
        component: () => import("@/components/AcademicHistory/AcademicHistoryBA.vue"),
      },
      {
        path: "/gestion-docentes",
        name: "gestion-docentes",
        component: () => import("@/components/DepartmentBoss/TeacherManagement.vue"),
      },
      {
        path: "/periodo-academico",
        name: "Periodo Académico",
        //redirect: { name: "planificacion-periodo" },
        component: () => import("@/layouts/academicPeriodLayout.vue"),
        children: [
          // {
          //   path: "/planificacion-periodo",
          //   name: "planificación-periodo",
          //   //component: () => import(""),
          // },
          {
            path: "/crear-secciones",
            name: "crear-secciones",
            component: () => import("@/components/DepartmentBoss/PeriodPlanification/CreateSections.vue"),
          },
          {
            path: "/listas-de-espera",
            name: "listas-de-espera",
            //component: () => import(""),
          },
          {
            path: "/cancelar-secciones",
            name: "cancelar-secciones",
            component: () => import("@/components/DepartmentBoss/PeriodPlanification/CancelSection.vue"),
          },
          {
            path: "/estudiantes-matriculados",
            name: "estudiantes-matriculados",
            component: () => import("@/components/DepartmentBoss/EnrolledStudents.vue"),
          },
          {
            path: "/seccion-estadistica",
            name: "sección-estadística",
            //component: () => import(""),
          },
          {
            path: "/evaluacion-estudiantes",
            name: "evaluación-estudiantes",
            component: () => import("@/components/Enroll/TeacherEvaluationBA.vue"),
          },
          {
            path: "/notas-ingresadas",
            name: "notas-ingresadas",
            component: () => import("@/components/DepartmentBoss/ViewGrades.vue"),
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
      },
      {
        path: "/reinicio",
        name: "reset",
        component: () => import("@/components/Login/Reset.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      const userExists = window.localStorage.getItem("academy-user");

      if (userExists) {
        const store = useAppStore();
        store.getUser();

        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/inicio-sesion",
    name: "admin-login",
    component: () => import("@/components/Login/AdminLogin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  const userExists = store.userExists;
  store.user = JSON.parse(window.localStorage.getItem("academy-user"));

  if (to.meta.middleware && !userExists) {
    next("login");
  } else {
    next();
  }
});

export default router;
