<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-row class="mr-3" justify="end">
      <v-col cols="12" md="4" lg="4">
        <v-text-field
          v-if="toggleSearch"
          :label="title === 'Docentes' ? 'No.Empleado' : 'No.Cuenta'"
          hide-details
          variant="outlined"
          density="compact"
          v-model="searchQuery"
          @input="filterStudents"
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
const searchQuery = ref("");

const filterStudents = () => {
  const query = searchQuery.value.toLowerCase().trim();
  const customEvent = new CustomEvent("filter", { detail: query });
  document.dispatchEvent(customEvent);

  if (query === "") {
    const resetEvent = new CustomEvent("resetFilter");
    document.dispatchEvent(resetEvent);
  }
};
</script>
