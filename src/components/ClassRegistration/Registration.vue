<template>
  <v-main v-if="state === 'Matricula'" style="padding-left: 0%;">
    <v-container fluid>
      <h1 style="color: #CC6600;">Matricula</h1>
      <v-divider :thickness="5" class="pb-6 mt-2"></v-divider>
      <v-card>
        <v-card-title class="text-center text-white" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
          <span class="headline ">Datos del estudiante</span>
        </v-card-title>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-black">Nombre</th>
                <th class="text-left text-black">Carrera</th>
                <th class="text-left text-black">Año</th>
                <th class="text-left text-black">Periodo</th>
                <th class="text-left text-black">Unidades Valorativas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ `${studentLogged.firstName} ${studentLogged.secondName} ${studentLogged.firstLastName}
                                  ${studentLogged.secondLastName}` }}</td>
                <td>{{ studentLogged.student.studentCareer[0].centerCareer.career.name }}</td>
                <td>2023</td>
                <td>{{ period.numberPeriod}}</td>
                <td>{{ store.units }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
      <v-card class="mt-5" max-width="300" variant="outlined" color="secondary-lighthen-1">
        <div class="my-4 mx-3">
          <h3 class="text-black">Menú opciones:</h3>
          <v-card style="width: 100%; " class="mt-3">
            <v-card-actions>
              <v-btn @click="openModal">Seleccionar Asignatura</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card>
      <v-dialog v-model="showModal">
        <div class="modal">
          <div style="text-align: right;">
            <a href="#" @click="closeModal">Cerrar Ventana</a>
          </div>
          <h3 style="text-align: center; color: rgb(var(--v-theme-text-2));">Detalles de asignatura</h3>
          <v-row>
            <v-col cols="6">
              <div style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <h4 class="mb-2  text-white text-center">Asignaturas</h4>
              </div>
              <v-card class="pa-4">
                <v-virtual-scroll :items="classNames.map((item) => `${item.name}`)" item-height="48"
                  class="virtual-scroll-list">
                  <template #default="{ item }">
                    <v-list-item :key="item" @click="seleccionarAsignatura(item)"
                      :class="{ 'list-item-selected': item === asignaturaSeleccionada }">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-card>
            </v-col>

            <v-col cols="6">
              <div style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <h4 class="mb-2  text-white text-center">Secciones</h4>
              </div>
              <v-card class="pa-4">
                <v-virtual-scroll :items="seccionesFiltradas" item-height="48" class="virtual-scroll-list">
                  <template #default="{ item }">
                    <v-list-item :key="item.id" @click="seleccionarSeccion(item)"
                      :class="{ 'list-item-selected': item === seccionSeleccionada }">
                      <v-list-item-title>{{ item.codeSection }} HI:{{ item.hour }} HF:{{ item.finalHour }} {{
                        getTeacherSection(item.idTeacher.employeeNumber) }} {{isWaitingList(item.waitingList)}}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-card>
            </v-col>
          </v-row>
          <div class="pt-2 d-flex justify-end">
            <v-btn color="primary" dark @click="matricularAsignatura">Matricular</v-btn>
          </div>
        </div>
      </v-dialog>
      <v-card class="mt-5">
        <v-card-title class="text-center" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
          <span class="headline text-white">Asignaturas Matriculadas</span>
        </v-card-title>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-black">Cod.</th>
                <th class="text-left text-black">Asignatura</th>
                <th class="text-left text-black">Seccion</th>
                <th class="text-left text-black">HI</th>
                <th class="text-left text-black">HF</th>
                <th class="text-left text-black">Dias</th>
                <th class="text-left text-black">Edificio</th>
                <th class="text-left text-black">Aula</th>
                <th class="text-left text-black">UV</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="normalTuitions" v-for="item in normalTuitions" :key="item.id">
                <td>{{ item.section.idClass.code }}</td>
                <td>{{ item.section.idClass.name }}</td>
                <td>{{ item.section.codeSection }}</td>
                <td>{{ item.section.hour }}</td>
                <td>{{ item.section.finalHour }}</td>
                <td>{{ item.section.days }}</td>
                <td>{{ item.section.idClassroom.idBuilding.name }}</td>
                <td>{{ item.section.idClassroom.code }}</td>
                <td>{{ item.section.idClass.valueUnits }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
      <v-card class="mt-5">
        <v-card-title class="text-center" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
          <span class="headline text-white">Asignaturas En Lista de Espera</span>
        </v-card-title>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-black">Cod.</th>
                <th class="text-left text-black">Asignatura</th>
                <th class="text-left text-black">Seccion</th>
                <th class="text-left text-black">HI</th>
                <th class="text-left text-black">HF</th>
                <th class="text-left text-black">Dias</th>
                <th class="text-left text-black">Edificio</th>
                <th class="text-left text-black">Aula</th>
                <th class="text-left text-black">UV</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="waitingList" v-for="item in waitingList" :key="item.id">
                <td>{{ item.section.idClass.code }}</td>
                <td>{{ item.section.idClass.name }}</td>
                <td>{{ item.section.codeSection }}</td>
                <td>{{ item.section.hour }}</td>
                <td>{{ item.section.finalHour }}</td>
                <td>{{ item.section.days }}</td>
                <td>{{ item.section.idClassroom.idBuilding.name }}</td>
                <td>{{ item.section.idClassroom.code }}</td>
                <td>{{ item.section.idClass.valueUnits }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from "@/store/app";
import ClassService from "@/services/classes/classes.service";
import TeacherService from "@/services/teacher/teacher.service";
import BuildingService from "@/services/building/building.service";
import ClassroomService from "@/services/classroom/classroom.service";
import SectionService from "@/services/section/section.service";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service"

const tuitionService = new TuitionService();
const serviceClasses = new ClassService();
const teacherService = new TeacherService();
const buildingService = new BuildingService();
const classroomService = new ClassroomService();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const store = useAppStore();
const period = ref("");
const sections = ref([]);
const departamentoSeleccionado = ref(null);
const asignaturaSeleccionada = ref(null);
const seccionSeleccionada = ref(null);
const asignaturasFiltradas = ref([]);
const seccionesFiltradas = ref([]);
const asignaturasMatriculadas = ref([]);
const teachers = ref([]);
const classNames = ref([]);
const showModal = ref(false);
const tuitions = ref([]);
const studentLogged = store.user;
const studentCareer = studentLogged.student.studentCareer[0].centerCareer;
const normalTuitions = ref([]);
const waitingList = ref([]);
const state = ref('');
onMounted(async () => {
  period.value = await getRecentPeriod();
  state.value = period.value.idStatePeriod.name;
    
    if (state.value === 'Matricula') {
      getTuitionsByStudent();
  getSections();
  getTeachersOptions();
  getClassesOptions(studentCareer.career.id);
    } else {

        store.setToaster({
            isActive: true,
            text: "El perido actual no está en estado de matricula.",
            color: "error",
        });
    }

})


async function getClassesOptions(id) {
  const response = await serviceClasses.getClassesByCareer(id);
  classNames.value = response.classes;
}

function getTeacherSection(idTeacher) {
  if (idTeacher) {
    let teacher = teachers.value.find(teacher => teacher.employeeNumber === idTeacher);
    return teacher.user.firstName + " " + teacher.user.secondName + " " + teacher.user.firstLastName + " " + teacher.user.secondLastName;
  }
  return;
}
async function getTeachersOptions() {
  const response = await teacherService.getTeachers();
  teachers.value = response.teachers;
}
async function getTuitionsByStudent() {
  const response = await tuitionService.getTuitionsByStudent(studentLogged.student.accountNumber,period.value.id);
  tuitions.value = response.registrations;
  
  normalTuitions.value = tuitions.value.filter((tuition)=>tuition.waitingList=="false");
  
  waitingList.value = tuitions.value.filter((tuition)=>tuition.waitingList=="true");
  
}

async function getSections() {
  const response = await sectionService.getSections();
  sections.value = response.sections;

}

async function getRecentPeriod() {
  let mostRecentPeriod = null;

  const response = await servicePeriod.getPeriods();

  const periods = response.periods;


  // Filtrar el periodo más reciente basado en el año y número de periodo
  const currentYear = new Date().getFullYear();
  const mostRecentYear = Math.max(...periods.map((period) => period.year));
  const mostRecentPeriodNumber = Math.max(
    ...periods
      .filter((period) => period.year === mostRecentYear)
      .map((period) => period.numberPeriod)
  );

  mostRecentPeriod = periods.find(
    (period) =>
      period.year === mostRecentYear && period.numberPeriod === mostRecentPeriodNumber
  );

  return mostRecentPeriod;
};


async function seleccionarAsignatura(asignatura) {
  if (tuitions.value.find(tuition => tuition.section.idClass.name === asignatura)) {
    store.setToaster({
        isActive: true,
        text: "Clase ya matriculada.",
        color: "error",
      });
  } else {
    let selectedClass = classNames.value.find(className => className.name === asignatura);

    let sectionsClass = await sectionService.getSectionByPeriodAndClass(period.value.id, selectedClass.id);

    seccionesFiltradas.value = sectionsClass.sections;
  }
};

function isWaitingList(isWaiting){
  if (isWaiting=="true"){
    return "Sección en espera"
  }else{
    return ""
  }
}

const seleccionarSeccion = (seccion) => {
  seccionSeleccionada.value = seccion;
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

async function matricularAsignatura() {
  if (seccionSeleccionada.value) {
    if (store.units - seccionSeleccionada.value.idClass.valueUnits > 0) {
      const response = await tuitionService.createTuition({
        idSection: seccionSeleccionada.value.id,
        idStudent: studentLogged.student.accountNumber
      });
      store.substractUnits(seccionSeleccionada.value.idClass.valueUnits);
      getTuitionsByStudent(studentLogged.student.accountNumber);
      seccionSeleccionada.value = null;
      seccionesFiltradas.value = [];
    } else {
      store.setToaster({
        isActive: true,
        text: "No hay suficientes unidades valorativas.",
        color: "error",
      });
    }


  }

  closeModal();
};
</script>
  
<style scoped>
.headline {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.main-container {
  display: none;
}

.modal {
  position: fixed;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f4f5fa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}

.virtual-scroll-list {
  height: 300px;
}

.list-item-selected {
  background-color: #E3F2FD;
}
</style>
  