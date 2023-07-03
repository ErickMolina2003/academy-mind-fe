<template>
  <v-card>
    <v-img
      class="align-end text-white"
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    />
    <v-row class="class-card-footer">
      <v-col class="py-0" cols="12" md="12" lg="12">
        <v-card-text class="pt-4 pb-0 text-white">
          {{ periodo }} PAC {{ anio }}
        </v-card-text>
      </v-col>
      <v-col class="py-0" cols="12" md="12" lg="12">
        <v-card-text class="text-white">
          <div>{{ clase }}</div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
defineProps<{
  clase: string;
  periodo: string;
  anio: string;
}>();
</script>

<style scoped>
.class-card-footer {
  background-color: rgb(var(--v-theme-secondary));
}
</style>
