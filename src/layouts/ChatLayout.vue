<template>
  <v-app>
    <v-navigation-drawer>
      <ContactList @contactClick="openChat" />
    </v-navigation-drawer>
    <v-main>
      <Chat v-if="showChat" @closeChat="showChat = false" :contact="contact" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import ContactList from "@/components/SideBars/ContactList.vue";
import Chat from "@/components/chat/Chat.vue";
const showChat = ref(false);
const contact = ref();

function openChat(index) {
  console.log("Contacto clickeado desde el padre:", index);
  showChat.value = true;
  contact.value = index;
}
</script>

<style></style>
