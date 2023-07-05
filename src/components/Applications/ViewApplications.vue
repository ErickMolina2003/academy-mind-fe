<template>
  <v-card class="ma-4" v-if="applications !== undefined && applications.length !== 0">
    <h2 class="text-center py-2">
      Solicitudes de {{ title }}
    </h2>
    <v-table>
      <thead>
        <tr>
          <th v-for="header of headers" class="text-left">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(applications)" :key="key">
          <td v-for="header in headers">{{ applications[key][header] }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-card v-else>
    <p class="text-center font-weight-medium text-h5 text-lg-h4 mb-3 pt-3">
      No hay solicitudes realizadas.
    </p>
  </v-card>
</template>

<script setup >


defineProps({
  title: String,
  applications: Array,
  headers: Array
})


</script>