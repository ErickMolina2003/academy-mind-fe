<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-row class="mr-3" justify="end">
      <v-col cols="12" md="4" lg="4">
        <v-text-field
          v-if="toggleSearch"
          labe="Búsqueda por nombre y numero de cuenta"
          hide-details
          variant="outlined"
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1" lg="1">
        <v-btn icon @click="toggleSearch = !toggleSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto" lg="auto" align-self="center">
        <v-btn variant="tonal" color="success" @click="$emit('createUser')">{{
          btnTitle
        }}</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
  btnTitle: string;
}>();

const toggleSearch = ref(false);
</script>
