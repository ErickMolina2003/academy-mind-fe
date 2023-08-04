<template>
    <v-main style="padding-left: 0%;">
        <h1 style="color: #CC6600;">Cancelación de Asignaturas</h1>
        <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
        <div class="mb-5">
            <v-row>
                <v-col cols="auto">
                    <v-icon class="icon-attention">mdi-alert</v-icon>
                </v-col>
                <v-col cols="auto">
                    <span class="text-attention">Para cancelar una asignatura debes seleccionarla primero y luego dar clic
                        en el botón cancelar.</span>
                </v-col>
            </v-row>
        </div>
        <v-card>
            <v-card-title class="text-center text-white"
                style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <span>Datos del estudiante</span>
            </v-card-title>
            <v-card-text class="mt-1" style="padding: 0;">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left text-white">Seleccione</th>
                            <th class="text-left text-white">cod.</th>
                            <th class="text-left text-white">Asignatura</th>
                            <th class="text-left text-white">Sección</th>
                            <th class="text-left text-white">HI</th>
                            <th class="text-left text-white">HF</th>
                            <th class="text-left text-white">Dias</th>
                            <th class="text-left text-white">Edificio</th>
                            <th class="text-left text-white">Aula</th>
                            <th class="text-left text-white">UV</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="normalTuitions" v-for="item in normalTuitions" :key="item.id"
                            :class="{ 'selected-row': item.selected }">
                            <td>
                                <a href="#" @click="selectClass(item)">Select</a>
                            </td>
                            <td>{{ item.section.idClass.code }}</td>
                            <td>{{ item.section.idClass.name }}</td>
                            <td>{{ item.section.codeSection }}</td>
                            <td>{{ item.section.hour }}</td>
                            <td>{{ item.section.finalHour }}</td>
                            <td>{{ item.section.days }}</td>
                            <td>{{ item.section.idClassroom.idBuilding.name }}</td>
                            <td>{{ item.section.idClassroom.code }}</td>
                            <td>{{ item.section.idClass.valueUnits }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
        <v-card class="mt-5 mx-2" max-width="300" variant="outlined" color="secondary-lighthen-1">
            <div class="my-4 mx-5">
                <h3 class="text-black">Menú opciones:</h3>
                <v-card style="width: 100%;" class="mt-3">
                    <v-card-actions>
                        <v-btn @click="openDialog">Cancelar Asignatura</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-card>
    </v-main>


    <v-dialog v-model="dialogConfirmation" width="300px">
      <v-card>
        <v-card-text>
            <strong>¿Está seguro que desea cancelar esta sección?</strong>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="blue" @click="cancelClass">Confirmar</v-btn>
          <v-btn color="red" @click="dialogConfirmation = false">Cancelar</v-btn>
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
const normalTuitions = ref([]);
const period = ref("");
const dialogConfirmation = ref(false);
const selectedTuition = ref();
const studentLogged = store.user;


// const student = ref([
// {
//     cod: 'COD001',
//     class: 'Asignatura 1',
//     section: 'Sección 1',
//     hi: 'HI1',
//     hf: 'HF1',
//     days: 'Lun-Mar',
//     building: 'Edificio 1',
//     classRoom: 'Aula 101',
//     uv: 3,
//     selected: false,
// },
// {
//     cod: 'COD001',
//     class: 'Asignatura 2',
//     section: 'Sección 2',
//     hi: 'HI1',
//     hf: 'HF1',
//     days: 'Lun-Mar',
//     building: 'Edificio 1',
//     classRoom: 'Aula 101',
//     uv: 3,
//     selected: false,
// },

// ]);

onMounted(async() => {
    const response = await getRecentPeriod();
    period.value = response.numberPeriod;

    getTuitionsByStudent();
})

async function getTuitionsByStudent() {
    const response = await tuitionService.getTuitionsByStudent(studentLogged.student.accountNumber, period.value);
    tuitions.value = response.registrations;

    normalTuitions.value = tuitions.value.filter((tuition) => tuition.waitingList == "false");
}

function openDialog(){
    if (selectedTuition.value) {
        dialogConfirmation.value = true;
    }
    
}


async function getRecentPeriod() {
    let mostRecentPeriod = null;

    const response = await servicePeriod.getPeriods();

    const periods = response.periods;


    // Filtrar el periodo más reciente basado en el año y número de periodo
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

const selectClass = (item) => {
    

    normalTuitions.value.forEach((tuition) => {
        tuition.selected = false;
    });
    item.selected = true;
    selectedTuition.value = item;
    
};

async function cancelClass () {
    if(selectedTuition.value){
        
        const response = await tuitionService.deleteTuition(selectedTuition.value.id);
        store.addUnits(selectedTuition.value.section.idClass.valueUnits);
        getTuitionsByStudent();
    }
    dialogConfirmation.value = false;
};
</script>
  
<style>
.icon-attention {
    font-size: 24px;
    color: red;
    margin-right: 8px;
}

.selected-row {
    background-color: lightyellow;
}
</style>
  