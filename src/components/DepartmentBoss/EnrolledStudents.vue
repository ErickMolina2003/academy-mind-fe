<template>
    <v-container>
        <SearchableNavBar title="Estudiantes Matriculados" label="No.Cuenta"/>
        <div>
            <h2 style="padding-bottom: 15px">Lista de Estudiantes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Número de cuenta</th>
                        <!-- <th>Carrera</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in originalStudents" :key="student.student.accountNumber">
                        <td>{{ student.student.user.firstName}} {{student.student.user.secondName}} {{student.student.user.firstLastName}} {{student.student.user.secondLastName}}</td>
                        <td>{{ student.student.accountNumber }}</td>
                        <!-- <td>{{ student. }}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";

const periodData = ref({});
const state = ref("");

const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const serviceTuition = new TuitionService();

const originalStudents = ref([]);
const students = ref([]);

onMounted(async() => {

periodData.value = await getRecentPeriod();
state.value = periodData.value.idStatePeriod.name;

if (state.value == 'Matricula' || state.value == 'En curso' || state.value == 'Ingreso de notas' ) {
    getStudentsPeriod(periodData.value.id);
} else {
    store.setToaster({
        isActive: true,
        text: "El perido actual no está en estado de planificación académica.",
        color: "error",
    });
}

});


async function getStudentsPeriod(idPeriod: number) {
  const response = await serviceTuition.getTuitionsStudentByPeriod(idPeriod);
  originalStudents.value = response.registrations;
}

async function getRecentPeriod() {
    let mostRecentPeriod = null;
    const response = await servicePeriod.getPeriods();
    const periods = response.periods;
    const currentYear = new Date().getFullYear();
    const mostRecentYear = Math.max(...periods.map((period) => period.year));
    const mostRecentPeriodNumber = Math.max(
        ...periods
            .filter((period) => period.year === mostRecentYear)
            .map((period) => period.numberPeriod)
    );
    mostRecentPeriod = periods.find(
        (period) =>
            period.year === mostRecentYear && period.numberPeriod === mostRecentPeriodNumber
    );
    return mostRecentPeriod;
};


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

document.addEventListener("resetFilter", () => {
  students.value = [...originalStudents.value];
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