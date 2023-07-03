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
        <v-btn block color="error"> Salir </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref } from "vue";

const userRole = "teacher";

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

const userOptions = computed(() => {
  if (userRole === "teacher") return teacherOptions.value;
  return studentOptions.value;
});
</script>

<style scoped></style>
