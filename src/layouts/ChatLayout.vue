<template>
  <v-app>
    <v-navigation-drawer>
      <ContactList @contactClick="showChat = true" />
    </v-navigation-drawer>
    <v-main>
      <Chat v-if="showChat" @closeChat="showChat = false" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import ContactList from "@/components/SideBars/ContactList.vue";
import Chat from "@/components/chat/Chat.vue";
const showChat = ref(false);
</script>

<style></style>
