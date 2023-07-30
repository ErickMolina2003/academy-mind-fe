<template>
  <v-main style="padding-left: 0%">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Asignaturas en Lista de Espera</span>
      </v-card-title>
      <v-card-text class="mt-1" style="padding: 0">
        <v-table>
          <thead
            style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
          >
            <tr>
              <th class="text-left text-white">Seleccione</th>
              <th class="text-left text-white">Cod. Asignatura</th>
              <th class="text-left text-white">Asignatura</th>
              <th class="text-left text-white">Sección</th>
              <th class="text-left text-white">HI</th>
              <th class="text-left text-white">HF</th>
              <th class="text-left text-white">Dias</th>
              <th class="text-left text-white">Edificio</th>
              <th class="text-left text-white">Aula</th>
              <th class="text-left text-white">UV</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in student"
              :key="item.name"
              :class="{ 'selected-row': item.selected }"
            >
              <td>
                <a href="#" @click="selectClass(item)">Select</a>
              </td>
              <td>{{ item.cod }}</td>
              <td>{{ item.class }}</td>
              <td>{{ item.section }}</td>
              <td>{{ item.hi }}</td>
              <td>{{ item.hf }}</td>
              <td>{{ item.days }}</td>
              <td>{{ item.building }}</td>
              <td>{{ item.classRoom }}</td>
              <td>{{ item.uv }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <v-card
      class="mt-5 mx-2"
      max-width="300"
      variant="outlined"
      color="secondary-lighthen-1"
    >
      <div class="my-4 mx-5">
        <h3 class="text-black">Menú opciones:</h3>
        <v-card style="width: 100%" class="mt-3">
          <v-card-actions>
            <v-btn @click="cancelClass">Cancelar Asignatura</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-card>
  </v-main>
</template>

<script setup>
import { ref } from "vue";

const student = ref([
  {
    cod: "COD001",
    class: "Asignatura 1",
    section: "Sección 1",
    hi: "HI1",
    hf: "HF1",
    days: "Lun-Mar",
    building: "Edificio 1",
    classRoom: "Aula 101",
    uv: 3,
    selected: false,
  },
  {
    cod: "COD001",
    class: "Asignatura 2",
    section: "Sección 2",
    hi: "HI1",
    hf: "HF1",
    days: "Lun-Mar",
    building: "Edificio 1",
    classRoom: "Aula 101",
    uv: 3,
    selected: false,
  },
]);

const selectClass = (item) => {
  student.value.forEach((studentItem) => {
    studentItem.selected = false;
  });
  item.selected = true;
};

const cancelClass = () => {
  const selectedClass = student.value.find((item) => item.selected);
  if (selectedClass) {
    const index = student.value.indexOf(selectedClass);
    if (index > -1) {
      student.value.splice(index, 1);
      alert("Clase cancelada con éxito");
    }
  }
};
</script>

<style>
.icon-attention {
  font-size: 24px;
  color: red;
  margin-right: 8px;
}

.selected-row {
  background-color: rgb(250, 250, 186);
}
</style>
