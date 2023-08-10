<template>
  <v-main style="padding-left: 0%">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Solicitudes de Cambio de Centro Regional</span>
      </v-card-title>
      <v-card-text class="mt-1" style="padding: 0">
        <v-list class="overflow-auto">
          <v-list-item
            v-for="(user, index) in students"
            :key="index"
            class="mb-2"
          >
            <v-divider :thickness="2"></v-divider>
            <div class="d-flex justify-space-between align-center ma-2">
              <v-list-item-title
                class="ml-12"
                v-text="user.name"
              ></v-list-item-title>
              <div>
                <v-btn class="mr-12" color="green" @click="openModal(user)">
                  Información
                  <v-icon end icon="mdi-information" size="large"></v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider :thickness="2"></v-divider>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-main>

  <v-dialog v-model="showModal" class="w-auto" max-width="800px">
    <v-card>
      <v-card-title class="text-center bg-blue text-center" title=""
        >Solicitud de Cambio de Centro Regional</v-card-title
      >
      <v-card-text class="overflow-auto">
        <div class="mb-4 d-flex justify-space-evenly align-center">
          <v-list-item-title>Estudiante: {{ userData.name }}</v-list-item-title>
          <p>Núm de Cuenta: {{ userData.account }}</p>
        </div>
        <div class="bg-blue-lighten-1 text-center">Motivo</div>
        <v-sheet class="pa-4 text-justify">{{ userData.motive }}</v-sheet>
        <p class="bg-blue-lighten-1 text-center">Cambio de Centro Regional</p>
        <v-sheet class="pa-4">
          <p>Centro Regional a cambiar: {{ userData.newCenter }}</p>
        </v-sheet>
        <p class="bg-blue-lighten-1 text-center">Respaldo de Solicitud</p>
        <v-btn
          class="ma-6 bg-blue-grey-lighten-4"
          :href="userData.pdf"
          v-if="userData.pdf"
          download
        >
          <v-icon start icon="mdi-download-circle" size="x-large"></v-icon
          >{{ userData.pdf }}
        </v-btn>
      </v-card-text>

      <v-card-actions class="fixed-footer mx-4">
        <v-btn
          class="bg-blue-darken-1 px-4"
          color="white"
          variant="text"
          @click="closeModal"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <div>
          <v-btn class="bg-red ma-2 px-4" color="white" @click="cancelRequest">
            Rechazar
            <v-icon end icon="mdi-cancel"></v-icon>
          </v-btn>
          <v-btn
            class="bg-green ma-2 px-4"
            color="white"
            @click="acceptRequest"
          >
            Aceptar
            <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const showModal = ref(false);
const userData = ref(null);

const openModal = (user) => {
  showModal.value = true;
  userData.value = user;
};

const closeModal = () => {
  showModal.value = false;
};

const acceptRequest = () => {
  console.log("Solicitud Aceptada", userData.value);
  students.value = students.value.filter((user) => user !== userData.value);
  showModal.value = false;
};

const cancelRequest = () => {
  console.log("Solicitud Cancelada", userData.value);
  students.value = students.value.filter((user) => user !== userData.value);
  showModal.value = false;
};

const students = ref([
  {
    name: "Fabio Perales",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    newCenter: "UNAH-VS",
    pdf: "fileSolicitud.pdf",
    account: "20191234124",
  },
  {
    name: "Salah Cruz",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    newCenter: "UNAH-CURC",
    pdf: "SolicitudCambioCentro_SalahCruz",
    account: "20209876111",
  },
  {
    name: "Juan Alvarez",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    newCenter: "UNAH-CURLAS",
    pdf: "SC_Juan Alvarez",
    account: "20209876111",
  },
]);
</script>

<style>
.icon-attention {
  font-size: 24px;
  color: red;
  margin-right: 8px;
}

.selected-row {
  background-color: rgb(250, 250, 186);
}
</style>
