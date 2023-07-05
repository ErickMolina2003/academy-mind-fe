<template>
  <div v-if="data.length != 0">
    <h2 class="text-center py-2">
      Solicitud de cancelaciones excepcionales
    </h2>
    <v-table class="classes-table pb-4" fixed-header density="comfortable">
      <thead>
        <tr>
          <th v-for="headerClasses in headersClasses" :key="headerClasses.text">{{ headerClasses.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.codigo">
          <td v-for="headerClasses in headersClasses" :key="headerClasses.value">{{ item[headerClasses.value] }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-table>
      <thead>
        <tr>
          <th>Dictamen</th>
          <th>Fecha de solicitud</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ dictamen[0].resultado }}</td>
          <td>{{ dictamen[0].fecha }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <h2 class="text-center py-2" v-else>
    NO TIENE NINGUNA SOLICITUD DE CANCELACIÓN EXCEPCIONAL DE CLASES
  </h2>
</template>

<script setup >


const props = defineProps({
  title: String,
  data: Array | undefined,
  headersClasses: Array,
  dictamen: Array
})


</script>

<style scoped>
.classes-table {
  font-size: .7rem;
}
</style>