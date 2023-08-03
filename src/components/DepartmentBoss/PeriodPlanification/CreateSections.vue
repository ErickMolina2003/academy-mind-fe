<template>
    <v-container v-if="state==='Planificacion'" class="pa-1">
        <SearchableNavBar title="Crear secciones" label="Cód.Asignatura" btnTitle="Crear sección"
            @createSection="createSection" />

        <div>
            <h2 style="padding-bottom: 15px">Lista de Secciones</h2>
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
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in sections">
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
                        <td><v-btn @click="openModifyModal" style="font-size: .6rem;">Modificar</v-btn></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>

    <v-dialog v-model="showCreateModal" persistent width="1440">
        <v-card class="pa-6">
            <v-card-title class="text-h5 pa-0 pb-4">
                Crear una sección
            </v-card-title>


            <v-form ref="form" v-model="isCreateValid">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-autocomplete v-model="selectedClass"
                            :items="classNames.map((item) => `${item.code}  ${item.name}`)" label="Elija una asignatura"
                            return-object :rules="[rules.required]">
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field v-model="units" label="Unidades Valorativas" :readonly="true"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select v-model="selectedDays" :items="journey" label="Días" :disabled="!units"></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-autocomplete v-model="initialHour" :items="generateHourOptions()" label="Hora Inicial"
                            :rules="initialHourRules"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field v-model="finalHour" label="Hora Final" :readonly="true"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-autocomplete v-model="selectedTeacher"
                            :items="teachers.map((teacher) => `${teacher.user.firstName} ${teacher.user.firstLastName} ${teacher.employeeNumber}`)"
                            label="Elija un docente" return-object :rules="[rules.required]"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select v-model="selectedBuilding" :items="buildingsName" label="Elija un edificio"
                            item-text="name" item-value="id" return-object :rules="[rules.required]"></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select v-model="selectedClassroom" :items="classroomsNames" label="Elija un aula"
                            :disabled="!selectedBuilding" :rules="[rules.required]"></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field v-model="seats" type="number" label="Cupos" :rules="seatsRules"
                            min="15"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
                <v-btn :disabled="!isCreateValid" color="blue-darken-1" variant="text" @click="submitSection">
                    Crear sección
                </v-btn>
            </v-card-actions>



        </v-card>
    </v-dialog>

    <v-dialog v-model="showModifyModal" persistent max-width="700">
        <v-card class="pa-4">
            <v-card-title class="text-h5 pa-0 pb-4">
                Modificar una sección
            </v-card-title>
            <v-form ref="modifyForm" v-model="isModifyValid">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-autocomplete v-model="modifyTeacher"
                            :items="teachers.map((teacher) => `${teacher.user.firstName} ${teacher.user.firstLastName} ${teacher.employeeNumber}`)"
                            label="Cambiar un docente" return-object></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="modifySeats" type="number" label="Aumentar cupos"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>

            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
                <v-btn :disabled="!modifyTeacher && !modifySeats" color="blue-darken-1" variant="text"
                    @click="modifySection">
                    Modificar sección
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { defineProps, ref, computed, onMounted, watch } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import ClassService from "@/services/classes/classes.service";
import TeacherService from "@/services/teacher/teacher.service";
import BuildingService from "@/services/building/building.service";
import ClassroomService from "@/services/classroom/classroom.service";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import { useAppStore } from "@/store/app";


const store = useAppStore();
const serviceClasses = new ClassService();
const teacherService = new TeacherService();
const buildingService = new BuildingService();
const classroomService = new ClassroomService();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();

const sections = ref([]);
const isCreateValid = ref(false);
const isModifyValid = ref(false);
const showModifyModal = ref(false);
const showCreateModal = ref(false);
const displayClassNames = ref([]);
const code = ref("");
const className = ref("")
const selectedClass = ref("");
const initialHour = ref("");
const finalHour = ref("");
const selectedTeacher = ref("");
const units = ref("");
const selectedDays = ref([]);
const selectedBuilding = ref("");
const classRooms = ref([]);
const selectedClassroom = ref("");
const seats = ref("");
const assignedSection = ref("");
const teachers = ref([]);
const classNames = ref([]);
const careerBoss = store.user.teacher.teachingCareer[0].centerCareer;
const buildings = ref([]);
const buildingsName = ref([]);
const classroomsNames = ref([]);
const periodData = ref();
const state =ref('');
//Modificar
const modifyTeacher = ref("");
const modifySeats = ref(0);
const seatsIncrement = 1;

onMounted(async() => {

    periodData.value = await getRecentPeriod();
    state.value = periodData.value.idStatePeriod.name;
    
    if (state.value == 'Planificacion') {
        getSections();
        getClassesOptions(careerBoss.career.id);
        getTeachersOptions();
        getBuildingsOptions(careerBoss.regionalCenter.id);
    } else {
       
        store.setToaster({
            isActive: true,
            text: "El perido actual no está en estado de planificación académica.",
            color: "error",
        });
    }

});

const daysOptions = [
    "Vi", "Sa", "LuMa", "LuMi", "MaMi", "MaJu", "MiJu", "JuVi", "LuMaMi", "MaMiJu", "LuMaMiJu", "MaMiJuVi", "LuMaMiJuVi"
]

//Mostrar las opciones de dias de acuerdo a las unidades de la clase
const journey = computed(() => {
    return daysOptions.filter((dayOption) => dayOption.length === units.value * 2 || dayOption.length === 2)
});

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


async function getSections() {
    const response = await sectionService.getSections();
    sections.value = response.sections;
}

