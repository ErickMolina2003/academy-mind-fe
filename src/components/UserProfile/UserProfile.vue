<template>
  <v-container class="profile-layout">
    <v-row class="user-banner rounded-lg" justify="start">
      <v-col cols="12" class="pa-0">
        <img src="@/assets/profile-banner.png" alt="banner-img" class="banner-img w-100" />
      </v-col>
      <v-col cols="auto" class="mt-n16 ml-3">
        <img src="@/assets/user-img.png" alt="user-img" class="user-img rounded-lg" />
      </v-col>
      <v-col class="ml-1 mt-n2">
        <p class="text-h5 font-weight-medium mt-1">Julia Martínez</p>
        <p class="banner-major text-subtitle-1 font-weight-medium">
          Ingenieria en sistemas
        </p>
      </v-col>
      <v-col class="text-right">
        <v-btn class="bg-blue-grey-darken-2" @click="openDialog">Editar</v-btn>
        <v-dialog v-model="dialogOpen" persistent max-width="1000px">
          <v-card>
            <v-card-title>
              <h2 class="bg-blue-darken-3 pa-2 text-center rounded">
                Configuracion de usuario
              </h2>
            </v-card-title>
            <v-card-text>
              <MyDialog @close="closeDialog"></MyDialog>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row class="pt-6">
      <v-col cols="12" class="user-info rounded-lg mb-6 px-7 py-6">
        <h4 class="font-weight-regular mb-3">Información personal</h4>
        <v-row class="d-flex">
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Nombre completo: Julia Marcela Martínez Mejía
            </h3>
          </v-col>
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Número de cuenta: 20191002985
            </h3>
          </v-col>
        </v-row>

        <v-row class="d-flex">
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Carrera: Ingenieria en sistemas
            </h3>
          </v-col>
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Correo electrónico institucional: marcelamejia@unah.hn
            </h3>
          </v-col>
        </v-row>

        <v-row class="d-flex">
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Centro: Ciudad Universitaria
            </h3>
          </v-col>
          <v-col cols="6">
            <h3 class="font-weight-bold banner-major">
              Correo electrónico personal: {{ email }}
            </h3>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="3" class="user-description rounded-lg px-7 py-3">
        <h4 class="font-weight-regular mt-2">Descripción</h4>

        <p>{{ description }}</p>
      </v-col>

      <v-col class="user-description rounded-lg ml-4 px-7 py-3">
        <h4 class="font-weight-regular mt-2">Clases del periodo actual</h4>

        <v-row class="pt-2">
          <v-col cols="6" md="6" lg="4" xl="3">
            <ClassCard clase="Ingenieria de Software" periodo="2" anio="2023" />
          </v-col>
          <v-col cols="6" md="6" lg="4" xl="3">
            <ClassCard clase="Contabilidad" periodo="2" anio="2023" />
          </v-col>
          <v-col cols="6" md="6" lg="4" xl="3">
            <ClassCard clase="Sistemas Expertos" periodo="2" anio="2023" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ClassCard from "@/components/ClassCard/ClassCard.vue";
import { ref } from "vue";
import MyDialog from "./UserSettings.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const student = store.user.user.user;
const description = ref(student.description);
const email = ref(student.email);
const dialogOpen = ref(false);


const openDialog = () => {
  dialogOpen.value = true;
};

function closeDialog(close: boolean) {
  dialogOpen.value = close;
}

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
}

.banner-major {
  color: rgb(var(--v-theme-text-2));
}

.font-weight-regular {
  color: rgb(var(--v-theme-text-3));
}
</style>
