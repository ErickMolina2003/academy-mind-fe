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
        submenu: [
          {
            name: "Realizar solicitud",
            to: "/cambio-carrera/realizar-solicitud",
          },
          {
            name: "Ver solicitud",
            to: "/cambio-carrera/ver-solicitud",
          },
          {
            name: "Cancelar solicitud",
            to: "/cambio-carrera/borrar-solicitud",
          },
        ],
      },
      {
        name: "Cambio de Centro",
        submenu: [
          {
            name: "Realizar solicitud",
            to: "/cambio-centro/realizar-solicitud",
          },
          {
            name: "Ver solicitud",
            to: "/cambio-centro/ver-solicitud",
          },
          {
            name: "Cancelar solicitud",
            to: "/cambio-centro/borrar-solicitud",
          },
        ],
      },
      {
        name: "Cancelación Excepcional",
        submenu: [
          {
            name: "Realizar solicitud",
            to: "/cancelacion-excepcional/realizar-solicitud",
          },
          // {
          //   name: "Ver solicitud",
          //   to: "/cancelacion-excepcional/ver-solicitud",
          // },
        ],
      },
      {
        name: "Pago de reposición",
        submenu: [
          {
            name: "Realizar solicitud",
            to: "/pago-reposicion/realizar-solicitud",
          },
          {
            name: "Ver solicitudes",
            to: "/pago-reposicion/ver-solicitudes",
          },
        ],
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
        to: "/adicionar-asignatura",
      },
      {
        name: "Cancelar Asignatura",
        to: "/cancelar-asignatura",
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
        name: "Cancelar Asignatura en Lista de Espera",
        to: "/cancelar-asignatura-lista-espera",
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
