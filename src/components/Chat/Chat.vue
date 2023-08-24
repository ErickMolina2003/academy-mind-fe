<template>
  <v-card class="chat-card" v-if="contactChat && currentStudent && messages">
    <v-card-title class="pa-0">
      <v-list class="bg-blue-darken-4 mx-auto" rounded>
        <v-list-item
          :prepend-avatar="contactChat.profilePicture"
          :title="contact"
          :subtitle="contactChat.name"
        />
      </v-list>
    </v-card-title>
    <v-card-text class="chat-box overflow-auto flex-grow-1">
      <v-row>
        <v-col
          v-for="(message, index) in messages"
          :key="message"
          :cols="message.emisor != store.user.student.accountNumber ? '6' : '6'"
          :offset="
            message.emisor == store.user.student.accountNumber ? '6' : '0'
          "
          class="d-flex"
        >
          <div
            v-if="message.emisor == store.user.student.accountNumber"
            class="d-inline-block bg-light-blue-lighten-3 mt-3 mx-3 pa-3 text-left rounded-xl rounded-be-0 ml-auto"
          >
            <p>{{ message.message }}</p>
          </div>
          <div
            v-else
            class="d-inline-block bg-grey-lighten-2 mt-3 mx-3 pa-3 text-left rounded-custom mr-auto"
          >
            <p>{{ message.message }}</p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="bg-blue-darken-4 pt-5 p-0 footer">
      <div class="d-flex flex-grow-1">
        <v-textarea
          v-model="newMessage"
          placeholder="Mensaje"
          rows="1"
          variant="solo"
          rounded="xl"
          class="mx-3"
          @keyup.enter="sendMessage()"
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
    let newCurrentConversation;
    if (currentStudent.value.conversations) {
      currentStudent.value.conversations.forEach((conversation) => {
        if (conversation.contactNumber == props.contact) {
          currentStudentConversation = conversation;
        }
      });
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

    update(dbref(db, `/${currentStudent.value.accountNumber}`), {
      conversations: currentStudent.value.conversations,
    });

    let contactStudentConversation = null;
    let newConversation;
    if (contactChat.value.conversations) {
      contactChat.value.conversations.forEach((conversation) => {
        if (conversation.contactNumber == store.user.student.accountNumber) {
          contactStudentConversation = conversation;
        }
      });
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

    update(dbref(db, `/${contactChat.value.accountNumber}`), {
      conversations: contactChat.value.conversations,
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
