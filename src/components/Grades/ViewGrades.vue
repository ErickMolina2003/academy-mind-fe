<template>
    <v-main class="ma-0 pa-0" v-if="currentPeriod">
        <h1 style="color: #CC6600;">Calificaciones del periodo</h1>
        <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
        <v-table class="table-grades" fixed-header density="comfortable">
            <thead>
                <tr>
                    <th class="text-black pa-0 px-3">Cód.</th>
                    <th class="text-black pa-0 px-3">Asignatura</th>
                    <th class="text-black pa-0 px-3">Sección</th>
                    <th class="text-black pa-0 px-3">HI</th>
                    <th class="text-black pa-0 px-3">HF</th>
                    <th class="text-black pa-0 px-3">Días</th>
                    <th class="text-black pa-0 px-3">Docente</th>
                    <th class="text-black pa-0 px-3">Calificación</th>
                    <th v-if="needsEvalutions" class="text-black pa-0 px-3">Obs</th>
                </tr>
            </thead>
            <tbody>

                <tr v-if="sections" v-for="item in sections" :key="item.id">
                    <td class="text-left pa-0 px-3">{{ item.section.idClass.code }}</td>
                    <td class="text-left pa-0 px-3">{{ item.section.idClass.name }}</td>
                    <td class="text-left pa-0 px-3">{{ item.section.codeSection }}</td>
                    <td class="text-left pa-0 px-3">{{ item.section.hour }}</td>
                    <td class="text-left pa-0 px-3">{{ item.section.finalHour }}</td>
                    <td class="text-left pa-0 px-3">{{ item.section.days }}</td>
                    <td class="text-left pa-0 px-3">{{ item.section.idTeacher.user.firstName }} {{
                        item.section.idTeacher.user.firstLastName }}</td>
                    <td v-if="needsEvalutions && item.note" class="text-left pa-0 px-3">
                        {{ item.note }}
                    </td>
                    <td v-if="needsEvalutions && !item.note" class="text-left pa-0 px-3">
                        N/D
                    </td>
                    <td v-if="!needsEvalutions && item.teacherEvaluationDone==='false'">
                        <v-icon class="icon icon-evaluation" @click="openEvaluation(item)">{{ ' mdi-chat-question'
                        }}</v-icon>
                    </td>
                    <td v-if="!needsEvalutions && item.teacherEvaluationDone!=='false'">
                        <v-icon class="icon">{{ ' mdi-check-bold' }}</v-icon>
                    </td>
                    <td class="text-left pa-0 px-3" v-if="item.stateClass === 'En progreso' && needsEvalutions">
                        N/D
                    </td>
                    <td v-if="item.stateClass !== 'En progreso' && needsEvalutions" class="text-left pa-0 px-3">
                        {{ item.stateClass }}
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-main>
        <v-dialog v-model="dialog" width="auto">
            <TeacherEvaluation :chosenForEvaluation="chosenForEvaluation" @submitForm="closeEvaluation" />

        </v-dialog>
    
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";

import TeacherEvaluation from "@/components/Enroll/TeacherEvaluation";
import TuitionService from "@/services/tuition/tuition.service";
import PeriodService from "@/services/period/period.service";

const servicePeriod = new PeriodService();
const tuitionService = new TuitionService();

const store = useAppStore();
const periods = ref([]);
const currentPeriod = ref({});
const sections = ref([]);
const needsEvalutions = ref(false);
const chosenForEvaluation = ref(null);
const studentLogged = store.user;
const dialog = ref(false);

onMounted(() => {
    getPeriods();

});

async function getPeriods() {
    const response = await servicePeriod.getPeriodGrades();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];

    if (currentPeriod.value) {
        getGrades();


    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en estado de ingreso de notas.",
            color: "error",
        });
    }

}

async function getGrades() {
    const response = await tuitionService.getGradesOfStudent(studentLogged.student.accountNumber);
    sections.value = response.registrations.filter((section) => section.waitingList == "false");
    
    
    if (showPendingEvaluations().length === 0) {
        needsEvalutions.value = true;
    }


}

function showPendingEvaluations() {
    return sections.value.filter(section => section.teacherEvaluationDone==='false');
}

function openEvaluation(item) {
    dialog.value = true;

    chosenForEvaluation.value = item;
}
function closeEvaluation(evaluationDone) {

    if (evaluationDone) {
        getGrades();
    }

    dialog.value = false;

}
</script>
  
<style>
.table-grades {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}

.icon {
    color: green;
    font-size: 2rem;
}

.icon-evaluation {

    cursor: pointer;
}
</style>