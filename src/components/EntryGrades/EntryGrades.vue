<template>
    <v-container v-if="currentPeriod" class="pa-4">
        <SearchableNavBar title="Ingresar notas de estudiantes" />
        <h2 style="padding-bottom: 15px">Lista de Secciones</h2>

        <v-table class="table-grades" fixed-header density="comfortable">
            <thead>
                <tr>
                    <th class="text-black pa-0 px-3">Cód.</th>
                    <th class="text-black pa-0 px-3">Asignatura</th>
                    <th class="text-black pa-0 px-3">Sección</th>
                    <th class="text-black pa-0 px-3">HI</th>
                    <th class="text-black pa-0 px-3">HF</th>
                    <th class="text-black pa-0 px-3">Días</th>
                    <th class="text-black pa-0 px-3">Estudiantes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="sections" v-for="item in sections" :key="item.id">
                    <td class="text-left pa-0 px-3">{{ item.idClass.code }}</td>
                    <td class="text-left pa-0 px-3">{{ item.idClass.name }}</td>
                    <td class="text-left pa-0 px-3">{{ item.codeSection }}</td>
                    <td class="text-left pa-0 px-3">{{ item.hour }}</td>
                    <td class="text-left pa-0 px-3">{{ item.finalHour }}</td>
                    <td class="text-left pa-0 px-3">{{ item.days }}</td>
                    <td class="text-left pa-0 px-3">
                        <v-icon @click="openModal(item)">{{ 'mdi-pencil' }}</v-icon>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <v-dialog v-model="modalStudents" persistent max-width="950">
            <v-card class="pa-4">
                <v-card-title class="text-h5 pa-0 pb-4">
                    Estudiantes de la seccion
                </v-card-title>
                <h3>{{ currentSection.codeSection }} - {{ currentSection.idClass.name }}</h3>

                <v-table class="table-grades mb-4" fixed-header density="comfortable" max-height="450"
                    style="overflow-y: scroll;">
                    <thead>
                        <tr>
                            <th class="text-black pa-0 px-3">Nombre</th>
                            <th class="text-black pa-0 px-3">Número de cuenta</th>
                            <th class="text-black pa-0 px-3">Nota</th>
                            <th class="text-black pa-0 px-3">Obs</th>
                            <th class="text-black pa-0 px-3" v-if="edit">Cambiar obs</th>
                            <th class="text-black pa-0 px-3" v-if="edit">Confirmar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in students" :key="student.student.accountNumber">
                            <td class="text-left pa-0 px-3">{{ student.student.user.firstName }}
                                {{ student.student.user.secondName }} {{ student.student.user.firstLastName }}
                                {{ student.student.user.secondLastName }}</td>
                            <td class="text-left pa-0 px-3">{{ student.student.accountNumber }}</td>
                            <td v-if="student.note === null && !edit" class="text-left pa-0 px-3">
                                N/D
                            </td>
                            <td v-if="student.note !== null && !edit" class="text-left pa-0 px-3">
                                {{ student.note }}
                            </td>
                            <td v-if="edit" class="text-left pa-0 px-3">
                                <v-text-field type="number" v-model="student.note" variant="underlined" ></v-text-field>
                            </td>
                            <td v-if="student.stateClass === 'En progreso'" class="text-left pa-0 px-3">
                                N/D
                            </td>
                            <td v-if="student.stateClass !== 'En progreso'" class="text-left pa-0 px-3">
                                {{ student.stateClass }}
                            </td>
                            <td v-if="edit" class="text-left pa-0 px-3">
                                <v-combobox v-model="student.newStateClass" :disabled="student.stateClass === 'En progreso'" :items="showState(student.stateClass)"
                                    variant="underlined">
                                </v-combobox>
                            </td>
                            <td class="text-center pa-0 px-3" v-if="edit">
                                <v-icon @click="entryNote(student.id, student.note, student.newStateClass)">{{
                                    'mdi-check-bold' }}</v-icon>

                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <div class="text-center" v-if="edit">
                    <v-icon style="font-size: 1.8rem;" @click="edit = false; getNotes();">{{ 'mdi-close-box' }}</v-icon>
                </div>
                <div class="text-center pa-0 px-3" v-if="!edit">
                    <v-icon @click="edit = true">{{ 'mdi-pencil' }}</v-icon>
                </div>

                <div class="fixed-footer d-flex justify-lg-space-between">
                    <v-btn @click="sendEmails">Enviar notas</v-btn>
                    <v-btn color="blue-darken-1" @click="modalStudents = false; edit = false;">
                        Cerrar
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>



    </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import SearchableNavBar from '../NavBars/SearchableNavBar.vue';
import { useAppStore } from "@/store/app";

import TeacherEvaluation from "@/components/Enroll/TeacherEvaluation";
import TuitionService from "@/services/tuition/tuition.service";
import PeriodService from "@/services/period/period.service";
import SectionService from "@/services/section/section.service";

const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const tuitionService = new TuitionService();
const classStates = ref([
    "NSP",
    "ABN"
]);
const store = useAppStore();
const periods = ref([]);
const currentPeriod = ref({});
const sections = ref([]);
const students = ref([]);
const teacher = store.user.teacher;
const modalStudents = ref(false);
const currentSection = ref();
const newNote = ref();
const edit = ref(false);
onMounted(() => {
    getPeriods();

});

async function getPeriods() {
    const response = await servicePeriod.getPeriodGrades();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];

    if (currentPeriod.value) {

        getSections()

    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en estado de ingreso de notas.",
            color: "error",
        });
    }

}

async function getSections() {
    const response = await sectionService.getTeacherGrades(teacher.employeeNumber);
    sections.value = await response.section;
}

async function entryNote(idRegistration, note, classState) {
    let gradeData = {};
    if(note){gradeData.note = note}
    if (classState) {gradeData.statusClass = classState}
    if(gradeData!=={}){await tuitionService.addGradeStudent(idRegistration, gradeData)};
    getNotes();
}

function showState(actualState) {
    return (actualState !== 'NSP' && actualState !== 'ABN') ? ['NSP', 'ABN'] : (actualState === 'NSP') ? ['ABN'] : ['NSP'];
}

async function getNotes() {
    const response = await tuitionService.getStudentInSection(currentSection.value.id);
    students.value = response.registration;
}

function sendEmails() {
    modalStudents.value = false;
}

//Modal para ver estudiantes
async function openModal(section) {
    modalStudents.value = true;
    currentSection.value = section;
    getNotes();
}



</script>


<style scoped>
.table-grades {
    font-size: 1rem;
}
</style>