<template>
  <div rounded>
    <div class="text-center">
      <img
        src="@/assets/user-img.png"
        alt="user-img"
        class="user-img rounded-lg"
      />
      <h2>{{ splitName(name) }}</h2>
    </div>
    <br />

    <v-form disabled>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Información del Usuario</h3>
      <div class="d-flex">
        <v-text-field
          class="text-black font-weight-black"
          v-model="name"
          label="Nombre"
        ></v-text-field>
        <v-text-field
          class="text-black font-weight-black"
          v-model="account"
          label="Número de Cuenta"
        ></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field
          class="text-black font-weight-black"
          v-model="career"
          label="Carrera"
        ></v-text-field>
        <v-text-field
          class="text-black font-weight-black"
          v-model="center"
          label="Centro Universitario"
        ></v-text-field>
      </div>
    </v-form>
    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Imagenes</h3>
      <v-file-input
        chips
        multiple
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-container justify="start">
        <v-row>
          <v-col cols="auto"
            ><v-img
              :height="110"
              :width="110"
              cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img
          ></v-col>
          <v-col cols="auto"
            ><img
              :height="110"
              :width="110"
              src="@/assets/logo.png"
              alt="user-img"
              class="user-img rounded-lg"
          /></v-col>
          <v-col cols="auto"
            ><img
              :height="110"
              :width="110"
              src="@/assets/user-img.png"
              alt="user-img"
              class="user-img rounded-lg"
          /></v-col>
        </v-row>
      </v-container>
    </div>

    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Correo Electronico</h3>
      <v-responsive class="text-left" max-width="344">
        <v-text-field
          hide-details="auto"
          placeholder="johndoe@gmail.com"
          type="email"
        ></v-text-field>
      </v-responsive>
    </div>

    <br />
    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Descripción</h3>
      <v-textarea label="Escriba aqui" variant="solo"></v-textarea>
    </div>
  </div>
</template>

<script setup>
import data from "../../mock/studentProfile.json";
const name = data.name;
const account = data.account;
const career = data.career;
const center = data.center;
const props = Boolean;

var profileName = "Hola";
function splitName(name) {
  let arrayName = name.split(" ");
  profileName = arrayName[0].concat(" ", arrayName[2]);
  return profileName;
}
</script>
