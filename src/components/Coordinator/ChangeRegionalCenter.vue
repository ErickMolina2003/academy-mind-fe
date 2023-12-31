<template>
  <v-main style="padding-left: 0%">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Solicitudes de Cambio de Centro</span>
      </v-card-title>
      <div class="d-flex justify-space-between mx-4 my-2">
        <div class="d-flex align-center mt-1 ml-2">
          <v-select
            v-model="itemsPerPage"
            :items="perPageOptions"
            variant="outlined"
          ></v-select>

          <span class="ml-3">Registros por página</span>
        </div>

        <div class="d-flex align-center mt-1 mr-2">
          <v-text-field
            v-model="searchInput"
            label="No. Cuenta"
            style="width: 200px"
          ></v-text-field>
          <v-icon icon="mdi-magnify" class="ml-3"></v-icon>
        </div>
      </div>
      <v-card-text class="mt-1" style="padding: 0">
        <v-list class="overflow-auto">
          <v-list-item
            v-for="(user, index) in paginatedStudents"
            :key="index"
            class="mb-1"
          >
            <v-divider></v-divider>
            <div class="d-flex justify-space-between align-center ma-1">
              <v-list-item-title
                class="ml-12"
                v-text="
                  user.student.user.firstName +
                  ' ' +
                  user.student.user.secondName +
                  ' ' +
                  user.student.user.firstLastName +
                  ' ' +
                  user.student.user.secondLastName +
                  ' - ' +
                  user.student.accountNumber
                "
              ></v-list-item-title>
              <div>
                <v-btn class="mr-12" color="green" @click="openModal(user)">
                  Información
                  <v-icon end icon="mdi-information" size="large"></v-icon>
                </v-btn>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @input="changePage"
        rounded="circle"
      ></v-pagination>
    </v-card>
  </v-main>

  <v-dialog v-model="showModal" class="w-auto" max-width="800px">
    <v-card>
      <v-card-title class="text-center bg-blue text-center" title="">
        Solicitud de Cambio de Centro
      </v-card-title>
      <v-card-text class="overflow-auto">
        <div class="mb-4 d-flex justify-space-evenly align-center">
          <v-list-item-title
            >Estudiante:
            {{
              userData.student.user.firstName +
              " " +
              userData.student.user.firstLastName
            }}</v-list-item-title
          >
          <p>Núm de Cuenta: {{ userData.student.accountNumber }}</p>
        </div>
        <div class="mb-4 d-flex justify-space-evenly align-center">
          <p>Índice de Periodo: {{ userData.student.periodIndex }}</p>
          <p>Índice Global: {{ userData.student.overallIndex }}</p>
        </div>
        <div class="bg-blue-lighten-1 text-center">Motivo</div>
        <v-sheet class="pa-4 text-justify">{{
          userData.justification
        }}</v-sheet>
        <p class="bg-blue-lighten-1 text-center">Cambio de centro</p>
        <v-sheet class="pa-4">
          <p>
            Centro actual:
            {{
              userData.student.studentCareer[0].centerCareer.regionalCenter.name
            }}
          </p>
        </v-sheet>
      </v-card-text>

      <v-card-actions class="fixed-footer mx-4">
        <v-btn
          class="bg-blue-darken-1 px-4"
          color="white"
          variant="text"
          @click="closeModal"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <div>
          <v-btn class="bg-red ma-2 px-4" color="white" @click="cancelRequest">
            Rechazar
            <v-icon end icon="mdi-cancel"></v-icon>
          </v-btn>
          <v-btn
            class="bg-green ma-2 px-4"
            color="white"
            @click="acceptRequest"
          >
            Aceptar
            <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import PeriodService from "@/services/period/period.service";
import CenterChangeService from "@/services/center-change/center.change.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const careerCoordinator =
  store.user.teacher.teachingCareer[0].centerCareer.career.id;
const CenterCoordinator =
  store.user.teacher.teachingCareer[0].centerCareer.regionalCenter.id;
const servicePeriod = new PeriodService();
const serviceCenterChange = new CenterChangeService();
const showModal = ref(false);
const userData = ref(null);
const itemsPerPage = ref(5);
const perPageOptions = [5, 10, 15, 20];
const currentPage = ref(1);
const periods = ref([]);
const periodToModify = ref({});
const studentsList = ref([]);
const idCareerChange = ref("");
const aplicationStatus = ref("");

onMounted(async () => {
  getPeriods();
  getCareerChange();
});
const searchInput = ref("");

const filteredStudents = computed(() => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!searchTerm) {
    return studentsList.value;
  }

  return studentsList.value.filter((user) =>
    user.student.accountNumber.includes(searchTerm)
  );
});

async function getCareerChange() {
  const response = await serviceCenterChange.getCenterChange(
    CenterCoordinator,
    careerCoordinator
  );
  studentsList.value = response.allRequest.filter(
    (request) => request.applicationStatus === "En progreso"
  );
  if (studentsList.value.length === 0) {
    store.setToaster({
      isActive: true,
      text: "No hay solicitudes pendientes de cambio de centro",
      color: "error",
    });
  }
}

async function getPeriods() {
  const response = await servicePeriod.getPeriodsByYear(
    new Date().getFullYear()
  );
  periods.value = response.periods;
  periodToModify.value = periods.value[0];
}

const openModal = (user) => {
  showModal.value = true;
  userData.value = user;
};

const closeModal = () => {
  showModal.value = false;
};

async function acceptRequest() {
  const data = {
    idCenterChange: userData.value.idCenterChange,
    aplicationStatus: "Aceptada",
  };
  const response = await serviceCenterChange.ReviewCenterChange(data);
  if (response) {
    showModal.value = false;
  }
}

async function cancelRequest() {
  const data = {
    idCenterChange: userData.value.idCenterChange,
    aplicationStatus: "Rechazada",
  };
  const response = await serviceCenterChange.ReviewCenterChange(data);
  if (response) {
    showModal.value = false;
  }
}
const totalPages = computed(() =>
  Math.ceil(filteredStudents.value.length / itemsPerPage.value)
);
const paginatedStudents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredStudents.value.slice(startIndex, endIndex);
});

const changePage = (page) => {
  currentPage.value = page;
};
</script>
