<template>
  <v-main style="padding-left: 0%">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Solicitudes de Cancelaciones Excepcionales</span>
      </v-card-title>
      <div class="d-flex align-center mx-4 my-2">
        <div>
          <v-select
            v-model="itemsPerPage"
            :items="perPageOptions"
            variant="outlined"
          ></v-select>
        </div>
        <span class="ml-3">Registros por página</span>
      </div>
      <v-card-text class="mt-1" style="padding: 0">
        <v-list class="overflow-auto">
          <v-list-item
            v-for="(user, index) in paginatedStudents"
            :key="index"
            class="mb-2"
          >
            <v-divider></v-divider>
            <div class="d-flex justify-space-between align-center ma-1">
              <v-list-item-title
                class="ml-12"
                v-text="
                  user.idTuition.student.user.firstName +
                  ' ' +
                  user.idTuition.student.user.secondName +
                  ' ' +
                  user.idTuition.student.user.firstLastName +
                  '  ' +
                  user.idTuition.student.user.secondLastName +
                  ' - ' +
                  user.idTuition.student.accountNumber
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
      <v-card-title class="text-center bg-blue text-center" title=""
        >Solicitudes de Cancelacion Excepcional</v-card-title
      >
      <v-card-text class="overflow-auto">
        <div class="mb-4 d-flex justify-space-evenly align-center">
          <p>
            <strong>Estudiante:</strong>
            {{
              userData.idTuition.student.user.firstName +
              " " +
              userData.idTuition.student.user.firstLastName
            }}
          </p>
          <p>
            <strong>No. Cuenta:</strong>
            {{ userData.idTuition.student.accountNumber }}
          </p>
        </div>
        <div class="mb-4 d-flex justify-space-evenly align-center">
          <p>
            <strong>Índice de Periodo:</strong>
            {{ userData.idTuition.student.periodIndex }}
          </p>
          <p>
            <strong>Índice Global:</strong>
            {{ userData.idTuition.student.overallIndex }}
          </p>
        </div>
        <div class="bg-blue-lighten-1 text-center">Motivo</div>
        <v-sheet class="pa-4 text-justify">{{ userData.reason }}</v-sheet>
        <v-divider :thickness="5"></v-divider>
        <v-table class="my-6">
          <thead class="bg-light-blue-accent-1">
            <tr>
              <th class="text-left">Clase</th>
              <th class="text-center">Seccion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userData.idTuition.section.idClass.name }}</td>
              <td class="text-center">
                {{ userData.idTuition.section.codeSection }}
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-divider :thickness="5"></v-divider>
        <v-btn
          class="ma-6 bg-blue-grey-lighten-4"
          v-if="userData.justificationPdf"
          @click="downloadJustification(userData.justificationPdf)"
        >
          <v-icon start icon="mdi-download-circle" size="x-large"></v-icon>
          Ver Justificación
        </v-btn>
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
          <v-btn
            class="bg-red ma-2 px-4"
            color="white"
            @click="cancelRequest(userData.id)"
          >
            Rechazar
            <v-icon end icon="mdi-cancel"></v-icon>
          </v-btn>
          <v-btn
            class="bg-green ma-2 px-4"
            color="white"
            @click="acceptRequest(userData.id)"
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
import ExceptionalCancellationService from "@/services/exceptional-cancellation/exceptional.cancellation.service";
import { useAppStore } from "@/store/app";

const serviceExceptionalCancellation = new ExceptionalCancellationService();
const store = useAppStore();
const showModal = ref(false);
const userData = ref(null);
const itemsPerPage = ref(5);
const perPageOptions = [5, 10, 15, 20];
const currentPage = ref(1);
const studentsList = ref([]);
const status = ref("");
const careerId = ref(
  store.user.teacher.teachingCareer[0].centerCareer.career.id
);
const centerId = ref(
  store.user.teacher.teachingCareer[0].centerCareer.regionalCenter.id
);

onMounted(async () => {
  getAllCancellation();
});

async function getAllCancellation() {
  const response =
    await serviceExceptionalCancellation.getAllExceptionaCancellationByCareer(
      careerId.value,
      centerId.value
    );
  studentsList.value = response.cancelations.filter(
    (cancelation) => cancelation.status !== "Rechazada"
  );
  if (studentsList.value.length === 0) {
    store.setToaster({
      isActive: true,
      text: "No hay solicitudes pendientes de cambio de carrera",
      color: "error",
    });
  }
}

const openModal = (user) => {
  showModal.value = true;
  userData.value = user;
};

const closeModal = () => {
  showModal.value = false;
};

async function acceptRequest(id: string) {
  const data = {
    status: "Aprobada",
  };
  const response =
    await serviceExceptionalCancellation.updateExceptionalCancellation(
      id,
      data
    );
  if (response) {
    showModal.value = false;
  }
}

async function cancelRequest(id: string) {
  const data = {
    status: "Rechazada",
  };
  const response =
    await serviceExceptionalCancellation.updateExceptionalCancellation(
      id,
      data
    );
  if (response) {
    showModal.value = false;
  }
}
const totalPages = computed(() =>
  Math.ceil(studentsList.value.length / itemsPerPage.value)
);
const paginatedStudents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return studentsList.value.slice(startIndex, endIndex);
});

const changePage = (page) => {
  currentPage.value = page;
};

async function downloadJustification(links: string) {
  if (links) {
    const link = document.createElement("a");
    link.href = links;
    link.target = "_blank"; // Abre en una nueva pestaña
    link.download = "justificacion.pdf"; // Nombre del archivo para la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
</script>
