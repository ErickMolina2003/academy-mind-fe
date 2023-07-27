<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title style="color: #cc6600">{{ title }}</v-app-bar-title>
    <v-row class="mr-3" justify="end">
      <v-col cols="12" md="4" lg="4">
        <v-text-field
          v-if="toggleSearch"
          :label="label"
          hide-details
          variant="outlined"
          density="compact"
          v-model="searchQuery"
          @input="onSearchInput"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1" lg="1">
        <v-btn icon @click="toggleSearch = !toggleSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="btnTitle" cols="12" md="auto" lg="auto" align-self="center">
        <v-btn variant="tonal" color="success" @click="$emit('createSection',true)">{{
          btnTitle
        }}</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";


defineProps<{
  title: string;
  label: string;
  btnTitle?: string;
}>();

const toggleSearch = ref(false);
const searchQuery = ref("");

const onSearchInput = () => {
  const query = searchQuery.value.toLowerCase().trim();
  const customEvent = new CustomEvent("filter", { detail: query });
  document.dispatchEvent(customEvent);

  if (query === "") {
    const resetEvent = new CustomEvent("resetFilter");
    document.dispatchEvent(resetEvent);
  }
};
</script>

  