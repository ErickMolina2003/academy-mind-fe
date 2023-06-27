<template>
    <v-app-bar :elevation="15" rounded color="primary">
    <v-toolbar-title>
        <a href="#">
            <v-img src="../../assets/logo-academy.png" max-width="100px" max-height="100px" />
        </a>
    </v-toolbar-title>
    <div>
        <v-btn text @click="students">
        <span class="mr-6 ml-6">Estudiantes</span>
        </v-btn>
        <v-btn text @click="teachers" class="mr-2">
        <span class="mr-6 ml-6">Docencia</span>
        </v-btn>
    </div>
    </v-app-bar>
    <v-main style="background-color: #312D4B" class="pt-5">
        <v-container fluid>
            <div>
                <v-row>
                <v-col cols="5">
                    <div style="position: relative" class="mt-16">
                    <h1 class="text-grey">Bienvido(a)s,</h1>
                    <h1 class="text-white">A la universidad del desarollo</h1>
                    </div>
                </v-col>
                <v-col cols="6">
                    <div style="position: relative;" class="mt-4">
                    <v-img src="https://img.freepik.com/fotos-premium/ilustracion-3d-graduacion_77235-225.jpg" contain max-height="300"></v-img>
                    </div>
                </v-col>
                </v-row>
            </div>
            <v-col cols="12" class="mt-10">
                <div>
                <v-row>
                    <v-col cols="12" sm="6">
                    <div class="egg">
                        <v-img src="https://img.freepik.com/vector-premium/estudiantes-leyendo-libro_118813-2936.jpg" max-height="300" class=""></v-img>
                    </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <h2 class="mt-n4 text-white">Somos el futuro</h2>
                    <p class="text-grey">
                        Aquí, abrazamos la visión de un mañana lleno de innovación, descubrimiento y progreso. Nos enorgullece ser el epicentro de mentes brillantes y apasionadas que están listas para dar forma al mundo que nos rodea. Con programas académicos de vanguardia, profesores expertos y un entorno estimulante, estamos comprometidos a prepararte para los desafíos del futuro y equiparte con las habilidades necesarias para liderar el camino hacia nuevos horizontes. En nuestra universidad, creemos en tu capacidad para cambiar el mundo y te brindamos las herramientas, el apoyo y las oportunidades para que lo logres. Únete a nosotros y juntos construyamos el futuro que todos soñamos.
                    </p>
                    <br />
                    </v-col>
                </v-row>
                </div>
            </v-col>
        </v-container>
        <section class="py-6">
            <v-img class="pa-60" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    src="../../assets/portada.png">
            </v-img>
        </section>
        <section>
            <v-footer color="primary">
                <v-card class="black white--text py-0 px-5" color="primary" width="100%">
                    <v-row>
                        <v-col cols="12" xs="12" sm="6" md="4" class="pa-2">
                            <v-toolbar color="transparent" flat>
                                <v-badge color="#D5F0DB" dot>
                                <v-img src="../../assets/logo-puma.png" contain width="40"></v-img>
                                </v-badge>
                                <v-toolbar-title class="ml-4">
                                    <strong>Academy Mind</strong>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text class="white--text pt-0">
                                <h5>©Derechos reservados Academy Mind 2023</h5>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-footer>
        </section>
    </v-main>
</template>

<style>
  .v-toolbar {
    transition: 0.6s;
  }
</style>
<script setup>
import router from "@/router";
function students() {
    router.push('/loginStudent');
}
function teachers() {
    router.push('/loginTeachers');
}
</script>

