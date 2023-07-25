<template>
    <CreateSections v-if="tipo === '/crear-secciones'" :sections="sections" />
</template>

<script setup>
import router from "@/router";
import CreateSections from "./CreateSections.vue";
import { useRoute } from "vue-router";
import { ref, watch } from 'vue';


const route = useRoute();

const tipo = ref(route.fullPath);
// watch(() => route.params.tipo, (newValue) => {
//     tipo.value = newValue;
// });


const sections = [
    {
        classCode:"IS-201",
        className:"Contabilidad I",
        section:"1000",
        initialHour:"1000",
        finalHour:"1100",
        teacher:"Irma Lagos",
        uv:"4",
        days:"LuMaMiJuVi",
        building:"B2",
        classroom:"310",
        modify:"Modificar"
    }
]



</script>