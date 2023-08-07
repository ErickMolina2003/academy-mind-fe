<template>
  <v-container class="request-layout">
    <h2>Solicitudes de Estudiantes</h2>
    <v-card height="90%">
      <v-layout full-height>
        <v-navigation-drawer>
          <sideBar :sidebarOptions="requestOptions" />
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

const requestOptions = ref([
  {
    name: "Cambio de Carrera",
    to: "/cambio-de-carrera",
  },
  {
    name: "Cancelación Excepcional",
    to: "/cancelacion-excepcional",
  },
  {
    name: "Cambio de Centro",
    to: "/cambio-de-centro",
  },
]);
</script>

<style scoped>
.request-layout {
  height: 100%;
}
</style>
