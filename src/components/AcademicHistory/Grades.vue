<template>
  <v-container class="pb-6" style="font-size: 0.9rem">
    <h1 style="color: #cc6600">Historial Académico</h1>
    <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
    <v-col
      cols="12"
      class="mb-1 px-7 py-5"
      style="border: 1px solid #ddd; border-radius: 10px"
    >
      <p class="mb-3">Información personal</p>
      <v-row class="d-flex">
        <v-col class="py-0 pb-2" cols="6">
          <p><strong>Número de cuenta:</strong> {{ user.accountNumber }}</p>
        </v-col>
        <v-col class="py-0 pb-2" cols="6">
          <p><strong>Centro: </strong> {{ user.center }}</p>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col class="py-0 pb-2" cols="6">
          <p><strong>Nombre completo:</strong> {{ user.name }}</p>
        </v-col>
        <v-col class="py-0 pb-2" cols="6">
          <p><strong>Indice Global: </strong> {{ user.globalIndex }}</p>
        </v-col>
      </v-row>
      <v-row class="d-flex"> </v-row>

      <v-row class="d-flex">
        <v-col class="py-0 pb-2" cols="6">
          <p><strong>Carrera: </strong> {{ user.career }}</p>
        </v-col>

        <v-col class="py-0 pb-2" cols="6">
          <p><strong>Indice Periodo: </strong> {{ user.periodIndex }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-card-actions class="mx-auto">
          <v-spacer></v-spacer>
          <v-btn color="deep-purple-accent-4" @click="downloadPDF">
            Descargar Historial Académico
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-col>

    <v-table fixed-header density="comfortable">
      <thead>
        <tr>
          <th class="pa-0 px-3">CÓDIGO</th>
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
          <td class="text-left pa-0 px-3">{{ item.section.idClass.code }}</td>
          <td class="text-left pa-0 px-3">{{ item.section.idClass.name }}</td>
          <td class="text-left pa-0 px-3">
            {{ item.section.idClass.valueUnits }}
          </td>
          <td class="text-left pa-0 px-3">{{ item.section.codeSection }}</td>
          <td class="text-left pa-0 px-3">{{ item.section.idPeriod.year }}</td>
          <td class="text-left pa-0 px-3">
            {{ item.section.idPeriod.numberPeriod }}
          </td>
          <td class="text-left pa-0 px-3">{{ item.note }}</td>
          <td class="text-left pa-0 px-3">{{ item.stateClass }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentSubjectPage"
      :total-visible="5"
      :length="totalSubjectsPages"
      @input="updateDisplayedSubjects"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import TuitionService from "@/services/tuition/tuition.service";

const store = useAppStore();
const tuitionService = new TuitionService();
const subjects = ref([]);
const userLogged = store.user.student;
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
  accountNumber: userLogged.accountNumber,
  center: userLogged.studentCareer[0].centerCareer.regionalCenter.name,
  globalIndex: userLogged.overallIndex,
  periodIndex: userLogged.periodIndex,
  career: userLogged.studentCareer[0].centerCareer.career.name,
};
onMounted(() => {
  getSubjects();
});

async function getSubjects() {
  const response = await tuitionService.getAcademicHistory(user.accountNumber);
  subjects.value = response.registrations;
  updateDisplayedSubjects();
}

// paginacion
const filteredSubjects = computed(() => subjects.value);
const itemsPerPage = 8;
const currentSubjectPage = ref(1);
const displayedSubjects = ref([]);
const totalSubjectsPages = computed(() =>
  Math.ceil(filteredSubjects.value.length / itemsPerPage)
);
const updateDisplayedSubjects = () => {
  const startIndex = (currentSubjectPage.value - 1) * itemsPerPage;
  displayedSubjects.value = filteredSubjects.value.slice(
    startIndex,
    startIndex + itemsPerPage
  );
};
watch([currentSubjectPage, filteredSubjects], updateDisplayedSubjects);
function downloadPDF() {}
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
