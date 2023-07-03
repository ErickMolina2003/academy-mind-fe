<template>
  <v-container class="registration-layout">
    <h2>Serivios Estudiantes</h2>

    <v-card height="90%">
      <v-layout full-height>
        <v-navigation-drawer>
          <v-list class="py-0">
            <v-list-item
              v-for="option in registrationOptions"
              :key="option.name"
              :prepend-icon="option.icon"
              :title="option.name"
              :to="option.to"
              color="success"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main class="ma-1">
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const registrationOptions = ref([
  {
    name: "Historial Académico",
    to: "/historial",
    icon: "mdi-school-outline",
  },
  {
    name: "Solicitudes",
    to: "/solicitudes",
    icon: "mdi-frequently-asked-questions",
  },
  {
    name: "Matricula",
    to: "/matricular",
    icon: "mdi-form-select",
  },
  {
    name: "Ver Calificaciones del periodo",
    to: "/calificaciones",
    icon: "mdi-medal",
  },
]);
</script>

<style scoped>
.registration-layout {
  height: 100%;
}
</style>
