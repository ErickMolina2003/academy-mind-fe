<template>
  <v-main style="padding-left: 0%">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Carga del Período</span>
      </v-card-title>
      <div class="d-flex align-center mx-4 my-2">
        <div>
          <v-select
            v-model="itemsPerPage"
            :items="perPageOptions"
            variant="outlined"
          ></v-select>
        </div>
        <span class="ml-3">Registros por página</span>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Sección</th>
            <th class="text-center">Cód. Asignatura</th>
            <th class="text-left">Asignatura</th>
            <th class="text-center">Núm. Docente</th>
            <th class="text-left">Docente</th>
            <th class="text-center">Matriculados</th>
            <th class="text-center">Cupos Habilitados</th>
            <th class="text-center">Edificio</th>
            <th class="text-center">Aula</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedCargaPeriodo" :key="item.seccion">
            <td class="text-left">{{ item.seccion }}</td>
            <td class="text-center">{{ item.codAsignatura }}</td>
            <td class="text-left">{{ item.nombreAsignatura }}</td>
            <td class="text-center">{{ item.numDocente }}</td>
            <td class="text-left">{{ item.nombreDocente }}</td>
            <td class="text-center">{{ item.matriculados }}</td>
            <td class="text-center">{{ item.cuposHabilitados }}</td>
            <td class="text-center">{{ item.edificio }}</td>
            <td class="text-center">{{ item.aula }}</td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex justify-space-between align-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          @input="changePage"
          rounded="circle"
        ></v-pagination>
        <v-btn
          class="ma-6 bg-blue-grey-lighten-4"
          href="cargaPeriodo.pdf"
          download
        >
          <v-icon start icon="mdi-download-circle" size="x-large"></v-icon>Carga
          del Período
        </v-btn>
      </div>
    </v-card>
  </v-main>
</template>

<script setup>
import { ref, computed } from "vue";

const perPageOptions = [5, 10, 25, 50];
const itemsPerPage = ref(5);
const currentPage = ref(1);

const cargaPeriodo = ref([
  {
    seccion: 1,
    codAsignatura: "IS-110",
    nombreAsignatura: "Introducción a la Ingeniería en Sistemas",
    numDocente: 10,
    nombreDocente: "Sofia Maria Gimenez",
    matriculados: 8,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "305",
  },
  {
    seccion: 2,
    codAsignatura: "IS-210",
    nombreAsignatura: "Programacion 2",
    numDocente: 2,
    nombreDocente: "Juan Alberto Perez",
    matriculados: 15,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "302",
  },
  {
    seccion: 3,
    codAsignatura: "IS-210",
    nombreAsignatura: "Programacion 2",
    numDocente: 2,
    nombreDocente: "Juan Alberto Perez",
    matriculados: 12,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "302",
  },
  {
    seccion: 4,
    codAsignatura: "IS-410",
    nombreAsignatura: "Programación Orientada a Objetos",
    numDocente: 2,
    nombreDocente: "Jesús Francisco Torres",
    matriculados: 20,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "LAB-2",
  },
  {
    seccion: 5,
    codAsignatura: "IS-410",
    nombreAsignatura: "Programación Orientada a Objetos",
    numDocente: 23,
    nombreDocente: "Jesús Francisco Torres",
    matriculados: 10,
    cuposHabilitados: 10,
    edificio: "B2",
    aula: "LAB-2",
  },
  {
    seccion: 6,
    codAsignatura: "IS-410",
    nombreAsignatura: "Programación Orientada a Objetos",
    numDocente: 23,
    nombreDocente: "Jesús Francisco Torres",
    matriculados: 15,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "LAB-2",
  },
  {
    seccion: 7,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 15,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "404",
  },
  {
    seccion: 8,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 20,
    cuposHabilitados: 30,
    edificio: "B2",
    aula: "404",
  },
  {
    seccion: 9,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 10,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "404",
  },
  {
    seccion: 10,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 0,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "404",
  },
]);

const totalPages = computed(() =>
  Math.ceil(cargaPeriodo.value.length / itemsPerPage.value)
);

const paginatedCargaPeriodo = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return cargaPeriodo.value.slice(startIndex, endIndex);
});

const changePage = (page) => {
  currentPage.value = page;
};
</script>
