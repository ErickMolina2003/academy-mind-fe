<template>
  <v-table height="37rem" class="table-grades" fixed-header density="comfortable">
      <thead>
          <tr>
            <th class="text-center">CODIGO</th>
            <th class="text-center">ASIGNATURA</th>
            <th class="text-center">UV</th>
            <th class="text-center">SECCION</th>
            <th class="text-center">AÑO</th>
            <th class="text-center">PERIODO</th>
            <th class="text-center">CALIFICACION</th>
            <th class="text-center">OBS</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="item in subjects" :key="item.codigo">
          <td class="text-center">{{ item.codigo }}</td>
          <td class="text-center">{{ item.asignatura }}</td>
          <td class="text-center">{{ item.uv }}</td>
          <td class="text-center">{{ item.seccion }}</td>
          <td class="text-center">{{ item.anio }}</td>
          <td class="text-center">{{ item.periodo }}</td>
          <td class="text-center">{{ item.calificacion }}</td>
          <td class="text-center">{{ item.obs }}</td>
        </tr>
      </tbody>
    </v-table>   
</template>

<script setup>
import { ref } from "vue";
import grades from "../../mock/grades.json";
const subjects = ref(grades);
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 2px solid #ddd;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

</style>
