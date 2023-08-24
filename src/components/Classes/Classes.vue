<template>
  <v-container class="mt-0 pt-0 pb-0">
    <SearchableNavBar :title="periodActual" />
    <v-card class="mt-2">
      <v-tabs v-model="tab" background-color="primary">
        <v-tab value="one">Periodo Actual</v-tab>
        <v-tab value="two">Historial</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-row v-if="!isAdmin" class="pb-0 mb-0 pt-2 mt-0 user-description">
              <v-col
                v-for="section in sections"
                :key="section.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <ClassCard
                  v-if="userIsTeacher"
                  :clase="section.idClass.name"
                  :horario="
                    'Día(s): ' +
                    section.days +
                    ' | Horario:' +
                    section.hour +
                    '-' +
                    section.finalHour
                  "
                  :aula="
                    'Aula ' +
                    section.idClassroom.code +
                    ' | Edificio ' +
                    section.idClassroom.idBuilding.name
                  "
                  :btnTitle="userIsTeacher ? tittleBtn : ''"
                  :sectionId="userIsTeacher ? section.id : ''"
                  @studentList="stutendList"
                />
                <ClassCard
                  v-if="!userIsTeacher"
                  :clase="section.section.idClass.name"
                  :horario="
                    'Día(s): ' +
                    section.section.days +
                    ' | Horario:' +
                    section.section.hour +
                    '-' +
                    section.section.finalHour
                  "
                  :aula="
                    'Aula ' +
                    section.section.idClassroom.code +
                    ' | Edificio ' +
                    section.section.idClassroom.idBuilding.name
                  "
                  :docente="
                    section.section.idTeacher.user.firstName +
                    ' ' +
                    section.section.idTeacher.user.firstLastName
                  "
                  :videoTeacher="section.section.idTeacher.video"
                  :teacherPicture="section.section.idTeacher.photoOne"
                  :teacherName="
                    section.section.idTeacher.user.firstName +
                    ' ' +
                    section.section.idTeacher.user.secondName +
                    ' ' +
                    section.section.idTeacher.user.firstLastName +
                    ' ' +
                    section.section.idTeacher.user.secondLastName
                  "
                  :teacherEmail="section.section.idTeacher.email"
                  :teacherInstEmail="
                    section.section.idTeacher.institutionalEmail
                  "
                  :teacherDescription="section.section.idTeacher.description"
                  @perfil="Perfil"
                />
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="two">
            <v-row v-if="!isAdmin" class="pb-0 mb-0 pt-2 mt-0 user-description">
              <v-col
                v-for="section in displayedSections"
                :key="section.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <ClassCard
                  v-if="userIsTeacher"
                  :clase="section.idClass.name"
                  :horario="
                    'Día(s): ' +
                    section.days +
                    ' | Horario:' +
                    section.hour +
                    '-' +
                    section.finalHour
                  "
                  :aula="
                    'Aula ' +
                    section.idClassroom.code +
                    ' | Edificio ' +
                    section.idClassroom.idBuilding.name
                  "
                  :btnTitle="userIsTeacher ? tittleBtn : ''"
                  :sectionId="userIsTeacher ? section.id : ''"
                  @studentList="stutendList"
                />
                <ClassCard
                  v-if="!userIsTeacher"
                  :clase="section.section.idClass.name"
                  :horario="
                    'Día(s): ' +
                    section.section.days +
                    ' | Horario:' +
                    section.section.hour +
                    '-' +
                    section.section.finalHour
                  "
                  :aula="
                    'Aula ' +
                    section.section.idClassroom.code +
                    ' | Edificio ' +
                    section.section.idClassroom.idBuilding.name
                  "
                  :docente="
                    section.section.idTeacher.user.firstName +
                    ' ' +
                    section.section.idTeacher.user.firstLastName
                  "
                  :videoTeacher="section.section.idTeacher.video"
                  :teacherPicture="section.section.idTeacher.photoOne"
                  :teacherName="
                    section.section.idTeacher.user.firstName +
                    ' ' +
                    section.section.idTeacher.user.secondName +
                    ' ' +
                    section.section.idTeacher.user.firstLastName +
                    ' ' +
                    section.section.idTeacher.user.secondLastName
                  "
                  :teacherEmail="section.section.idTeacher.email"
                  :teacherInstEmail="
                    section.section.idTeacher.institutionalEmail
                  "
                  :teacherDescription="section.section.idTeacher.description"
                  @perfil="Perfil"
                />
              </v-col>
            </v-row>
            <v-pagination
              v-if="tab === 'two'"
              v-model="currentPage"
              :total-visible="5"
              :length="totalPages"
              class="mt-4"
            ></v-pagination>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
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
              <th class="text-center text-black">Correo Institucional</th>
              <th class="text-center text-black">Correo Personal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in studentsTuition"
              :key="student.student.accountNumber"
            >
              <td class="text-center">
                {{ getNameStudent(student.student.user) }}
              </td>
              <td class="text-center">{{ student.student.accountNumber }}</td>
              <td class="text-center">
                {{ student.student.institutionalEmail }}
              </td>
              <td class="text-center">{{ student.student.email }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="downloadStudentsList"
          >Descargar Lista</v-btn
        >
        <v-btn color="blue-darken-1" variant="text" @click="closeModal"
          >Cerrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="ShowTeacher" persistent width="70%">
    <v-card>
      <v-row class="mt-2">
        <v-col cols="auto" class="mx-auto">
          <v-avatar size="110px">
            <img
              v-if="userPicture"
              :src="userPicture"
              alt="user-img"
              cover
              class="user-img rounded-lg"
            />
            <img
              v-else
              src="@/assets/default-picture.jpg"
              alt="user-img"
              cover
              class="user-img rounded-lg"
            />
          </v-avatar>
        </v-col>
      </v-row>
      <v-card-title>
        <span
          class="text-h5 banner-major"
          style="display: block; text-align: center"
          >{{ userName }}</span
        >
      </v-card-title>
      <v-card-text>
        <v-col cols="12" class="user-info rounded-lg mb-2 px-7 py-1">
          <h4 class="font-weight-regular mb-3">Detalles del usuario</h4>
          <v-row class="d-flex">
            <v-col cols="12">
              <h3 class="font-weight-bold banner-major">
                Correo electrónico personal: {{ userPersonalEmail }}
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 class="font-weight-bold banner-major">
                Correo electrónico institucional: {{ userInstitutionalEmail }}
              </h3>
            </v-col>
          </v-row>
          <v-row class="d-flex">
            <v-col cols="12" class="user-description rounded-lg py-1">
              <h4 class="font-weight-regular mt-2">Descripción</h4>
              <p>{{ userDescription }}</p>
            </v-col>
          </v-row>
          <v-row v-if="profileVideo">
            <v-col cols="12">
              <v-card
                variant="outlined"
                class="mx-auto"
                width="850"
                color="grey lighten-4"
              >
                <v-container fluid class="video-container">
                  <video v-if="profileVideo" width="800" controls>
                    <source :src="profileVideo" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-card-text>
      <v-card-actions class="fixed-footer">
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="closeModal"
          class="mt-auto"
          fixed
          >Cerrar</v-btn
        >
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
import TuitionService from "../../services/tuition/tuition.service";

const profileVideo = ref();
const userName = ref("");
const userPicture = ref("");
const userDescription = ref("");
const userInstitutionalEmail = ref("");
const userPersonalEmail = ref("");
const store = useAppStore();
const periodActual = ref("");
const isAdmin = ref(store.user.isAdmin);
const tittleBtn = "Lista de estudiantes";
const showStutendList = ref(false);
const sections = ref([]);
const sectionsAll = ref([]);
const studentsTuition = ref([]);
const ShowTeacher = ref(false);
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const serviceTuition = new TuitionService();
const periods = ref([]);
const periodToModify = ref({});
const tab = ref(null);

//Paginación para la sección "Historial"
const currentPage = ref(1);
const itemsPerPage = ref(5);

const startIdx = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIdx = computed(() => startIdx.value + itemsPerPage.value);

// Calcula las secciones a mostrar en la página actual
const displayedSections = computed(() =>
  sectionsAll.slice(startIdx.value, endIdx.value)
);

// Calcula el número total de páginas para la sección "Historial"
const totalPages = computed(() =>
  Math.ceil(sectionsAll.length / itemsPerPage.value)
);

onMounted(async () => {
  getPeriods();
});

async function getPeriods() {
  const response = await servicePeriod.getPeriodsByYear(
    new Date().getFullYear()
  );
  periods.value = response.periods;
  periodToModify.value = periods.value[0];
  if (
    periodToModify.value.idStatePeriod?.name !== "Finalizado" &&
    periodToModify.value.idStatePeriod?.name !== "Por definir"
  ) {
    getSections(periodToModify.value.id);
    getSectionsAll();
    periodActual.value = `PAC ${periodToModify.value.year} - ${periodToModify.value.numberPeriod}`;
  }
}

async function getSections(idPeriod) {
  if (userIsTeacher.value) {
    const response = await sectionService.getSectionsByTeacher(
      store.user.teacher.employeeNumber,
      idPeriod
    );
    sections.value = response.section;
  } else {
    const response = await serviceTuition.getTuitionsByStudent(
      store.user.student.accountNumber,
      idPeriod
    );
    sections.value = response.registrations;
    console.log(sections.value);
  }
}

async function getSectionsAll() {
  if (userIsTeacher.value) {
    const response = await sectionService.getSectionsByTeacherAll(
      store.user.teacher.employeeNumber
    );
    sectionsAll.value = response.section;
  } else {
    const response = await serviceTuition.getTuitionsByStudentAll(
      store.user.student.accountNumber
    );
    sectionsAll.value = response.registrations;
  }
}

async function getStudentsTuition(sectionID: string) {
  const response = await serviceTuition.getTuitionsBySection(sectionID);
  studentsTuition.value = response.registration;
}

function stutendList(modalStutendList, sectionID) {
  getStudentsTuition(sectionID);
  showStutendList.value = modalStutendList;
}

function Perfil(
  modalPerfil: boolean,
  videoTeacher: string,
  teacherPicture: string,
  teacherName: string,
  teacherEmail: string,
  teacherInstEmail: string,
  teacherDescription: string
) {
  profileVideo.value = videoTeacher;
  ShowTeacher.value = modalPerfil;
  userPicture.value = teacherPicture;
  userName.value = teacherName;
  userInstitutionalEmail.value = teacherInstEmail;
  userPersonalEmail.value = teacherEmail;
  userDescription.value = teacherDescription;
}

function getNameStudent({
  firstName,
  secondName,
  firstLastName,
  secondLastName,
}: {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
}) {
  return (
    firstName + " " + secondName + " " + firstLastName + " " + secondLastName
  );
}

const closeModal = () => {
  showStutendList.value = false;
  ShowTeacher.value = false;
};

const downloadStudentsList = () => {
  const data = studentsTuition.value;
  const csv = data.map((item) => {
    return {
      Nombre: getNameStudent(item.student.user),
      NoCuenta: item.student.accountNumber,
      Correo_Institucional: item.student.institutionalEmail,
      Correo_Personal: item.student.email,
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

.profile-layout {
  height: 100%;
}

.user-banner,
.user-info,
.user-description {
  background-color: rgb(var(--v-theme-primary-darken-1));
}

.user-img {
  width: 128px;
  height: 128px;
  border: 7px solid #fff;
}

.banner-major {
  color: rgb(var(--v-theme-text-2));
}

.font-weight-regular {
  color: rgb(var(--v-theme-text-3));
}

.video-container {
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.fixed-footer {
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: 1px solid rgba(var(--v-theme-base-border-color), 0.12);
  padding: 16px;
}
</style>
