<template>
    <CreateSpecialCancellation v-if="tipo == 'realizar-solicitud'" :headers="headersClasses" :data="ongoingClasses"
        @update-selected-classes="handleSelectedClassesUpdate" />
    <ViewCancellations v-else title="cancelación excepcional de clases" :data="selectedClassesParent"
        :headersClasses="headersClasses" :dictamen="dictamen" />
</template>
  
<script setup>
import CreateSpecialCancellation from "./CreateSpecialCancellation.vue"
import ViewCancellations from "./ViewCancellations.vue";
import { useRoute } from "vue-router";
import { ref, watch } from 'vue';


const route = useRoute();
const tipo = ref(route.params.tipo);
watch(() => route.params.tipo, (newValue) => {
    tipo.value = newValue;
});


const headersClasses = [
    { text: 'CODIGO', value: 'codigo' },
    { text: 'ASIGNATURA', value: 'asignatura' },
    { text: 'SECCIÓN', value: 'seccion' },
    { text: 'HI', value: 'hi' },
    { text: 'HF', value: 'hf' },
    { text: 'DIAS', value: 'dias' },
    { text: 'EDIFICIO', value: 'edificio' },
    { text: 'AULA', value: 'aula' },
    { text: 'UV', value: 'uv' },
    { text: 'OBS', value: 'obs' },
    { text: 'PERIODO', value: 'periodo' },
];

const ongoingClasses = [
    {
        "codigo": "FS-100",
        "asignatura": "Fisica 1",
        "seccion": 9000,
        "hi": 9000,
        "hf": 1000,
        "dias": "LuMaMiJuVi",
        "edificio": "B2",
        "aula": "301",
        "uv": 5,
        "obs": "",
        "periodo": "2"
    },
    {
        "codigo": "FS-200",
        "asignatura": "Fisica 2",
        "seccion": 9000,
        "hi": 9000,
        "hf": 1000,
        "dias": "LuMaMiJuVi",
        "edificio": "B2",
        "aula": "301",
        "uv": 5,
        "obs": "",
        "periodo": "2"
    },
];

const dictamen = [
    {
        resultado: "vigente",
        fecha: "04/07/2023"
    }
];

const selectedClassesParent = ref([]);

function handleSelectedClassesUpdate(updatedSelectedClasses) {
    selectedClassesParent.value = updatedSelectedClasses;
}


</script>