<template>
    <v-container class="pb-6" style="font-size: .9rem;"> 
        <h1 style="color: #CC6600;">Historial Académico</h1>
        <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
        <v-col cols="12" class="mb-1 px-7 py-5" style="border: 1px solid #ddd; border-radius: 10px;">
            <p class="mb-3">Información personal</p>
            <v-row class="d-flex">
                <v-col class="py-0 pb-2" cols="6">
                    <p>
                        <strong>Número de cuenta:</strong> {{ user.accountNumber }}
                    </p>
                </v-col>
                <v-col class="py-0 pb-2" cols="6">
                    <p>
                        <strong>Centro: </strong> {{ user.center }}
                    </p>
                </v-col>


            </v-row>
            <v-row class="d-flex">
                <v-col class="py-0 pb-2" cols="6">
                    <p>
                        <strong>Nombre completo:</strong> {{ user.name }}
                    </p>
                </v-col>
                <v-col class="py-0 pb-2" cols="6">
                    <p>
                        <strong>Indice Global: </strong> {{ user.globalIndex }}
                    </p>
                </v-col>
            </v-row>
            <v-row class="d-flex">

            </v-row>


            <v-row class="d-flex">
                <v-col class="py-0 pb-2" cols="6">
                    <p>
                        <strong>Carrera: </strong> {{ user.career }}
                    </p>
                </v-col>

                <v-col class="py-0 pb-2" cols="6">
                    <p>
                        <strong>Indice Periodo: </strong> {{ user.periodIndex }}
                    </p>
                </v-col>
            </v-row>
        </v-col>

        <v-table fixed-header>
            <thead>
                <tr>
                    <th class="pa-0 px-3">CÓD.</th>
                    <th class="pa-0 px-3">ASIGNATURA</th>
                    <th class="pa-0 px-3">UV</th>
                    <th class="pa-0 px-3">SECCIÓN</th>
                    <th class="pa-0 px-3">AÑO</th>
                    <th class="pa-0 px-3">PERIODO</th>
                    <th class="pa-0 px-3">CALIFICACIÓN</th>
                    <th class="pa-0 px-3">OBS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in displayedSubjects" :key="item.codigo">
                    <td class="text-left pa-0 px-3">{{ item.codigo }}</td>
                    <td class="text-left pa-0 px-3">{{ item.asignatura }}</td>
                    <td class="text-left pa-0 px-3">{{ item.uv }}</td>
                    <td class="text-left pa-0 px-3">{{ item.seccion }}</td>
                    <td class="text-left pa-0 px-3">{{ item.anio }}</td>
                    <td class="text-left pa-0 px-3">{{ item.periodo }}</td>
                    <td class="text-left pa-0 px-3">{{ item.calificacion }}</td>
                    <td class="text-left pa-0 px-3">{{ item.obs }}</td>
                </tr>
            </tbody>
        </v-table>
        <v-pagination v-model="currentSubjectPage" :total-visible="5" :length="totalSubjectsPages"
            @input="updateDisplayedSubjects" />
    </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import grades from "../../mock/grades.json";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const subjects = ref(grades);
const userLogged = ref(store.user.student);
const fullName =
    store.user.firstName +
    ` ` +
    store.user.secondName +
    ` ` +
    store.user.firstLastName +
    ` ` +
    store.user.secondLastName;
const user = {
    name: fullName,
    accountNumber: userLogged.value.accountNumber,
    center: userLogged.value.studentCareer[0].centerCareer.regionalCenter.name,
    globalIndex: userLogged.value.overallIndex,
    periodIndex: userLogged.value.periodIndex,
    career: userLogged.value.studentCareer[0].centerCareer.career.name
}

onMounted(() => {
    updateDisplayedSubjects();
});


// paginacion
const filteredSubjects = computed(() => subjects.value);
const itemsPerPage = 8;
const currentSubjectPage = ref(1);
const displayedSubjects = ref([]);
const totalSubjectsPages = computed(() => Math.ceil(filteredSubjects.value.length / itemsPerPage));
const updateDisplayedSubjects = () => {
    const startIndex = (currentSubjectPage.value - 1) * itemsPerPage;
    displayedSubjects.value = filteredSubjects.value.slice(startIndex, startIndex + itemsPerPage);
};
watch(currentSubjectPage, updateDisplayedSubjects);
watch(filteredSubjects, updateDisplayedSubjects);
</script>

<style>
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
