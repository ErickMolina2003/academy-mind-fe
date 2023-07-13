<template>
  <v-sheet
    class="d-flex align-center justify-center bg-blue-darken-3"
    width="100%"
    height="100%"
    rounded
  >
    <v-card class="login-card pa-6 ma-6 bg-white">
      <h2 class="text-center">Panel de Administración</h2>
      <v-form v-model="form" @submit.prevent="submitLogin" class="ma-6">
        <v-text-field
          variant="outlined"
          class="mb-2"
          v-model="email"
          :rules="[rules.required]"
          bg-color="primary"
          label="Correo"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          type="password"
          bg-color="primary"
          variant="outlined"
          label="Contraseña"
          placeholder="Introduzca su contraseña"
        ></v-text-field>

        <br />

        <v-btn
          block
          rounded="lg"
          color="blue-darken-3"
          size="large"
          type="submit"
          variant="elevated"
        >
          Iniciar Sesion
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import router from "@/router";
import { computed, ref } from "vue";
import LoginService from "@/services/login/login.service";
import ToasterVue from "@/components/Toaster.vue";
import { useAppStore } from "@/store/app";

const email = ref("");
const password = ref("");
const form = ref(false);
const store = useAppStore();

const rules = {
  required: (value) => !!value || "Campo obligatorio",
};

async function submitLogin() {
  if (!form.value) {
    store.setToaster({
      isActive: true,
      text: "Datos incompletos.",
      color: "error",
    });
    return;
  }

  const user = {
    email: email.value,
    password: password.value,
  };

  const service = new LoginService();
  const response = await service.getLoginToken(user);
  if (response === 201) router.push("/");
  else {
    store.setToaster({
      isActive: true,
      text: "Credenciales incorrectas!",
      color: "error",
    });
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
}
</style>
