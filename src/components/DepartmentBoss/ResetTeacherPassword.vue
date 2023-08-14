<template class="">
  <ToasterVue />

  <div class="h-100 w-100 container"></div>
  <v-container class="d-flex align-center form">
    <v-row>
      <v-col>
        <h1 class="mb-3">Bienvenido al proceso de reinicio de contraseña</h1>
        <p>Siga estos pasos para restablecer su contraseña:</p>
        <ol style="padding-left: 3em">
          <li>Ingrese la contraseña por defecto proporcionada.</li>
          <li>Ingrese su nueva contraseña.</li>
          <li>Repita la nueva contraseña para confirmar.</li>
        </ol>
      </v-col>
      <v-col>
        <v-form v-model="form" @submit.prevent="submitChangePassword">
          <v-text-field
            class="text-black font-weight-black"
            v-model="defaultPassword"
            type="password"
            :rules="[rules.required]"
            label="Contraseña por Defecto"
          ></v-text-field>
          <v-text-field
            class="text-black font-weight-black"
            v-model="password"
            type="password"
            :rules="[rules.required, rules.passwordRule]"
            label="Nueva Contraseña"
          ></v-text-field>
          <v-text-field
            class="text-black font-weight-black"
            v-model="confirmPassword"
            type="password"
            :rules="[rules.required, rules.passwordRule]"
            label="Confirmar Contraseña"
          ></v-text-field>
          <v-row justify="center">
            <v-col cols="12" md="auto" lg="auto">
              <v-btn color="success" type="submit" class="mr-4"
                >Cambiar Contraseña</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
import LoginService from "@/services/login/login.service";
import { ref, onMounted } from "vue";
import TeacherService from "@/services/teacher/teacher.service";
import router from "@/router";
import ToasterVue from "@/components/Toaster.vue";
import axios from "axios";
const defaultPassword = ref("");
const password = ref("");
const dni = ref("");
const confirmPassword = ref("");
const togglePassword = ref(false);
const form = ref(false);
const teacherService = new TeacherService();
const route = useRoute();
const token = ref(route.params.token);
const id = ref(route.params.id);

onMounted(async () => {
  axios
    .get(
      `http://localhost:3001/api/teacher/validate-reset-password/${token.value}`
    )
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.success);
      } else {
        console.log(response.data.success);
        store.setToaster({
          isActive: true,
          text: "La solicitud ha expirado",
          color: "error",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const store = useAppStore();

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
    try {
      const service = new LoginService();
      const response = await service.setTeacherPassword(
        id.value,
        defaultPassword.value,
        password.value
      );
      if (response.status === 200 && response.data.statusCode == 200) {
        store.setToaster({
          isActive: true,
          text: "¡Contraseña actualizada correctamente!",
          color: "success",
        });
        router.push("/login");
      }
    } catch (error) {
      store.setToaster({
        isActive: true,
        text: "Ha habido un error.",
        color: "error",
      });
      clean();
    }
  } else {
    store.setToaster({
      isActive: true,
      text: "Las contraseñas no coinciden.",
      color: "error",
    });
    clean();
  }
}
function clean() {
  defaultPassword.value = "";
  password.value = "";
  confirmPassword.value = "";
  form.value = false;
}

const rules = {
  required: (value) => !!value || "Campo obligatorio",
  passwordRule: (value) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/.test(
      value
    ) ||
    "La contraseña debe tener al menos 8 caracteres de longitud, 1 letra mayúscula, 1 número y 1 carácter especial.",
};
</script>

<style scoped>
.container {
  background-image: url("@/assets/login_bg.jpg");
  filter: blur(8px);
}

.form {
  background-color: #fff;
  padding: 3em 2em;
  position: absolute;
  opacity: 0.9;
  position: absolute;
}
</style>
