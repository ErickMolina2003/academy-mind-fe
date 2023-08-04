<template>
  <v-container class="mt-0 pt-0 pb-0">
    <SearchableNavBar :title="periodActual"/>
    <v-row v-if="!isAdmin" class="pb-0 mb-0 pt-2 mt-0 user-description">
      <v-col v-for=" section in sections" :key="section.id" cols="12" sm="6" md="4" lg="4">
        <ClassCard v-if="userIsTeacher" :clase="section.idClass.name" :horario="'Día(s): '+section.days + ' | Horario:' + section.hour + '-' + section.finalHour" :aula="'Aula ' + section.idClassroom.code + ' | Edificio ' + section.idClassroom.idBuilding.name "  :btnTitle="userIsTeacher ? tittleBtn : ''" :sectionId="userIsTeacher ? section.id : ''"  @studentList="stutendList" />
        <ClassCard v-if="!userIsTeacher" :clase="section.section.idClass.name" :horario="'Día(s): '+section.section.days + ' | Horario:' + section.section.hour + '-' + section.section.finalHour" :aula="'Aula ' + section.section.idClassroom.code + ' | Edificio ' + section.section.idClassroom.idBuilding.name " :docente=" section.section.idTeacher.user.firstName + ' ' + section.section.idTeacher.user.firstLastName " :videoTeacher="section.section.idTeacher.video" :teacherPicture="section.section.idTeacher.photoOne" @video="video"/>
      </v-col>
    </v-row>
  </v-container>
   <v-dialog v-model="showStutendList" persistent width="70%">
        <v-card>
          <v-card-title class="text-h5 text-center">
                Lista de Estudiantes
          </v-card-title>
          <v-card-text class="table-scroll">
            <v-table>
              <thead>
                <tr>
                  <th class="text-center text-black">Nombre</th>
                  <th class="text-center text-black">No.Cuenta</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="student in studentsTuition" :key="student.student.accountNumber">
                  <td class="text-center">{{getNameStudent(student.student.user)}}</td>
                  <td class="text-center">{{ student.student.accountNumber }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="downloadStudentsList">Descargar Lista</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="closeModal">Cerrar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="showVideo" persistent width="70%">
        <v-card>
          <v-card-title class="text-h5 text-center">
                Video presentación de docente
          </v-card-title>
          <v-card-text>
            <v-col cols="12">
              <v-card 
              variant="outlined"
              class="mx-auto"
              width="850"
              color="grey lighten-4"
              >
                <v-container fluid class="video-container">
                  <video width="800" controls v-if="profileVideo">
                    <source :src="profileVideo" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                  </video>
                  <h5 v-if="!profileVideo">No hay contenido para mostrar</h5>
                </v-container>
              </v-card>
            </v-col>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeModal">Cerrar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import ClassCard from "@/components/ClassCard/ClassCard.vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import PeriodService from "@/services/period/period.service";
import SectionService from "@/services/section/section.service";
import ClassService from "@/services/classes/classes.service";
import TeacherService from "@/services/teacher/teacher.service";
import BuildingService from "@/services/building/building.service";
import ClassroomService from "@/services/classroom/classroom.service";
import TuitionService from '../../services/tuition/tuition.service';
import StudentService from "@/services/student/student.service";


const profileVideo = ref();
const store = useAppStore();
const periodActual = ref('');
const isAdmin = ref(store.user.isAdmin);
const tittleBtn = "Lista de estudiantes";
const nameTeacher = "Juan Perez";
const showStutendList = ref(false);
const periodData = ref();
const state =ref('');
const sections = ref([]);
const studentsTuition = ref([]);
const studentName = ref([]);
const name = ref('');
const showVideo = ref(false);
const serviceClasses = new ClassService();
const teacherService = new TeacherService();
const buildingService = new BuildingService();
const classroomService = new ClassroomService();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const serviceTuition = new TuitionService();
const serviceStudent = new StudentService();


onMounted(async() => {
periodData.value = await getRecentPeriod();
state.value = periodData.value.idStatePeriod.name;
periodActual.value = 'Periodo ' + periodData.value.year + '-' + periodData.value.numberPeriod;
if (state.value == 'Matricula' || state.value == 'En curso' || state.value == 'Ingreso de notas') {
    getSections();
} else {
    store.setToaster({
        isActive: true,
        text: "El perido actual no está en estado de matrícula, en curso o ingreso de notas",
        color: "error",
    });
}
});

async function getSections() {
    if(userIsTeacher.value){
        const response = await sectionService.getSectionsByTeacher(store.user.teacher.employeeNumber, periodData.value.id);
        sections.value = response.section;
    }else{
        const response = await serviceTuition.getTuitionsByStudent(store.user.student.accountNumber, periodData.value.id)
        sections.value = response.registrations;
    }
    console.log(sections.value);
}

async function getStudentsTuition(sectionID: string) {
    const response = await serviceTuition.getTuitionsBySection(sectionID);
    studentsTuition.value = response.registration;
}

async function getRecentPeriod() {
    let mostRecentPeriod = null;
    const response = await servicePeriod.getPeriods();
    const periods = response.periods;
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

function stutendList(modalStutendList, sectionID) {
    getStudentsTuition(sectionID);
    showStutendList.value = modalStutendList;
}

function video(modalVideo, videoTeacher) {
    profileVideo.value = videoTeacher;
    showVideo.value = modalVideo;
}

function getNameStudent({firstName, secondName, firstLastName, secondLastName}:{firstName: string, secondName: string, firstLastName: string, secondLastName: string}) {
  console.log(firstName + ' ' + secondName + ' ' + firstLastName + ' ' + secondLastName);
  return firstName + ' ' + secondName + ' ' + firstLastName + ' ' + secondLastName;
}

const closeModal = () => {
  showStutendList.value = false;
  showVideo.value = false;
};

const downloadStudentsList = () => {
  const data = studentsTuition.value;
  const csv = data.map((item) => {
    return {
      Nombre: getNameStudent(item.student.user),
      NoCuenta: item.student.accountNumber,
    };
  });
  const fields = Object.keys(csv[0]);
  const replacer = function (key, value) {
    return value === null ? "" : value;
  };
  let csvData = csv.map(function (row) {
    return fields.map(function (fieldName) {
      return JSON.stringify(row[fieldName], replacer);
    });
  });
  csvData.unshift(fields);
  let csvArray = csvData.join("\r\n");
  let a = document.createElement("a");
  let blob = new Blob([csvArray], { type: "text/csv" });
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = "Lista de estudiantes.csv";
  a.click();
};

const userIsTeacher = computed(() => {
  return store.user.teacher !== undefined;
});
</script>

<style scoped>
.user-description {
  background-color: rgb(var(--v-theme-primary-darken-1));
}
.table-scroll {
  height: 500px;
  overflow-y: auto;
}
</style>
