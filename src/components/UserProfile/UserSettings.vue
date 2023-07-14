<template>
  <div rounded>
    <div class="text-center">
      <img src="@/assets/user-img.png" alt="user-img" class="user-img rounded-lg" />
      <h2>{{ userLogged.user.firstName }} {{ userLogged.user.firstLastName }}</h2>
    </div>
    <br />

    <v-form disabled>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Información del Usuario</h3>
      <div class="d-flex">
        <v-text-field class="text-black font-weight-black" v-model="name" label="Nombre"></v-text-field>
        <v-text-field class="text-black font-weight-black" v-model="account"
          :label=" !(userIsTeacher | userIsBoss | userIsCoordinator) ? 'Número de Cuenta' : 'Número de Empleado'"></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field class="text-black font-weight-black" v-model="center" label="Centro Universitario"></v-text-field>
      </div>
    </v-form>
    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Contraseña</h3>
      <v-row>
        <v-col v-if="!togglePassword">
          <v-text-field class="text-black font-weight-black" v-model="mockPassword" label="Contraseña"
            disabled></v-text-field>
        </v-col>
        <v-col v-if="togglePassword">
          <v-form v-model="form" @submit.prevent="submitChangePassword">
            <v-text-field class="text-black font-weight-black" v-model="currentPassword" type="password"
              :rules="[rules.required]" label="Actual Contraseña"></v-text-field>
            <v-text-field class="text-black font-weight-black" v-model="password" type="password"
              :rules="[rules.required]" label="Nueva Contraseña"></v-text-field>
            <v-text-field class="text-black font-weight-black" v-model="confirmPassword" type="password"
              :rules="[rules.required]" label="Confirmar Contraseña"></v-text-field>
            <v-row justify="center">
              <v-col cols="12" md="auto" lg="auto">
                <v-btn color="success" type="submit" class="mr-4">Cambiar Contraseña</v-btn>
                <v-btn color="error" @click="unTogglePassword">Cancelar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" md="auto" lg="auto" align-self="center">
          <v-btn v-if="!togglePassword" color="secondary-lighthen-1" @click="togglePassword = !togglePassword">Cambiar
            Contraseña</v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Imagenes</h3>
      <v-file-input chips multiple accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"></v-file-input>
      <v-container justify="start">
        <v-row>
          <v-col cols="auto"><v-img :height="110" :width="110" cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img></v-col>
          <v-col cols="auto"><img :height="110" :width="110" src="@/assets/logo.png" alt="user-img"
              class="user-img rounded-lg" /></v-col>
          <v-col cols="auto"><img :height="110" :width="110" src="@/assets/user-img.png" alt="user-img"
              class="user-img rounded-lg" /></v-col>
        </v-row>
      </v-container>
    </div>

    <div>
      <h3 v-if="userIsTeacher | userIsBoss | userIsCoordinator" class="bg-blue-darken-1 my-3 pa-1">Video</h3>
      <v-file-input v-if="userIsTeacher | userIsBoss | userIsCoordinator" chips accept="video/*" prepend-icon="mdi-camera"></v-file-input>
    </div>

    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Correo Electronico</h3>
      <v-form v-model="formEmail">
        <v-responsive class="text-left" max-width="344">
          <v-text-field hide-details="auto" placeholder="johndoe@gmail.com" type="email" v-model="email"
            :rules="[rules.emailRule]"></v-text-field>
        </v-responsive>
      </v-form>
    </div>

    <br />
    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Descripción</h3>
      <v-textarea label="Escriba aqui" variant="solo" v-model="description"></v-textarea>
    </div>
    <div class="text-right mb-3">
      <v-spacer></v-spacer>
      <v-btn style="width: 150px" class="bg-blue-grey-darken-1 mr-6" variant="text" rounded
        @click="closeDialog">Cerrar</v-btn>
      <v-btn style="width: 150px" class="bg-blue-darken-4 text-right" rounded variant="text" @click="confirmInfo">
        Confirmar
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginService from "@/services/login/login.service";
import { useAppStore } from "@/store/app";
import { ref, onMounted } from 'vue';
import data from "../../mock/studentProfile.json";
import StudentService from '@/services/student/student.service';
import TeacherService from '@/services/teacher/teacher.service';
const emit = defineEmits(['close', 'update-profile']);
const store = useAppStore();
const userLogged = store.user.user;
const userIsTeacher = userLogged.isTeacher;
const studentService = new StudentService();
const teacherService = new TeacherService();
const userIsBoss = userLogged.isBoss;
const userIsCoordinator = userLogged.isCoordinator;
const mockPassword = "********";
const dni = userLogged.user.dni;
const description = ref("");
const formEmail = ref(false);
const email = ref("");
const center = data.center;
const props = Boolean;
const name = userLogged.user.firstName + ' ' + userLogged.user.secondName + ' ' + userLogged.user.firstLastName + ' ' + userLogged.user.secondLastName;
let account = "";
const originalDescription = ref('');
const originalEmail = ref('');
onMounted(() => {
  originalDescription.value = description.value;
  originalEmail.value = email.value;
  // Agregar los demas campos (si hay)
});
if (userIsTeacher | userIsBoss | userIsCoordinator) {
  account = userLogged.employeeNumber;
} else {
  account = userLogged.accountNumber;
}

function closeDialog() {
  emit('close', false);
}

async function confirmInfo() {


  if (email.value) {
    if (formEmail.value) {
      if (userIsTeacher) {
        await teacherService.updateTeacher(dni, { "email": email.value });
      } else {
        await studentService.updateStudent(dni, { "email": email.value });
      }

      store.setToaster({
        isActive: true,
        text: "¡Correo personal actualizado correctamente!",
        color: "success",
      });
    }
  }

  if (description.value) {
    if (userIsTeacher) {
      await teacherService.updateTeacher(dni, { "description": description.value });
    } else {
      await studentService.updateStudent(dni, { "description": description.value });
    }

    store.setToaster({
      isActive: true,
      text: "¡Descripcion actualizada correctamente!",
      color: "success",
    });
  }

  if (description.value && email.value && formEmail.value) {
    store.setToaster({
      isActive: true,
      text: "¡Descripcion y correo personal actualizados correctamente!",
      color: "success",
    });

  }
  const updatedData = {};

  if (description.value !== originalDescription.value) {
    updatedData.description = description.value;
  }

  if (email.value !== originalEmail.value) {
    updatedData.email = email.value;
  }

// Aggrega otras validaciones de campos que se quieran agregar

  if (Object.keys(updatedData).length > 0) {
    emit('update-profile', updatedData);

    if (updatedData.description) {
      originalDescription.value = updatedData.description;
    }

    if (updatedData.email) {
      originalEmail.value = updatedData.email;
    }
    //De igual manera agregar los campos que se quieran actualizar
  }
  emit('close', false);

};

const rules = {
  required: (value: any) => !!value || "Campo obligatorio",
  emailRule: (value: string) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Email inválido."
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
