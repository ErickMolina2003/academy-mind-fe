<template>
    <v-container class="academicPeriod-layout">
      <h2>Periodo Académico</h2>
      <v-card height="90%">
        <v-layout full-height>
          <v-navigation-drawer>
            <sideBar :sidebarOptions="periodOptions" />
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
  
  const periodOptions = ref([
    {
      name: "Planificación Periodo",
      to: "/planificacion-periodo",
      icon: "mdi-calendar-clock",
    },
    {
    name: "Periodo Actual",
    icon: "mdi-calendar-check",
    submenu: [
      {
        name: "Estudiantes matriculados",
        to: "/estudiantes-matriculados",
        icon: "mdi-account-multiple",
      },
      {
        name: "Evaluación de estudiantes",
        to: "/evaluacion-estudiantes",
        icon: "mdi-checkbox-multiple-marked-circle",
      },
      {
        name: "Notas Ingresadas",
        to: "/notas-ingresadas",
        icon: "mdi-file-document-edit-outline",
      },
      {
        name: "Sección Estadística",
        to: "/seccion-estadistica",
        icon: "mdi-chart-line",
      },
    ],
  }
  ]);
  </script>
  
  <style scoped>
  .academicPeriod-layout{
    height: 100%;
  }
  </style>
  