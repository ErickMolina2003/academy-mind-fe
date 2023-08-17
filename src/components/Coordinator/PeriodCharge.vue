<template>
  <v-main style="padding-left: 0%" class="mx-3">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Carga del Período</span>
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
      <v-table id="dataTable">
        <thead>
          <tr>
            <th class="text-left" style="padding: 3px">Sección</th>
            <th class="text-center">Cód. Asignatura</th>
            <th class="text-left">Asignatura</th>
            <th class="text-center">Núm. Docente</th>
            <th class="text-left">Docente</th>
            <th class="text-center" style="padding: 3px">Matriculados</th>
            <th class="text-center" style="padding: 3px">Cupos Habilitados</th>
            <th class="text-center">Edificio</th>
            <th class="text-center">Aula</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedCargaPeriodo" :key="item.seccion">
            <td class="text-left">{{ item.seccion }}</td>
            <td class="text-center">{{ item.codAsignatura }}</td>
            <td class="text-left">{{ item.nombreAsignatura }}</td>
            <td class="text-center">{{ item.numDocente }}</td>
            <td class="text-left">{{ item.nombreDocente }}</td>
            <td class="text-center">{{ item.matriculados }}</td>
            <td class="text-center">{{ item.cuposHabilitados }}</td>
            <td class="text-center">{{ item.edificio }}</td>
            <td class="text-left">{{ item.aula }}</td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex justify-space-between align-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          @input="changePage"
          rounded="circle"
        ></v-pagination>
        <div class="text-center">
          <v-btn class="ma-6" color="primary">
            <v-icon start icon="mdi-download-circle" size="x-large"></v-icon
            >Descargar
            <v-menu activator="parent">
              <v-list class="w-auto" style="min-width: 100px">
                <v-list-item download @click="generatePDF">
                  <v-btn class="bg-red text-center" block>
                    <v-icon
                      start
                      icon="mdi-file-pdf-box"
                      size="x-large"
                    ></v-icon
                    >Descargar en PDF
                  </v-btn>
                </v-list-item>
                <v-list-item download @click="downloadExcel">
                  <v-btn class="bg-green text-center" block>
                    <v-icon start icon="mdi-file-excel" size="x-large"></v-icon
                    >Descargar en Excel
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-main>
</template>

<script setup>
import { ref, computed } from "vue";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import base64ImageJson from "/src/mock/imgBase64.json";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const perPageOptions = [5, 10, 25, 50];
const itemsPerPage = ref(5);
const currentPage = ref(1);

const cargaPeriodo = ref([
  {
    seccion: 1,
    codAsignatura: "IS-110",
    nombreAsignatura: "Introducción a la Ingeniería en Sistemas",
    numDocente: 10,
    nombreDocente: "Sofia Maria Gimenez",
    matriculados: 8,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "305",
  },
  {
    seccion: 2,
    codAsignatura: "IS-210",
    nombreAsignatura: "Programacion 2",
    numDocente: 2,
    nombreDocente: "Juan Alberto Perez",
    matriculados: 15,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "302",
  },
  {
    seccion: 3,
    codAsignatura: "IS-210",
    nombreAsignatura: "Programacion 2",
    numDocente: 2,
    nombreDocente: "Juan Alberto Perez",
    matriculados: 12,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "302",
  },
  {
    seccion: 4,
    codAsignatura: "IS-410",
    nombreAsignatura: "Programación Orientada a Objetos",
    numDocente: 2,
    nombreDocente: "Jesús Francisco Torres",
    matriculados: 20,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "LAB-2",
  },
  {
    seccion: 5,
    codAsignatura: "IS-410",
    nombreAsignatura: "Programación Orientada a Objetos",
    numDocente: 23,
    nombreDocente: "Jesús Francisco Torres de la Cruz",
    matriculados: 10,
    cuposHabilitados: 10,
    edificio: "B2",
    aula: "LAB-2",
  },
  {
    seccion: 6,
    codAsignatura: "IS-410",
    nombreAsignatura: "Programación Orientada a Objetos",
    numDocente: 23,
    nombreDocente: "Jesús Francisco Torres",
    matriculados: 15,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "LAB-2",
  },
  {
    seccion: 7,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 15,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "404",
  },
  {
    seccion: 8,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 20,
    cuposHabilitados: 30,
    edificio: "B2",
    aula: "404",
  },
  {
    seccion: 9,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 10,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "404",
  },
  {
    seccion: 10,
    codAsignatura: "IS-914",
    nombreAsignatura: "Liderazgo para el cambio",
    numDocente: 12,
    nombreDocente: "Mario Alberto Kempez",
    matriculados: 0,
    cuposHabilitados: 20,
    edificio: "B2",
    aula: "404",
  },
]);

