<template>
  <v-container class="profile-layout">
    <v-form v-model="form" @submit.prevent="submitChangePassword">
      <v-row class="mt-10" justify="center">
        <v-col class="pb-0" cols="12" md="8" lg="8">
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            bg-color="primary"
            label="Password"
            type="password"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="12" md="8" lg="8">
          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required]"
            bg-color="primary"
            label="Confirm Password"
            type="password"
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
            >Entrar</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import LoginService from "@/services/login/login.service";
import { ref } from "vue";

const password = ref("");
const confirmPassword = ref("");
const form = ref(false);
const rules = {
  required: (value) => !!value || "Field is required",
};

function submitChangePassword() {
  if (!form.value || password.value !== confirmPassword.value) return;

  const token = JSON.parse(window.localStorage.getItem("academy-user"));
  const service = new LoginService();
  service.setPassword(token.token, password.value);
}
</script>

<style scoped>
.profile-layout {
  height: 100%;
}
</style>
