<template>
    <v-container>
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
                        <td>{{ section.classCode }}</td>
                        <td>{{ section.className }}</td>
                        <td>{{ section.section }}</td>
                        <td>{{ section.initialHour }}</td>
                        <td>{{ section.finalHour }}</td>
                        <td>{{ section.teacher }}</td>
                        <td>{{ section.uv }}</td>
                        <td>{{ section.days }}</td>
                        <td>{{ section.building }}</td>
                        <td>{{ section.classroom }}</td>
                        <td>{{ section.seats }}</td>
                        <td><v-btn @click="openModifyModal" style="font-size: .8rem;">
                                {{ section.modify }}
                            </v-btn></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>

    <v-dialog v-model="showCreateModal" persistent width="1440">
        <v-card class="pa-4">
            <v-card-title class="text-h5 pa-0 pb-4">
                Crear una sección
            </v-card-title>


            <v-form ref="form" v-model="isCreateValid">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-autocomplete v-model="selectedClass" :items="formattedClassOptions" label="Elija una asignatura"
                            return-object :rules="[rules.required]">
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-autocomplete v-model="initialHour" :items="generateHourOptions()" label="Hora Inicial"
                            :rules="initialHourRules"></v-autocomplete>
                        <v-messages :value="initialHourError" v-if="initialHourError" class="error--text">
                            {{ initialHourError }}
                        </v-messages>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field v-model="finalHour" label="Hora Final" :readonly="true"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-autocomplete v-model="selectedTeacher" :items="formattedTeacherOptions" label="Elija un docente"
                            return-object :rules="[rules.required]"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field v-model="units" type="number" label="Unidades Valorativas" :rules="[rules.required]"
                            min="1" max="10"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select v-model="selectedDays" :items="generateDayOptions(units)" label="Días"
                            :disabled="!units || !initialHour" multiple></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select v-model="selectedBuilding" :items="formattedBuildingOptions" label="Elija un edificio"
                            item-text="name" item-value="id" return-object :rules="[rules.required]"></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select v-model="selectedClassroom" :items="classRooms" label="Elija un aula"
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
                    Guardar
                </v-btn>
            </v-card-actions>



        </v-card>
    </v-dialog>

    <v-dialog v-model="showModifyModal" persistent width="1440">
        <v-card class="pa-4">
            <v-card-title class="text-h5 pa-0 pb-4">
                Modificar una sección
            </v-card-title>
            <v-form ref="modifyForm">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-autocomplete v-model="modifyTeacher" :items="formattedTeacherOptions" label="Elija un docente"
                            return-object ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="modifySeats" type="number" label="Cupos"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>

            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="modifySection">
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { defineProps, ref, computed, onMounted, watch } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

const sections = store.sections;
const isCreateValid = ref(false);
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
const selectedClassroom = ref("");
const seats = ref("");
//Modificar
const modifyTeacher = ref(""); 
const modifySeats = ref(0); 
const seatsIncrement = 1; 


// Variables para almacenar los mensajes de error para las horas inicial y final
const initialHourError = ref("");
const finalHourError = ref("");


const teachers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
];

const classNames = [
    { code: "IS201", className: "Contabilidad I" },
    { code: "IS203", className: "Sistemas Expertos" },
];

const dayOptionsPerUnits = {
    1: ["Lu", "Ma", "Mi", "Ju", "Vi"],
    2: ["LuMa", "MaMi", "MiJu", "JuVi"],
    3: ["LuMaMi", "MaMiJu"],
    4: ["LuMaMiJu", "MaMiJuVi"],
    5: ["LuMaMiJuVi"],
};

// Variables para almacenar la lista de edificios y aulas
const buildings = [
    { id: 1, name: "B2", classrooms: ["101", "102", "103"] },
    { id: 2, name: "B2", classrooms: ["201", "202", "203"] },
];

const classRooms = ref([]);

watch(units, () => {
    // Reiniciar el valor de selectedDays cuando cambian unidades valorativas
    selectedDays.value = [];
});


watch([units, selectedDays, initialHour], () => {
    // Actualizar la hora final según las unidades y días seleccionados
    if (units.value && selectedDays.value.length && initialHour.value) {
        const hoursPerDay = selectedDays.value.length;
        const totalHours = Number(units.value);
        const initialTime = Number(initialHour.value.substring(0, 2)) * 60 + Number(initialHour.value.substring(2));
        const endTime = initialTime + totalHours * 60 / hoursPerDay;
        const endHour = String(Math.floor(endTime / 60)).padStart(2, '0');
        const endMinute = String(endTime % 60).padStart(2, '0');

        finalHour.value = endHour + endMinute;
    } else {
        finalHour.value = "";
    }
});

// Función para obtener la lista de aulas según el edificio seleccionado
function getClassroomsByBuilding(buildingName) {
    const building = buildings.find((b) => b.name === buildingName);
    return building ? building.classrooms : [];
}

// Watcher para actualizar la lista de aulas cuando se selecciona un edificio
watch(selectedBuilding, () => {
    if (selectedBuilding.value) {
        classRooms.value = getClassroomsByBuilding(selectedBuilding.value);
        selectedClassroom.value = "";
    }
});


const formattedClassOptions = classNames.map((item) => `${item.code} - ${item.className}`);
const formattedTeacherOptions = teachers.map((teacher) => teacher.name);
const formattedBuildingOptions = buildings.map((building) => building.name);

function generateDayOptions(units) {
    return dayOptionsPerUnits[units] || [];
}

function openModifyModal(section) {
    showModifyModal.value = true;
    modifyTeacher.value = section.teacher;
    modifySeats.value = section.seats; 
}

function modifySection() {
    if (!isModifyValid.value) return;

    selectedSection.value.teacher = modifyTeacher.value;
    selectedSection.value.seats = modifySeats.value;

    showModifyModal.value = false;
    clearModifyForm();
}

function clearModifyForm() {
    $refs.modifyForm.reset();
}

function closeModal() {
    showModifyModal.value = false;
    showCreateModal.value = false;
    clear();
}

function createSection(modalCreate) {
    showCreateModal.value = modalCreate;
}

function submitSection() {
    if (!isCreateValid.value) return

    [code.value, className.value] = selectedClass.value.split(" - ");


    store.setSection({
        id:(Math.floor(Math.random() * (100 - 1 + 1)) + 1),
        classCode: code.value,
        className: className.value,
        section: initialHour.value,
        initialHour: initialHour.value,
        finalHour: finalHour.value,
        teacher: selectedTeacher.value,
        uv: units.value,
        days: selectedDays.value[0],
        building: selectedBuilding.value,
        classroom: selectedClassroom.value,
        seats: seats.value,
        modify: "Modificar"
    });

    showCreateModal.value = false;
    clear();
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

// HORAS

// Función para generar las opciones de horas en formato "0600" a "2000"
const generateHourOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 20; hour++) {
        const formattedHour = hour.toString().padStart(2, '0') + '00';
        options.push(formattedHour);
    }
    return options;
};




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


</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    font-size: .8rem;
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