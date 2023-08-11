<template>
    <div v-if="state">
        <SearchableNavBar :title="myTitle" :label="myLabel" />
        <div style="max-height: 350px; overflow-y: scroll;">


            <table class="table-scroll">
                <thead>
                    <tr>
                        <th class="text-center">Cód.</th>
                        <th class="text-center">Asignatura</th>
                        <th class="text-center">Sección</th>
                        <th class="text-center">Seleccione</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredSections" :key="item.idClass.code">
                        <td>{{ item.idClass.code }}</td>
                        <td>{{ item.idClass.name }}</td>
                        <td>{{ item.codeSection }}</td>
                        <td>
                            <v-icon @click="openModal(item)">{{ 'mdi-pencil' }}</v-icon>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <v-dialog v-model="modalOpen" max-width="500">
            <v-card>
                <v-card-title>Detalles Asignatura</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col class="pa-0 pb-1" cols="4">
                            <strong>Código:</strong> {{ selectedSection.idClass.code }}
                        </v-col>
                        <v-col class="pa-0 pb-1">
                            <strong>Asignatura:</strong> {{ selectedSection.idClass.name }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pa-0 pb-1" cols="4">
                            <strong>Sección:</strong> {{ selectedSection.codeSection }}
                        </v-col>
                        <v-col class="pa-0 pb-1">
                            <strong>En espera:</strong>{{ studentsWaiting.length }}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions style="display: flex; justify-content: flex-end;">
                    <v-text-field v-model="slotsToOpen" label="Cupos a abrir" type="number" min="0"
                        :max="15"></v-text-field>
                    <v-btn style="display: flex; justify-content: flex-end;" @click="openSlots">Aperturar cupos</v-btn>
                </v-card-actions>
                <v-card>
                    <v-card-title class="text-center text-white"
                        style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                        <span class="headline ">Estudiantes en espera</span>
                    </v-card-title>
                    <v-card-text class="table-scroll">
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-left text-black">Nombre</th>
                                    <th class="text-left text-black">Número de Cuenta</th>
                                    <th class="text-left text-black">Indice Global</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="student in studentsWaiting" :key="student.student.accountNumber">
                                    <td class=" text-left">{{ student.student.user.firstName }} {{
                                        student.student.user.firstLastName }}</td>
                                    <td class=" text-left">{{ student.student.accountNumber }}</td>
                                    <td class=" text-left">{{ student.student.periodIndex }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeModal">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import { useAppStore } from "@/store/app";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";


const currentPeriod = ref({});

const store = useAppStore();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const serviceTuition = new TuitionService();
const careerBoss = store.user.teacher.teachingCareer[0].centerCareer;
const myTitle = "Listas de espera";
const myLabel = "Asignatura";
const studentsWaiting = ref([]);
const waitingList = ref([]);
const modalOpen = ref(false);
const selectedSection = ref(null);
const slotsToOpen = ref(0);
const searchQuery = ref("");
const state = ref(false);
onMounted(() => {

    getPeriods();
    document.addEventListener("filter", (event) => {
        searchQuery.value = event.detail;
    });

    document.addEventListener("resetFilter", () => {
        searchQuery.value = "";
    });
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodRegistrationPlanification();
    currentPeriod.value = response.periods[0];
    state.value = currentPeriod.value.idStatePeriod?.name === 'Matricula' || currentPeriod.value.idStatePeriod?.name === 'Planificacion'

    if (state.value) {
        getWaitingList();
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en estado de planificación académica o en matricula.",
            color: "error",
        });
    }

}

async function getWaitingList() {
    const response = await sectionService.getWaitingList(careerBoss.career.id);
    waitingList.value = response.waitingListSections;
}

async function getWaitingStudents(section) {
    const response = await serviceTuition.getStudentsInWaitingList(section);
    studentsWaiting.value = response.registration;
}

const openModal = (item) => {
    selectedSection.value = item;
    slotsToOpen.value = 0;
    getWaitingStudents(item.id);
    modalOpen.value = true;
};

const closeModal = () => {
    modalOpen.value = false;
};

async function openSlots() {
    if (selectedSection.value && slotsToOpen.value > 0) {
        
        let spaceNow = parseInt(selectedSection.value.space) + parseInt(slotsToOpen.value)
        await sectionService.updateSections(selectedSection.value.id,
            {
                space: String(spaceNow)
            });
        store.setToaster({
            isActive: true,
            text: "Estudiantes en espera han sido matriculados en la sección.",
            color: "success",
        });
        getWaitingStudents(selectedSection.value.id);
    }
    slotsToOpen.value = 0;

};

const filteredSections = computed(() => {
    const searchQueryValue = searchQuery.value.toLowerCase().trim();
    if (!searchQueryValue) {
        return waitingList.value;
    } else {
        return waitingList.value.filter((item) =>
            item.idClass.name.toLowerCase().includes(searchQueryValue)
        );
    }
});
</script>

<style>
.table-scroll {
    max-height: 400px;
    overflow-y: auto;
}

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
