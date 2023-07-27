<template>
  <v-card class="mx-auto w-auto fill-height">
    <v-toolbar color="d-flex bg-blue-darken-4">
      <v-toolbar-title>Lista de Contactos</v-toolbar-title>
      <div class="text-center ml-3 ma-1">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="large"
          @click="dialogAddContact = true"
          class="ma-2"
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
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeAddContact"
              >
                Cerrar
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="submitAddContact"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          color="primary"
          icon="mdi-email"
          size="large"
          @click="dialogInbox = true"
        >
        </v-btn>

        <v-dialog v-model="dialogInbox" class="w-auto" max-width="600px">
          <v-card>
            <v-toolbar color="blue" title="Solicitud de Contactos"></v-toolbar>
            <br />
            <v-list class="overflow-auto contacts-box">
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :prepend-avatar="item.avatar"
                class="mb-2"
              >
                <div class="d-flex justify-space-between align-center">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <div>
                    <v-btn
                      class="ma-2"
                      color="green"
                      @click="acceptContact(index)"
                    >
                      Accept
                      <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-2"
                      color="red"
                      @click="rejectContact(index)"
                    >
                      Decline
                      <v-icon end icon="mdi-cancel"></v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-list-item>
            </v-list>
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

    <v-list class="overflow-auto contacts-box">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :prepend-avatar="item.avatar"
        @click="onContactClick(index)"
        class="mb-2"
      >
        <div class="d-flex justify-space-between">
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-icon v-if="item.isOnline">
            <v-icon color="green" icon="mdi-circle" size="x-small"></v-icon>

            <span
              class="text-caption text-medium-emphasis ms-1 font-weight-light"
            >
              En línea
            </span>
          </v-list-item-icon>
        </div>

        <v-list-item-subtitle>
          {{ item.lastmessage }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const dialogInbox = ref(false);
const dialogAddContact = ref(false);
const accountNum = ref("");

function onContactClick(index) {
  console.log("Contacto clickeado:", index);
}
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
    console.log("Contacto guardado:", accountNum.value);

    closeModal();
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
  console.log("Contacto aceptado:", `id: ${index}`);
}

function rejectContact(index) {
  console.log("Contacto rechazado:", `id: ${index}`);
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
    isOnline: false,
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
