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
const isAdmin = ref(true);
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
onMounted(() => {
  isTeacher.value = store.user.user.isTeacher;
  isCoordinator.value = store.user.user.isCoordinator;
  isBossAcademic.value = store.user.user.isBoss;
  isAdmin.value = store.user.user.user.isAdmin;
  isStudent.value = store.user.user.user.career ? true : false;
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
    return teacherOptions.value;
  }

  if (isBossAcademic.value) {
    return teacherOptions.value;
  }

  if (isAdmin.value) {
    return adminOptions.value;
  }

  return studentOptions.value;
});
</script>

<style scoped></style>
