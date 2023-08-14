<template>
  <v-container>
    <SearchableNavBar title="Estudiantes Matriculados" label="No.Cuenta" />
    <div>
      <h2
        style="
          padding-bottom: 15px;
          background-color: rgb(var(--v-theme-secondary-lighthen-1));
        "
        class="text-center text-white"
      >
        Lista de Estudiantes
      </h2>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Número de cuenta</th>
            <th>Correo Institucional</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in paginatedStudents"
            :key="student.student.accountNumber"
          >
            <td>{{ index + startIndex + 1 }}</td>
            <td>
              {{ student.student.user.firstName }}
              {{ student.student.user.secondName }}
              {{ student.student.user.firstLastName }}
              {{ student.student.user.secondLastName }}
            </td>
            <td>{{ student.student.accountNumber }}</td>
            <td>{{ student.student.institutionalEmail }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <v-pagination
      v-model="currentPage"
      :total-visible="5"
      :length="totalPages"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";
import SectionService from "@/services/section/section.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const serviceTuition = new TuitionService();
const periods = ref([]);
const currentPeriod = ref({});
const originalStudents = ref([]);
const students = ref([]);
const periodToModify = ref({});

onMounted(async () => {
  getPeriods();
});

async function getPeriods() {
  const response = await servicePeriod.getPeriodsByYear(
    new Date().getFullYear()
  );
  periods.value = response.periods;
  periodToModify.value = periods.value[0];
  if (
    periodToModify.value.idStatePeriod?.name !== "Finalizado" &&
    periodToModify.value.idStatePeriod?.name !== "Por definir"
  ) {
    getStudentsPeriod(periodToModify.value.id);
  }
}

async function getStudentsPeriod(idPeriod: number) {
  const description = ref(
    store.user.teacher.teachingCareer[0].centerCareer.career.id
  );
  const response = await serviceTuition.getTuitionsStudentByPeriodAndDepartment(
    idPeriod,
    description.value
  );
  originalStudents.value = response.registrations;
  students.value = [...originalStudents.value]; // Actualizar la lista students
}

const filterStudents = (query) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (lowerCaseQuery === "") {
    students.value = [...originalStudents.value];
  } else {
    students.value = originalStudents.value.filter((student) =>
      student.student.accountNumber.toLowerCase().includes(lowerCaseQuery)
    );
  }
};

document.addEventListener("filter", (event) => {
  filterStudents(event.detail);
});

document.addEventListener("resetFilter", () => {
  students.value = [...originalStudents.value];
});

// Agregar paginación
const itemsPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(students.value.length / itemsPerPage)
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);

const paginatedStudents = computed(() => {
  return students.value.slice(
    startIndex.value,
    startIndex.value + itemsPerPage
  );
});
</script>

<style scoped>
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
