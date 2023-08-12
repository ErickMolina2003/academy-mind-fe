<template>
  <v-navigation-drawer color="secondary-lighthen-1" permanent>
    <v-list class="py-0">
      <v-list-item
        v-for="option in userOptions"
        :key="option.name"
        :prepend-icon="option.icon"
        :title="option.name"
        :to="option.to"
        color="primary"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="error" @click="logout"> Salir </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import router from "@/router";
import { useAppStore } from "@/store/app";
import { computed, onMounted, ref } from "vue";

const store = useAppStore();

const isStudent = ref(false);
const isTeacher = ref(false);
const isAdmin = ref(false);
const isCoordinator = ref(false);
const isBossAcademic = ref(false);

const adminOptions = ref([
  {
    name: "Perfil",
    to: "/perfil",
    icon: "mdi-account-box-outline",
  },
  {
    name: "Docentes",
    to: "/docentes",
    icon: "mdi-book-variant",
  },
  {
    name: "Estudiantes",
    to: "/estudiantes",
    icon: "mdi-account-school",
  },
  {
    name: "Estados del Periodo",
    to: "/estados-periodo",
    icon: "mdi-state-machine",
  },
]);

const teacherOptions = ref([
  {
    name: "Perfil",
    to: "/perfil",
    icon: "mdi-account-box-outline",
  },
  {
    name: "Clases",
    to: "/clases",
    icon: "mdi-book-variant",
  },
  {
    name: "Ingresar Notas",
    to: "/ingresar-notas",
    icon: "mdi-lead-pencil",
  }
]);

const studentOptions = ref([
  {
    name: "Perfil",
    to: "/perfil",
    icon: "mdi-account-box-outline",
  },
  {
    name: "Clases",
    to: "/clases",
    icon: "mdi-book-variant",
  },
  {
    name: "Chat",
    to: "/chat",
    icon: "mdi-chat",
  },
  {
    name: "Matricula",
    to: "/matricula",
    icon: "mdi-account-school",
  },
]);
const bossAcademicOptions = ref([
  {
    name: "Perfil",
    to: "/perfil",
    icon: "mdi-account-box-outline",
  },
  {
    name: "Clases",
    to: "/clases",
    icon: "mdi-book-variant",
  },
  {
    name: "Ingresar Notas",
    to: "/ingresar-notas",
    icon: "mdi-lead-pencil",
  },
  {
    name: "Historial Estudiantil",
    to: "/historial-estudiantil",
    icon: "mdi-account-search",
  },
  {
    name: "Gestion de Docentes",
    to: "/gestion-docentes",
    icon: "mdi-account-tie",
  },
  {
    name: "Periodo Académico",
    to: "/periodo-academico",
    icon: "mdi-calendar-month-outline",
  }
]);
const coordinatorOptions = ref([
  {
    name: "perfil",
    to: "/perfil",
    icon: "mdi-account-box-outline",
  },
  {
    name: "clases",
    to: "/clases",
    icon: "mdi-book-variant",
  },
  {
    name: "Carga del Periodo",
    to: "/carga-periodo",
    icon: "mdi-calendar-month",
  },
  {
    name: "Solicitudes",
    to: "/solicitudes-estudiantes",
    icon: "mdi-badge-account",
  },
]);

onMounted(() => {
  isCoordinator.value = store.user.teacher?.isCoordinator ?? false;
  isBossAcademic.value = store.user.teacher?.isBoss ?? false;
  isAdmin.value = store.user.isAdmin;
  isTeacher.value = store.user.teacher ?? false;
  isStudent.value = store.user.student ?? false;
});

function logout() {
  window.localStorage.removeItem("academy-user");
  router.push("/login");
}

const userOptions = computed(() => {
 
  if (
    isTeacher.value &&
    !isAdmin.value &&
    !isCoordinator.value &&
    !isBossAcademic.value
  ) {
    return teacherOptions.value;
  }

  if (isCoordinator.value) {
    return coordinatorOptions.value;
  }

  if (isBossAcademic.value) {
    return bossAcademicOptions.value;
  }

  if (isAdmin.value) {
    return adminOptions.value;
  }

  return studentOptions.value;
});
</script>

<style scoped></style>
