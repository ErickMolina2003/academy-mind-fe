<template>
  <span
    :class="
      isTeacher
        ? 'layout-docentes right-side-layout-container'
        : 'right-side-layout-container'
    "
  >
    <ToasterVue />

    <v-row justify="center">
      <v-col cols="12" md="12" lg="12">
        <v-img
          src="@/assets/logo_campus.png"
          alt="logo"
          width="200px"
          height="200px"
          class="mx-auto"
        ></v-img>
      </v-col>
    </v-row>
    <v-form v-model="form" @submit.prevent="submitLogin">
      <v-row class="mt-10" justify="center">
        <v-col class="pb-0" cols="12" md="8" lg="8">
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            bg-color="primary"
            :label="getTitleAccount"
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
          <p
            @click="forgot"
            :class="
              isTeacher
                ? 'forgot-password text-end text-secondary-lighthen-1'
                : 'forgot-password text-end text-secondary'
            "
          >
            Olvidé mi contraseña
          </p>
        </v-col>
        <v-col cols="12" md="8" lg="8">
          <v-btn
            type="submit"
            :color="isTeacher ? 'secondary-lighthen-1' : 'secondary'"
            block
            height="50px"
            rounded="lg"
            >Entrar</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="auto" lg="auto">
          <v-switch
            v-model="isTeacher"
            color="secondary-lighthen-1"
            hide-details
            inset
            :label="`Registro: ${isTeacher ? 'docentes' : 'estudiantes'}`"
          ></v-switch>
        </v-col>
      </v-row>
    </v-form>
  </span>
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

const isTeacher = ref(false);

const getTitleAccount = computed(() => {
  if (isTeacher.value) {
    return "Número de empleado";
  }
  return "Número de cuenta";
});

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
    isTeacher: isTeacher.value,
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

function forgot() {
  router.push("/reinicio");
}
</script>

<style scoped>
.forgot-password {
  cursor: pointer;
}

.right-side-layout-container {
  width: 100%;
}

.layout-docentes {
  color: rgb(var(--v-theme-secondary-lighthen-1));
}
</style>
