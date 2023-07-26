<template>
  <div>
    <SearchableNavBar :title="myTitle" :label="myLabel" />
    <table class="table-scroll">
      <thead>
        <tr>
          <th class="text-center">cod.</th>
          <th class="text-center">Asignatura</th>
          <th class="text-center">Sección</th>
          <th class="text-center">En espera</th>
          <th class="text-center">Seleccione</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredSubject" :key="item.cod">
          <td>{{ item.cod }}</td>
          <td>{{ item.class }}</td>
          <td>{{ item.section }}</td>
          <td>{{ item.students.length }}</td>
          <td style="width: 120px; height: 45px;">
            <v-btn color="primary" text @click="openModal(item)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
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
          <v-spacer></v-spacer>
          <v-btn @click="closeModal">Cerrar</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
const myTitle = "Lista de espera";
const myLabel = "Asignatura";
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
const searchQuery = ref("");
onMounted(() => {

  document.addEventListener("filter", (event) => {
    searchQuery.value = event.detail;
  });

  document.addEventListener("resetFilter", () => {
    searchQuery.value = "";
  });
});

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
    // Lógica para asignar a la asignatura
  }
  closeModal();
};

const filteredSubject = computed(() => {
  const searchQueryValue = searchQuery.value.toLowerCase().trim();
  if (!searchQueryValue) {
    return subject.value;
  } else {
    return subject.value.filter((item) =>
      item.class.toLowerCase().includes(searchQueryValue)
    );
  }
});
</script>

<style>
.table-scroll {
  max-height: 400px;
  overflow-y: auto;
}

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
