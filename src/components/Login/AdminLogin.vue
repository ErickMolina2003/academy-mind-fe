<template>
  <ToasterVue />
  <v-sheet
    class="d-flex align-center justify-center bg-blue-darken-3"
    width="100%"
    height="100%"
    rounded
  >
    <v-card class="login-card pa-6 ma-6 bg-white">
      <h2 class="text-center">Inicio de Sesión de Administración</h2>
      <v-form v-model="form" @submit.prevent="submitLogin" class="ma-6">
        <v-text-field
          variant="outlined"
          class="mb-2"
          v-model="employeeNumber"
          :rules="[rules.required, rules.numbersOnly]"
          bg-color="primary"
          label="Número de Empleado"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          type="password"
          bg-color="primary"
          variant="outlined"
          label="Contraseña"
          placeholder="Introduzca su contraseña"
        >
        </v-text-field>

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
import ToasterVue from "@/components/Toaster.vue";
import { useAppStore } from "@/store/app";
import AdminLoginService from "@/services/login/adminLogin.service";

const password = ref("");
const form = ref(false);
const employeeNumber = ref("");
const store = useAppStore();

const rules = {
  required: (value) => !!value || "Campo obligatorio",
  numbersOnly: (value) =>
    /^[0-9]+$/.test(value) ||
    "El número de empleado debe contener solo números",
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
    employeeNumber: employeeNumber.value,
    password: password.value,
  };

  const service = new AdminLoginService();
  const response = await service.getLoginToken(user);
  if (response.status === 201) {
    if (response.data.statusCode === 200) {
      router.push("/");
    }
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
