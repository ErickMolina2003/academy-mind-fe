<template>
  <div rounded>
    <div class="text-center">
      <v-row>
        <v-col cols="12" md="12" lg="12">
          <img v-if="profilePicture" :src="profilePicture" alt="user-img" class="user-img rounded-lg" />
          <img v-else src="@/assets/default-picture.jpg" alt="user-img" class="user-img rounded-lg" />
        </v-col>
        <v-col cols="12" md="12" lg="12">
          <h2>{{ store.user.firstName }} {{ store.user.firstLastName }}</h2>
        </v-col>
        <v-col v-if="store.user.student" cols="12" md="12" lg="12">
          <v-btn @click="pictureModal = true" color="secondary-lighthen-1">Actualizar foto de perfil</v-btn>
        </v-col>
        <v-dialog class="px-5" v-model="pictureModal" width="auto" persistent>
          <v-card width="800px">
            <v-container>
              <v-row>
                <v-col v-if="userImages[0] === undefined || userImages[1] === undefined || userImages[2] === undefined"
                  cols="12" md="12" lg="12">
                  <div>
                    <h3 class="bg-blue-darken-1 my-3 pa-1">Imagenes</h3>
                    <v-file-input chips prepend-icon="mdi-camera" accept="image/*" v-model="uploadImage"></v-file-input>
                    <v-container justify="start">
                      <v-row justify="center">
                        <v-col cols="auto" v-if="uploadImage[0]">
                          <v-img height="110" width="110" cover :src="getImageUrl"></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-col>
                <v-col v-if="userImages[0] !== undefined || userImages[1] !== undefined || userImages[2] !== undefined"
                  cols="12" md="12" lg="12">
                  <div>
                    <h3 class="bg-blue-darken-1 my-3 pa-1">Fotos Sugeridas</h3>
                    <v-container justify="start">
                      <v-row justify="center">
                        <v-col cols="auto" v-for="image in userImages" :key="image">
                          <v-img height="110" width="110" cover :src="image"></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-col>
              </v-row>
            </v-container>

            <div class="text-right mb-3 mx-3">
              <v-spacer></v-spacer>
              <v-btn style="width: 150px" class="bg-blue-grey-darken-1 mr-6" variant="text" rounded
                @click="closeImageDialog">Cerrar</v-btn>
              <v-btn style="width: 150px" class="bg-blue-darken-4 text-right" rounded variant="text"
                @click="uploadingImage">
                Confirmar
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
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
        <v-text-field class="text-black font-weight-black" v-model="emailPersonal" label="Email"></v-text-field>
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

    <div v-if="userIsTeacher | userIsBoss | userIsCoordinator">
      <h3 class="bg-blue-darken-1 my-3 pa-1 pb-0 mb-0">Video</h3>
      <v-file-input chips accept="video/*" prepend-icon="mdi-video" v-model="uploadVideo"></v-file-input>
      <div class="text-center mb-2">
        <!-- Boton para video -->
        <v-btn v-if="uploadVideo" style="width: 150px" class="bg-blue-darken-4 text-right" rounded variant="text" @click="uploadingVideo">
          Confirmar
        </v-btn>
      </div>
    </div>

    <br />
    <div>
      <h3 class="bg-blue-darken-1 my-3 pa-1 pt-0 mt-0">Descripción</h3>
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
import { ref, onMounted, computed, watch } from "vue";
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
const profilePicture = ref();
const userLogged = computed(() => {
  if (store.user.teacher) {
    profilePicture.value = store.user.teacher.photoOne;
    return store.user.teacher;
  }

  if (store.user.student) {
    profilePicture.value = store.user.student.photoOne;
    return store.user.student;
  }

  profilePicture.value = store.user.photoOne; //del admin
  return store.user;
});
const userIsTeacher = computed(() => {
  return store.user.teacher !== undefined;
});

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
const emailPersonal = userLogged.value.email;
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
const video = ref();

const userImages = ref([]);
const pictureModal = ref(false);
const uploadImage = ref([]);
const uploadedImage = ref([]);
const uploadVideo = ref(null);

async function uploadingVideo() {
  if (!uploadVideo.value) return;

  const videoRef = firebaseRed(storage, `videos/${uploadVideo.value[0].name + v4()}`);
  try {
    const response = await uploadBytes(videoRef, uploadVideo.value[0]);
    const url = await getDownloadURL(response.ref);

    await teacherService.updateTeacher(dni, {
      video: url,
    });

    store.setToaster({
      isActive: true,
      text: "Video subido con éxito.",
      color: "success",
    });
  } catch (error) {
    store.setToaster({
      isActive: true,
      text: "Error al subir video.",
      color: "error",
    });
  }
  uploadVideo.value = null;
  getImagesOfUser();
  
}

const getImageUrl = computed(() => {
  return URL.createObjectURL(uploadImage.value[0]);
});
const getSecondImageUrl = computed(() => {
  return URL.createObjectURL(uploadImage.value[1]);
});
const getThirdImageUrl = computed(() => {
  return URL.createObjectURL(uploadImage.value[2]);
});
const getVideoUrl = computed(() => {
  return URL.createObjectURL(uploadVideo.value[0]);
});

const getVideoOfUser = () => {
  if (store.user.teacher) {
    video.value = store.user.teacher?.video ?? undefined;
  }
}

const getImagesOfUser = () => {
  if (store.user.student) {
    userImages.value = [
      store.user.student?.photoOne ?? undefined,
      store.user.student?.photoTwo ?? undefined,
      store.user.student?.photoThree ?? undefined,
    ];
  }
  if (store.user.teacher) {
    userImages.value = [store.user.student?.photoOne ?? undefined];
  }
}

onMounted(() => {
  getImagesOfUser();
  getVideoOfUser();
  originalDescription.value = description.value;

  // originalEmail.value = email.value;
  // Agregar los demas campos (si hay)
});
account = userLogged.value.employeeNumber ?? userLogged.value.accountNumber;
const imageToUpload = ref("");
async function uploadingImage() {

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

  for (const image of uploadImage.value) {
    const imageRef = firebaseRed(storage, `images/${bucket}/${image.name + v4()}`);
    try {
      const response = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(response.ref);

      uploadedImage.value.push(url);
      imageToUpload.value = uploadedImage.value[0];

    } catch (error) {
      store.setToaster({
        isActive: true,
        text: "Error al subir imagen.",
        color: "error",
      });
      
    }
  }
  if (uploadedImage.value.length > 0) {

    try {
      if (!store.user.student.photoOne) {
        await studentService.updateStudent(dni, {
          photoOne: imageToUpload.value,
        });

      } else if (!store.user.student.photoTwo) {
        await studentService.updateStudent(dni, {
          photoTwo: imageToUpload.value,
        });
      } else {
        await studentService.updateStudent(dni, {
          photoThree: imageToUpload.value,
        });
      }
      store.setToaster({
        isActive: true,
        text: "Imágenes subidas con éxito.",
        color: "success",
      });
      profilePicture.value = store.user.student.photoOne;
    } catch (error) {
      store.setToaster({
        isActive: true,
        text: "Error al subir imagen.",
        color: "error",
      });
    }
  }
  pictureModal.value = false;
  uploadImage.value = [];
  getImagesOfUser();
}


function closeImageDialog() {
  uploadImage.value = [];
  pictureModal.value = false;
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
