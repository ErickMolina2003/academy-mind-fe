<template>
  <div v-if="ongoingClasses">
    <div class="mb-5">
      <v-row>
        <v-col cols="auto">
          <v-icon class="icon-attention">mdi-alert</v-icon>
        </v-col>
        <v-col cols="auto">
          <span class="text-attention"
            >Para cancelar una asignatura debes seleccionarla primero y luego
            dar clic en el botón cancelar.</span
          >
        </v-col>
      </v-row>
    </div>
    <v-table class="classes-table pb-4" fixed-header density="comfortable">
      <thead>
        <tr>
          <th>CODIGO</th>
          <th>ASIGNATURA</th>
          <th>SECCIÓN</th>
          <th>HI</th>
          <th>HF</th>
          <th>DIAS</th>
          <th>UV</th>
          <th>PERIODO</th>
          <th>SELECCIONE</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="ongoingClasses"
          v-for="item in ongoingClasses"
          :key="item.id"
          :class="{ 'selected-row': item.selected }"
        >
          <td>
            <span>{{ item.section.idClass.code }}</span>
          </td>
          <td>
            <span>{{ item.section.idClass.name }}</span>
          </td>
          <td>
            <span>{{ item.section.codeSection }}</span>
          </td>
          <td>
            <span>{{ item.section.hour }}</span>
          </td>
          <td>
            <span>{{ item.section.finalHour }}</span>
          </td>
          <td>
            <span>{{ item.section.days }}</span>
          </td>
          <td>
            <span>{{ item.section.idClass.valueUnits }}</span>
          </td>
          <td>
            <span>{{ item.section.idPeriod.numberPeriod }}</span>
          </td>
          <td>
            <a href="#" @click="selectClass(item)">Select</a>
          </td>
        </tr>
      </tbody>
    </v-table>
    <p v-if="tableError" class="error-message pb-5">
      Por favor, seleccione una asignatura.
    </p>
    <v-textarea
      v-model="reasonsChange"
      :rules="[rules.validate]"
      label="Justificacion cancelación de asignatura"
      auto-grow
      variant="filled"
      rows="1"
    ></v-textarea>
    <p v-if="textError" class="error-message pb-5">
      Por favor, escriba su justificación.
    </p>
    <v-file-input
      v-model="file"
      accept="application/pdf"
      label="Adjunte un PDF que respalde su solicitud"
    ></v-file-input>
    <p v-if="fileError" class="error-message pb-5">
      Por favor, adjunte un archivo PDF.
    </p>
    <v-btn color="deep-purple-accent-4" @click="submitApplication">
      Cancelar asignatura
    </v-btn>
  </div>
  <div v-else>
    <v-row>
      <v-col cols="auto">
        <v-icon class="icon-attention">mdi-alert</v-icon>
      </v-col>
      <v-col cols="auto">
        <span class="text-attention"
          >No se encuentra en fecha para realizar la cancelación</span
        >
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import PeriodService from "@/services/period/period.service";
import ExceptionalCancellationService from "@/services/exceptional-cancellation/exceptional.cancellation.service";

const serviceExceptionalCancellation = new ExceptionalCancellationService();
const servicePeriod = new PeriodService();
const store = useAppStore();
const accountStudent = store.user.student.accountNumber;
const selectedClass = ref({});
const file = ref([]);
const isValid = ref(false);
const reasonsChange = ref("");
const fileError = ref(false);
const tableError = ref(false);
const textError = ref(false);
const ongoingClasses = ref([]);
const reason = ref("");
const justificationPdf = ref("");
const idTuition = ref("");
const urlPdf = ref("");
import {
  ref as firebaseRed,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { url } from "inspector";

const rules = {
  validate: (value) => value.length > 20 || "Minimo 20 caracteres",
};

onMounted(async () => {
  getSections();
});

async function getSections() {
  const response =
    await serviceExceptionalCancellation.getExceptionalCancellation(
      accountStudent
    );
  ongoingClasses.value = response.tuitions;
}

const selectClass = (item) => {
  if (selectedClass.value !== item) {
    if (selectedClass.value.selected) {
      selectedClass.value.selected = false;
    }
    item.selected = true;
    selectedClass.value = item;
    console.log(selectedClass.value);
  }
};

function checkTable() {
  if (!selectedClass.value.id) {
    tableError.value = true;
    isValid.value = false;
    return false;
  } else {
    tableError.value = false;
    return true;
  }
}

function checkFile() {
  if (!file.value || file.value.length === 0) {
    fileError.value = true;
    isValid.value = false;
    return false;
  } else {
    fileError.value = false;
    return true;
  }
}

function checkText() {
  if (!reasonsChange.value.trim()) {
    textError.value = true;
    isValid.value = false;
    return false;
  } else {
    textError.value = false;
    return true;
  }
}

async function submitApplication() {
  const isTableValid = checkTable();
  const isFileValid = checkFile();
  const isTextValid = checkText();
  if (isTableValid && isFileValid && isTextValid) {
    const pdfRef = firebaseRed(
      storage,
      `justification/${file.value[0].name + v4()}`
    );
    try {
      const response = await uploadBytes(pdfRef, file.value[0]);
      const url = await getDownloadURL(response.ref);
      urlPdf.value = url;
    } catch (error) {
      store.setToaster({
        isActive: true,
        text: "Error al subir el archivo",
        color: "error",
      });
    }
    const data = {
      idTuition: selectedClass.value.id,
      reason: reasonsChange.value,
      justificationPdf: `${urlPdf.value}`,
    };
    await serviceExceptionalCancellation.CreateExceptionalCancellation(data);
  }
}
</script>

<style scoped>
.classes-table {
  font-size: 0.7rem;
}
.selected-row {
  background-color: lightyellow;
}
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
