<template>
  <v-main>
    <h1 style="color: #CC6600;">Asignaturas en lista de espera</h1>
    <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
    <v-card>
      <v-card-title class="text-center text-white" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
        <span>Lista de espera</span>
      </v-card-title>
      <v-card-text class="mt-1" style="padding: 0;">
        <v-table class="table-scroll">
          <thead style="background-color:rgb(var(--v-theme-secondary-lighthen-1));">
            <tr>
              <th class="text-left text-white">Seleccione</th>
              <th class="text-left text-white">cod.</th>
              <th class="text-left text-white">Asignatura</th>
              <th class="text-left text-white">Sección</th>
              <th class="text-left text-white">En espera</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in subject" :key="item.cod">
              <td style="width: 150px;">
                <v-btn color="primary" text @click="openModal(item)" style="width: 100%; height: 100%; padding: 0; margin: 0;">Ver</v-btn>
              </td>
              <td>{{ item.cod }}</td>
              <td>{{ item.class }}</td>
              <td>{{ item.section }}</td>
              <td>{{ item.students.length }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="modalOpen" max-width="500">
      <v-card>
        <v-card-title>Detalles Asignatura</v-card-title>
        <v-card-text>
          <p><strong>Código:</strong> {{ selectedSubject.cod }} <strong> | Asignatura:</strong> {{ selectedSubject.class }} </p>
          <p><strong>Sección:</strong> {{ selectedSubject.section }} <strong> | En espera:</strong> {{ selectedSubject.students.length }}</p>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: flex-end;">
          <v-text-field
            v-model="slotsToOpen"
            label="Cupos a abrir"
            type="number"
            min="0"
            :max="15"
          ></v-text-field>
          <v-btn style="display: flex; justify-content: flex-end;" @click="openSlots">Aperturar cupos</v-btn>
        </v-card-actions>
          <v-card>
            <v-card-title class="text-center text-white" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
              <span class="headline ">Estudiantes en espera</span>
            </v-card-title>
            <v-card-text class="table-scroll">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left text-black">Nombre</th>
                    <th class="text-left text-black">Carrera</th>
                    <th class="text-left text-black">Indice Global</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student in selectedSubject.students" :key="student.name">
                    <td>{{ student.name }}</td>
                    <td>{{ student.career }}</td>
                    <td>{{ student.index }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-btn style="display: flex; justify-content: flex-end;" @click="closeModal">Cerrar</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
const subject = ref([
  {
    cod: 'IS1',
    class: 'Asignatura 1',
    section: '0900',
    waiting: 5,
    selected: false,
    students: [
      {
        name: 'Estudiante 1',
        career: 'Carrera 1',
        index: 80
      },
      {
        name: 'Estudiante 2',
        career: 'Carrera 2',
        index: 90
      },
      {
        name: 'Estudiante 3',
        career: 'Carrera 3',
        index: 85
      }
      
    ]
  },
  {
    cod: 'IS2',
    class: 'Asignatura 2',
    section: '1100',
    waiting: 3,
    selected: false,
    students: [
      {
        name: 'Estudiante 4',
        career: 'Carrera 4',
        index: 75
      },
      {
        name: 'Estudiante 5',
        career: 'Carrera 5',
        index: 92
      },
      {
        name: 'Estudiante 6',
        career: 'Carrera 6',
        index: 88
      }
    ]
  },
  {
    cod: 'IS2',
    class: 'Asignatura 3',
    section: '1000',
    waiting: 3,
    selected: false,
    students: [
      {
        name: 'Estudiante 4',
        career: 'Carrera 4',
        index: 75
      },
      {
        name: 'Estudiante 5',
        career: 'Carrera 5',
        index: 92
      },
      {
        name: 'Estudiante 6',
        career: 'Carrera 6',
        index: 88
      }
    ]
  },
]);

const modalOpen = ref(false);
const selectedSubject = ref(null);
const slotsToOpen = ref(0);

const openModal = (item) => {
  selectedSubject.value = item;
  slotsToOpen.value = 0;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const openSlots = () => {
  if (selectedSubject.value && slotsToOpen.value > 0) {
    const studentsToRemove = selectedSubject.value.students.splice(0, slotsToOpen.value);
    //Asignar a asigntura
  }
  closeModal();
};
</script>

<style>
.table-scroll {
  max-height: 400px;
  overflow-y: auto;
}
</style>
