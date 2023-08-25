<template>
  <v-card class="mx-start fill-height">
    <v-toolbar color="d-flex bg-blue-darken-4">
      <v-toolbar-title style="font-size: 20px">Contactos</v-toolbar-title>
      <div class="text-center ml-3 ma-1">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="large"
          @click="dialogAddContact = true"
        >
        </v-btn>
        <v-btn
          color="primary"
          icon="mdi-email"
          size="large"
          @click="dialogInbox = true"
        >
        </v-btn>

        <v-dialog v-model="dialogAddContact" class="w-auto" max-width="600px">
          <v-card>
            <v-toolbar color="blue" title="Agregar Contactos"></v-toolbar>
            <br />
            <v-form>
              <v-text-field
                v-model="accountNum"
                :rules="[
                  accountRules.required,
                  accountRules.numbersOnly,
                  accountRules.size,
                ]"
                clearable
                placeholder="Ingrese número de cuenta"
                class="ma-6"
              ></v-text-field>
            </v-form>
            <v-card-actions class="fixed-footer">
              <v-spacer></v-spacer>
              <v-btn color="error" variant="text" @click="closeAddContact">
                Cancelar
              </v-btn>
              <v-btn color="success" variant="text" @click="submitAddContact">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogInbox" class="w-auto" max-width="600px">
          <v-card>
            <v-toolbar color="blue" title="Solicitud de Contactos"></v-toolbar>
            <br />
            <v-list
              v-if="currentStudent && currentStudent.friendRequests"
              class="overflow-auto contacts-box"
            >
              <v-list-item
                v-for="(item, index) in currentStudent.friendRequests"
                :key="item.accountNumber"
                :prepend-avatar="item.profilePicture"
                class="mb-2"
              >
                <div class="d-flex justify-space-between align-center">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <div>
                    <v-btn
                      class="ma-2"
                      color="green"
                      @click="acceptContact(item.accountNumber)"
                    >
                      Aceptar
                      <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-2"
                      color="red"
                      @click="rejectContact(item.accountNumber)"
                    >
                      Rechazar
                      <v-icon end icon="mdi-cancel"></v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-list-item>
            </v-list>
            <h4
              class="text-center"
              v-if="currentStudent && !currentStudent.friendRequests"
            >
              No tiene solicitudes nuevas
            </h4>
            <v-card-actions class="fixed-footer">
              <v-spacer></v-spacer>
              <v-btn
                block
                color="blue-darken-1"
                variant="text"
                @click="closeInbox"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-toolbar>

    <v-list
      v-if="currentStudent && currentStudent.friends"
      class="overflow-auto contacts-box"
    >
      <v-list-item
        v-for="(item, index) in currentStudent.friends"
        :key="item.accountNumber"
        :prepend-avatar="item.profilePicture"
        @click="onContactClick(item.accountNumber)"
        class="mb-2"
      >
        <div class="d-flex justify-space-between">
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-icon v-if="item.isOnline">
            <v-icon color="green" icon="mdi-circle" size="x-small"></v-icon>
            <span
              class="text-caption text-medium-emphasis ms-1 font-weight-light"
            >
            </span>
          </v-list-item-icon>
        </div>
      </v-list-item>
    </v-list>
    <h4
      class="text-center mt-5"
      v-if="currentStudent && !currentStudent.friends"
    >
      No tiene contactos para conversar
    </h4>
  </v-card>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { onValue, ref as dbref, set, update } from "firebase/database";
import { db } from "@/firebase";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import ChatService from "@/services/chat/chat.service";

const store = useAppStore();
const chatService = new ChatService();
const dialogInbox = ref(false);
const dialogAddContact = ref(false);
const accountNum = ref("");
const props = defineProps();
const emit = defineEmits();
const onContactClick = (index) => {
  emit("contactClick", index);
};

const students = ref([]);
const currentStudent = ref();

onMounted(async () => {
  //obtener todos
  onValue(dbref(db), (snapshot) => {
    students.value = [];
    const data = snapshot.val();
    if (data !== null) {
      Object.values(data).map((student) => {
        students.value.push(student);
        if (student.accountNumber == store.user.student.accountNumber) {
          currentStudent.value = student;
        }
      });
    }
  });
});

