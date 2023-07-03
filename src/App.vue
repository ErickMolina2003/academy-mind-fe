<template>
  <v-app class="main-app">
    <v-main class="main-container d-flex justify-center align-center">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
</script>

<style scoped>
.main-app {
  width: 100%;
  background-color: rgb(var(--v-theme-primary));
}
</style>
