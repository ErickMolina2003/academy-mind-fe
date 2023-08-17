<template>
  <v-container>
    <SearchableNavBar title="Historial Académico Estudiantil" label="No. Cuenta" @search="filterStudents" />
    <table>
      <thead>
        <tr>
          <th>Número de cuenta</th>
          <th>Nombre</th>
          <th>Correo Institucional</th>
          <th>Carrera</th>
          <th>Centro Regional</th>
          <th>Historial Académico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in displayedStudents" :key="student.dni">
          <td>{{ student.accountNumber }}</td>
          <td>
            {{
              `${student.user.firstName} ${student.user.secondName} ${student.user.firstLastName}
                        ${student.user.secondLastName}`
            }}
          </td>
          <td>{{ student.institutionalEmail }}</td>
          <td>{{ student.studentCareer[0].centerCareer.career.name }}</td>
          <td>{{ student.studentCareer[0].centerCareer.regionalCenter.name }}</td>
          <td>
            <v-icon @click="showClassDetails(student)">{{'mdi-eye-outline'}}</v-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination v-model="currentStudentsPage" :total-visible="5" :length="totalStudentsPages" @input="updateDisplayedStudents" />
  </v-container>
  <v-dialog v-model="showModal" persistent max-width="950">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Historial académico</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <h2 class="text-center mb-2">{{ title }}</h2>
        <v-table  fixed-header density="comfortable">
          <thead>
            <tr>
              <th class="pa-0 px-3">CÓDIGO</th>
              <th class="pa-0 px-3">ASIGNATURA</th>
              <th class="pa-0 px-3">UV</th>
              <th class="pa-0 px-3">SECCIÓN</th>
              <th class="pa-0 px-3">AÑO</th>
              <th class="pa-0 px-3">PERIODO</th>
              <th class="pa-0 px-3">CALIFICACIÓN</th>
              <th class="pa-0 px-3">OBS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in displayedSubjects" :key="item">
              <td class="text-left pa-0 px-3">{{ item.section.idClass.code }}</td>
              <td class="text-left pa-0 px-3">{{ item.section.idClass.name }}</td>
              <td class="text-left pa-0 px-3">{{ item.section.idClass.valueUnits }}</td>
              <td class="text-left pa-0 px-3">{{ item.section.codeSection }}</td>
              <td class="text-left pa-0 px-3">{{ item.section.idPeriod.year }}</td>
              <td class="text-left pa-0 px-3">{{ item.section.idPeriod.numberPeriod }}</td>
              <td class="text-left pa-0 px-3">{{ item.note }}</td>
              <td class="text-left pa-0 px-3">{{ item.stateClass }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination v-model="currentSubjectPage" :total-visible="5" :length="totalSubjectsPages"
          @input="updateDisplayedSubjects" />
      </v-card-text>
      <v-card-actions class="fixed-footer">
        <v-spacer></v-spacer>
        <v-btn color="bg-blue-darken-3" @click="showModal = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import StudentService from "@/services/student/student.service";
import TuitionService from "@/services/tuition/tuition.service";
import { useAppStore } from "@/store/app";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
const subjects = ref([]);
const store = useAppStore();
const students = ref([]);
const originalStudents = ref([]);
const studentService = new StudentService();
const tuitionService = new TuitionService();
const title = ref("");
const showModal = ref(false);

onMounted(async () => {
  getStudents();
});

async function getStudents() {

  const response = await studentService.getStudents();
  originalStudents.value = response.students;
  students.value = [...originalStudents.value];

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



const showClassDetails = async (student) => {
  title.value = `${student.user.firstName} ${student.user.secondName} ${student.user.firstLastName} ${student.user.secondLastName}`;
  showModal.value = true;
  const response = await tuitionService.getAcademicHistory(student.accountNumber);
  subjects.value = response.registrations;
};

document.addEventListener("filter", (event) => {
  filterStudents(event.detail);
});

// paginacion
const filteredSubjects = computed(() => subjects.value);
const itemsPerPage = 10;
const currentSubjectPage = ref(1);
const displayedSubjects = ref([]);
const totalSubjectsPages = computed(() => Math.ceil(filteredSubjects.value.length / itemsPerPage));
const updateDisplayedSubjects = () => {
  const startIndex = (currentSubjectPage.value - 1) * itemsPerPage;
  displayedSubjects.value = filteredSubjects.value.slice(startIndex, startIndex + itemsPerPage);
};
watch([currentSubjectPage, filteredSubjects], updateDisplayedSubjects);

const filteredStudents = computed(() => students.value);
const currentStudentsPage = ref(1);
const displayedStudents = ref([]);
const totalStudentsPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage));
const updateDisplayedStudents = () => {
  const startIndex = (currentStudentsPage.value - 1) * itemsPerPage;
  displayedStudents.value = filteredStudents.value.slice(startIndex, startIndex + itemsPerPage);
}
watch([currentStudentsPage,filteredStudents], updateDisplayedStudents);



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

