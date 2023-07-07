<template>
  <v-container>
    <NavBar
      :title="getNavBarTitles.title"
      :btnTitle="getNavBarTitles.btnTitle"
      @createUser="toggleModal"
    />
    <router-view></router-view>
    <v-dialog v-model="showModal" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ getNavBarTitles.btnTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-if="getNavBarTitles.title === 'Estudiantes'">
              <v-col cols="12" md="11" lg="11">
                <v-file-input
                  v-model="files"
                  :disabled="files.length > 0"
                  color="secondary-lighthen-1"
                  label="Subir archivo"
                  prepend-icon="mdi-paperclip"
                  variant="outlined"
                  :show-size="1000"
                >
                  <template v-slot:selection="{ fileNames }">
                    <template
                      v-for="(fileName, index) in fileNames"
                      :key="fileName"
                    >
                      <v-chip
                        v-if="index < 2"
                        color="secondary-lighthen-1"
                        label
                        size="small"
                        class="me-2"
                      >
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="1" md="1" lg="1" class="mt-5">
                <v-icon
                  :color="files.length === 1 ? 'error' : ''"
                  @click="files = []"
                  >mdi-close-circle-outline</v-icon
                >
              </v-col>
              <v-col
                cols="12"
                md="12"
                lg="12"
                v-if="files.length > 0 && !invalidCsv"
              >
                <h5 class="text-success">
                  Se encontraron {{ csvData?.length }} nuevos estudiantes por
                  agregar.
                </h5>
                <h5 class="text-error" v-if="csvDataFailed?.length > 0">
                  Se encontraron {{ csvDataFailed?.length }} nuevos estudiantes
                  con datos incorrectos.
                </h5>
              </v-col>
              <v-col
                v-if="
                  (files.length > 0 && !invalidCsv) || csvDataFailed?.length > 0
                "
                cols="12"
                md="12"
                lg="12"
              >
                <v-table fixed-header height="600px">
                  <thead>
                    <tr>
                      <th
                        class="text-left"
                        v-for="head in csvHeaders"
                        :key="head"
                      >
                        {{ head }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in csvData" :key="data.nombre">
                      <td>{{ data.Nombre }}</td>
                      <td>{{ data.Numero_de_cuenta }}</td>
                      <td>{{ data.Carrera }}</td>
                      <td>{{ data.Direccion }}</td>
                      <td>{{ data.Correo }}</td>
                      <td>{{ data.Centro_regional }}</td>
                    </tr>
                    <tr
                      v-for="data in csvDataFailed"
                      :key="data.nombre"
                      class="error-row"
                    >
                      <td>{{ data.Nombre }}</td>
                      <td>{{ data.Numero_de_cuenta }}</td>
                      <td>{{ data.Carrera }}</td>
                      <td>{{ data.Direccion }}</td>
                      <td>{{ data.Correo }}</td>
                      <td>{{ data.Centro_regional }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
              <v-row
                v-if="
                  getNavBarTitles.title === 'Estudiantes' &&
                  csvDataFailed?.length > 0
                "
                justify="center"
              >
                <v-col cols="auto" md="auto" lg="auto">
                  <h5 class="text-error">
                    Al guardar, no se crearán los estudiantes con datos
                    incorrectos.
                  </h5>
                </v-col>
              </v-row>
            </v-row>

            <v-row v-if="getNavBarTitles.title === 'Docentes'">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstName"
                  type="text"
                  :rules="[
                    nameRules.required,
                    nameRules.numbers,
                    nameRules.validate,
                  ]"
                  label="Primer Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="middleName"
                  :rules="[
                    nameRules.required,
                    nameRules.numbers,
                    nameRules.validate,
                  ]"
                  label="Segundo Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstLastName"
                  :rules="[
                    nameRules.required,
                    nameRules.numbers,
                    nameRules.validate,
                  ]"
                  label="Primer Apellido"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="secondLastName"
                  :rules="[
                    nameRules.required,
                    nameRules.numbers,
                    nameRules.validate,
                  ]"
                  label="Segundo Apellido"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dni"
                  :rules="[nameRules.required, dniRules.size]"
                  label="DNI"
                  :counter="11"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="email"
                  :rules="[nameRules.required, emailRules.validate]"
                  type="email"
                  label="Correo"
                  hint="Ejemplo: usuario123@gmail.com"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="phone"
                  :rules="[nameRules.required, phoneRules.validate]"
                  label="Teléfono"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="address"
                  :rules="[nameRules.required, addressRules.validate]"
                  label="Ubicación"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="role"
                  :rules="[nameRules.required]"
                  :items="['Docente', 'Coordinadores', 'Jefe de Departamento']"
                  density="comfortable"
                  clearable
                  required
                  label="Puesto"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeModal">
            Cerrar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="submitModal">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
interface CSVRow {
  [key: string]: string;
}

import NavBar from "@/components/NavBars/NavBar.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
// Esto es de Docentes
const firstName = ref("");
const middleName = ref("");
const firstLastName = ref("");
const secondLastName = ref("");
const email = ref("");
const dni = ref("");
const phone = ref("");
const address = ref("");
const role = ref("");

