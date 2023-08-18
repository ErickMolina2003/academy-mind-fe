<template>
    <v-container v-if="currentPeriod">
        <SearchableNavBar title="Evaluaciones de estudiantes" label="No. Empleado" />
        <h2 style="padding-bottom: 15px">Lista de Docentes</h2>
        <table>
            <thead>
                <tr>
                    <th>Docente</th>
                    <th>Número de Empleado</th>
                    <th>Asignatura</th>
                    <th>Evaluación</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in displayedTeachers" :key="item">
                    <td>{{ item.section.idTeacher.user.firstName }} {{ item.section.idTeacher.user.firstLastName }}</td>
                    <td>{{ item.section.idTeacher.employeeNumber }}</td>
                    <td>{{ item.section.idClass.name }}</td>
                    <td>
                        <v-icon @click="showEvaluationDetails(item.section)">{{ 'mdi-eye-outline' }}</v-icon>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-pagination v-model="currentTeachersPage" :total-visible="5" :length="totalTeachersPages"
            @input="updateDisplayedTeachers" />
    </v-container>
    <v-dialog v-model="showModal" persistent max-width="950">
        <v-card>
            <v-toolbar color="primary" dark>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <div v-for="(item, index) in evaluation" :key="index" class="mb-3">
                    <h3 v-if="index in evaluationHeadings" class="bg-blue darken-3 text-left pa-1">
                        {{ evaluationHeadings[index] }}
                    </h3>
                    <p v-if="index !== 11 && index !== 10">
                        {{ item.question }}
                    </p>
                    <table class="table" v-if="index !== 11 && index !== 10">
                        <thead>
                            <tr>
                                <th>Excelente</th>
                                <th>Bueno</th>
                                <th>Regular</th>
                                <th>Insuficiente</th>
                                <th>Deficiente</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ item.excelentCount }}</td>
                                <td>{{ item.greatCount }}</td>
                                <td>{{ item.regularCount }}</td>
                                <td>{{ item.insuficcientCount }}</td>
                                <td>{{ item.deficcientCount }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="index == 11">
                        <h3 class="bg-blue-darken-3 text-left py-1">
                            OBSERVACIONES
                            <v-btn @click="showObservations = !showObservations; observations = item.observations" icon
                                size="x-small">
                                <v-icon>
                                    {{ showObservations ? "mdi-chevron-up" : "mdi-chevron-down" }}
                                </v-icon>
                            </v-btn>
                        </h3>
                        <template v-if="showObservations">
                            <ul class="observation-list">
                                <li v-for="observation in displayedObs" :key="observation" class="observation-item">
                                    {{ observation }}
                                </li>
                            </ul>
                            <v-pagination v-model="currentObsPage" :total-visible="5" :length="totalObsPages"
                                @input="updateDisplayedObs" />
                        </template>
                    </div>
                    <v-divider></v-divider>
                </div>
            </v-card-text>

            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="bg-blue-darken-3" @click="showModal = false; evaluation=[];observations=[];showObservations=false;">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import PeriodService from "@/services/period/period.service";
import EvaluationService from "@/services/evaluation/evaluation.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const servicePeriod = new PeriodService();
const serviceEvaluation = new EvaluationService();
const periods = ref([]);
const currentPeriod = ref({});
const showObservations = ref(false);
const evaluation = ref([]);
const showModal = ref(false);
const searchQuery = ref("");
const observations = ref([]);
const careerBoss = store.user.teacher.teachingCareer[0].centerCareer;
const teachersList = ref([]);
const originalTeachers = ref([]);
const title = ref("");
const evaluationHeadings = {
    0: 'CARACTERÍSTICAS PERSONALES DEL DOCENTE',
    3: 'CARACTERÍSTICAS PEDAGÓGICAS Y DIDÁCTICAS DEL DOCENTE',
    7: 'CARACTERÍSTICAS DISCIPLINARES'
};

onMounted(() => {
    getPeriods();
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodGrades();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];

    if (currentPeriod.value) {
        getTeachers();
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en ingreso de notas.",
            color: "error",
        });
    }

}

async function getTeachers() {
    const response = await serviceEvaluation.getTeacherWithEvaluations(careerBoss.career.id,careerBoss.regionalCenter.id);
    teachersList.value = response.teachers;
    originalTeachers.value = teachersList.value;
}


const showEvaluationDetails = async (section) => {
    const response = await serviceEvaluation.getEvaluationOfTeacher(section.idTeacher.employeeNumber, currentPeriod.value.id, section.idClass.id);
    evaluation.value = response.evaluationCount;
    title.value = `${section.idTeacher.user.firstName} ${section.idTeacher.user.firstLastName} - ${section.idClass.name}`
    showModal.value = true;
};




const filterTeachers = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery === "") {
        teachersList.value = [...originalTeachers.value];
    } else {
        teachersList.value = originalTeachers.value.filter((item) =>
            item.section.idTeacher.employeeNumber.toLowerCase().includes(lowerCaseQuery)
        );
    }
};


document.addEventListener("filter", (event) => {
    filterTeachers(event.detail);
});

document.addEventListener("resetFilter", () => {
    teachersList.value = [...originalTeachers.value];
});







// paginacion maestros
const filteredTeachers = computed(() => teachersList.value);
const itemsPerPage = 5;
const currentTeachersPage = ref(1);
const displayedTeachers = ref([]);
const totalTeachersPages = computed(() => Math.ceil(filteredTeachers.value.length / itemsPerPage));
const updateDisplayedTeachers = () => {
    const startIndex = (currentTeachersPage.value - 1) * itemsPerPage;
    displayedTeachers.value = filteredTeachers.value.slice(startIndex, startIndex + itemsPerPage);
};
watch([currentTeachersPage, filteredTeachers], updateDisplayedTeachers);

// paginacion observaciones
const filteredObs = computed(() => observations.value);
const itemsPerPageObs = 10;
const currentObsPage = ref(1);
const displayedObs = ref([]);
const totalObsPages = computed(() => Math.ceil(filteredObs.value.length / itemsPerPageObs));
const updateDisplayedObs = () => {
    const startIndex = (currentObsPage.value - 1) * itemsPerPageObs;
    displayedObs.value = filteredObs.value.slice(startIndex, startIndex + itemsPerPageObs);
};
watch([currentObsPage, filteredObs], updateDisplayedObs);

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

.observation-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

/* Estilos para los elementos de la lista */
.observation-item {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
}
</style>
