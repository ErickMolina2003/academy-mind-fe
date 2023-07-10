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
      <h3 class="bg-blue-darken-1 my-3 pa-1">Contraseña</h3>
      <v-row>
        <v-col v-if="!togglePassword">
          <v-text-field
            class="text-black font-weight-black"
            v-model="mockPassword"
            label="Contraseña"
            disabled
          ></v-text-field>
        </v-col>
        <v-col v-if="togglePassword">
          <v-form v-model="form" @submit.prevent="submitChangePassword">
            <v-text-field
              class="text-black font-weight-black"
              v-model="currentPassword"
              type="password"
              :rules="[rules.required]"
              label="Actual Contraseña"
            ></v-text-field>
            <v-text-field
              class="text-black font-weight-black"
              v-model="password"
              type="password"
              :rules="[rules.required]"
              label="Nueva Contraseña"
            ></v-text-field>
            <v-text-field
              class="text-black font-weight-black"
              v-model="confirmPassword"
              type="password"
              :rules="[rules.required]"
              label="Confirmar Contraseña"
            ></v-text-field>
            <v-row justify="center">
              <v-col cols="12" md="auto" lg="auto">
                <v-btn color="success" type="submit" class="mr-4"
                  >Cambiar Contraseña</v-btn
                >
                <v-btn color="error" @click="unTogglePassword">Cancelar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" md="auto" lg="auto" align-self="center">
          <v-btn
            v-if="!togglePassword"
            color="secondary-lighthen-1"
            @click="togglePassword = !togglePassword"
            >Cambiar Contraseña</v-btn
          >
        </v-col>
      </v-row>
    </div>
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

<script setup lang="ts">
import LoginService from "@/services/login/login.service";
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import data from "../../mock/studentProfile.json";

const store = useAppStore();

const mockPassword = "********";
const name = data.name;
const account = data.account;
const career = data.career;
const center = data.center;
const props = Boolean;

const rules = {
  required: (value: any) => !!value || "Campo obligatorio",
};
const currentPassword = ref("");
const password = ref("");
const confirmPassword = ref("");
const togglePassword = ref(false);
const form = ref(false);

function splitName(name: string) {
  let profileName;
  let arrayName = name.split(" ");
  profileName = arrayName[0].concat(" ", arrayName[2]);
  return profileName;
}

function unTogglePassword() {
  currentPassword.value = "";
  password.value = "";
  confirmPassword.value = "";
  togglePassword.value = false;
  form.value = false;
}

async function submitChangePassword() {
  if (!form.value) {
    store.setToaster({
      isActive: true,
      text: "Por favor, llene los campos requeridos.",
      color: "error",
    });
    return;
  }

  if (password.value === confirmPassword.value) {
    const service = new LoginService();
    const response = await service.setPassword(
      store.user.user.user.dni,
      currentPassword.value,
      password.value
    );
    if (response.status === 200) {
      unTogglePassword();
    }
  } else {
    store.setToaster({
      isActive: true,
      text: "Las contraseñas no coinciden.",
      color: "error",
    });
  }
}
</script>
