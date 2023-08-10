<template>
    <v-container v-if="currentPeriod">
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
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const serviceTuition = new TuitionService();
const periods = ref([]);
const currentPeriod = ref({});
const originalStudents = ref([]);
const students = ref([]);

onMounted(() => {
    getPeriods();
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodOngoing();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];

    if (currentPeriod.value) {
        getStudentsPeriod(currentPeriod.value.id);
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en curso.",
            color: "error",
        });
    }

}


async function getStudentsPeriod(idPeriod) {
  const response = await serviceTuition.getTuitionsStudentByPeriod(idPeriod);
  originalStudents.value = response.registrations;
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