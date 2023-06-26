<template>
    <span>
        <v-row justify="center">
            <v-col cols="12" md="12" lg="12">
                <h1 class="text-center text-white">¿Olvidaste tu contraseña? 🔒</h1>
            </v-col>
            <v-col class="px-7" cols="8" md="8" lg="8">
                <h4 class="text-white">
                    Ingresa tu correo electrónico y te mandaremos instrucciones para resetear tu contraseña.
                </h4>
            </v-col>
        </v-row>
        <v-row class="mt-7" justify="center">
            <v-col class="pb-0" cols="12" md="8" lg="8">
                <v-text-field v-model="accountNumber" bg-color="primary" label="Numero de cuenta"
                    variant="outlined"></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="8" lg="8">
                <v-text-field v-model="email" type="email" bg-color="primary" label="Correo electrónico"
                    variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="8" lg="8">
                <v-btn color="secondary" block height="50px" rounded="lg" @click="resetPassword">
                    Resetear contraseña
                </v-btn>
            </v-col>
            <v-col cols="12" md="8" lg="8">
                <p @click="goBack" class="reset-password text-center text-secondary">
                    Volver a iniciar sesión
                </p>
            </v-col>
        </v-row>
    </span>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

const accountNumber = ref("");
const email = ref("");

function resetPassword() {


}

function goBack() {
    router.replace({ path: '/login' });
}

</script>

<style scoped>
.reset-password {
    cursor: pointer;
}
</style>