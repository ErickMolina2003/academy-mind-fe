<template>
    <v-container v-if="currentPeriod">
        <SearchableNavBar title="Notas Ingresadas" label="No.Empleado" />

        <div>
            <h2 style="padding-bottom: 15px">Lista de Docentes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Número de empleado</th>
                        <th>Ver notas ingresadas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in displayedTeachers">
                        <td>{{ teacher.user.firstName }} {{ teacher.user.firstLastName }}</td>
                        <td>{{ teacher.employeeNumber }}</td>
                        <td><v-icon @click="toggleModal( teacher )">{{'mdi-eye-outline'}}</v-icon></td>
                    </tr>
                </tbody>
            </table>
            <v-pagination v-model="currentTeachersPage" :total-visible="5" :length="totalTeachersPages" @input="updateDisplayedTeachers" />
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
                            <th>Nombre</th>
                            <th>Número de cuenta</th>
                            <th>Nota</th>
                            <th>Observación</th>
                            <th>Sección</th>
                            <th>Asignatura</th>
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
                            <td>{{ noteStudent.section.codeSection }}</td>
                            <td>{{ noteStudent.section.idClass.name }}</td>
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
import { useAppStore } from "@/store/app";

const store = useAppStore();
const tuitionService = new TuitionService();
const teacherService = new TeacherService();
const servicePeriod = new PeriodService();
const showModal = ref(false);
const titleModal = ref("");
const periods = ref([]);
const currentPeriod = ref({});
const notesToDisplay = ref([]);
const originalTeachers = ref([]);
const teachers = ref([]);
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
        getTeachers();
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en ingreso de notas.",
            color: "error",
        });
    }

}


function toggleModal(teacher) {
    getGradesByTeacher(teacher.employeeNumber);
    titleModal.value =`Notas ingresadas ${teacher.user.firstName} ${teacher.user.firstLastName}`;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}


async function getTeachers() {
    const response = await tuitionService.getTeachersGrades(careerBoss.career.id);
    
    teachers.value = response.teachers;
    originalTeachers.value = teachers.value;
}

async function getGradesByTeacher(idTeacher) {
    const response = await tuitionService.getGradesByTeacher(idTeacher,careerBoss.career.id);
    notesToDisplay.value = response.notes;
    
}


// paginacion

const filteredNotes = computed(() => notesToDisplay.value);
const filteredTeachers = computed(() => teachers.value);
const itemsPerPage = 7;
const currentNotesPage = ref(1);
const currentTeachersPage = ref(1);
const displayedNotes = ref([]);
const displayedTeachers = ref([]);

const totalNotesPages = computed(() => Math.ceil(filteredNotes.value.length / itemsPerPage));
const totalTeachersPages = computed(() => Math.ceil(filteredTeachers.value.length / itemsPerPage));
const updateDisplayedNotes = () => {
    const startIndex = (currentNotesPage.value - 1) * itemsPerPage;
    displayedNotes.value = filteredNotes.value.slice(startIndex, startIndex + itemsPerPage);
};
const updateDisplayedTeachers = () => {
    const startIndex = (currentTeachersPage.value - 1) * itemsPerPage;
    displayedTeachers.value = filteredTeachers.value.slice(startIndex, startIndex + itemsPerPage);
};


watch(currentNotesPage, updateDisplayedNotes);
watch(currentTeachersPage, updateDisplayedTeachers);
watch(filteredNotes, updateDisplayedNotes);
watch(filteredTeachers, updateDisplayedTeachers);

const filterTeachers = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery === "") {
        teachers.value = [...originalTeachers.value];
    } else {
        teachers.value = originalTeachers.value.filter((teacher) =>
            teacher.employeeNumber.toLowerCase().includes(lowerCaseQuery)
        );
    }
};


document.addEventListener("filter", (event) => {
    filterTeachers(event.detail);
});

document.addEventListener("resetFilter", () => {
    teachers.value = [...originalTeachers.value];
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