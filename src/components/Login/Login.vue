<template>
  <span>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12">
        <h1 class="text-center text-white">Bienvenido a Academy-Mind</h1>
      </v-col>
      <v-col class="text-center" cols="12" md="12" lg="12">
        <h4 class="text-white">
          Por favor, inicia sesion para iniciar tu aventura
        </h4>
      </v-col>
    </v-row>
    <v-row class="mt-10" justify="center">
      <v-col class="pb-0" cols="12" md="8" lg="8">
        <v-text-field v-model="accountNumber" bg-color="primary" label="Numero de cuenta"
          variant="outlined"></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="8" lg="8">
        <v-text-field v-model="password" type="password" bg-color="primary" label="Contrasena"
          variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <p @click="forgot" class="forgot-password text-end text-secondary">
          Olvide mi Contrasena
        </p>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-btn color="secondary" block height="50px" rounded="lg" @click="submitLogin">Entrar</v-btn>
      </v-col>
    </v-row>
  </span>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

const accountNumber = ref("");
const password = ref("");

function submitLogin() {
}

function forgot() {
  router.push('/login/reset');
}
</script>

<style scoped>
.forgot-password {
  cursor: pointer;
}
</style>
