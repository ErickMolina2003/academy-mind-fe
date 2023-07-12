<template>
  <span>
    <ToasterVue></ToasterVue>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12">
        <h1 class="text-center">¿Olvidaste tu contraseña? 🔒</h1>
      </v-col>
      <v-col class="px-7" cols="8" md="8" lg="8">
        <h4>
          Ingresa tu número de cuenta y te mandaremos instrucciones a tu correo
          electrónico para resetear tu contraseña.
        </h4>
      </v-col>
    </v-row>
    <v-form v-model="form" @submit.prevent="resetPassword">
      <v-row class="mt-7" justify="center">
        <v-col class="pb-0" cols="12" md="8" lg="8">
          <v-text-field
            v-model="accountNumber"
            :rules="[rules.required, rules.minLength]"
            bg-color="primary"
            label="Numero de cuenta"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8" lg="8">
          <v-btn
            type="submit"
            color="secondary"
            block
            height="50px"
            rounded="lg"
          >
            Resetear contraseña
          </v-btn>
        </v-col>
        <v-col cols="12" md="8" lg="8">
          <p @click="goBack" class="reset-password text-center text-secondary">
            Volver a iniciar sesión
          </p>
        </v-col>
      </v-row>
    </v-form>
  </span>
</template>

<script setup>
import router from "@/router";
import LoginService from "@/services/login/login.service";
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import ToasterVue from "@/components/Toaster.vue";

const rules = {
  required: (value) => !!value || "Campo obligatorio",
  minLength: (value) => value.length >= 4 || "Número de cuenta incompleto.",
};

const form = ref(false);

const store = useAppStore();

const accountNumber = ref("");

async function resetPassword() {
  if (!form.value) {
    store.setToaster({
      isActive: true,
      color: "error",
      text: "Campos incorrectos.",
    });
    return;
  }
  const service = new LoginService();
  const response = await service.resetPassword(accountNumber.value);
  if (response.status === 201) {
    router.push("/login");
  }
}

function goBack() {
  router.replace({ path: "/login" });
}
</script>

<style scoped>
.reset-password {
  cursor: pointer;
}
</style>
