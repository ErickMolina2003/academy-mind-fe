<template>
  <div>
    <SearchableNavBar :title="myTitle" :label="myLabel" @search="filterStudents" />
    <table>
      <thead>
        <tr>
          <th>Numero de cuenta</th>
          <th>Nombre</th>
          <th>Correo Institucional</th>
          <!--<th>Carrera</th>-->
          <th>Historial Académico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.dni">
          <td>{{ student.accountNumber }}</td>
          <td>
            {{
              `${student.user.firstName} ${student.user.secondName} ${student.user.firstLastName} ${student.user.secondLastName}`
            }}
          </td>
          <td>{{ student.institutionalEmail }}</td>
          <!--<td>{{ student.career }}</td>-->
          <td>
            <v-btn color="primary" @click="showClassDetails(student)" class="mr-2"
              >Ver</v-btn
            >
          </td>
        </tr>
      </tbody>
    </table>
    <v-dialog v-model="showModal" persistent max-width="950">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Historial Académico - {{ selectedStudentAccountNumber }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-table  height="30rem" class="table-grades" fixed-header density="comfortable">
            <thead >
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
        </v-card-text>
        <v-card-actions class="fixed-footer">
          <v-spacer></v-spacer>
          <v-btn color="bg-blue-darken-3" @click="showModal = false">Cerrar</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import StudentService from "@/services/student/student.service";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import grades from "../../mock/grades.json";
const subjects = ref(grades);

const store = useAppStore();
const { updateStudents } = storeToRefs(store);
const students = ref([]);
const isLoading = ref(false);
const originalStudents = ref([]);
const studentService = new StudentService();
const myTitle = "Historial Académico Estudiantil";
const myLabel = "No. Cuenta";
const showModal = ref(false);
const selectedStudent = ref({});
const selectedStudentFullName = ref("");
const selectedStudentAccountNumber = ref("");

onMounted(async () => {
  getStudents();
});

async function getStudents() {
  isLoading.value = true;
  originalStudents.value = await studentService.getStudents();
  students.value = [...originalStudents.value];
  isLoading.value = false;
}

const filterStudents = (query) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (lowerCaseQuery === "") {
    students.value = [...originalStudents.value];
  } else {
    students.value = originalStudents.value.filter((student) =>
      student.accountNumber.toLowerCase().includes(lowerCaseQuery)
    );
  }
};

const filteredStudents = computed(() => students.value);

const showClassDetails = (student) => {
  selectedStudent.value = student;
  selectedStudentFullName.value = `${student.user.firstName} ${student.user.secondName} ${student.user.firstLastName} ${student.user.secondLastName}`;
  selectedStudentAccountNumber.value = student.accountNumber;
  showModal.value = true;
};

document.addEventListener("filter", (event) => {
  filterStudents(event.detail);
});

watch(updateStudents, () => {
  if (updateStudents) {
    getStudents();
    store.setUpdateStudent(false);
  }
});
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

.fixed-footer {
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: 1px solid rgba(var(--v-theme-base-border-color), 0.12);
  padding: 16px;
}
</style>

