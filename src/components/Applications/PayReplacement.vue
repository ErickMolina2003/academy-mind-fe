<template>
    <v-container v-if="tipo == 'realizar-solicitud' ">
        <h1 style="color: #CC6600;">Crear solicitud</h1>
        <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
        <div v-if="currentPeriod">
            <v-form v-model="form">
                <v-textarea label="Escriba una justificación" variant="solo" v-model="justification"
                    :rules="[rules.required]"></v-textarea>
            </v-form>
            <v-btn class="bg-blue-darken-4 float-right" variant="text" @click="confirmInfo">
                Enviar
            </v-btn>
        </div>
    </v-container>
    <v-container v-else>
        <h1 style="color: #CC6600;">Ver solicitudes</h1>
        <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>

        <v-table fixed-header density="comfortable">
            <thead>
                <tr>
                    <th class="pa-0 px-3">Solicitud</th>
                    <th class="pa-0 px-3">Precio</th>
                    <th class="pa-0 px-3">Justificación</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in displayedFilters" :key="item">
                    <td class="text-left pa-0 px-3">{{ item.idPeriod.numberPeriod }} Periodo Académico del año {{
                        item.idPeriod.year }}</td>
                    <td class="text-left pa-0 px-3">{{ item.price }}</td>
                    <td class="text-left pa-0 px-3">{{ item.justification}}</td>
                </tr>
            </tbody>
        </v-table>
        <v-pagination v-model="currentPage" :total-visible="5" :length="totalPages" @input="updateFilters" />
    </v-container>
</template>
  
<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
import PeriodService from "@/services/period/period.service";
import ReplacementService from "@/services/replacementExam/replacementExam.service";

const servicePeriod = new PeriodService();
const serviceReplacement = new ReplacementService();
const store = useAppStore();
const userLogged = store.user.student;
const route = useRoute();
const form = ref(false);
const tipo = ref(route.params.tipo);
const justification = ref("");
const periods = ref([]);
const currentPeriod = ref();
const applications = ref([]);
watch(() => route.params.tipo, (newValue) => {
    tipo.value = newValue;

    checkPeriod();
});

onMounted(() => {
    getPeriods();
});

async function getPeriods() {

    const response = await servicePeriod.getPeriodOngoing();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];
    getApplications();
    checkPeriod();
}

function checkPeriod() {
    
    if (tipo.value == 'realizar-solicitud' && !currentPeriod.value) {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en curso. No se puede realizar solicitud.",
            color: "error",
        });
    }
}

async function confirmInfo() {


    if (form.value) {
        const data = {
            idStudent: userLogged.accountNumber,
            idPeriod: currentPeriod.value.id,
            justification: justification.value
        }

        const response = await serviceReplacement.createApplication(data);

        justification.value = "";
        form.value = false;
        getApplications();
    } else {
        store.setToaster({
            isActive: true,
            text: "Debe ingresar una justificación.",
            color: "error",
        });
    }
}

async function getApplications() {
    const response = await serviceReplacement.getApplicationsOfStudent(userLogged.accountNumber);
    applications.value = response.repositionRequests;
}

// paginacion
const filtered = computed(() => applications.value);
const itemsPerPage = 10;
const currentPage = ref(1);
const displayedFilters = ref([]);
const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage));
const updateFilters = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    displayedFilters.value = filtered.value.slice(startIndex, startIndex + itemsPerPage);
};
watch([currentPage, filtered], updateFilters);



const rules = {
    required: (value) => !!value || "Campo obligatorio.",
};

</script>