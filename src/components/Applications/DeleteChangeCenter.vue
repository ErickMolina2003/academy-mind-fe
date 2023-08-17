<template>
  <v-card class="ma-4" v-if="data.length > 0">
    <h2 class="text-center py-2">Solicitudes de Cambio de Carrera</h2>
    <v-table>
      <thead>
        <tr>
          <th>Carrera a Cambiar</th>
          <th>Fecha de Solicitud</th>
          <th>Estado de Solicitud</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in data" :key="info.accountNumber">
          <td>{{ info.idCenter }}</td>
          <td>
            {{ formatDate(info.applicationDate) }}
          </td>
          <td>
            {{ info.applicationStatus }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="deep-purple-accent-4" @click="deleteChangeCenter">
        Cancelar solicitud
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else>
    <v-card-text
      class="text-center font-weight-medium text-h5 text-lg-h4 mb-3 pt-3"
    >
      No hay solicitudes realizadas.
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CenterChangeService from "@/services/center-change/center.change.service";
import { useAppStore } from "@/store/app";
import PeriodService from "@/services/period/period.service";
import { get } from "http";

const store = useAppStore();
const serviceCenterChange = new CenterChangeService();
const servicePeriod = new PeriodService();
const accountStudent = store.user.student.accountNumber;
const periods = ref([]);
const periodToModify = ref({});
const data = ref([]);

onMounted(async () => {
  getPeriods();
  getCenterChange();
});
async function getPeriods() {
  const response = await servicePeriod.getPeriodsByYear(
    new Date().getFullYear()
  );
  periods.value = response.periods;
  periodToModify.value = periods.value[0];
  if (periodToModify.value.idStatePeriod?.name === "Finalizado") {
    store.setToaster({
      isActive: true,
      text: "El periodo actual esta finalizado",
      color: "error",
    });
  }
}

async function getCenterChange() {
  const response = await serviceCenterChange.getCenterChangeByStudent(
    accountStudent
  );
  data.value = response.allRequest;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

async function deleteChangeCenter() {
  console.log(data.value[0].idCenterChange);
  await serviceCenterChange.deleteCenterChange(data.value[0].idCenterChange);
}
</script>
