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
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in filteredTeachers" :key="teacher.employeeNumber">
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
        </tr>
      </tbody>
    </table>
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

onMounted(async () => {
  getTeachers();
});

async function getTeachers() {
  isLoading.value = true;
  originalTeachers.value = await teacherService.getTeachers();
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

const filteredTeachers = computed(() => teachers.value);

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
</style>
