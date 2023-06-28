<template>
  <v-table
    style="background-color: #312d4b; color: #9691ac; border-radius: 6px"
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">CODIGO</th>
        <th class="text-left">ASIGNATURA</th>
        <th class="text-left">UV</th>
        <th class="text-left">SECCION</th>
        <th class="text-left">AÑO</th>
        <th class="text-left">PERIODO</th>
        <th class="text-left">CALIFICACION</th>
        <th class="text-left">OBS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in subjects" :key="item.codigo">
        <td>{{ item.codigo }}</td>
        <td>{{ item.asignatura }}</td>
        <td class="text-right">{{ item.uv }}</td>
        <td class="text-right">{{ item.seccion }}</td>
        <td class="text-right">{{ item.anio }}</td>
        <td class="text-right">{{ item.periodo }}</td>
        <td class="text-right">{{ item.calificacion }}</td>
        <td class="text-right">{{ item.obs }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import grades from "../../mock/grades.json";
export default {
  data() {
    return {
      subjects: grades,
    };
  },
};
</script>
