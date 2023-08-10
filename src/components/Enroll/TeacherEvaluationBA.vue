<template>
    <div v-if="currentPeriod">
        <SearchableNavBar :title="myTitle" :label="myLabel" />
        <table>
        <thead>
            <tr>
            <th>Asignatura</th>
            <th>Código</th>
            <th>Sección</th>
            <th>Docente</th>
            <th>Evaluación</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="studentClass in filteredStudents" :key="studentClass.cod">
            <td>{{ studentClass.subject }}</td>
            <td>{{ studentClass.cod }}</td>
            <td>{{ studentClass.section }}</td>
            <td>{{ getTeacherName(studentClass.teacher) }}</td>
            <td>
                <v-btn color="primary" @click="showClassDetails(studentClass)" class="mr-2">ver detalle</v-btn>
            </td>
            </tr>
        </tbody>
        </table>

        <v-dialog v-model="showModal" persistent max-width="950">
        <v-card>
            <v-toolbar color="primary" dark>
                <v-toolbar-title>{{ selectedClass.subject + ' - ' + selectedClass.section }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
            <div>
                <h3 class="bg-blue darken-3 text-left pa-1">
                CARACTERÍSTICAS PERSONALES DEL DOCENTE
                </h3>
                <p>1. ¿El docente muestra interés para que los estudiantes aprendan?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>2. ¿El docente tiene una buena relación con los estudiantes en el aula de clase?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>
                3. ¿El docente respeta la dignidad humana del estudiante y jamás acude a
                expresiones o sátiras que buscan humillar por sus resultados académicos,
                o lo degrada por sus condiciones socioeconómicas, sexo, creencias religiosas
                o políticas o forma de vestir?
                </p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
            </div>
            <div class="ma-2">
                <h3 class="bg-blue darken-3 text-left pa-1">
                CARACTERÍSTICAS PEDAGÓGICAS Y DIDÁCTICAS DEL DOCENTE
                </h3>
                <p>1. ¿El profesor relaciona los saberes enseñados con el programa de estudio?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>2. ¿El profesor indaga los conocimientos previos de los estudiantes frente al tema que enseña?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>3. ¿El docente ofrece a sus estudiantes una bibliografía de los temas de la asignatura?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>4. ¿El docente tiene una secuencia en los temas de los contenidos de la asignatura?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
            </div>
            <v-divider></v-divider>
            <div class="ma-1">
                <h3 class="bg-blue darken-3 text-left pa-1">
                CARACTERÍSTICAS DISCIPLINARES
                </h3>
                <p>1. ¿El docente demuestra dominio en su área o disciplina?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>2. ¿El docente promueve y facilita el aprendizaje de los contenidos de los estudiantes?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <p>3. ¿El docente demuestra en el aula su capacidad de enseñar los saberes de su asignatura?</p>
                <table class="table">
                <thead>
                    <tr>
                    <th>Deficiente</th>
                    <th>Insuficiente</th>
                    <th>Regular</th>
                    <th>Bueno</th>
                    <th>Excelente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    <td>{{ getRandomNumber() }}</td>
                    </tr>
                </tbody>
                </table>
                <v-divider></v-divider>
                <div>
                    <h3 class="bg-blue-darken-3 text-left py-1" >
                        OBSERVACIONES
                        <v-btn @click="showObservations = !showObservations" icon size="x-small">
                            <v-icon >
                                {{ showObservations ? "mdi-chevron-up" : "mdi-chevron-down" }}
                            </v-icon>
                        </v-btn>
                    </h3>
                    <template v-if="showObservations">
                        <ul class="observation-list">
                        <li v-for="observation in observations" :key="observation" class="observation-item">{{ observation }}</li>
                        </ul>
                    </template>
                </div>

            </div>
            </v-card-text>
            <v-card-actions class="fixed-footer">
            <v-spacer></v-spacer>
            <v-btn color="bg-blue-darken-3" @click="showModal = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref,onMounted,computed } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import PeriodService from "@/services/period/period.service";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const servicePeriod = new PeriodService();
const periods = ref([]);
const currentPeriod = ref({});


onMounted(() => {
    getPeriods();
});

async function getPeriods() {
    const response = await servicePeriod.getPeriodGrades();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];

    if (!currentPeriod.value) {
       
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en ingreso de notas.",
            color: "error",
        });
    }

}


const observations = ref([
"El docente muestra interés en la asignatura.",
"La relación con los estudiantes es positiva.",
"Respeta la dignidad de los estudiantes en todo momento.",
]);
const classList = ref([
{
    subject: "Contabilidad I",
    cod: "IS-921",
    section: "1100",
    teacher: "Carlos Hernandez",
},
{
    subject: "Compiladores",
    cod: "IS-292",
    section: "1200",
    teacher: "Fernando urrutia",
},
]);

const showModal = ref(false);
const selectedClass = ref({});

const searchQuery = ref("");

const filteredStudents = computed(() => {
  const searchQueryValue = searchQuery.value.toLowerCase().trim();
  if (!searchQueryValue) {
    return classList.value;
  } else {
    return classList.value.filter((studentClass) =>
      studentClass.subject.toLowerCase().includes(searchQueryValue)
    );
  }
});

function getTeacherName(teacherId) {
return teacherId;
}

const myTitle = "Evaluación de Estudiantes";
const myLabel = "Clase";

const showClassDetails = (studentClass) => {
selectedClass.value = studentClass;
showModal.value = true;
};

const getRandomNumber = () => {
return Math.floor(Math.random() * 10) + 1;
};
const showObservations = ref(false);

// Handling the filter event
document.addEventListener("filter", (event) => {
  searchQuery.value = event.detail;
});

// Resetting the search query when resetFilter event is received
document.addEventListener("resetFilter", () => {
  searchQuery.value = "";
});
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

.fixed-footer {
position: sticky;
bottom: 0;
background-color: white;
border-top: 1px solid rgba(var(--v-theme-base-border-color), 0.12);
padding: 16px;
}
.observation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Estilos para los elementos de la lista */
.observation-item {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
