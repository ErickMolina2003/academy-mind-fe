<template>
  <v-main style="padding-left: 0%">
    <v-card>
      <v-card-title
        class="text-center text-white"
        style="background-color: rgb(var(--v-theme-secondary-lighthen-1))"
      >
        <span>Solicitudes de Cancelaciones Excepcionales</span>
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
      <v-card-text class="mt-1" style="padding: 0">
        <v-list class="overflow-auto">
          <v-list-item
            v-for="(user, index) in paginatedStudents"
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
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @input="changePage"
        rounded="circle"
      ></v-pagination>
    </v-card>
  </v-main>

  <!-- Modal for ExceptionalCancellations UNIQUE -->
  <v-dialog v-model="showModal" class="w-auto" max-width="800px">
    <v-card>
      <v-card-title class="text-center bg-blue text-center" title=""
        >Solicitudes de Cancelacion Excepcional</v-card-title
      >
      <v-card-text class="overflow-auto">
        <div class="mb-4 d-flex justify-space-evenly align-center">
          <v-list-item-title>Estudiante: {{ userData.name }}</v-list-item-title>
          <p>Núm de Cuenta: {{ userData.account }}</p>
        </div>
        <div class="bg-blue-lighten-1 text-center">Motivo</div>
        <v-sheet class="pa-4 text-justify">{{ userData.motive }}</v-sheet>
        <v-divider :thickness="5"></v-divider>
        <v-table class="my-6">
          <thead class="bg-light-blue-accent-1">
            <tr>
              <th class="text-left">Clase</th>
              <th class="text-center">Seccion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userData.section" :key="index">
              <td>{{ item.name }}</td>
              <td class="text-center">{{ item.codeSection }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-divider :thickness="5"></v-divider>
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
import { ref, computed } from "vue";
const showModal = ref(false);
const userData = ref(null);

const perPageOptions = [5, 10, 25, 50];
const itemsPerPage = ref(5);
const currentPage = ref(1);

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
    section: [
      { name: "Programación 1", codeSection: "0700" },
      { name: "Programación 2", codeSection: "0800" },
      { name: "Base de Datos 1", codeSection: "0900" },
      { name: "Redes de Datos 1", codeSection: "1000" },
      { name: "Programación Orientada a Objetos", codeSection: "1100" },
    ],
    pdf: "fileSolicitud.pdf",
    account: "20191234124",
  },
  {
    name: "Salah Cruz",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    section: [
      { name: "Historia de Honduras", codeSection: "0700" },
      { name: "Programación 2", codeSection: "0800" },
      { name: "Base de Datos 1", codeSection: "0900" },
      { name: "Redes de Datos 1", codeSection: "1000" },
      { name: "Programación Orientada a Objetos", codeSection: "1100" },
    ],
    pdf: "SolicitudCancelacion_SalahCruz",
    account: "20209876111",
  },
  {
    name: "Juan Alvarez",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    section: [
      { name: "Programación 1", codeSection: "0700" },
      { name: "Programación 2", codeSection: "0800" },
      { name: "Base de Datos 1", codeSection: "0900" },
      { name: "Redes de Datos 1", codeSection: "1000" },
      { name: "Natación", codeSection: "1100" },
    ],
    pdf: "SC_Juan Alvarez",
    account: "20209876111",
  },
  {
    name: "Rosa Gonzalez",
    motive:
      "Por motivos de trabajo se solicita cancelacion de las siguientes secciones",
    section: [
      { name: "Sociologia", codeSection: "0700" },
      { name: "Geometria y Trigonometria", codeSection: "0800" },
      { name: "Matematica 1", codeSection: "0900" },
    ],
    pdf: "Constancia_Trabajo_Rosa_Gonzalez",
    account: "20231234567",
  },
  {
    name: "Jorge Eriberto",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    section: [
      { name: "Ingles 1", codeSection: "0700" },
      { name: "Filosofia", codeSection: "0800" },
      { name: "Sociologia", codeSection: "0900" },
    ],
    pdf: "Constancia_Jorge_Eriberto",
    account: "20231234567",
  },
  {
    name: "John Wick",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    section: [
      { name: "Sociologia", codeSection: "0700" },
      { name: "Geometria y Trigonometria", codeSection: "0800" },
      { name: "Matematica 1", codeSection: "0900" },
    ],
    pdf: "Constancia_Trabajo_Rosa_Gonzalez",
    account: "20231234567",
  },
  {
    name: "Roberto Zepeda",
    motive:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut. Iaculis at erat pellentesque adipiscing commodo elit. Vitae suscipit tellus mauris a diam maecenas sed. Vel quam elementum pulvinar etiam non quam lacus. Netus et malesuada fames ac. Quis risus sed vulputate odio ut enim. Et netus et malesuada fames ac turpis egestas integer. Et leo duis ut diam quam nulla porttitor massa id. Massa placerat duis ultricies lacus sed turpis. Donec adipiscing tristique risus nec feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique risus nec feugiat. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Et odio pellentesque diam volutpat commodo sed egestas egestas. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Diam quis enim lobortis scelerisque. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Quam quisque id diam vel. Quam nulla porttitor massa id. Sed elementum tempus egestas sed sed. Purus non enim praesent elementum facilisis. Blandit turpis cursus in hac habitasse. Urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet dictum sit. Dictum sit amet justo donec enim. Phasellus vestibulum lorem sed risus ultricies tristique. At volutpat diam ut venenatis tellus in metus. Amet porttitor eget dolor morbi. Euismod quis viverra nibh cras pulvinar. Nulla facilisi nullam vehicula ipsum a arcu. Imperdiet nulla malesuada pellentesque elit eget. In nibh mauris cursus mattis molestie a iaculis. Duis at tellus at urna condimentum mattis pellentesque id. Massa vitae tortor condimentum lacinia quis vel. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Nibh ipsum consequat nisl vel. Congue quisque egestas diam in. Scelerisque in dictum non consectetur a erat nam at lectus. Massa tempor nec feugiat nisl. Nisi vitae suscipit tellus mauris a diam maecenas sed. Eget nullam non nisi est sit amet facilisis magna. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Bibendum enim facilisis gravida neque convallis a. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet facilisis magna etiam tempor orci.",
    section: [
      { name: "Fisica 1", codeSection: "0700" },
      { name: "Geometria y Trigonometria", codeSection: "0800" },
      { name: "Matematica 1", codeSection: "0900" },
    ],
    pdf: "Constancia_Roberto",
    account: "20231234567",
  },
]);

const totalPages = computed(() =>
  Math.ceil(students.value.length / itemsPerPage.value)
);

const paginatedStudents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return students.value.slice(startIndex, endIndex);
});

const changePage = (page) => {
  currentPage.value = page;
};
</script>
