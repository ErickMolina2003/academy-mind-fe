<template>
  <v-card class="mx-auto fill-height">
    <v-toolbar color="blue-darken-4">
      <v-toolbar-title>Contact List</v-toolbar-title>
      <div class="text-center">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="large"
          @click="dialog = true"
          class="mr-2"
        >
        </v-btn>

        <v-dialog v-model="dialog" width="600px" max-width="600px">
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
                placeholder="Ingrese numero de cuenta"
                class="ma-6"
              ></v-text-field>
            </v-form>
            <v-card-actions class="fixed-footer">
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                Cerrar
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="submitModal">
                Guardar
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
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle>
          {{ item.lastmessage }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const accountNum = ref("");

function validateFields() {
  if (
    accountRules.required(accountNum.value) == true &&
    accountRules.numbersOnly(accountNum.value) == true &&
    accountRules.size(accountNum.value) == true
  )
    return true;
  else return false;
}

const submitModal = () => {
  const value = validateFields();
  if (value) {
    console.log("Contacto guardado:", accountNum.value);

    closeModal();
  } else {
    console.log("Validación", value);
  }
};

const closeModal = () => {
  dialog.value = false;
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

function onContactClick(index) {
  console.log("Contacto clickeado:", index);
}

const items = [
  {
    avatar: "https://picsum.photos/250/300?image=660",
    name: "Maria Gonzalez",
    lastmessage: "Hola, como estas?",
  },
  {
    avatar: "https://picsum.photos/250/300?image=821",
    name: "Isabel Salgado",
    lastmessage: "Hahahahahahaa",
  },
  {
    avatar: "https://picsum.photos/250/300?image=783",
    name: "Juan Perez",
    lastmessage: "Viste lo que paso el otro dia??",
  },
  {
    avatar: "https://picsum.photos/250/300?image=783",
    name: "Pepito Grillo",
    lastmessage: "Envio una imagen",
  },
];
</script>

<style scoped>
.contacts-box {
  max-height: calc(100vh - 100px);
}
</style>
