<template>
  <v-card class="ma-4">
    <v-col cols="12" class="rounded-lg mb-2 px-7 py-2">
      <h2 class="text-center py-2">Solicitud cambio de carrera</h2>
      <hr />
      <v-row class="d-flex pt-2">
        <v-col cols="6">
          <h3>Centro de Estudios:</h3>
          <p class="student-info">{{ centerStudent }}</p>
        </v-col>
        <v-col cols="6">
          <h3>Carrera actual:</h3>
          <p class="student-info">{{ careerStudent }}</p>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col cols="6">
          <h3>Indice global:</h3>
          <p class="student-info">{{ indexStudent }}</p>
        </v-col>
      </v-row>
    </v-col>
    <v-form
      ref="form"
      v-model="isValid"
      @submit.prevent="submitApplication"
      class="pa-4 pt-2"
    >
      <v-autocomplete
        v-model="selectedCareer"
        :items="filterCareer.map((item) => item.name)"
        label="Carrera a cambiarse"
        :rules="[rules.required]"
        return-object
      ></v-autocomplete>
      <v-textarea
        v-model="reasonsChange"
        label="Justificacion cambio de carrera"
        :rules="[rules.required]"
        auto-grow
        variant="filled"
        rows="1"
      ></v-textarea>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="() => borrar()"> Borrar </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isValid"
        color="deep-purple-accent-4"
        @click="submitApplication"
      >
        Realizar solicitud
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import PeriodService from "@/services/period/period.service";
import CareerChangeService from "@/services/career-change/career.change.service";
import CareerService from "@/services/career/career.service";
import TuitionService from "@/services/tuition/tuition.service";

const careerService = new CareerService();
const servicePeriod = new PeriodService();
const serviceCareerChange = new CareerChangeService();
const serviceTuition = new TuitionService();
const store = useAppStore();
const isValid = ref(false);
const selectedCareer = ref(null);
const reasonsChange = ref("Quiero hacer una solicitud de cambio porque ...");
const centerStudent =
  store.user.student.studentCareer[0].centerCareer.regionalCenter.name;
const centerStudentId =
  store.user.student.studentCareer[0].centerCareer.regionalCenter.id;
const careerStudent =
  store.user.student.studentCareer[0].centerCareer.career.name;
const accountStudent = store.user.student.accountNumber;
const indexStudent = store.user.student.overallIndex;
const periods = ref([]);
const periodToModify = ref({});
const filterCareer = ref([]);
const data = ref([]);
const periodId = ref("");
const accountNumber = ref("");
const idCareer = ref("");
const justification = ref("");
const idPeriod = ref("");
const show = ref(true);

onMounted(async () => {
  getPeriods();
  data.value = await careerService.getCareerByCenter(centerStudentId);
  filterCareer.value = data.value.careersCenter[
    `${centerStudentId}`
  ].careers.filter((career) => career.name !== careerStudent);
  console.log();
});

async function getPeriods() {
  const response = await servicePeriod.getPeriodsByYear(
    new Date().getFullYear()
  );
  periods.value = response.periods;
  periodToModify.value = periods.value[0];
  periodId.value = periodToModify.value.id;
  const responseTuition = await serviceTuition.getTuitionsByStudent(
    accountStudent,
    periodId.value
  );
}

function borrar() {
  selectedCareer.value = "";
  reasonsChange.value = "Quiero hacer una solicitud de cambio por que ...";
}

const rules = {
  required: (value) => !!value || "Campo obligatorio",
};

async function submitApplication() {
  let career = getCareer(selectedCareer.value);
  const DataCreate = {
    accountNumber: accountStudent,
    idCareer: career.id,
    justification: reasonsChange.value,
    idPeriod: `${periodId.value}`,
  };
  await serviceCareerChange.CreateCareerChange(DataCreate);
}

function getCareer(nameCareer: string) {
  return filterCareer.value.find(
    (career) => career.name === nameCareer.toUpperCase()
  );
}
</script>
