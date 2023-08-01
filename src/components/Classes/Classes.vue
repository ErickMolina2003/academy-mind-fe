<template>
  <v-container class="mt-0 pt-0 pb-0">
    <SearchableNavBar :title="periodo"/>
    <v-row v-if="!isAdmin" class="pb-0 mb-0 pt-2 mt-0 user-description">
      <v-col v-for="(course, index) in displayedCourses" :key="index" cols="12" sm="6" md="4" lg="4">
        <ClassCard :clase="course.name" :horario="course.schedule" :aula="course.room" :docente="!userIsTeacher ? nameTeacher : ''" :btnTitle="userIsTeacher ? seccion : ''" @studentList="stutendList" />
      </v-col>
    </v-row>
  </v-container>
   <v-dialog v-model="showStutendList" persistent width="70%">
        <v-card>
          <v-card-title class="text-h5 text-center">
                Lista de Estudiantes
          </v-card-title>
          <v-card-text class="table-scroll">
            <v-table>
              <thead>
                <tr>
                  <th class="text-center text-black">Nombre</th>
                  <th class="text-center text-black">No.Cuenta</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="student in sortedStudents" :key="student.name">
                  <td class="text-center">{{ student.name }}</td>
                  <td class="text-center">{{ student.accountNumber }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="downloadStudentsList">Descargar Lista</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="closeModal">Cerrar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAppStore } from "@/store/app";
import ClassCard from "@/components/ClassCard/ClassCard.vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";

const store = useAppStore();
const periodo = "Clases 2023-2";
const isAdmin = ref(store.user.isAdmin);
const seccion = "Lista de estudiantes";
const nameTeacher = "Juan Perez";
const showStutendList = ref(false);
function stutendList(modalStutendList) {
    showStutendList.value = modalStutendList;
}
const closeModal = () => {
  showStutendList.value = false;
};
interface Course {
  id: number;
  name: string;
  schedule: string;
  room: string;
}

const courses = ref<Course[]>([
  {
    id: 1,
    name: "Matemáticas",
    schedule: "Lun y Mié 10:00 - 12:00",
    room: "Aula 101",
  },
  {
    id: 2,
    name: "Matemáticas",
    schedule: "Lun y Mié 10:00 - 12:00",
    room: "Aula 101",
  },
  {
    id: 3,
    name: "Matemáticas",
    schedule: "Lun y Mié 10:00 - 12:00",
    room: "Aula 101",
  },
  {
    id: 4,
    name: "Matemáticas",
    schedule: "Lun y Mié 10:00 - 12:00",
    room: "Aula 101",
  },
  {
    id: 5,
    name: "Matemáticas",
    schedule: "Lun y Mié 10:00 - 12:00",
    room: "Aula 101",
  },
  {
    id: 6,
    name: "Matemáticas",
    schedule: "Lun y Mié 10:00 - 12:00",
    room: "Aula 101",
  },
]);

const students = ref([
  {
    name: "Jonas Lopez",
    accountNumber: "12345",
  },
  {
    name: "Jane Bahia",
    accountNumber: "67890",
  },
  {
    name: "Allan Doe",
    accountNumber: "12345",
  },
  {
    name: "Oscar Gutierrez",
    accountNumber: "67890",
  },
  {
    name: "Fernando Lopez",
    accountNumber: "12345",
  },
  {
    name: "Jane Smith",
    accountNumber: "67890",
  },
  {
    name: "John Doe",
    accountNumber: "12345",
  },
]);

const sortedStudents = computed(() => {
  return students.value.slice().sort((a, b) => a.name.localeCompare(b.name));
});

const displayedCourses = ref<Course[]>(courses.value);

const downloadStudentsList = (course: Course) => {
  console.log(`Descargando lista de estudiantes para el curso: ${course.name}`);
};

const userIsTeacher = computed(() => {
  return store.user.teacher !== undefined;
});
</script>

<style scoped>
.user-description {
  background-color: rgb(var(--v-theme-primary-darken-1));
}
.table-scroll {
  height: 500px;
  overflow-y: auto;
}
</style>
