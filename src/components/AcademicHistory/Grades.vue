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
          <v-btn color="deep-purple-accent-4" @click="generatePDF">
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import base64ImageJson from "/src/mock/logoBase64.json";
import sello from "/src/mock/selloBase64.json";
import academicHistory from "/src/mock/historial-academico.json";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  gradesSum: userLogged.gradesSum,
  unitValuesSum: userLogged.unitValuesSum,
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

function generateYearlyTables(registrations) {
  const years = {}; // Almacena los registros agrupados por año
  console.log(registrations);
  // Grupo de registros por año
  registrations.forEach((registration) => {
    const year = registration.section.idPeriod.year;
    if (!years[year]) {
      years[year] = [];
    }
    years[year].push(registration);
  });

  // Generación de tabla para cada año
  const tables = [];
  for (const year in years) {
    years[year].sort(
      (a, b) =>
        a.section.idPeriod.numberPeriod - b.section.idPeriod.numberPeriod
    );
    const yearTable = {
      text: `________________________________ ${year} ________________________________`,
      style: "divider",
    };
    const tableData = {
      table: {
        headerRows: 1,
        widths: [50, "*", 40, 60, 40, 30],
        body: [
          [
            { text: "CODIGO", style: "tableHeader", alignment: "left" },
            { text: "NOMBRE", style: "tableHeader", alignment: "left" },
            { text: "UV", style: "tableHeader" },
            { text: "PERIODO", style: "tableHeader" },
            { text: "NOTA", style: "tableHeader" },
            { text: "OBS", style: "tableHeader" },
          ],
          ...years[year].map((registration) => [
            {
              text: registration.section.idClass.code,
              style: "tableContent",
              alignment: "left",
            },
            {
              text: registration.section.idClass.name,
              style: "tableContent",
              alignment: "left",
            },
            {
              text: registration.section.idClass.valueUnits.toString(),
              style: "tableContent",
            },
            {
              text: registration.section.idPeriod.numberPeriod.toString(),
              style: "tableContent",
            },
            { text: registration.note, style: "tableContent" },
            { text: registration.stateClass, style: "tableContent" },
          ]),
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return 0; // Elimina las líneas horizontales
        },
        vLineWidth: function (i, node) {
          return 0; // Elimina las líneas verticales
        },
      },
    };

    // Clases totales aprobadas, resumen
    const approvedClasses = years[year].filter(
      (registration) => registration.stateClass === "APR"
    ).length;
    const summaryText = {
      text: `\nTotal Aprobadas: ${approvedClasses}`,
      style: "clasesAprobadas",
    };

    tables.push(yearTable, tableData, summaryText);
  }

  return tables;
}

const generatePDF = () => {
  console.log(academicHistory);
  console.log(subjects.value);
  const docDefinition = {
    pageSize: "LETTER",
    watermark: { text: "UNAH", color: "#184267", opacity: 0.1, bold: true },
    header: function (currentPage) {
      const headerContent = [];
      if (currentPage > 1) {
        headerContent.push({
          columns: [
            {
              text: `${user.accountNumber}`,
              alignment: "left",
              margin: [40, 15],
            },
            {
              text: `${store.user.firstName} ${store.user.secondName} ${store.user.firstLastName} ${store.user.secondLastName}`,
              alignment: "left",
              margin: [20, 15],
            },
          ],
        });
      }
      headerContent.push({
        image: sello.base64Image, // Cambia por la URL de tu imagen
        height: 160,
        width: 100, // Ajusta el ancho de la imagen según tus necesidades
        opacity: 0.4, // Ajusta la opacidad de la imagen
        absolutePosition: { x: 250, y: 300 }, // Posición absoluta en la página
      });
      return headerContent;
    },
    footer: function (currentPage, pageCount) {
      return {
        columns: [
          {
            text: '"La Educación es la Primera Necesidad de La República"',
            style: "footer",
            alignment: "center",
            margin: [15, 5],
          },
          {
            text: `Página ${currentPage} de ${pageCount}`,
            style: "footer",
            alignment: "right",
            margin: [35, 5],
          },
        ],
      };
    },
    content: [
      {
        text: [
          {
            text: "Universidad Nacional Autónoma de Honduras",
            style: "header",
          },
          {
            text: "\nDirección de Ingresos Permanencia y Promoción",
            style: "subheader",
          },
          { text: "\nHistorial Académico", style: "subheader" },
        ],
      },
      {
        image: base64ImageJson.base64Image,
        height: 80,
        width: 50,
        absolutePosition: { x: 30, y: 30 },
      },
      {
        margin: [0, 25, 0, 0],
        table: {
          heights: 70,
          widths: [230, "*"],
          body: [
            [
              {
                type: "none",
                ol: [
                  `\nCuenta:\t  ${user.accountNumber}`,
                  `Nombre:\t${store.user.firstName} ${store.user.secondName}`,
                  `Apellido:\t${store.user.firstLastName} ${store.user.secondLastName}`,
                ],
                style: "personalInfo",
              },
              {
                type: "none",
                ol: [
                  `\nCarrera Actual: ${user.career}`,
                  `Centro: ${user.center}`,
                  `Índice: ${user.globalIndex}`,
                ],
                style: "personalInfo",
              },
            ],
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
        margin: [0, 20, 0, 0],
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: `${user.career}`,
                style: "personalInfo",
                alignment: "center",
                fontSize: 16,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            return 0; // Elimina las líneas horizontales
          },
          vLineWidth: function (i, node) {
            return 0; // Elimina las líneas verticales
          },
        },
      },
      ...generateYearlyTables(subjects.value),
      {
        stack: [
          {
            style: "clasesAprobadas",
            text: [
              {
                text: "______________________________________________________________________",
                alignment: "center",
              },
              { text: "\n\nCálculo del índice académico" },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              headerRows: 1,
              body: [
                [
                  "Suma de UV x Nota:",
                  { text: `${user.gradesSum}`, alignment: "center" },
                ],
                [
                  "Suma de UV:",
                  { text: `${user.unitValuesSum}`, alignment: "center" },
                ],
                [
                  "lndice académico:",
                  {
                    text: `${user.gradesSum} / ${user.unitValuesSum} = ${user.globalIndex}%`,
                    alignment: "center",
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
        ],
        pageBreak: "before",
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        alignment: "center",
        bold: true,
      },
      subheader: {
        fontSize: 16,
        alignment: "center",
        bold: true,
      },
      personalInfo: {
        fontSize: 12,
        fillColor: "#b3b3b3",
        color: "black",
        alignment: "left",
        bold: true,
      },
      tableHeader: {
        fontSize: 12,
        alignment: "center",
        bold: true,
      },
      tableContent: {
        fontSize: 12,
        alignment: "center",
      },
      footer: {
        fontSize: 11,
      },
      divider: {
        fontSize: 15,
        alignment: "center",
        margin: [0, 20, 0, 10],
        bold: true,
      },
      clasesAprobadas: {
        fontSize: 12,
        alignment: "left",
        margin: [20, 10, 0, 0],
        bold: true,
      },
    },
  };
  pdfMake.createPdf(docDefinition).download("historial_academico.pdf");
};
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
