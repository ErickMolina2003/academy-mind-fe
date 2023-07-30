<template>
  <v-container class="">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span class="headline">Asignaturas en Lista de Espera</span>
      </v-card-title>
      <v-divider :thickness="5"></v-divider>
      <v-card-text>
        <v-table class="lista-espera-table" fixed-header density="comfortable">
          <thead>
            <tr>
              <th class="font-weight-bold px-0">CÓD.</th>
              <th class="font-weight-bold px-0">ASIGNATURA</th>
              <th class="font-weight-bold px-0">SECCIÓN</th>
              <th class="font-weight-bold px-0">HI</th>
              <th class="font-weight-bold px-0">HF</th>
              <th class="font-weight-bold px-0">DÍAS</th>
              <th class="font-weight-bold px-0">EDIFICIO</th>
              <th class="font-weight-bold px-0">AULA</th>
              <th class="font-weight-bold px-0">UV</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in classes" :key="item.codigo">
              <td class="px-0">{{ item.codigo }}</td>
              <td class="text-uppercase px-0">{{ item.asignatura }}</td>
              <td class="px-0">{{ item.seccion }}</td>
              <td class="px-0">{{ item.hi }}</td>
              <td class="px-0">{{ item.hf }}</td>
              <td class="px-0">{{ item.dias }}</td>
              <td class="px-0">{{ item.edificio }}</td>
              <td class="px-0">{{ item.aula }}</td>
              <td class="px-0">{{ item.uv }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const classes = [
  {
    codigo: "IS802",
    asignatura: "Ingeniería de Software",
    seccion: 9000,
    hi: 9000,
    hf: 1000,
    dias: "LuMaMiJu",
    edificio: "B2",
    aula: "301",
    uv: 4,
  },
  {
    codigo: "IS811",
    asignatura: "Seguridad Informática",
    seccion: 1000,
    hi: 1000,
    hf: 1100,
    dias: "LuMaMiJu",
    edificio: "B2",
    aula: "306",
    uv: 4,
  },
  {
    codigo: "IS910",
    asignatura: "Teoria de la simulación opt.",
    seccion: 1200,
    hi: 1200,
    hf: 1300,
    dias: "LuMaMi",
    edificio: "B2",
    aula: "301",
    uv: 3,
  },
  {
    codigo: "IS912",
    asignatura: "Sistemas expertos opt.",
    seccion: 1200,
    hi: 1200,
    hf: 1300,
    dias: "LuMaMi",
    edificio: "B2",
    aula: "LAB 2",
    uv: 3,
  },
];
</script>

<style scoped>
.lista-espera-table {
  font-size: 13px;
}

.headline {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
