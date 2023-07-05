<template>
    <CreateApplication v-if="tipo == 'realizar-solicitud'" :typeApplication="'cambio de centro'" :array="centros"
        :labelCreate="'Centro a cambiarse'" :labelReason="'Razones para cambiar de centro '"
        @update-selected-centers="handleSelectedCenterUpdate">
        <v-row class="d-flex pt-2">
            <v-col cols="6">
                <h3>Centro de estudios actual:</h3>
                <p class="student-info">{{ currentCenter }}</p>
            </v-col>
        </v-row>
    </CreateApplication>

    <ViewApplications v-else title="cambios de centro" :applications="ongoingApplication" :headers="headersCenters" />
</template>

<script setup>
import CreateApplication from "./CreateApplication.vue";
import DeleteMajorApplication from "./DeleteMajorApplication.vue";
import ViewApplications from "./ViewApplications.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { ref, watch } from 'vue';


const route = useRoute();

const tipo = ref(route.params.tipo);
watch(() => route.params.tipo, (newValue) => {
    tipo.value = newValue;
});


const centros = [
    'Centro Universitario Regional de Litoral Atlántico',
    'Valle de Sula'
]

const headersCenters = [
    'Del centro',
    'Al centro',
    'Fecha de solicitud',
]

const currentCenter = ref('Ciudad Universitaria');
const selectedCenter = ref('');
const ongoingApplication = ref([]);

watch(selectedCenter, (newValue) => {

    ongoingApplication.value.push(
        {
            "Del centro": currentCenter.value,
            "Al centro": newValue,
            "Fecha de solicitud": "20/03/2023"
        }
    );
    currentCenter.value = newValue;
});


function handleSelectedCenterUpdate(updatedSelectedCenter) {
    selectedCenter.value = updatedSelectedCenter;

}
</script>