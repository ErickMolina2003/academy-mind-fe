<template>
  <v-snackbar
    v-model="store.toaster.isActive"
    :color="store.toaster.color"
    location="top"
    multi-line
  >
    {{ store.toaster.text }}

    <template v-slot:actions>
      <v-btn
        color="primary"
        variant="text"
        @click="store.toaster.isActive = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
