<template>
  <div rounded>
    <div class="text-center">
      <img v-if="userIsTeacher" :src="store.user.teacher.photoOne" alt="user-img" class="user-img rounded-lg" />
      <img v-if="userIsStudent" :src="store.user.student.photoOne" alt="user-img" class="user-img rounded-lg" />
      <img v-if="userIsAdmin" :src="store.user.admin.photoOne" alt="user-img" class="user-img rounded-lg" />
      <h2>{{ store.user.firstName }} {{ store.user.firstLastName }}</h2>
    </div>
    <br />

    <v-form disabled>
      <h3 class="bg-blue-darken-1 my-3 pa-1">Información del Usuario</h3>
      <div class="d-flex">
        <v-text-field class="text-black font-weight-black" v-model="name" label="Nombre"></v-text-field>
        <v-text-field v-if="!isAdmin" class="text-black font-weight-black" v-model="account" :label="!(userIsTeacher | userIsBoss | userIsCoordinator)
          ? 'Número de Cuenta'
          : 'Número de Empleado'
          "></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field class="text-black font-weight-black" v-model="center" label="Centro Universitario"></v-text-field>
      </div>
      <div v-if="isAdmin" class="d-flex">
        <v-text-field class="text-black font-weight-black" v-model="emailpersonal" label="email"></v-text-field>
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
              :rules="[rules.required, rules.passwordRule]" label="Nueva Contraseña"></v-text-field>
            <v-text-field class="text-black font-weight-black" v-model="confirmPassword" type="password"
              :rules="[rules.required, rules.passwordRule]" label="Confirmar Contraseña"></v-text-field>
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
      <v-file-input chips multiple prepend-icon="mdi-camera" accept="image/*" v-model="uploadImage"
        :rules="[rules.maxLength]"></v-file-input>
      <v-btn @click="uploadingImage">Subir Imagenes</v-btn>
      <v-container justify="start">
        <v-row>
          <v-col cols="auto" v-if="uploadedImage[0]"><v-img :height="110" :width="110" cover
              :src="uploadedImage[0]"></v-img></v-col>
          <v-col cols="auto" v-if="uploadedImage[1]"><img :height="110" :width="110" :src="uploadedImage[1]"
              class="user-img rounded-lg" /></v-col>
          <v-col cols="auto" v-if="uploadedImage[2]"><img :height="110" :width="110" :src="uploadedImage[2]"
              class="user-img rounded-lg" /></v-col>
        </v-row>
      </v-container>
    </div>

    <div>
      <h3 v-if="userIsTeacher | userIsBoss | userIsCoordinator" class="bg-blue-darken-1 my-3 pa-1">
        Video
      </h3>
      <v-file-input v-if="userIsTeacher | userIsBoss | userIsCoordinator" chips v-model="video" accept="video/*"
        prepend-icon="mdi-camera"></v-file-input>
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
import { ref, onMounted, computed } from "vue";
import { storage } from "@/firebase";
import {
  ref as firebaseRed,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import data from "../../mock/studentProfile.json";
import StudentService from "@/services/student/student.service";
import TeacherService from "@/services/teacher/teacher.service";
import AdminService from "@/services/admin/admin.service";

const emit = defineEmits(["close", "update-profile"]);
const store = useAppStore();
const userLogged = computed(() => {
  if (store.user.teacher) {
    return store.user.teacher;
  }

  if (store.user.student) {
    return store.user.student;
  }

  return store.user;
});
const userIsTeacher = store.user.teacher;
const isAdmin = ref(store.user.isAdmin);
const studentService = new StudentService();
const teacherService = new TeacherService();
const adminService = new AdminService();
const userIsBoss = userLogged.value.isBoss;
const userIsCoordinator = userLogged.value.isCoordinator;
const userIsAdmin = userLogged.value.isAdmin;
const mockPassword = "********";
const dni = store.user.dni;
const description = ref("");
// const formEmail = ref(false);
// const email = ref("");
const center = data.center;
const emailpersonal = userLogged.email;
const props = Boolean;
const name =
  store.user.firstName +
  " " +
  store.user.secondName +
  " " +
  store.user.firstLastName +
  " " +
  store.user.secondLastName;
let account = "";
const originalDescription = ref("");
const originalEmail = ref("");
const video = ref()
const uploadImage = ref();
const uploadedImage = ref([]);

onMounted(() => {
  originalDescription.value = description.value;
  // originalEmail.value = email.value;
  // Agregar los demas campos (si hay)
});
account = userLogged.value.employeeNumber ?? userLogged.value.accountNumber;

function uploadingImage() {
  if (!uploadImage.value) return;
  let bucket = "";
  if (store.user.teacher) {
    bucket = "teacher";
  }

  if (store.user.student) {
    bucket = "student";
  }

  if (store.user.isAdmin) {
    bucket = "admin";
  }


  uploadImage.value.forEach((image) => {
    const imageRef = firebaseRed(
      storage,
      `images/${bucket}/${image.name + v4()}`
    );
    uploadBytes(imageRef, image).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        uploadedImage.value.push(url);
      });
    });
  });
  if (uploadedImage.value.length > 0) {
    store.setToaster({
      isActive: true,
      text: "Imágenes subidas con éxito.",
      color: "success",
    });
  }
}