const totalPages = computed(() =>
  Math.ceil(cargaPeriodo.value.length / itemsPerPage.value)
);

const paginatedCargaPeriodo = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return cargaPeriodo.value.slice(startIndex, endIndex);
});

const changePage = (page) => {
  currentPage.value = page;
};

const downloadExcel = () => {
  const headers = [
    "SECCIÓN",
    "CÓD. ASIGNATURA",
    "ASIGNATURA",
    "NÚM. DOCENTE",
    "DOCENTE",
    "MATRICULADOS",
    "CUPOS HABILITADOS",
    "EDIFICIO",
    "AULA",
  ];
  const data = cargaPeriodo.value.map((row) =>
    Object.values(row).map((value) => value.toString())
  );

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...data].map((row) => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Carga_Periodo.csv");
  document.body.appendChild(link);
  link.click();
};

const generatePDF = () => {
  const docDefinition = {
    pageSize: "LETTER",
    pageOrientation: "landscape",
    pageMargins: [40, 40, 40, 40],
    watermark: { text: "UNAH", color: "#184267", opacity: 0.1, bold: true },
    content: [
      {
        style: "title",
        table: {
          widths: "*",
          body: [[{ text: "CARGA DEL PERÍODO", style: "header" }]],
        },
        layout: "noBorders",
      },
      {
        image: base64ImageJson.base64Image,
        width: 100,
        absolutePosition: { x: 40, y: 40 },
      },
      {
        table: {
          headerRows: 1,
          widths: [45, 60, "*", 45, "*", "*", 63, 45, 45],
          //widths: [45, 60, "*", 45, "*", 71, 65, 45, 45],
          body: [
            [
              { text: "\nSección", style: "tableHeader" },
              { text: "Cód. Asignatura", style: "tableHeader" },
              { text: "\nAsignatura", style: "tableHeader" },
              { text: "Núm. Docente", style: "tableHeader" },
              { text: "\nDocente", style: "tableHeader" },
              { text: "\nMatriculados", style: "tableHeader" },
              { text: "Cupos Habilitados", style: "tableHeader" },
              { text: "\nEdificio", style: "tableHeader" },
              { text: "\nAula", style: "tableHeader" },
            ],
            ...cargaPeriodo.value.map((item) => [
              { text: item.seccion.toString(), style: "tableContent" },
              { text: item.codAsignatura, style: "tableContent" },
              { text: item.nombreAsignatura, autoSize: true },
              { text: item.numDocente.toString(), style: "tableContent" },
              { text: item.nombreDocente, autoSize: true },
              { text: item.matriculados, style: "tableContent" },
              { text: item.cuposHabilitados, style: "tableContent" },
              { text: item.edificio, style: "tableContent" },
              { text: item.aula, style: "tableContent" },
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
    ],
    styles: {
      header: {
        fontSize: 18,
        margin: [0, 10, 0, 10],
      },
      tableHeader: {
        fontSize: 12,
        fillColor: "#013571",
        color: "white",
        alignment: "center",
        bold: true,
      },
      tableContent: {
        autoSize: true,
        alignment: "center",
      },
      title: {
        margin: [0, 0, 0, 20],
        alignment: "center",
        bold: true,
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("Carga_Periodo.pdf");
};
</script>