function getTeacherSection(idTeacher) {
    if (idTeacher) {
        let teacher = teachers.value.find(teacher => teacher.employeeNumber === idTeacher);
        return teacher.user.firstName + " " + teacher.user.firstLastName;
    }
    return;
}

async function getBuildingsOptions(centerId) {
    const response = await buildingService.getBuildingsByCenter(centerId);
    buildings.value = response.centerBuildings;
    buildingsName.value = buildings.value.map((building) => building.name);
}


async function getClassesOptions(id) {
    const response = await serviceClasses.getClassesByCareer(id);

    classNames.value = response.classes;
}
async function getTeachersOptions() {
    const response = await teacherService.getTeachers();
    teachers.value = response.teachers;
}

// Función para generar las opciones de horas en formato "0600" a "1900"
const generateHourOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 19; hour++) {
        const formattedHour = hour.toString().padStart(2, '0') + '00';
        options.push(formattedHour);
    }
    return options;
};

function clearModifyForm() {
    const modifyTeacher = "";
    const modifySeats = 0;
    const seatsIncrement = 1;
}

function closeModal() {
    showModifyModal.value = false;
    showCreateModal.value = false;
    clear();
}

function createSection(modalCreate) {
    showCreateModal.value = modalCreate;
}

function getTeacher(employeeNumber) {
    return teachers.value.find(teacher => teacher.employeeNumber = employeeNumber);
}

function clear() {
    selectedClass.value = "";
    initialHour.value = "";
    finalHour.value = "";
    selectedTeacher.value = "";
    units.value = "";
    selectedDays.value = "";
    selectedBuilding.value = "";
    selectedClassroom.value = "";
    seats.value = "";
}

function submitSection() {
    if (!isCreateValid.value) return;

    let teacher = selectedTeacher.value.split(" ");
    let classSelected = classNames.value.find(className => className.code = code.value);
    let classroom = classRooms.value.find((classroom) => classroom.code === selectedClassroom.value);


    sectionService.createSection(
        {
            "idPeriod": periodData.value.id,
            "idClass": parseInt(classSelected.id),
            "idTeacher": teacher[2],
            "space": seats.value,
            "days": selectedDays.value,
            "idClassroom": classroom.id,
            "hour": initialHour.value,
            "finalHour": finalHour.value
        }
    );

    getSections();
    showCreateModal.value = false;
    clear();
}

//Modal modificar
function openModifyModal(section) {
    showModifyModal.value = true;
    modifyTeacher.value = section.teacher;
    modifySeats.value = section.seats;
}

function modifySection() {
    if (!modifyTeacher.value && !modifySeats.value) {
        store.setToaster({
            isActive: true,
            text: "Debe realizar al menos un cambio para actualizar.",
            color: "error",
        });
    }

    showModifyModal.value = false;
    clearModifyForm();
}


//Al seleccionar una clase, se asignan las unidades valorativas
watch(selectedClass, async (newValue) => {
    if (newValue) {
        [code.value] = selectedClass.value.split(" ");
        // selectedClass.value = classNames.value.find(className => className.code = code.value);
        units.value = classNames.value.find(className => className.code = code.value).valueUnits;

        initialHour.value = "";
        finalHour.value = "";
        selectedDays.value = [];
    }


})

// Reiniciar el valor de selectedDays cuando cambian unidades valorativas
watch(units, () => {
    selectedDays.value = [];
    initialHour.value = "";
    finalHour.value = "";
});

// Watcher para actualizar la lista de aulas cuando se selecciona un edificio
watch(selectedBuilding, async (newValue) => {
    if (newValue) {
        const response = await classroomService.getClassroomByCenterAndBuilding(careerBoss.regionalCenter.id, newValue);
        classRooms.value = response.classRooms;

        classroomsNames.value = classRooms.value.map((classroom) => classroom.code);
        selectedClassroom.value = "";
    }

});

watch([units, selectedDays, initialHour], () => {
    if (units.value && selectedDays.value.length && initialHour.value) {
        const initialTime = Number(initialHour.value.substring(0, 2));
        let endHour;

        if (selectedDays.value.length === units.value * 2) {
            // Si la cantidad de días es el doble de las unidades, sumar 1 hora a la hora inicial
            endHour = initialTime + 1;
        } else {
            // Si no, sumar las unidades a la hora inicial
            endHour = initialTime + Number(units.value);
        }


        const formattedEndHour = String(endHour).padStart(2, "0") + "00";

        // Validar si la hora final se pasa de las 20:00
        if (endHour > 20) {
            store.setToaster({
                isActive: true,
                text: "La hora final no puede exceder las 20:00 (8:00 PM).",
                color: "error",
            });
            finalHour.value = "";
            initialHour.value = "";
        } else {
            finalHour.value = formattedEndHour;
        }
    } else {
        finalHour.value = "";
    }
});




const rules = {
    required: (value) => !!value || "Campo obligatorio.",
};

const seatsRules = [
    (value) => !!value || "Campo obligatorio.",
    (value) => !isNaN(value) && value >= 15 || "Debe ingresar un número mayor o igual a 15."
];

const initialHourRules = [
    (value) => !!value || "Debe seleccionar una hora inicial.",
    (value) => !finalHour.value || value < finalHour.value || "La hora inicial debe ser menor que la hora final."
];

const unitsRules = [
    (value) => !!value || "Debe ingresar las unidades valorativas.",
    (value) => !isNaN(value) && value >= 1 || "Debe ingresar un número mayor o igual a 1."
]

</script>

<style scoped>
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