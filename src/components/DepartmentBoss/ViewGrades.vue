<template>
    <v-container v-if="currentPeriod">
        <SearchableNavBar title="Notas Ingresadas" label="No.Empleado"/>

        <div>
            <h2 style="padding-bottom: 15px">Lista de Secciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>Número de empleado</th>
                        <th>Docente</th>
                        <th>Asignatura</th>
                        <th>Sección</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in sections">
                        <td>{{ section.employeeNumber }}</td>
                        <td>{{ section.teacher }}</td>
                        <td>{{ section.class }}</td>
                        <td>{{ section.section }}</td>
                        <td><v-btn @click="toggleModal(section.section, section.class, section.teacher, section.notes)">
                                {{ section.viewNotes }}
                            </v-btn></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>


    <v-dialog v-model="showModal" persistent width="1440">
        <v-card class="pa-4">

            <v-card-text>
                <v-card-title class="text-h5 pa-0 pb-4">
                    {{ titleModal }}
                </v-card-title>
                <table>
                    <thead>
                        <tr>
                            <th>Número de cuenta</th>
                            <th>Nota</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="noteStudent in notesToDisplay">
                            <td>{{ noteStudent.accountNumber }}</td>
                            <td>{{ noteStudent.note }}</td>
                            <td>{{ noteStudent.observation }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-card-text>
            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup>
import { ref,onMounted } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import PeriodService from "@/services/period/period.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const servicePeriod = new PeriodService();
const showModal = ref(false);
const titleModal = ref("");
const periods = ref([]);
const currentPeriod = ref({});
const notesToDisplay = ref([]);
const originalSections = ref([]);
onMounted(() => {
    getPeriods();
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodGrades();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];

    if (currentPeriod.value) {
        getSections();
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en ingreso de notas.",
            color: "error",
        });
    }

}


const notes1 = [
    { accountNumber: "20191002985", note: "90", observation: "APR" },
    { accountNumber: "20191002189", note: "88", observation: "APR" },
    { accountNumber: "20171002477", note: "78", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" },
    { accountNumber: "20081001293", note: "0", observation: "NSP" },
]

const notes2 = [
    { accountNumber: "20151009837", note: "93", observation: "APR" },
    { accountNumber: "20141000129", note: "91", observation: "APR" },
    { accountNumber: "20121001283", note: "80", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" },
]

const notes3 = [
    { accountNumber: "20191002985", note: "90", observation: "APR" },
    { accountNumber: "20191002189", note: "88", observation: "APR" },
    { accountNumber: "20171002477", note: "78", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" },
    { accountNumber: "20081001293", note: "0", observation: "NSP" },
]

const notes4 = [
    { accountNumber: "20151009837", note: "93", observation: "APR" },
    { accountNumber: "20141000129", note: "91", observation: "APR" },
    { accountNumber: "20191002985", note: "90", observation: "APR" },
    { accountNumber: "20191002189", note: "88", observation: "APR" },
    { accountNumber: "20171002477", note: "78", observation: "APR" },
    { accountNumber: "20121001283", note: "80", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" },
    { accountNumber: "20151009837", note: "93", observation: "APR" },
    { accountNumber: "20141000129", note: "91", observation: "APR" },
    { accountNumber: "20191002985", note: "90", observation: "APR" },
    { accountNumber: "20191002189", note: "88", observation: "APR" },
    { accountNumber: "20171002477", note: "78", observation: "APR" },
    { accountNumber: "20121001283", note: "80", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" },
    { accountNumber: "20151009837", note: "93", observation: "APR" },
    { accountNumber: "20141000129", note: "91", observation: "APR" },
    { accountNumber: "20191002985", note: "90", observation: "APR" },
    { accountNumber: "20191002189", note: "88", observation: "APR" },
    { accountNumber: "20171002477", note: "78", observation: "APR" },
    { accountNumber: "20121001283", note: "80", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" },
    { accountNumber: "20151009837", note: "93", observation: "APR" },
    { accountNumber: "20141000129", note: "91", observation: "APR" },
    { accountNumber: "20191002985", note: "90", observation: "APR" },
    { accountNumber: "20191002189", note: "88", observation: "APR" },
    { accountNumber: "20171002477", note: "78", observation: "APR" },
    { accountNumber: "20121001283", note: "80", observation: "APR" },
    { accountNumber: "20161003849", note: "55", observation: "RPB" }
]

const sections = ref([
    {
        employeeNumber: "00012", teacher: "Irma Lagos", class: "Contabilidad I", section: "1000", viewNotes: "Ver notas",
        notes: notes1
    },
    {
        employeeNumber: "00012", teacher: "Irma Lagos", class: "Contabilidad I", section: "1100", viewNotes: "Ver notas",
        notes: notes2
    },
    {
        employeeNumber: "00013", teacher: "Erick Vladimir", class: "Sistemas Expertos", section: "1600", viewNotes: "Ver notas",
        notes: notes3
    },
    {
        employeeNumber: "00013", teacher: "Erick Vladimir", class: "Sistemas Expertos", section: "1700", viewNotes: "Ver notas",
        notes: notes4
    }
]);


function toggleModal(section, className, teacher, notes) {
    notesToDisplay.value = notes;
    titleModal.value = className + " - " + section + " - " + teacher;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}


function getSections() {
  originalSections.value = sections.value;
  sections.value = [...originalSections.value];
}


const filterSections = (query) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (lowerCaseQuery === "") {
    sections.value = [...originalSections.value];
  } else {
    sections.value = originalSections.value.filter((student) =>
      student.employeeNumber.toLowerCase().includes(lowerCaseQuery)
    );
  }
};

document.addEventListener("filter", (event) => {
  filterSections(event.detail);
});

document.addEventListener("resetFilter", () => {
  sections.value = [...originalSections.value];
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