//Añadir contacto
const closeAddContact = () => {
  dialogAddContact.value = false;
};

function validateFields() {
  if (
    accountRules.required(accountNum.value) == true &&
    accountRules.numbersOnly(accountNum.value) == true &&
    accountRules.size(accountNum.value) == true
  )
    return true;
  else return false;
}

const submitAddContact = () => {
  const value = validateFields();
  if (value) {
    let studentsAccountNumbers = [];
    let actualStudent;

    students.value.forEach((student) => {
      studentsAccountNumbers.push(student.accountNumber);
      if (student.accountNumber == store.user.student.accountNumber) {
        actualStudent = student;
      }
    });

    if (!studentsAccountNumbers.includes(accountNum.value)) {
      store.setToaster({
        color: "error",
        isActive: true,
        text: "No se ha encontrado al estudiante",
      });

      return;
    }

    students.value.forEach(async (student) => {
      if (student.accountNumber == accountNum.value) {
        let existingFriendRequest = student.friendRequests ?? null;
        update(dbref(db, `/${student.accountNumber}`), {
          friendRequests: existingFriendRequest
            ? [...existingFriendRequest, actualStudent]
            : [actualStudent],
        });
        await chatService.sendFriendshipRequest(
          store.user.student.accountNumber,
          accountNum.value
        );
      }
    });

    accountNum.value = "";

    closeAddContact();
  } else {
    console.log("Validación", value);
  }
};

const accountRules = {
  required: (value) => !!value || "Campo obligatorio",
  numbersOnly: (value) =>
    /^\d+$/.test(value) ||
    "Introduzca un número de cuenta valido, solo números sin guiones ni puntos",
  size: (value) =>
    value?.length === 11 ||
    "El número de cuenta debe tener exactamente 11 caracteres",
};

//Solicitud de Contacto
const closeInbox = () => {
  dialogInbox.value = false;
};

function acceptContact(index) {
  let acceptedStudent;
  students.value.forEach((student) => {
    if (student.accountNumber == index) {
      acceptedStudent = student;
    }
  });
  let indexOfAccepted;
  currentStudent.value.friendRequests.forEach((request, index) => {
    if (request.accountNumber == index) {
      indexOfAccepted = index;
    }
  });
  currentStudent.value.friendRequests.splice(indexOfAccepted, 1);
  let existingFriends = currentStudent.value.friends ?? null;
  update(dbref(db, `/${currentStudent.value.accountNumber}`), {
    friends: existingFriends
      ? [...existingFriends, acceptedStudent]
      : [acceptedStudent],
    friendRequests: currentStudent.value.friendRequests,
  });

  let existingFriends2 = acceptedStudent.friends ?? null;

  update(dbref(db, `/${index}`), {
    friends: existingFriends2
      ? [...existingFriends2, currentStudent.value]
      : [currentStudent.value],
  });
}

function rejectContact(index) {
  let rejectedStudent;

  students.value.forEach((student) => {
    if (student.accountNumber == index) {
      rejectedStudent = student;
    }
  });

  let indexOfRejected;

  currentStudent.value.friendRequests.forEach((request, index) => {
    if (request.accountNumber == index) {
      indexOfRejected = index;
    }
  });

  currentStudent.value.friendRequests.splice(indexOfRejected, 1);

  update(dbref(db, `/${currentStudent.value.accountNumber}`), {
    friendRequests: currentStudent.value.friendRequests,
  });
}

const items = [
  {
    avatar: "https://picsum.photos/250/300?image=660",
    name: "Maria Gonzalez",
    lastmessage: "Hola, como estas?",
    isOnline: true,
  },
  {
    avatar: "https://picsum.photos/250/300?image=821",
    name: "Isabel Salgado",
    lastmessage: "Hahahahahahaa",
    isOnline: true,
  },
  {
    avatar: "https://picsum.photos/250/300?image=783",
    name: "Juan Perez",
    lastmessage: "Viste lo que paso el otro dia??",
    isOnline: true,
  },
  {
    avatar: "https://picsum.photos/250/300?image=783",
    name: "Pepito Grillo",
    lastmessage: "Ya matriculaste?",
    isOnline: false,
  },
];
</script>

<style scoped>
.contacts-box {
  max-height: calc(100vh - 100px);
}
</style>
