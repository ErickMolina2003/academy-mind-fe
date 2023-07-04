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
import { computed, ref } from "vue";

const isStudent = ref(true);
const isTeacher = ref(false);
const isAdmin = ref(false);
const isCoordinator = ref(false);
const isBossAcademic = ref(false);

const adminOptions = ref([
  {
    name: "perfil",
    to: "/perfil",
    icon: "mdi-account-box-outline",
  },
  {
    name: "docentes",
    to: "/docentes",
    icon: "mdi-book-variant",
  },
  {
    name: "estudiantes",
    to: "/estudiantes",
    icon: "mdi-account-school",
  },
]);

const teacherOptions = ref([
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
    name: "matricula",
    to: "/matricula",
    icon: "mdi-account-school",
  },
]);

const studentOptions = ref([
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
    name: "chat",
    to: "/chat",
    icon: "mdi-chat",
  },
  {
    name: "matricula",
    to: "/matricula",
    icon: "mdi-account-school",
  },
]);

function logout() {
  router.push("/registrarse");
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

  if (isTeacher.value && isCoordinator.value) {
    return;
  }

  if (isTeacher.value && isBossAcademic.value) {
    return;
  }

  if (isAdmin.value) {
    return adminOptions.value;
  }

  return studentOptions.value;
});
</script>

<style scoped></style>
