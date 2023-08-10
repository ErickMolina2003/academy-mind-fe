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
          {
            path: "/estados-periodo",
            name: "estados-periodo",
            component: () =>
              import("@/components/PeriodManagement/PeriodManagement.vue"),
          },
        ],
      },
      {
        path: "/chat",
        name: "chat",
        component: () => import("@/components/Chat/ContactList.vue"),
      },
      {
        path: "/clases",
        name: "clases",
        component: () => import("@/components/Classes/Classes.vue"),
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
          {
            path: "/lista-espera",
            name: "lista-espera",
            component: () => import("@/components/Enroll/WaitingList.vue"),
          },
          {
            path: "/cancelar-asignatura-lista-espera",
            name: "cancelar-asignatura-lista-espera",
            component: () =>
              import("@/components/Enroll/WaitingListCancellation.vue"),
          },
          {
            path: "/estado-cuenta",
            name: "estado-cuenta",
            component: () => import("@/components/Enroll/AccountStatement.vue"),
          },
          {
            path: "/calificaciones",
            name: "calificaciones",
            component: () => import("@/components/Grades/ViewGrades.vue"),
          },
        ],
      },
      {
        path: "/historial-estudiantil",
        name: "historial-estudiantil",
        component: () =>
          import("@/components/AcademicHistory/AcademicHistoryBA.vue"),
      },
      {
        path: "/gestion-docentes",
        name: "gestion-docentes",
        component: () =>
          import("@/components/DepartmentBoss/TeacherManagement.vue"),
      },
      {
        path: "/periodo-academico",
        name: "Periodo Académico",
        component: () => import("@/layouts/academicPeriodLayout.vue"),
        children: [
          {
            path: "/crear-secciones",
            name: "crear-secciones",
            component: () =>
              import(
                "@/components/DepartmentBoss/PeriodPlanification/CreateSections.vue"
              ),
          },
          {
            path: "/listas-de-espera",
            name: "listas-de-espera",
            component: () =>
              import(
                "@/components/DepartmentBoss/PeriodPlanification/WaintingList.vue"
              ),
          },
          {
            path: "/cancelar-secciones",
            name: "cancelar-secciones",
            component: () =>
              import(
                "@/components/DepartmentBoss/PeriodPlanification/CancelSection.vue"
              ),
          },
          {
            path: "/estudiantes-matriculados",
            name: "estudiantes-matriculados",
            component: () =>
              import("@/components/DepartmentBoss/EnrolledStudents.vue"),
          },
          {
            path: "/seccion-estadistica",
            name: "sección-estadística",
            component: () =>
              import("@/components/DepartmentBoss/StatisticalSection.vue"),
          },
          {
            path: "/evaluacion-estudiantes",
            name: "evaluación-estudiantes",
            component: () =>
              import("@/components/Enroll/TeacherEvaluationBA.vue"),
          },
          {
            path: "/notas-ingresadas",
            name: "notas-ingresadas",
            component: () =>
              import("@/components/DepartmentBoss/ViewGrades.vue"),
          },
        ],
      },
      {
        path: "/carga-periodo",
        name: "carga-periodo",
        component: () => import("@/components/Coordinator/PeriodCharge.vue"),
      },
      {
        path: "/solicitudes-estudiantes",
        name: "solicitudes-estudiantes",
        component: () => import("@/layouts/RequestLayout.vue"),
        children: [
          {
            path: "/cambio-de-carrera",
            name: "cambio-de-carrera",
            component: () =>
              import("@/components/Coordinator/ChangeCareer.vue"),
          },
          {
            path: "/cancelacion-excepcional",
            name: "cancelacion-excepcional",
            component: () =>
              import("@/components/Coordinator/ExceptionalCancellations.vue"),
          },
          {
            path: "/cambio-de-centro",
            name: "cambio-de-centro",
            component: () =>
              import("@/components/Coordinator/ChangeRegionalCenter.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/reinicio-clave",
    name: "reinicio-clave",
    component: () =>
      import("@/components/DepartmentBoss/ResetTeacherPassword.vue"),
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
