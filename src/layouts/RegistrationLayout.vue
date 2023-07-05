<template>
  <v-container class="registration-layout">
    <h2>Servicios Estudiantes</h2>

    <v-card height="90%">
      <v-layout full-height>
        <v-navigation-drawer>
          <sideBar :sidebarOptions="registrationOptions" />
        </v-navigation-drawer>
        <v-main class="ma-1">
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import sideBar from "@/components/SideBars/SideBar.vue";

const registrationOptions = ref([
  {
    name: "Historial Académico",
    to: "/historial-academico",
    icon: "mdi-school-outline",
  },
  {
    name: "Solicitudes",
    submenu: [
      {
        name: "Cambio de Carrera",
        to: "/cambio-carrera",
      },
      {
        name: "Cambio de Centro",
        to: "/cambio-centro",
      },
      {
        name: "Cancelación Excepcional",
        to: "/cancelacion-excepcional",
      },
    ],
    icon: "mdi-frequently-asked-questions",
  },
  {
    name: "Matricula",
    icon: "mdi-form-select",
    submenu: [
      {
        name: "Adicionar Asignatura",
        to: "/matricular",
      },
      {
        name: "Cancelar Asignatura",
        to: "/cancelar",
      },
      {
        name: "Forma 03",
        to: "/forma",
      },
      {
        name: "Lista de Espera",
        to: "/lista-espera",
      },
      {
        name: "Cacelar Asignatura en Lista de Espera",
        to: "/cancelar-lista",
      },
      {
        name: "Estado de Cuenta",
        to: "/estado-cuenta",
      },
    ],
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
