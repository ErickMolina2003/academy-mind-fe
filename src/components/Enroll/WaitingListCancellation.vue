<template>
    <v-main v-if="state && validateDate.statusCode === 200" style="padding-left: 0%">
        <v-container fluid style="height:500px; overflow-y:scroll;">
            <h1 style="color: #CC6600;">Cancelación de Asignaturas En Listas de Espera</h1>
            <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
            <div class="mb-5">
                <v-row>
                    <v-col cols="auto">
                        <v-icon class="icon-attention">mdi-alert</v-icon>
                    </v-col>
                    <v-col cols="auto">
                        <span class="text-attention">Para cancelar una asignatura debes seleccionarla primero y luego dar
                            clic
                            en el botón cancelar.</span>
                    </v-col>
                </v-row>
            </div>
            <v-card>
                <v-card-title class="text-center text-white"
                    style="background-color: rgb(var(--v-theme-secondary-lighthen-1))">
                    <span>Asignaturas en Lista de Espera</span>
                </v-card-title>
                <v-card-text class="mt-1" style="padding: 0">
                    <v-table>
                        <thead style="background-color: rgb(var(--v-theme-secondary-lighthen-1))">
                            <tr>
                                <th class="text-black pa-0 px-2">Seleccione</th>
                                <th class="text-black pa-0 px-2">Cód.</th>
                                <th class="text-black pa-0 px-2">Asignatura</th>
                                <th class="text-black pa-0 px-2">Sección</th>
                                <th class="text-black pa-0 px-2">HI</th>
                                <th class="text-black pa-0 px-2">HF</th>
                                <th class="text-black pa-0 px-2">Dias</th>
                                <th class="text-black pa-0 px-2">Edificio</th>
                                <th class="text-black pa-0 px-2">Aula</th>
                                <th class="text-black pa-0 px-2">UV</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="waitingTuitions" v-for="item in waitingTuitions" :key="item.id"
                                :class="{ 'selected-row': item.selected }">
                                <td class="pa-0 px-2">
                                    <a href="#" @click="selectClass(item)">Select</a>
                                </td>
                                <td class="pa-0 px-2">{{ item.section.idClass.code }}</td>
                                <td class="pa-0 px-2">{{ item.section.idClass.name }}</td>
                                <td class="pa-0 px-2">{{ item.section.codeSection }}</td>
                                <td class="pa-0 px-2">{{ item.section.hour }}</td>
                                <td class="pa-0 px-2">{{ item.section.finalHour }}</td>
                                <td class="pa-0 px-2">{{ item.section.days }}</td>
                                <td class="pa-0 px-2">{{ item.section.idClassroom.idBuilding.name }}</td>
                                <td class="pa-0 px-2">{{ item.section.idClassroom.code }}</td>
                                <td class="pa-0 px-2">{{ item.section.idClass.valueUnits }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
            <v-card class="mt-5 mx-2" max-width="300" variant="outlined" color="secondary-lighthen-1">
                <div class="my-4 mx-5">
                    <h3 class="text-black">Menú opciones:</h3>
                    <v-card style="width: 100%" class="mt-3">
                        <v-card-actions>
                            <v-btn @click="openDialog">Cancelar Asignatura</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-card>
        </v-container>
    </v-main>
    <v-dialog v-model="dialogConfirmation" width="300px">
        <v-card>
            <v-card-text>
                <strong>¿Está seguro que desea cancelar esta sección en espera?</strong>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn color="blue" @click="cancelClass">Confirmar</v-btn>
                <v-btn color="red" @click="dialogConfirmation = false;">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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

    if (period.value && period.value.idStatePeriod) {
        state.value = period.value.idStatePeriod?.name === 'Matricula';
        if (state.value) {
            validateDate.value = await tuitionService.validateRegistrationDate(studentLogged.student.accountNumber);

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

function openDialog() {
    if (selectedTuition.value) {
        dialogConfirmation.value = true;
    }

}


const selectClass = (item) => {
    waitingTuitions.value.forEach((tuition) => {
        tuition.selected = false;
    });
    item.selected = true;
    selectedTuition.value = item;

};

async function cancelClass() {
    if (selectedTuition.value) {

        const response = await tuitionService.deleteTuition(selectedTuition.value.id);
        store.addUnits(selectedTuition.value.section.idClass.valueUnits);
        getTuitionsByStudent();
    }
    store.setToaster({
        isActive: true,
        text: "Sección en espera cancelada con éxito.",
        color: "success",
    });
    dialogConfirmation.value = false;
};
</script>

<style>
.icon-attention {
    font-size: 24px;
    color: red;
    margin-right: 8px;
}


td,
th {
    text-align: left;
}

.selected-row {
    background-color: rgb(250, 250, 186);
}
</style>
