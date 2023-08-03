<template>
  <div>
    <h2 style="color: #cc6600; padding-bottom: 15px">Lista de Estudiantes</h2>
    <table>
      <thead>
        <tr>
          <th>Numero de cuenta</th>
          <th>Nombre</th>
          <th>Correo Institucional</th>
          <th>Carrera</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in displayedStudents" :key="student.dni">
          <td>{{ student.accountNumber }}</td>
          <td>
            {{
              `${student.user.firstName} ${student.user.secondName} ${student.user.firstLastName} ${student.user.secondLastName}`
            }}
          </td>
          <td>{{ student.institutionalEmail }}</td>
          <td>
            <ul class="career-list">
              <li v-for="career in student.studentCareer" :key="career.idStudentCareer">
                {{ career.centerCareer.career.name }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <v-pagination v-model="currentPage" :total-visible="5" :length="totalPages"
      @input="updateDisplayedStudents()"></v-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import StudentService from "@/services/student/student.service";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

const store = useAppStore();
const { updateStudents } = storeToRefs(store);
const students = ref([]);
const isLoading = ref(false);
const originalStudents = ref([]);
const studentService = new StudentService();


const filteredStudents = computed(() => students.value);

// paginación

const itemsPerPage = 10;
const currentPage = ref(1);
const displayedStudents = ref([]);

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage));

const updateDisplayedStudents = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  displayedStudents.value = filteredStudents.value.slice(startIndex, startIndex + itemsPerPage);
};

watch(currentPage, updateDisplayedStudents);
watch(filteredStudents, updateDisplayedStudents);

onMounted(async () => {
  await getStudents();
  updateDisplayedStudents();
});



async function getStudents() {
  isLoading.value = true;
  const response = await studentService.getStudents();
  originalStudents.value = response.students;
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

.career-list {
  list-style-type: none;
  padding: 0;
  margin: 0;}
</style>