const nameRules = {
  required: (value) => !!value || "Campo obligatorio",
  numbers: (value) =>
    /^[^0-9]+$/.test(value) ||
    "Los nombres y apellidos no pueden contener dígitos",
  validate: (value) =>
    value?.length >= 3 ||
    "Los nombres y apellidos deben tener al menos 3 caracteres ",
};

const dniRules = {
  size: (value) =>
    (value?.length == 11 && /^[^A-Za-z]+$/.test(value)) ||
    "Introduzca un DNI válido",
};

const emailRules = {
  validate: (value) =>
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ||
    "Introduzca un correo electrónico válido",
};

const phoneRules = {
  validate: (value) =>
    /^(\+\d{3}\s)?(\(\d{3}\)\s?)?\d{4}(-)?\d{4}$/.test(value) ||
    "Introduzca un teléfono válido",
};

const addressRules = {
  validate: (value) => value.length > 3 || "Introduzca una dirección válida",
};

//Esto es de Estudiantes
const store = useAppStore();

const router = useRoute();
const showModal = ref(false);
const files = ref([]);
const csvData = ref();
const csvDataFailed = ref([]);

const csvHeaders = [
  "Nombre",
  "Numero de cuenta",
  "Carrera",
  "Direccion",
  "Correo",
  "Centro regional",
];
const invalidCsv = ref(false);
const errorMessage = ref("");

const getNavBarTitles = computed(() => {
  let title;
  let btnTitle;
  let studentView;
  if (router.fullPath === "/docentes") {
    title = "Docentes";
    btnTitle = "Agregar Docente";
    studentView = false;
  }
  if (router.fullPath === "/estudiantes") {
    title = "Estudiantes";
    btnTitle = "Agregar Estudiantes";
    studentView = true;
  }
  return { title: title, btnTitle: btnTitle, studentView: studentView };
});

function toggleModal() {
  showModal.value = true;
}

function clearCsvField() {
  csvData.value = [];
  csvDataFailed.value = [];
  invalidCsv.value = false;
  errorMessage.value = "";
}

function closeModal() {
  if (router.fullPath === "/estudiantes") {
    clearCsvField();
    showModal.value = false;
    files.value = [];
  }
  if (router.fullPath === "/docentes") {
    showModal.value = false;
  }
}

function submitModal() {
  if (router.fullPath === "/estudiantes") {
    if (invalidCsv.value) return;
    if (csvData.value && csvData.value?.length > 0) {
      console.log(csvData.value);
      setToaster(true, "Estudiantes creados correctamente", "success");
    }
    closeModal();
  }
  if (router.fullPath === "/docentes") {
    const user = {
      firstName: firstName.value,
      middleName: middleName.value,
      firstLastName: firstLastName.value,
      secondLastName: secondLastName.value,
      email: email.value,
      dni: dni.value,
      phone: phone.value,
      address: address.value,
      role: role.value,
    };
    closeModal();
  }
}

function validateCsv(headers: Array<String>) {
  if (headers.length !== csvHeaders.length) {
    errorMessage.value = "Faltan campos en el archivo.";
    invalidCsv.value = true;
  }

  headers.forEach((header, index) => {
    if (
      header.trim().toLocaleLowerCase() !==
      csvHeaders[index].trim().toLocaleLowerCase()
    ) {
      errorMessage.value = `Error en el campo ${csvHeaders[index]} en el archivo subido.`;
      invalidCsv.value = true;
    }
  });
}

const parseCSV = (csvText: string) => {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");
  const data: CSVRow[] = [];

  validateCsv(headers);
  if (invalidCsv.value) return;

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    let validRow = true;
    const row = {};

    if (values.length === 1 && values[0].trim() === "") continue;

    for (let j = 0; j < headers.length; j++) {
      if (
        headers[j] &&
        values[j] &&
        values[j].trim() !== "" &&
        values[j].trim() !== " "
      ) {
        const key = headers[j].trim().replaceAll(" ", "_");
        const value = values[j].trim();
        row[key] = value;
      } else {
        validRow = false;
        invalidCsv.value = true;
        errorMessage.value = "Estudiante con datos inválidos";
      }
    }

    if (validRow) {
      data.push(row);
    } else {
      csvDataFailed.value.push(row);
    }
  }

  return data;
};

watch(files, () => {
  if (files.value.length == 0) {
    clearCsvField();
  }
  if (files.value.length > 0) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const csvText = e.target.result.toString();
        const parsedData = parseCSV(csvText);
        csvData.value = parsedData;
      }
    };

    reader.readAsText(files.value[0]);
  }
});

watch(invalidCsv, () => {
  if (invalidCsv.value) {
    setToaster(true, errorMessage.value, "error");
  }
});

function setToaster(isActive: boolean, text: string, color: string) {
  store.setToaster({
    isActive: isActive,
    text: text,
    color: color,
  });
}
</script>

<style scoped>
.error-row {
  background-color: rgb(var(--v-theme-error));
  color: white;
}
</style>
