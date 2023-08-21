<template>
    <v-main style="padding-left: 0%" class="mx-3">
        <v-card>
            <v-card-title class="text-center text-white " style="background-color: rgb(var(--v-theme-secondary-lighthen-1))">
                <span>Carga del {{ currentPeriod.numberPeriod }} Período Académico {{ currentPeriod.year }}</span>
            </v-card-title>
            <div class="d-flex align-center mx-4 my-2">
                <div>
                    <v-select v-model="itemsPerPage" :items="perPageOptions" variant="outlined"></v-select>
                </div>
                <span class="ml-3">Registros por página</span>
            </div>
            <v-table style="font-size: .8rem;" fixed-header density="comfortable" class="pa-3">
                <thead>
                    <tr>
                        <th class="pa-0 px-2">Sección</th>
                        <th class="pa-0 px-2">Cód.</th>
                        <th class="pa-0 px-2">Asignatura</th>
                        <th class="pa-0 px-2">Núm. Empleado</th>
                        <th class="pa-0 px-2">Docente</th>
                        <th class="pa-0 px-2">HI</th>
                        <th class="pa-0 px-2">HF</th>
                        <th class="pa-0 px-2">UV</th>
                        <th class="pa-0 px-2">Cant. de estudiantes matriculados</th>
                        <th class="pa-0 px-2">Cupos habilitidos</th>
                        <th class="pa-0 px-2">Días</th>
                        <th class="pa-0 px-2">Edificio</th>
                        <th class="pa-0 px-2">Aula</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedCargaPeriodo" :key="item">
                        <td class="text-left pa-0 px-2">{{ item.codeSection }}</td>
                        <td class="text-left pa-0 px-2">{{ item.idClass.code }}</td>
                        <td class="text-left pa-0 px-2">{{ item.idClass.name }}</td>
                        <td class="text-left pa-0 px-2">{{ item.idTeacher.employeeNumber }}</td>
                        <td class="text-left pa-0 px-2">{{ item.idTeacher.user.firstName }} {{ item.idTeacher.user.firstLastName }}</td>
                        <td class="text-left pa-0 px-2">{{ item.hour }}</td>
                        <td class="text-left pa-0 px-2">{{ item.finalHour }}</td>
                        <td class="text-center pa-0 px-2">{{ item.idClass.valueUnits }}</td>
                        <td class="text-center pa-0 px-2">{{ item.studentsRegistered }}</td>
                        <td class="text-center pa-0 px-2">{{ item.space }}</td>
                        <td class="text-left pa-0 px-2">{{ item.days }}</td>
                        <td class="text-center pa-0 px-2">{{ item.idClassroom.idBuilding.name }}</td>
                        <td class="text-center pa-0 px-2">{{ item.idClassroom.code }}</td>
                    </tr>
                </tbody>
            </v-table>
            <div class="d-flex justify-space-between align-center">
                <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" @input="changePage"
                    rounded="circle"></v-pagination>
                <div class="text-center">
                    <v-btn class="ma-6" color="primary">
                        <v-icon start icon="mdi-download-circle" size="x-large"></v-icon>Descargar
                        <v-menu activator="parent">
                            <v-list class="w-auto" style="min-width: 100px">
                                <v-list-item download @click="generatePDF">
                                    <v-btn class="bg-red text-center" block>
                                        <v-icon start icon="mdi-file-pdf-box" size="x-large"></v-icon>Descargar en PDF
                                    </v-btn>
                                </v-list-item>
                                <v-list-item download @click="downloadExcel">
                                    <v-btn class="bg-green text-center" block>
                                        <v-icon start icon="mdi-file-excel" size="x-large"></v-icon>Descargar en Excel
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
import { ref, computed, onMounted } from "vue";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import base64ImageJson from "/src/mock/imgBase64.json";
import PeriodService from "@/services/period/period.service";
import SectionService from "@/services/section/section.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const periods = ref([]);
const currentPeriod = ref({});

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const perPageOptions = [5, 10, 25, 50];
const itemsPerPage = ref(5);
const currentPage = ref(1);
const careerBoss = store.user.teacher.teachingCareer[0].centerCareer;
const academicCharge = ref([]);
onMounted(() => {
    getPeriods();
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodWithAcademicCharge();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];
    if (currentPeriod.value) {
        getAcademicCharge();
    } else {
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en estado de planificación académica o en matricula.",
            color: "error",
        });
    }
}

async function getAcademicCharge() {
    const response = await sectionService.getAcademicCharge(careerBoss.career.id, careerBoss.regionalCenter.id, currentPeriod.value.id);
    academicCharge.value = response.academicCharge;

}

