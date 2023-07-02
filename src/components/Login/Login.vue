<template>
  <span class="right-side-layout-container">
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12">
        <h1 class="text-center">Campus Virtual UNAH</h1>
      </v-col>
    </v-row>
    <v-form v-model="form" @submit.prevent="submitLogin">
      <v-row class="mt-10" justify="center">
        <v-col class="pb-0" cols="12" md="8" lg="8">
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            bg-color="primary"
            label="Correo electrónico"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="12" md="8" lg="8">
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            type="password"
            bg-color="primary"
            label="contraseña"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8" lg="8">
          <p @click="forgot" class="forgot-password text-end text-secondary">
            Olvide mi contraseña
          </p>
        </v-col>
        <v-col cols="12" md="8" lg="8">
          <v-btn
            type="submit"
            color="secondary"
            block
            height="50px"
            rounded="lg"
            >Entrar</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </span>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import LoginService from "@/services/login/login.service";

const email = ref("");
const password = ref("");
const form = ref(false);

const rules = {
  required: (value) => !!value || "Campo obligatorio",
};

async function submitLogin() {
  if (!form.value) return;

  const user = {
    email: email.value,
    password: password.value,
  };
  const service = new LoginService();
  const response = await service.getLoginToken(user);
  if (response === 200) router.push("/user");
}

function forgot() {
  router.push("/login/reset");
}
</script>

<style scoped>
.forgot-password {
  cursor: pointer;
}

.right-side-layout-container {
  width: 100%;
}
</style>
