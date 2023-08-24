<template>
  <div v-if="show">
    <v-card class="ma-4">
      <v-col cols="12" class="rounded-lg mb-2 px-7 py-2">
        <h2 class="text-center py-2">Solicitud cambio de centro</h2>
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
          v-model="selectedCenter"
          :items="filterCenter.map((center) => center.name)"
          label="Centro a cambiarse"
          :rules="[rules.required]"
          return-object
        ></v-autocomplete>
        <v-textarea
          v-model="reasonsChange"
          label="Justificacion cambio de centro"
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
  </div>
  <v-card v-else>
    <v-card-text
      class="text-center font-weight-medium text-h5 text-lg-h4 mb-3 pt-3"
    >
      No puedes realizar la solicitud de cambio de centro.
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import PeriodService from "@/services/period/period.service";
import RegionalCenterService from "@/services/regional-center/regional.center.service";
import CenterChangeService from "@/services/center-change/center.change.service";
import TuitionService from "@/services/tuition/tuition.service";

const serviceCenterChange = new CenterChangeService();
const serviceTuition = new TuitionService();
const centerService = new RegionalCenterService();
const servicePeriod = new PeriodService();
const store = useAppStore();
const isValid = ref(false);
const selectedCenter = ref("");
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
const filterCenter = ref([]);
const data = ref([]);
const periodId = ref("");
const show = ref(true);
const accountNumber = ref("");
const idCareer = ref("");
const justification = ref("");
const idPeriod = ref("");

onMounted(async () => {
  getPeriod();
  data.value = await centerService.getCenters();
  filterCenter.value = data.value.regionalCenter.filter(
    (center) => center.id !== centerStudentId
  );
});

async function getPeriod() {
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
  if (responseTuition.registrations.length !== 0) {
    show.value = false;
    store.setToaster({
      isActive: true,
      text: "Para poder realizar solicitud de cambio de centro debe cancelar las asignaturas matriculadas en el período.",
      color: "error",
    });
  }
}

function borrar() {
  selectedCenter.value = "";
  reasonsChange.value = "Quiero hacer una solicitud de cambio por que ...";
}

const rules = {
  required: (value) => !!value || "Campo obligatorio",
};

async function submitApplication() {
  let center = getCenter(selectedCenter.value);
  const DataCreate = {
    accountNumber: accountStudent,
    idCenter: center.id,
    justification: reasonsChange.value,
    idPeriod: `${periodId.value}`,
  };
  await serviceCenterChange.CreateCenterChange(DataCreate);
}

function getCenter(nameCenter: string) {
  return filterCenter.value.find(
    (center) => center.name === nameCenter.toUpperCase()
  );
}
</script>