// const cargaPeriodo = ref([
//   {
//     seccion: 1,
//     codAsignatura: "IS-110",
//     nombreAsignatura: "Introducción a la Ingeniería en Sistemas",
//     numDocente: 10,
//     nombreDocente: "Sofia Maria Gimenez",
//     matriculados: 8,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "305",
//   },
//   {
//     seccion: 2,
//     codAsignatura: "IS-210",
//     nombreAsignatura: "Programacion 2",
//     numDocente: 2,
//     nombreDocente: "Juan Alberto Perez",
//     matriculados: 15,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "302",
//   },
//   {
//     seccion: 3,
//     codAsignatura: "IS-210",
//     nombreAsignatura: "Programacion 2",
//     numDocente: 2,
//     nombreDocente: "Juan Alberto Perez",
//     matriculados: 12,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "302",
//   },
//   {
//     seccion: 4,
//     codAsignatura: "IS-410",
//     nombreAsignatura: "Programación Orientada a Objetos",
//     numDocente: 2,
//     nombreDocente: "Jesús Francisco Torres",
//     matriculados: 20,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "LAB-2",
//   },
//   {
//     seccion: 5,
//     codAsignatura: "IS-410",
//     nombreAsignatura: "Programación Orientada a Objetos",
//     numDocente: 23,
//     nombreDocente: "Jesús Francisco Torres de la Cruz",
//     matriculados: 10,
//     cuposHabilitados: 10,
//     edificio: "B2",
//     aula: "LAB-2",
//   },
//   {
//     seccion: 6,
//     codAsignatura: "IS-410",
//     nombreAsignatura: "Programación Orientada a Objetos",
//     numDocente: 23,
//     nombreDocente: "Jesús Francisco Torres",
//     matriculados: 15,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "LAB-2",
//   },
//   {
//     seccion: 7,
//     codAsignatura: "IS-914",
//     nombreAsignatura: "Liderazgo para el cambio",
//     numDocente: 12,
//     nombreDocente: "Mario Alberto Kempez",
//     matriculados: 15,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "404",
//   },
//   {
//     seccion: 8,
//     codAsignatura: "IS-914",
//     nombreAsignatura: "Liderazgo para el cambio",
//     numDocente: 12,
//     nombreDocente: "Mario Alberto Kempez",
//     matriculados: 20,
//     cuposHabilitados: 30,
//     edificio: "B2",
//     aula: "404",
//   },
//   {
//     seccion: 9,
//     codAsignatura: "IS-914",
//     nombreAsignatura: "Liderazgo para el cambio",
//     numDocente: 12,
//     nombreDocente: "Mario Alberto Kempez",
//     matriculados: 10,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "404",
//   },
//   {
//     seccion: 10,
//     codAsignatura: "IS-914",
//     nombreAsignatura: "Liderazgo para el cambio",
//     numDocente: 12,
//     nombreDocente: "Mario Alberto Kempez",
//     matriculados: 0,
//     cuposHabilitados: 20,
//     edificio: "B2",
//     aula: "404",
//   },
// ]);

const totalPages = computed(() =>
    Math.ceil(academicCharge.value.length / itemsPerPage.value)
);

const paginatedCargaPeriodo = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return academicCharge.value.slice(startIndex, endIndex);
});

const changePage = (page) => {
    currentPage.value = page;
};

const downloadExcel = () => {
    const headers = [
        "Seccion",
        "Cod.",
        "Asignatura",
        "Num. Empleado",
        "Docente",
        "HI",
        "HF",
        "UV",
        "Cant. de estudiantes matriculados",
        "Cupos habilitidos",
        "Dias",
        "Edificio",
        "Aula",
    ];
    const data = academicCharge.value.map((item) => [
        item.codeSection,
        item.idClass.code,
        item.idClass.name,
        item.idTeacher.employeeNumber,
        `${item.idTeacher.user.firstName} ${item.idTeacher.user.secondName} ${item.idTeacher.user.firstLastName} ${item.idTeacher.user.secondLastName}`,
        item.hour,
        item.finalHour,
        item.idClass.valueUnits,
        item.studentsRegistered,
        item.space,
        item.days.toString(),
        item.idClassroom.idBuilding.name,
        item.idClassroom.code,
    ]);

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
                    // widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
                    // widths: [45, 60, "*", 45, "*", 71, 65, 45],
                    body: [
                        [
                            { text: "Seccion", style: "tableHeader" },
                            { text: "Cod.", style: "tableHeader" },
                            { text: "Asignatura", style: "tableHeader" },
                            { text: "Num. Empleado", style: "tableHeader" },
                            { text: "Docente", style: "tableHeader" },
                            { text: "HI", style: "tableHeader" },
                            { text: "HF", style: "tableHeader" },
                            { text: "UV", style: "tableHeader" },
                            { text: "Cant. de estudiantes matriculados", style: "tableHeader" },
                            { text: "Cupos habilitidos", style: "tableHeader" },
                            { text: "Dias", style: "tableHeader" },
                            { text: "Edificio", style: "tableHeader" },
                            { text: "Aula", style: "tableHeader" },
                        ],
                        ...academicCharge.value.map((item) => [
                            { text: item.codeSection.toString(), style: "tableContent" },
                            { text: item.idClass.code, style: "tableContent" },
                            { text: item.idClass.name, style: "tableContent" },
                            { text: item.idTeacher.employeeNumber, style: "tableContent" },
                            { text: `${item.idTeacher.user.firstName} ${item.idTeacher.user.secondName} ${item.idTeacher.user.firstLastName} ${item.idTeacher.user.secondLastName}`, style: "tableContent" },
                            { text: item.hour, style: "tableContent" },
                            { text: item.finalHour, style: "tableContent" },
                            { text: item.idClass.valueUnits, style: "tableContent" },
                            { text: item.studentsRegistered, style: "tableContent" },
                            { text: item.space, style: "tableContent" },
                            { text: item.days.toString(), style: "tableContent" },
                            { text: item.idClassroom.idBuilding.name, style: "tableContent" },
                            { text: item.idClassroom.code, style: "tableContent" },
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
