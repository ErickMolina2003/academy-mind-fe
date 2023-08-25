<template>
  <v-card class="chat-card" v-if="contactChat && currentStudent && messages">
    <v-card-title class="pa-0">
      <v-list class="bg-blue-darken-4 mx-auto" rounded>
        <v-list-item :prepend-avatar="image" :title="contact" :subtitle="name" />
      </v-list>
    </v-card-title>
    <v-card-text class="chat-box overflow-auto flex-grow-1">
      <v-row class="d-block">
        <v-col v-for="(message, index) in messages" :key="message" cols="auto" class="d-flex">
          <div
            :class="message?.emisor == store.user.student.accountNumber ? 'emisor-message bg-light-blue-lighten-3 mt-3 mx-3 pa-3  rounded-xl rounded-be-0 ml-auto' : 'receptor-message bg-grey-lighten-2 mt-3 mx-3 pa-3  rounded-xl rounded-bs-0 mr-auto'">
            <p :class="message?.emisor == store.user.student.accountNumber ? 'text-right' : 'text-left'">
              {{ message?.message }}</p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="bg-blue-darken-4 pt-5 p-0 footer">
      <div class="d-flex flex-grow-1">
        <v-textarea v-model="newMessage" placeholder="Mensaje" rows="1" variant="solo" rounded="xl" class="mx-3"
          @keyup.enter="sendMessage()" />
        <v-btn @click="sendMessage()" class="mx-3 bg-blue" icon="mdi-send" color="white">
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import chat from "../../mock/chat.json";
import { onValue, ref as dbref, set, update } from "firebase/database";
import { db } from "@/firebase";
import { useAppStore } from "@/store/app";

const currentStudent = ref();
const contactChat = ref();
const messages = ref([]);

const newMessage = ref("");
const props = defineProps({
  contact: String,
  name:String,
  image:String
});
const store = useAppStore();

onMounted(async () => {
  //obtener todos
  onValue(dbref(db), (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      Object.values(data).map((student) => {
        if (student.accountNumber == store.user.student.accountNumber) {
          currentStudent.value = student;
          student.conversations.forEach((conversation) => {
            if (conversation.contactNumber == props.contact) {
              messages.value = conversation.messages;
              return;
            }
          });
        }
        if (student.accountNumber == props.contact) {
          contactChat.value = student;
        }
      });
    }
  });
});

const emit = defineEmits();
const closeChat = () => {
  emit("closeChat");
};
//Funcion de prueba no actualiza JSON;
function sendMessage() {
  if (this.newMessage.trim() !== "") {
    let currentStudentConversation = null;
    let newCurrentConversation=null;
    if (currentStudent.value.conversations) {
      let conversationExist = false;
      currentStudent.value.conversations.forEach((conversation) => {
        if (conversation.contactNumber == props.contact) {
          currentStudentConversation = conversation;
          conversationExist = true;
          return;
        }
      });
      if(!conversationExist){
        newCurrentConversation = {
            contactNumber: props.contact,
            messages: [],
          };
      }
    } else {
      newCurrentConversation = {
        contactNumber: props.contact,
        messages: [],
      };
    }
    const newMessageConversation = {
      emisor: store.user.student.accountNumber,
      receptor: props.contact,
      message: newMessage.value,
    };
    if (currentStudentConversation) {
      currentStudentConversation.messages.push(newMessageConversation);
    } else {
      newCurrentConversation?.messages.push(newMessageConversation);
    }

    let existingConversation = currentStudent.value.conversations ?? null;

    update(dbref(db, `/${currentStudent.value.accountNumber}`), {
      conversations: existingConversation
        ? newCurrentConversation 
        ? [...currentStudent.value.conversations, newCurrentConversation]
        : currentStudent.value.conversations
        : newCurrentConversation,
    });

    let contactStudentConversation = null;
    let newConversation = null;
    if (contactChat.value.conversations) {
      let conversationExist = false;
      contactChat.value.conversations.forEach((conversation) => {
        if (conversation.contactNumber == store.user.student.accountNumber) {
          contactStudentConversation = conversation;
          conversationExist = true;
          return;
        } 
      });
      if (!conversationExist) {
        newConversation = {
            contactNumber: currentStudent.value.accountNumber,
            messages: [],
          };
      }
    } else {
      newConversation = {
        contactNumber: currentStudent.value.accountNumber,
        messages: [],
      };
    }
    

    const newMessageConversationContact = {
      emisor: store.user.student.accountNumber,
      receptor: props.contact,
      message: newMessage.value,
    };
    if (contactStudentConversation) {
      contactStudentConversation.messages.push(newMessageConversationContact);
    } else {
      newConversation.messages.push(newMessageConversationContact);
      contactChat.value.conversations = [newConversation];
    }

    let existingConversation2 = contactChat.value.conversations ?? null;
    update(dbref(db, `/${contactChat.value.accountNumber}`), {
      conversations: existingConversation2
        ? newConversation
        ? [...contactChat.value.conversations, newConversation]
        : contactChat.value.conversations
        : newConversation,
    }).then(() => {
      const chatContainer = document.querySelector('.chat-box');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });

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

.chat-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


}
</style>
