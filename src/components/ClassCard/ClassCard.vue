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
          <v-icon size="small">mdi-calendar</v-icon>
          {{ periodo }} PAC {{ anio }}
        </v-card-text>
      </v-col>
      <v-col class="py-0" cols="12" md="12" lg="12">
        <v-card-text class="text-white">
          <v-icon left size="small">mdi-book-open</v-icon>
          {{ clase }}
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
  background-color: #527da2;
}
</style>
