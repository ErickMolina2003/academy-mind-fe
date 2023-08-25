<template>
    <v-container v-if="currentPeriod">
        <SearchableNavBar title="Notas Ingresadas" label="No.Empleado" />

        <div>
            <h2 style="padding-bottom: 15px">Lista de Secciones {{ currentPeriod.numberPeriod }} PAC {{ currentPeriod.year }}</h2>
            <table>
                <thead>
                    <tr>
                        <th class="text-left pa-0 px-4">Cód.</th>
                        <th class="text-left pa-0 px-4">Asignatura</th>
                        <th class="text-left pa-0 px-4">Sección</th>
                        <th class="text-left pa-0 px-4">Núm. Empleado</th>
                        <th class="text-left pa-0 px-4">Docente</th>
                        <th class="text-left pa-0 px-4">Notas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in displayedSections">
                        <td class="text-left pa-0 px-4">{{ section.idClass.code }}</td>
                        <td class="text-left pa-0 px-4">{{ section.idClass.name }}</td>
                        <td class="text-left pa-0 px-4">{{ section.codeSection }}</td>
                        <td class="text-left pa-0 px-4">{{ section.idTeacher.employeeNumber }}</td>
                        <td class="text-left pa-0 px-4">{{ section.idTeacher.user.firstName }} {{ section.idTeacher.user.firstLastName }}</td>
                        <td class="pa-0 px-2"><v-icon @click="toggleModal( section )">{{'mdi-eye-outline'}}</v-icon></td>
                    </tr>
                </tbody>
            </table>
            <v-pagination v-model="currentSectionsPage" :total-visible="5" :length="totalSectionsPages" @input="updateDisplayedSections" />
        </div>
        
    </v-container>


    <v-dialog v-model="showModal" persistent width="1000">
        <v-card class="pt-6">

            <v-card-text>
                <v-card-title class="text-h5 pa-0 pb-4">
                    {{ titleModal }}
                </v-card-title>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Número de cuenta</th>
                            <th>Nota</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="noteStudent in displayedNotes">
                            <td>{{ noteStudent.student.user.firstName }} {{ noteStudent.student.user.firstLastName }}</td>
                            <td>{{ noteStudent.student.accountNumber }}</td>
                            <td v-if="!noteStudent.note">N/D</td>
                            <td v-else>{{ noteStudent.note }}</td>
                            <td v-if="noteStudent.stateClass=='En progreso'">N/D</td>
                            <td v-else>{{ noteStudent.stateClass }}</td>
                        </tr>
                    </tbody>
                </table>
                <v-pagination v-model="currentNotesPage" :total-visible="5" :length="totalNotesPages" @input="updateDisplayedNotes" />
                
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
import { ref, onMounted,computed, watch } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";
import TeacherService from "@/services/teacher/teacher.service";
import SectionService from "@/services/section/section.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const tuitionService = new TuitionService();
const sectionService = new SectionService();
const teacherService = new TeacherService();
const servicePeriod = new PeriodService();
const showModal = ref(false);
const titleModal = ref("");
const periods = ref([]);
const currentPeriod = ref({});
const notesToDisplay = ref([]);
const teachers = ref([]);
const sections = ref([]);
const originalSections = ref([]);
const careerBoss = store.user.teacher.teachingCareer[0].centerCareer;
const grades = ref();
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


function toggleModal(section) {
    getStudentsOfSection(section.id);
    titleModal.value =`${section.idClass.name} - ${section.codeSection}`;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}



async function getSections() {
    const response = await sectionService.getSectionsPeriodOnGrades(careerBoss.career.id,careerBoss.regionalCenter.id);
    sections.value = response.sections;
    originalSections.value = sections.value;
}

async function getStudentsOfSection(idSection) {
    const response = await tuitionService.getStudentsOfSection(idSection);
    notesToDisplay.value = response.registration;    
}

// paginacion

const filteredNotes = computed(() => notesToDisplay.value);
const filteredSections = computed(() => sections.value);
const itemsPerPage = 7;
const currentNotesPage = ref(1);
const currentSectionsPage = ref(1);
const displayedNotes = ref([]);
const displayedSections = ref([]);

const totalNotesPages = computed(() => Math.ceil(filteredNotes.value.length / itemsPerPage));
const totalSectionsPages = computed(() => Math.ceil(filteredSections.value.length / itemsPerPage));
const updateDisplayedNotes = () => {
    const startIndex = (currentNotesPage.value - 1) * itemsPerPage;
    displayedNotes.value = filteredNotes.value.slice(startIndex, startIndex + itemsPerPage);
};
const updateDisplayedSections = () => {
    const startIndex = (currentSectionsPage.value - 1) * itemsPerPage;
    displayedSections.value = filteredSections.value.slice(startIndex, startIndex + itemsPerPage);
};


watch(currentNotesPage, updateDisplayedNotes);
watch(currentSectionsPage, updateDisplayedSections);
watch(filteredNotes, updateDisplayedNotes);
watch(filteredSections, updateDisplayedSections);

const filterSections = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery === "") {
        sections.value = [...originalSections.value];
    } else {
        sections.value = originalSections.value.filter((section) =>
            section.idTeacher.employeeNumber.toLowerCase().includes(lowerCaseQuery)
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