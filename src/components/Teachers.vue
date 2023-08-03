<template>
  <div>
    <h2 style="color: #cc6600; padding-bottom: 15px">Lista de Docentes</h2>
    <table>
      <thead>
        <tr>
          <th>Número de empleado</th>
          <th>Nombre</th>
          <th>Correo Institucional</th>
          <th>Cargo</th>
          <th>Carrera</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in displayedTeachers" :key="teacher.employeeNumber">
          <td>{{ teacher.employeeNumber }}</td>
          <td>
            {{
              `${teacher.user.firstName} ${teacher.user.secondName} ${teacher.user.firstLastName} ${teacher.user.secondLastName}`
            }}
          </td>
          <td>{{ teacher.institutionalEmail }}</td>
          <td>
            {{
              teacher.isBoss
                ? "Jefe de Departamento"
                : teacher.isCoordinator
                ? "Coordinador"
                : "Docente"
            }}
          </td>
          <td>
            <ul class="career-list">
              <li v-for="career in teacher.teachingCareer" :key="career.idTeachingCareer">
                {{ career.centerCareer.career.name }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination v-model="currentPage" :total-visible="5" :length="totalPages"
      @input="updateDisplayedTeachers()"></v-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import TeacherService from "@/services/teacher/teacher.service";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

const store = useAppStore();
const { updateTeachers } = storeToRefs(store);
const teachers = ref([]);
const isLoading = ref(false);
const originalTeachers = ref([]);
const teacherService = new TeacherService();

const filteredTeachers = computed(() => teachers.value);

// paginación

const itemsPerPage = 10;
const currentPage = ref(1);
const displayedTeachers = ref([]);

const totalPages = computed(() => Math.ceil(filteredTeachers.value.length / itemsPerPage));

const updateDisplayedTeachers = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  displayedTeachers.value = filteredTeachers.value.slice(startIndex, startIndex + itemsPerPage);
};

watch(currentPage, updateDisplayedTeachers);
watch(filteredTeachers, updateDisplayedTeachers);


onMounted(async () => {
  await getTeachers();
  updateDisplayedTeachers();
});

async function getTeachers() {
  isLoading.value = true;
  const response = await teacherService.getTeachers();
  originalTeachers.value = response.teachers;
  teachers.value = [...originalTeachers.value];
  isLoading.value = false;
}

const filterTeachers = (query) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (lowerCaseQuery === "") {
    teachers.value = [...originalTeachers.value];
  } else {
    teachers.value = originalTeachers.value.filter((teacher) =>
      teacher.employeeNumber.toLowerCase().includes(lowerCaseQuery)
    );
  }
};



// Capturar el evento personalizado 'filter' emitido desde NavBar.vue
document.addEventListener("filter", (event) => {
  filterTeachers(event.detail);
});

watch(updateTeachers, () => {
  if (updateTeachers) {
    getTeachers();
    store.setUpdateTeacher(false);
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
  margin: 0;
}

.career-list li {
  margin-bottom: 5px;
}
</style>
