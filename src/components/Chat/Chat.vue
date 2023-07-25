<template>
  <v-card class="w-100 fill-height">
    <v-card-title class="pa-0">
      <v-list class="bg-blue-darken-4 mx-auto" rounded>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="John Leider"
          subtitle="john@unah.hn"
        />
      </v-list>
    </v-card-title>
    <v-card-text class="chat-box overflow-auto flex-grow-1">
      <v-row>
        <v-col
          v-for="(message, index) in chat"
          :key="index"
          :cols="message.isReceived ? '6' : '6'"
          :offset="message.isReceived ? '6' : '0'"
          class="d-flex"
        >
          <div
            v-if="message.isReceived"
            class="d-inline-block bg-light-blue-lighten-3 mt-3 mx-3 pa-3 text-left rounded-xl rounded-be-0 ml-auto"
          >
            <p>{{ message.text }}</p>
          </div>
          <div
            v-else
            class="d-inline-block bg-grey-lighten-2 mt-3 mx-3 pa-3 text-left rounded-custom mr-auto"
          >
            <p>{{ message.text }}</p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="bg-blue-darken-4 pt-5 p-0">
      <div class="d-flex flex-grow-1">
        <v-textarea
          v-model="newMessage"
          placeholder="Mensaje"
          rows="1"
          variant="solo"
          rounded="xl"
          class="mx-3"
        />
        <v-btn
          @click="sendMessage()"
          class="mx-3 bg-blue"
          icon="mdi-send"
          color="white"
        >
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import ContactList from "./ContactList.vue";
import chat from "../../mock/chat.json";
const newMessage = ref("");

//Funcion de prueba no actualiza JSON;
function sendMessage() {
  if (this.newMessage.trim() !== "") {
    console.log("Mensaje enviado:", this.newMessage);
    this.newMessage = "";
  }
}
</script>

<style scoped>
.chat-box {
  max-height: calc(100vh - 200px);
}
.rounded-custom {
  border-radius: 20px 20px 20px 0;
}
</style>
