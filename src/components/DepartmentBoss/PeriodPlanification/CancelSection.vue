<template>
    <div v-if="periodToModify">
        <SearchableNavBar title="Cancelar secciones" label="Asignatura" btnTitle="Cancelar sección"
            @createSection="cancelSection" />
        <h2 style="padding-bottom: 15px">Lista de Secciones</h2>
        <div style="max-height: 350px; overflow-y: scroll;">

            <table>
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Asignatura</th>
                        <th>Sección</th>
                        <th>HI</th>
                        <th>HF</th>
                        <th>Docente</th>
                        <th>UV</th>
                        <th>Días</th>
                        <th>Edificio</th>
                        <th>Aula</th>
                        <th>Cupos</th>
                        <th>Cupos en espera</th>
                        <th>En espera</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in filteredSections" :class="{ 'selected-oneClass': isSelected(section) }"
                        @click="toggleSelection(section)">
                        <td>{{ section.idClass.code }}</td>
                        <td>{{ section.idClass.name }}</td>
                        <td>{{ section.codeSection }}</td>
                        <td>{{ section.hour }}</td>
                        <td>{{ section.finalHour }}</td>
                        <td>{{ getTeacherSection(section.idTeacher.employeeNumber) }}</td>
                        <td>{{ section.idClass.valueUnits }}</td>
                        <td>{{ section.days }}</td>
                        <td>{{ section.idClassroom.idBuilding.name }}</td>
                        <td>{{ section.idClassroom.code }}</td>
                        <td>{{ section.space }}</td>
                        <td>{{ section.waitingSpace }}</td>
                        <td>
                            <input type="checkbox" v-if="section.waitingList == 'true'" checked disabled>
                            <input type="checkbox" v-else disabled>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <v-dialog v-model="showCancelModal" persistent max-width="500">
        <v-card class="pa-6">
            <v-card-title class="text-h5 pa-0 mb-2">
                Cancelar una sección
            </v-card-title>
            <h3 class="mb-3">
                {{ selectedSections[0]?.codeSection }} -
                {{ selectedSections[0]?.idClass.name }}
            </h3>


            <v-form ref="form" v-model="isValid">
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="solo" label="Justificación" v-model="justification"
                            :rules="[rules.required]"></v-textarea>
                    </v-col>
                </v-row>
            </v-form>
            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
                <v-btn :disabled="!isValid" color="blue-darken-1" variant="text" @click="openDialog">
                    Ingresar justificación
                </v-btn>
            </v-card-actions>



        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" width="300px">
        <v-card>
            <v-card-text>
                <strong>¿Está seguro que desea cancelar esta sección?</strong>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn color="blue" @click="confirmCancelSection">Confirmar</v-btn>
                <v-btn color="red" @click="closeModal">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed,ref, onMounted } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import { useAppStore } from "@/store/app";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import TeacherService from "@/services/teacher/teacher.service";
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const teacherService = new TeacherService();
const store = useAppStore();
const showCancelModal = ref(false);
const dialogConfirmation = ref(false);
const sections = ref([]);
const careerBoss = store.user.teacher.teachingCareer[0].centerCareer;
const selectedSections = ref([]);
const isValid = ref(false);
const justification = ref("");
const searchQuery = ref("");
const periods = ref([]);
const periodToModify = ref({});
const teachers = ref([]);
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
    periods.value = response.periods;
    periodToModify.value = periods.value[0];


    if (periodToModify.value) {
        getTeachersOptions()
        getSections();

    } else {
        store.setToaster({
            isActive: true,
            text: "El perido actual no está en estado de planificación académica o en matricula.",
            color: "error",
        });
    }

}

async function getTeachersOptions() {
    const response = await teacherService.getTeacherByCareerAndCenter(
        careerBoss.career.id,
        careerBoss.regionalCenter.id
    )
    teachers.value = response.teachers;
}

function getTeacherSection(idTeacher) {
    if (idTeacher) {
        let teacher = teachers.value.find(teacher => teacher.teacher.employeeNumber === idTeacher);
        return teacher.teacher.user.firstName + " " + teacher.teacher.user.firstLastName;
    }
    return;
}

function openDialog() {
    
    if (justification.value) {
        dialogConfirmation.value = true;
    }

}

async function confirmCancelSection() {
    if (selectedSections.value[0]) {

        const response = await sectionService.deleteSections(selectedSections.value[0].id);
        getSections();
    }

    closeModal();
};


async function getSections() {
    const response = await sectionService.getSectionsByDepartment(careerBoss.career.id);
    sections.value = response.sections;
}

function isSelected(item) {
    for (const key in selectedSections.value) {
        if (selectedSections.value[key].id === item.id) {
            return true;
        }
    }
    return false;
}

function toggleSelection(item) {
    let index = -1;

    selectedSections.value = [];

    for (let i = 0; i < selectedSections.value.length; i++) {
        if (selectedSections.value[i].id === item.id) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        selectedSections.value.push(item);
    } else {
        selectedSections.value.splice(index, 1);
    }
}

function checkTable() {
    if (selectedSections.value.length === 0) {
        isValid.value = false;
        return isValid.value;
    } else {
        isValid.value = true;
        return isValid.value;
    }
}

function cancelSection(cancel) {
    if (selectedSections.value.length === 0) {
        store.setToaster({
            isActive: true,
            text: "Debe seleccionar una sección para cancelar.",
            color: "error",
        });
        return;
    }
    showCancelModal.value = true;


}

function submitJustification() {
    if (!isValid.value) return;
    closeModal();
}

function closeModal() {
    dialogConfirmation.value = false;
    showCancelModal.value = false;
    clear();
}

function clear() {
    justification.value = "";
}

const filteredSections = computed(() => {
    const searchQueryValue = searchQuery.value.toLowerCase().trim();
    if (!searchQueryValue) {
        return sections.value;
    } else {
        return sections.value.filter((item) =>
            item.idClass.name.toLowerCase().includes(searchQueryValue)
        );
    }
});


const rules = {
    required: (value) => !!value || "Campo obligatorio.",
};

</script>

<style scoped>
.selected-oneClass {
    background-color: lightblue;
    cursor: pointer;
}


table {
    width: 100%;
    border-collapse: collapse;
    font-size: .7rem;
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