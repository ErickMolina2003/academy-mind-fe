<template>
  <v-container class="profile-layout">
    <v-row class="user-banner rounded-lg" justify="start">
      <v-col cols="12" class="pa-0">
        <img
          src="@/assets/profile-banner.png"
          alt="banner-img"
          class="banner-img w-100"
        />
      </v-col>
      <v-col cols="auto" class="mt-n16 ml-3">
        <img
          v-if="profilePicture"
          :src="profilePicture"
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
      </v-col>
      <v-col class="ml-1 mt-n2">
        <p class="text-h5 font-weight-medium mt-1">{{ name }}</p>
        <p class="banner-major text-subtitle-1 font-weight-medium">
          {{
            isAdmin
              ? "Administrador"
              : isCoordinator || isBoss || userIsTeacher
              ? "Docente"
              : `${career}`
          }}
        </p>
      </v-col>
      <v-col class="text-right">
        <v-btn class="bg-blue-grey-darken-2" @click="openDialog">Editar</v-btn>
        <v-dialog v-model="dialogOpen" persistent max-width="1000px">
          <v-card>
            <v-card-title>
              <h2 class="bg-blue-darken-3 pa-2 text-center rounded">
                Configuración de usuario
              </h2>
            </v-card-title>
            <v-card-text>
              <MyDialog
                @close="closeDialog"
                @update-profile="updateProfile"
                :user-profile="userProfile"
              >
              </MyDialog>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row class="pt-6" style="padding-bottom: 15px">
      <v-col cols="12" class="user-info rounded-lg mb-6 px-7 py-6">
        <h4 class="font-weight-regular mb-3">Información personal</h4>
        <v-row class="d-flex">
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Nombre completo: {{ fullName }}
            </h3>
          </v-col>
          <v-col v-if="!isAdmin" cols="6">
            <h3 class="font-weight-bold banner-major">
              {{ userIsTeacher ? "Número de empleado:" : "Número de cuenta:" }}
              {{ accountNumber }}
            </h3>
          </v-col>
        </v-row>
        <v-row class="d-flex" v-if="!userIsTeacher">
          <v-col v-if="!isAdmin" cols="6">
            <h3 class="font-weight-bold banner-major">Carrera: {{ career }}</h3>
          </v-col>
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Correo electrónico personal: {{ personalEmail }}
            </h3>
          </v-col>
        </v-row>
        <v-row v-if="!isAdmin" class="d-flex">
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Centro: {{ userIsTeacher ? centerTeacher : centerStudent }}
            </h3>
          </v-col>
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Correo electrónico institucional: {{ institutionalEmail }}
            </h3>
          </v-col>
        </v-row>

        <v-row class="d-flex" v-if="globalIndex != null">
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Indice Global: {{ globalIndex }}
            </h3>
          </v-col>
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Indice Periodo: {{ periodIndex }}
            </h3>
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
      <v-col
        v-if="!isAdmin"
        cols="3"
        class="user-description rounded-lg px-7 py-3"
      >
        <h4 class="font-weight-regular mt-2">Descripción</h4>
        <p>{{ description }}</p>
      </v-col>
      <v-col v-if="!isAdmin" class="user-description rounded-lg ml-4 px-7 py-3">
        <h4 class="font-weight-regular mt-1">Clases del periodo actual</h4>
        <v-sheet class="mx-auto" max-width="900">
          <v-slide-group class="pa-1" center-active show-arrows>
            <v-slide-group-item v-for="section in sections" :key="section.id">
              <ClassCard
                max-width="352"
                class="mr-1"
                v-if="userIsTeacher"
                :clase="section.idClass.name"
                :periodo="section.idPeriod.numberPeriod"
                :anio="section.idPeriod.year"
              />
              <ClassCard
                max-width="352"
                class="mr-1"
                v-if="!userIsTeacher"
                :clase="section.section.idClass.name"
                periodo="2"
                anio="2023"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col
        v-if="isAdmin"
        cols="12"
        class="user-description rounded-lg px-7 py-3"
      >
        <h4 class="font-weight-regular mt-2">Descripción</h4>
        <p>{{ description }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ClassCard from "@/components/ClassCard/ClassCard.vue";
import { ref, computed, onMounted, watch } from "vue";
import MyDialog from "./UserSettings.vue";
import { useAppStore } from "@/store/app";
import PeriodService from "@/services/period/period.service";
import TuitionService from "@/services/tuition/tuition.service";
import SectionService from "@/services/section/section.service";

const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const profilePicture = ref();
const profileVideo = ref();
const store = useAppStore();
const serviceTuition = new TuitionService();
const periods = ref([]);
const periodToModify = ref({});
const sections = ref([]);

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
  }
}

