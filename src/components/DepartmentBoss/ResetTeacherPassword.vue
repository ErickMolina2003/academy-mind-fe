<template class="">
  
      <ToasterVue />
    
   <div class="h-100 w-100 container">
  </div>
    <v-container class=" d-flex align-center form" >
      <v-row> 
            <v-col >
                <h1 class="mb-3">Bienvenido al proceso de reinicio de contraseña</h1>
                <p>Siga estos pasos para restablecer su contraseña:</p>
                <ol style="padding-left: 3em;">
                    <li>Ingrese la contraseña por defecto proporcionada.</li>
                    <li>Ingrese su nueva contraseña.</li>
                    <li>Repita la nueva contraseña para confirmar.</li>
                </ol>
            </v-col>
            <v-col>
              <v-form v-model="form" @submit.prevent="submitChangePassword">
                <v-text-field class="text-black font-weight-black" v-model="dni" type="text" :counter="13"
                :rules="[
                      rules.required,
                      dniRules.numbersOnly,
                      dniRules.size,
                    ]" label="Número de identidad"></v-text-field>
                <v-text-field class="text-black font-weight-black" v-model="defaultPassword" type="password"
                  :rules="[rules.required]" label="Contraseña por Defecto"></v-text-field>
                <v-text-field class="text-black font-weight-black" v-model="password" type="password"
                  :rules="[rules.required, rules.passwordRule]" label="Nueva Contraseña"></v-text-field>
                <v-text-field class="text-black font-weight-black" v-model="confirmPassword" type="password"
                  :rules="[rules.required, rules.passwordRule]" label="Confirmar Contraseña"></v-text-field>
                <v-row justify="center">
                  <v-col cols="12" md="auto" lg="auto">
                    <v-btn color="success" type="submit" class="mr-4" >Cambiar Contraseña</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
    
    </v-container>
</template>

<script setup >
import { useAppStore } from "@/store/app";
import LoginService from "@/services/login/login.service";
import { ref } from "vue";
import TeacherService from "@/services/teacher/teacher.service";
import router from "@/router";
import ToasterVue from "@/components/Toaster.vue";
const defaultPassword = ref("");
const password = ref("");
const dni = ref("");
const confirmPassword = ref("");
const togglePassword = ref(false);
const form = ref(false);
const teacherService = new TeacherService();

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
        dni.value,
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

const dniRules = {
  numbersOnly: (value) =>
    /^\d+$/.test(value) ||
    "Introduzca un DNI válido, solo números sin guiones ni puntos",
  size: (value) =>
    value?.length === 13 || "El DNI debe tener exactamente 13 caracteres",
};
</script>

<style scoped>
.container{
  background-image: url('@/assets/login_bg.jpg');
  filter: blur(8px);
}

.form{
  background-color: #fff;
    padding: 3em 2em;
    position: absolute;
    opacity: .9;
    position: absolute;
}

</style>