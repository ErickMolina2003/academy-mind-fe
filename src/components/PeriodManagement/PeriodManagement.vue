<template>
  <div>
    <SearchableNavBar title="Estados del Periodo" />
    <h1>Año académico {{ new Date().getFullYear() }}</h1>
    <v-table class="mx-6 mt-4" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Periodo</th>
          <th class="text-left">Estado</th>
          <th
            v-if="periodToModify.idStatePeriod?.name !== 'Finalizado'"
            class="text-left pa-0"
          >
            Acciones
          </th>
          <th
            v-if="periodToModify.idStatePeriod?.name === 'Matricula'"
            class="text-left"
          >
            Fechas de Matricula
          </th>
          <th v-if="periodToModify.idStatePeriod?.name === 'En curso'">
            Cancelaciones Excepcionales
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="period in periods" class="text-left">
          <td>{{ period.numberPeriod }} PAC {{ period.year }}</td>
          <td>{{ period.idStatePeriod.name }}</td>
          <td v-if="periodToModify.idStatePeriod?.name !== 'Finalizado'">
            <v-row
              v-if="
                (period.id === periodToModify.id &&
                  periodToModify.idStatePeriod.name !== 'Finalizado') ||
                (periodToModify.idStatePeriod.name === 'En curso' &&
                  period.id === periodToModifyNext.id &&
                  periodToModifyNext.idStatePeriod.name !== 'Planificacion' &&
                  periodToModifyNext.idStatePeriod.name !== 'Finalizado')
              "
            >
              <v-icon class="me-3" @click="showState(period)">{{
                "mdi-pencil"
              }}</v-icon>
            </v-row>
          </td>
          <td
            v-if="
              periodToModify.idStatePeriod?.name === 'Matricula' ||
              periodToModify.idStatePeriod?.name === 'En curso'
            "
          >
            <v-btn
              v-if="period.idStatePeriod.name === 'Matricula'"
              @click="dialogDates = true"
              >Mostrar Fechas de Matrícula</v-btn
            >
            <v-btn
              v-if="
                period.idStatePeriod.name === 'En curso' &&
                !cancelStartDate &&
                !cancelEndDate
              "
              @click="cancelDatesModalOpen = true"
              >Establecer Fechas</v-btn
            >

            <div
              v-if="
                period.idStatePeriod.name === 'En curso' &&
                cancelStartDate &&
                cancelEndDate
              "
            >
              <p>Fecha de inicio de cancelaciones: {{ cancelStartDate }}</p>
              <p>Fecha final de cancelaciones: {{ cancelEndDate }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-text>
          <v-form v-model="form">
            <v-autocomplete
              v-model="chosenState"
              class="mt-4"
              label="Estados"
              :items="statesNames"
              :rules="[rules.required]"
            >
            </v-autocomplete>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="blue" @click="openConfirmationDialog()"
            >Cambiar de estado</v-btn
          >
          <v-btn color="red" @click="closeDialog()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" width="300px">
      <v-card>
        <v-card-text>
          ¿Está seguro que quiere cambiar el estado del período a:
          <strong>{{ chosenState }}</strong>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="blue" @click="confirmAndChange()">Confirmar</v-btn>
          <v-btn color="red" @click="closeDialog()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para establecer fechas de cancelaciones -->
    <v-dialog v-model="dialogDates" max-width="800px">
      <v-card class="pa-3">
        <v-card-title>Fechas de Matrícula</v-card-title>
        <v-card-text>
          <v-table fixed-header dense>
            <tr>
              <th class="font-weight-bold px-0">FECHA</th>
              <th class="font-weight-bold px-0">HORA</th>
              <th class="font-weight-bold px-0">ESTUDIANTES</th>
            </tr>

            <tbody>
              <v-spacer></v-spacer>
              <tr v-for="(fecha, index) in fechas" :key="index">
                <td class="px-0">{{ fecha.fecha }}</td>
                <td class="px-0">{{ fecha.hora }}</td>
                <td class="px-0">
                  <v-list>
                    <v-list-item
                      v-for="(estudiante, estIndex) in fecha.estudiantes"
                      :key="estIndex"
                    >
                      {{ estudiante }}
                    </v-list-item>
                  </v-list>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <div class="d-flex justify-center">
          <v-btn @click="generatePDF" color="primary me-3">Descargar PDF</v-btn>
          <v-btn @click="closeDialog()" color="primary">Cerrar</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Modal para establecer fechas de cancelaciones -->
    <v-dialog v-model="cancelDatesModalOpen" max-width="800px">
      <v-card class="pa-3">
        <v-card-title>Establecer Fechas de Cancelaciones</v-card-title>

        <v-form ref="form" v-model="isFormValid">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="cancelStartDate"
                label="Fecha de inicio de cancelaciones"
                type="date"
                :rules="[required, validateStartDate]"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="cancelEndDate"
                :disabled="!cancelStartDate"
                label="Fecha final de cancelaciones"
                type="date"
                :rules="[required, validateEndDate]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions class="fixed-footer">
          <v-btn
            class="me-3"
            @click="
              cancelDatesModalOpen = false;
              cancelStartDate = null;
              cancelEndDate = null;
            "
            >Cancelar</v-btn
          >
          <v-btn @click="setCancelDates" :disabled="!isFormValid"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import SearchableNavBar from "../NavBars/SearchableNavBar.vue";
import StatePeriodService from "@/services/state-period/statePeriod.service";
import PeriodService from "@/services/period/period.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import base64ImageJson from "/src/mock/imgBase64.json";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const dialog = ref(false);
const form = ref(false);
const dialogConfirmation = ref(false);
const showAutocomplete = ref(false);
const chosenState = ref("");
const dialogDates = ref(false);
const states = ref([]);
const serviceStatePeriod = new StatePeriodService();
const servicePeriod = new PeriodService();
const modalOpen = ref(false);
const cancelDatesModalOpen = ref(false);
const cancelStartDate = ref(null);
const cancelEndDate = ref(null);
const isFormValid = ref(false);
const periods = ref([]);
const periodToModify = ref({});
const periodToModifyNext = ref({});
const statesNames = ref([]);
const periodRightNow = ref({});
const fechas = ref([
  {
    fecha: "",
    hora: "9:00am a 11:59pm",
    estudiantes: [
      "Índice global de excelencia académica (84-100)",
      "Primer ingreso",
    ],
  },
  {
    fecha: "",
    hora: "9:00am a 11:59pm",
    estudiantes: ["Índice global de excelencia académica (80-83)"],
  },
  {
    fecha: "",
    hora: "9:00am a 11:59pm",
    estudiantes: ["Índice global (73-79)"],
  },
  {
    fecha: "",
    hora: "9:00am a 11:59pm",
    estudiantes: ["Índice global (65-72)"],
  },
  {
    fecha: "",
    hora: "9:00am a 11:59pm",
    estudiantes: ["Índice global (0-64)"],
  },
]);

onMounted(async () => {
  cancelStartDate.value = null;
  cancelEndDate.value = null;
  getStates();
  getPeriods();
  getRegistrationDates();
  // getCancelationsDates();
});

async function getPeriods() {
  const response = await servicePeriod.getPeriodsByYear(
    new Date().getFullYear()
  );
  periods.value = response.periods;
  periodToModify.value = periods.value[0];
  periodRightNow.value = periodToModify.value;
  if (periodToModify.value.idStatePeriod?.name === "En curso") {
    periodToModifyNext.value = periods.value[1];
    cancelStartDate.value = null;
    cancelEndDate.value = null;
    getCancelationsDates();
  }
}

async function getCancelationsDates() {
  const response = await servicePeriod.getPeriodOngoing();

  
  if (response.periods[0]?.exceptionalCancelationStarts) {
    cancelStartDate.value = new Date(response.periods[0].exceptionalCancelationStarts).toISOString().split('T')[0];
    cancelEndDate.value = new Date(response.periods[0].exceptionalCancelationEnds).toISOString().split('T')[0];
  }
}

async function getRegistrationDates() {
  const response = await servicePeriod.getPeriodRegistrationPlanification();

  if (response.periods[0]?.dayOne) {
    fechas.value[0].fecha = formatDate(response.periods[0].dayOne);
    fechas.value[1].fecha = formatDate(response.periods[0].dayTwo);
    fechas.value[2].fecha = formatDate(response.periods[0].dayThree);
    fechas.value[3].fecha = formatDate(response.periods[0].dayFour);
    fechas.value[4].fecha = formatDate(response.periods[0].dayFive);
  }
}

function formatDate(inputDate) {
  const dateObj = new Date(inputDate);

  const localDateObj = new Date(
    dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
  );

  const day = localDateObj.getDate();
  const month = localDateObj.getMonth();

  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const monthName = monthNames[month];

  const formattedDate = `${day} ${monthName}`;

  return formattedDate;
}

const showModal = () => {
  modalOpen.value = true;
};

const showCancelDatesModal = () => {
  cancelDatesModalOpen.value = true;
};

async function setCancelDates() {
  if (!isFormValid.value) return;
  
  

  const response = await servicePeriod.modifyCancelationsDates(
    periodRightNow.value.id,
    {
      exceptionalCancelationStarts: cancelStartDate.value,
      exceptionalCancelationEnds: cancelEndDate.value,
    }
  );

  cancelDatesModalOpen.value = false;
}

const generatePDF = () => {
  const pdfContent = {
    pageSize: "LETTER",
    watermark: { text: "UNAH", color: "#184267", opacity: 0.1, bold: true },
    content: [
      {
        text: [
          { text: "CALENDARIO DE ", style: "header" },
          {
            text: "MATRICULA ",
            style: "header",
          },
          { text: "\nA NIVEL NACIONAL", style: "subheader" },
        ],
      },
      {
        image: base64ImageJson.base64Image,
        width: 100,
        absolutePosition: { x: 450, y: 40 },
      },
      {
        margin: [0, 25, 0, 0],
        table: {
          headerRows: 1,
          heights: 50,
          widths: [100, "*", "*"],
          body: [
            [
              { text: "\nFECHA", style: "tableHeader" },
              { text: "\nHORA", style: "tableHeader" },
              { text: "\nESTUDIANTES", style: "tableHeader" },
            ],
            ...fechas.value.map((fecha) => [
              { text: "\n" + fecha.fecha, style: "tableContent" },
              { text: "\n" + fecha.hora, style: "tableContent" },
              {
                text: "\n" + fecha.estudiantes.join("\n"),
                style: "tableContent",
              },
            ]),
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return i === 0 || i === node.table.widths.length ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "black";
          },
          vLineColor: function (i, node) {
            return i === 0 || i === node.table.widths.length
              ? "black"
              : "black";
          },
        },
      },
      {
        margin: [0, 285, 0, 0],
        text: "Universidad Nacional Autónoma de Honduras",
        style: ["quote", "small"],
        alignment: "center",
      },
    ],
    styles: {
      header: {
        fontSize: 25,
      },
      subheader: {
        fontSize: 15,
      },
      tableHeader: {
        fontSize: 14,
        fillColor: "#013571",
        color: "white",
        alignment: "center",
        bold: true,
      },
      tableContent: {
        fontSize: 12,
        alignment: "center",
      },
    },
  };

  pdfMake.createPdf(pdfContent).download("fechas_de_matricula.pdf");
};

async function getStates() {
  states.value = await serviceStatePeriod.getStatePeriods();
}

function showState(actualState) {
  const stateOrder = [
    "Por definir",
    "Planificacion",
    "Matricula",
    "En curso",
    "Ingreso de notas",
    "Finalizado",
  ];
  statesNames.value = [];

  let currentStateIndex = stateOrder.indexOf(actualState.idStatePeriod.name);
  let nextStateIndex = currentStateIndex + 1;

  if (nextStateIndex >= stateOrder.length) {
    nextStateIndex = currentStateIndex;
  }

  let nextState = stateOrder[nextStateIndex];
  statesNames.value = [nextState];
  periodRightNow.value = actualState;

  dialog.value = true;
}

function openConfirmationDialog() {
  if (!form.value) return;

  dialogConfirmation.value = true;
}

function closeDialog() {
  dialogConfirmation.value = false;
  dialog.value = false;
  cancelDatesModalOpen.value = false;
  dialogDates.value = false;
  chosenState.value = "";
  showAutocomplete.value = false;
}

async function confirmAndChange() {
  const newState = states.value.statePeriods.find(
    (state) => state.name === chosenState.value
  );

  await servicePeriod.updatePeriod(periodRightNow.value.id, {
    idStatePeriod: newState.id,
  });

  getRegistrationDates();
  getPeriods();
  closeDialog();
}

const validateStartDate = (value) => {
  if (!value) return true;
  
  let today = new Date();
  today.setHours(0, 0, 0, 0)

  let selectedDate = new Date(value);
  selectedDate.setDate(selectedDate.getDate() + 1);
  selectedDate.setHours(0, 0, 0, 0);
  // Formatear la fecha ingresada al formato "yyyy-MM-dd"
  selectedDate = new Date(selectedDate).toISOString().split('T')[0];
  today = new Date(today).toISOString().split('T')[0];
  
  
  cancelStartDate.value = selectedDate;
  if (selectedDate >= today) return true;
  return "La fecha debe ser hoy o posterior";
};

const validateEndDate = (value) => {
  if (!value) return true;
  

  let selectedDate = new Date(value);
  selectedDate.setDate(selectedDate.getDate() + 1);
  selectedDate.setHours(0, 0, 0, 0);
  selectedDate = new Date(selectedDate).toISOString().split('T')[0];
  cancelEndDate.value = selectedDate;
  
  

  if (selectedDate > cancelStartDate.value) return true;
  return "La fecha de cierre debe ser posterior a la fecha de inicio";
};

const rules = {
  required: (value) => !!value || "Campo obligatorio.",
};

const required = (value) => !!value || "Este campo es requerido";
</script>

<style scoped>
td {
  text-align: left;
}
</style>

