<template>
  <v-app>
    <v-navigation-drawer>
      <ContactList @contactClick="openChat" />
    </v-navigation-drawer>
    <v-main>
      <Chat v-if="showChat" :name="name" :image="image" @closeChat="showChat = false" :contact="contact" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref,watch } from "vue";
import ContactList from "@/components/SideBars/ContactList.vue";
import Chat from "@/components/chat/Chat.vue";
import { onValue, ref as dbref, set, update } from "firebase/database";
import { db } from "@/firebase";
const showChat = ref(false);
const contact = ref("");
const name = ref("");
const image = ref("");
function openChat(index) {
  console.log("Contacto clickeado desde el padre:", index);
  showChat.value = true;
  contact.value = index;
}

watch(contact, async()=>{
  onValue(dbref(db), (snapshot) => {
    
    const data = snapshot.val();
    if (data !== null) {
      Object.values(data).map((student) => {
        
        if (student.accountNumber == contact.value) {
          name.value = student.name;
          image.value = student.profilePicture
        }
      });
    }
  });
})
</script>

<style></style>