const userLogged = computed(() => {
  if (store.user.teacher) {
    profilePicture.value = store.user.teacher.photoOne;
    profileVideo.value = store.user.teacher.video;
    return store.user.teacher;
  }

  if (store.user.student) {
    getProfilePicture(store.user.student.currentPhoto);
    return store.user.student;
  }

  profilePicture.value = store.user.photoOne;

  return store.user;
});
const description = ref(userLogged.value.description);
const personalEmail = ref(userLogged.value.email);
const name = ref(store.user.firstName + ` ` + store.user.firstLastName);
const fullName = ref(
  store.user.firstName +
    ` ` +
    store.user.secondName +
    ` ` +
    store.user.firstLastName +
    ` ` +
    store.user.secondLastName
);

const accountNumber = computed(() => {
  return userLogged.value.employeeNumber ?? userLogged.value.accountNumber;
});

const periodIndex = ref(null);
const globalIndex = ref(null);

if (store.user.student) {
  periodIndex.value = userLogged.value.periodIndex;
  globalIndex.value = userLogged.value.overallIndex;
}

const dialogOpen = ref(false);

const career = ref("");

if (userLogged.value.studentCareer && userLogged.value.studentCareer[0]) {
  career.value = userLogged.value.studentCareer[0].centerCareer.career.name;
}

const centerStudent = ref("");
const centerTeacher = ref("");

if (userLogged.value.studentCareer && userLogged.value.studentCareer[0]) {
  centerStudent.value =
    userLogged.value.studentCareer[0].centerCareer.regionalCenter.name;
}

if (userLogged.value.teachingCareer && userLogged.value.teachingCareer[0]) {
  centerTeacher.value =
    userLogged.value.teachingCareer[0].centerCareer.regionalCenter.name;
}

const institutionalEmail = ref(userLogged.value.institutionalEmail);
const isAdmin = ref(store.user.isAdmin);
const isBoss = ref(userLogged.value.isBoss);
const isCoordinator = ref(userLogged.value.isCoordinator);
const isTeacher = computed(() => {
  return store.user.teacher !== undefined;
});

const userIsTeacher = computed(() => {
  return isBoss.value || isCoordinator.value || isTeacher.value;
});

const updateProfile = (data) => {
  if (data.description) {
    description.value = data.description;
  }

  if (data.personalEmail) {
    personalEmail.value = data.personalEmail;
  }
  if (data.profileVideo) {
    profileVideo.value = data.profileVideo;
  }
};

function getProfilePicture(index: number) {
  if (index == 1) {
    profilePicture.value = store.user.student.photoOne;
  } else if (index == 2) {
    profilePicture.value = store.user.student.photoTwo;
  } else if (index == 3) {
    profilePicture.value = store.user.student.photoThree;
  } else {
    profilePicture.value = null;
  }
}

const openDialog = () => {
  dialogOpen.value = true;
};

function closeDialog(close: boolean) {
  dialogOpen.value = close;
}

const userProfile = computed(() => ({
  description: description.value,
  personalEmail: personalEmail.value,
  profileVideo: profileVideo.value,
  // Agregar más propiedades según sea necesario
}));
</script>

<style scoped>
.profile-layout {
  height: 100%;
}

.user-banner,
.user-info,
.user-description {
  background-color: rgb(var(--v-theme-primary-darken-1));
}

.banner-img {
  height: 250px;
}

.user-img {
  width: 128px;
  height: 128px;
  border: 7px solid #fff;
  object-fit: cover;
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
</style>
