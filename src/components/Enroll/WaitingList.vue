<template>
    <v-main v-if="state && validateDate.statusCode === 200" style="padding-left: 0%">
        <v-container fluid style="height:500px; overflow-y:scroll;">
            <h1 style="color: #CC6600;">Asignaturas En Listas de Espera</h1>
            <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
            <v-card>
                <v-card-title class="text-center text-white"
                    style="background-color: rgb(var(--v-theme-secondary-lighthen-1))">
                    <span class="headline">Asignaturas en Lista de Espera</span>
                </v-card-title>

                <v-card-text class="mt-1" style="padding: 0">
                    <v-table class="list ">
                        <thead style="background-color: rgb(var(--v-theme-secondary-lighthen-1))">
                            <tr>
                                <th class="text-black pa-0 px-3">Cód.</th>
                                <th class="text-black pa-0 px-3">Asignatura</th>
                                <th class="text-black pa-0 px-3">Sección</th>
                                <th class="text-black pa-0 px-3">HI</th>
                                <th class="text-black pa-0 px-3">HF</th>
                                <th class="text-black pa-0 px-3">Dias</th>
                                <th class="text-black pa-0 px-3">Edificio</th>
                                <th class="text-black pa-0 px-3">Aula</th>
                                <th class="text-black pa-0 px-3">UV</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="waitingTuitions" v-for="item in waitingTuitions" :key="item.id">
                                <td class="pa-0 px-3">{{ item.section.idClass.code }}</td>
                                <td class="pa-0 px-3">{{ item.section.idClass.name }}</td>
                                <td class="pa-0 px-3">{{ item.section.codeSection }}</td>
                                <td class="pa-0 px-3">{{ item.section.hour }}</td>
                                <td class="pa-0 px-3">{{ item.section.finalHour }}</td>
                                <td class="pa-0 px-3">{{ item.section.days }}</td>
                                <td class="pa-0 px-3">{{ item.section.idClassroom.idBuilding.name }}</td>
                                <td class="pa-0 px-3">{{ item.section.idClassroom.code }}</td>
                                <td class="pa-0 px-3">{{ item.section.idClass.valueUnits }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from "@/store/app";
import ClassService from "@/services/classes/classes.service";
import TeacherService from "@/services/teacher/teacher.service";
import BuildingService from "@/services/building/building.service";
import ClassroomService from "@/services/classroom/classroom.service";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";

const store = useAppStore();
const tuitionService = new TuitionService();
const serviceClasses = new ClassService();
const teacherService = new TeacherService();
const buildingService = new BuildingService();
const classroomService = new ClassroomService();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const tuitions = ref([]);
const waitingTuitions = ref([]);
const dialogConfirmation = ref(false);
const selectedTuition = ref();
const studentLogged = store.user;
const periods = ref([]);
const period = ref({});
const state = ref(false);
const validateDate = ref(false);
onMounted(async () => {
    getPeriods();
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodRegistrationPlanification();
    periods.value = response.periods;
    period.value = periods.value[0];

    state.value = period.value.idStatePeriod?.name === 'Matricula';
    validateDate.value = await tuitionService.validateRegistrationDate(studentLogged.student.accountNumber);
    if (state.value) {

        if (validateDate.value.statusCode === 200) {
            getTuitionsByStudent();
        } else {
            store.setToaster({
                isActive: true,
                text: validateDate.value.message,
                color: "error",
            });
        }
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en estado de matricula.",
            color: "error",
        });
    }

}

async function getTuitionsByStudent() {

    const response = await tuitionService.getTuitionsByStudent(studentLogged.student.accountNumber, period.value.id);
    tuitions.value = response.registrations;
    if (tuitions.value) {

        waitingTuitions.value = tuitions.value.filter((tuition) => tuition.waitingList == "true");
    }
}


</script>

<style scoped>
td,
th {
    text-align: left;
}

.headline {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
