<template>
    <CreateApplication v-if="tipo == 'realizar-solicitud'" :typeApplication="'cambio de carrera'" :array="carreras"
        :labelCreate="'Carrera a cambiarse'" :labelReason="'Razones para cambiar de carrera '"
        @update-selected-majors="handleSelectedMajorUpdate">
        <v-row class="d-flex pt-2">
            <v-col cols="6">
                <h3>Centro de Estudios:</h3>
                <p class="student-info">Ciudad Universitaria</p>
            </v-col>
            <v-col cols="6">
                <h3>Carrera actual:</h3>
                <p class="student-info">{{ currentMajor }}</p>
            </v-col>
        </v-row>
        <v-row class="d-flex">
            <v-col cols="6">
                <h3>Indice global:</h3>
                <p class="student-info">87</p>
            </v-col>
            <v-col cols="6">
                <h3>Indice admisión:</h3>
                <p class="student-info">1200</p>
            </v-col>
        </v-row>
    </CreateApplication>

    <DeleteMajorApplication v-else-if="tipo == 'borrar-solicitud'" :applicationToDelete="selectedMajor"
        :applications="ongoingApplication" :headers="headersMajors" @update-delete-majors="handleDeletedApplication" />
    <ViewApplications v-else title="cambios de carrera" :applications="ongoingApplication" :headers="headersMajors" />
</template>
<script setup>
import CreateApplication from "./CreateApplication.vue";
import DeleteMajorApplication from "./DeleteMajorApplication.vue";
import ViewApplications from "./ViewApplications.vue";
import { useRoute } from "vue-router";
import { ref, watch } from 'vue';


const route = useRoute();

const tipo = ref(route.params.tipo);
watch(() => route.params.tipo, (newValue) => {
    tipo.value = newValue;
});

const carreras = [
    'Derecho',
    'Periodismo',
    'Sociología',
    'Letras',
    'Pedagogía',
    'Psicología',
    'Ingenieria Civil',
    'Ingeniería Mecánica Industrial',
    'Ingeniería Eléctrica Industrial',
    'Ingeniería Industrial',
    'Ingeniería en Sistemas',
    'Química Industrial',
    'Matemáticas',
    'Medicina',
    'Odontología',
    'Enfermería'
];

const headersMajors = [
    'Carrera a cambiarse',
    'Dictamen',
    'Fecha',
]



const currentMajor = ref('Ingenieria en Sistemas');
const selectedMajor = ref('');
const ongoingApplication = ref([]);

watch(selectedMajor, (newValue) => {

    if (newValue !== "") {
        deleteApplication.value = false;
        ongoingApplication.value = [
            {
                "Carrera a cambiarse": newValue,
                "Dictamen": "vigente",
                "Fecha": '28/06/2023'
            }
        ];
    }
});



const deleteApplication = ref(false);
watch(deleteApplication, (newValue) => {
    if (newValue === true) {
        selectedMajor.value = "";
        ongoingApplication.value = [];
    }
});




function handleSelectedMajorUpdate(updatedSelectedMajor) {
    selectedMajor.value = updatedSelectedMajor;

}


function handleDeletedApplication(updatedDeletedApplication) {
    deleteApplication.value = updatedDeletedApplication;
}

</script>