function closeDialog() {
  emit("close", false);
}

async function confirmInfo() {
  if (description.value) {
    if (userIsTeacher) {
      await teacherService.updateTeacher(dni, {
        description: description.value,
      });

    } else if (userIsAdmin) {
      await adminService.updateAdmin(dni, {
        description: description.value,
      });
    } else {
      await studentService.updateStudent(dni, {
        description: description.value,
      });
    }

    store.setToaster({
      isActive: true,
      text: "¡Descripcion actualizada correctamente!",
      color: "success",
    });
  }

  if (uploadedImage.value) {
    if (userIsTeacher) {
      await teacherService.updateTeacher(dni, {
        photoOne: uploadedImage.value[0],
      });
    } else if (userIsAdmin) {
      await adminService.updateAdmin(dni, {
        photoOne: uploadedImage.value[0],
      });
    } else {

      if (uploadedImage.value[0]) {
        await studentService.updateStudent(dni, {
          photoOne: uploadedImage.value[0],
        });
        if (uploadedImage.value[1]) {
          await studentService.updateStudent(dni, {
            photoTwo: uploadedImage.value[1],
          });
          if (uploadedImage.value[2]) {
            await studentService.updateStudent(dni, {
              photoThree: uploadedImage.value[2],
            });
          }
        }
      }

    }
  }

  if (video.value) {
    await teacherService.updateTeacher(dni, {
      video: video.value[0].name,
    });
  }

  const updatedData = {};

  if (description.value !== originalDescription.value) {
    updatedData.description = description.value;
  }

  // if (email.value !== originalEmail.value) {
  //   updatedData.email = email.value;
  // }

  // Aggrega otras validaciones de campos que se quieran agregar

  if (Object.keys(updatedData).length > 0) {
    emit("update-profile", updatedData);

    if (updatedData.description) {
      originalDescription.value = updatedData.description;
    }

    if (updatedData.email) {
      originalEmail.value = updatedData.email;
    }
    //De igual manera agregar los campos que se quieran actualizar
  }
  emit("close", false);
}

const rules = {
  required: (value: any) => !!value || "Campo obligatorio",
  maxLength: (value: File[]) => {
    if (value.length <= 3) {
      return true;
    }
    return "Se permiten como máximo 3 imágenes.";
  },
  emailRule: (value: string) =>
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ) || "Email inválido.",
  passwordRule: (value: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/.test(
      value
    ) ||
    "La contraseña debe tener al menos 8 caracteres de longitud, 1 letra mayúscula, 1 número y 1 carácter especial.",
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

    if (store.user.isAdmin) {
      const response = await service.setAdminPassword(
        store.user.dni,
        currentPassword.value,
        password.value
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        unTogglePassword();
      }
      return;
    }

    if (store.user.student) {
      const response = await service.setStudentPassword(
        store.user.dni,
        currentPassword.value,
        password.value
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        unTogglePassword();
      }
      return;
    }

    if (store.user.teacher) {
      const response = await service.setTeacherPassword(
        store.user.dni,
        currentPassword.value,
        password.value
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        unTogglePassword();
      }
      return;
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

<style scoped>
.user-img {
  width: 128px;
  height: 128px;
  border: 7px solid #fff;
}
</style>

