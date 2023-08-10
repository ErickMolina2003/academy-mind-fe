<template>
  <v-card class="pb-1">
    <v-img
      class="align-end text-white pb-2"
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    />
    <v-row class="class-card-footer">
      <!-- Agregar v-if para mostrar periodo y año solo si se envían como props -->
      <v-col class="py-0" v-if="periodo && anio" cols="12" md="12" lg="12">
        <v-card-text class="pt-2 pb-0 mb-0 text-white">
          <v-icon size="small">mdi-calendar</v-icon>
          {{ periodo }} PAC {{ anio }}
        </v-card-text>
      </v-col>
      <v-col class="py-0" cols="12" md="12" lg="12">
        <v-card-text class="text-white pt-2 pb-1 mb-2">
          <v-icon left size="small">mdi-book-open</v-icon>
          {{ clase }}
        </v-card-text>
      </v-col>
      <!-- Agregar v-if para mostrar horario solo si se envía como prop -->
      <v-col class="py-0 my-0" v-if="horario" cols="12" md="12" lg="12">
        <v-card-text class="text-white pt-0 mt-0 pb-2">
          <v-icon left size="small">mdi-clock-outline</v-icon>
          {{ horario }}
        </v-card-text>
      </v-col>
      <!-- Agregar v-if para mostrar aula solo si se envía como prop -->
      <v-col class="py-0" v-if="aula" cols="12" md="12" lg="12">
        <v-card-text class="text-white pt-1 mt-0 pb-1">
          <v-icon left size="small">mdi-home-map-marker</v-icon>
          {{ aula }}
        </v-card-text>
      </v-col>
      <!-- Agregar v-if para mostrar el botón solo si se envía el prop btnTitle -->
      <v-card-actions v-if="btnTitle" class="mt-0 pt-0 mx-auto">
        <v-btn color="white" @click="$emit('studentList', true, sectionId)">{{
          btnTitle
        }}</v-btn>
      </v-card-actions>
      <v-card-actions
        @click="$emit('video', true, videoTeacher)"
        v-if="docente"
        class="mb-1 mt-0 pt-0"
        style="background-color: #ffffff1b; width: 100%"
      >
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              :image="
                teacherPicture ??
                'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
              "
            ></v-avatar>
          </template>
          <v-list-item-title class="text-white">{{
            docente
          }}</v-list-item-title>
          <v-list-item-subtitle class="text-white"
            >Docente</v-list-item-subtitle
          >
        </v-list-item>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  clase: string;
  periodo?: string | number; // Prop opcional para el periodo
  anio?: string | number; // Prop opcional para el año
  horario?: string; // Prop opcional para el horario
  aula?: string; // Prop opcional para el aula
  btnTitle?: string; // Prop opcional para el título del botón
  docente?: string; // Prop opcional para mostrar el docente
  sectionId?: string; // Prop opcional para el id de la sección
  videoTeacher?: string; // Prop opcional para mostrar el video del docente
  teacherPicture?: string; // Prop opcional para mostrar la foto del docente
}>();
</script>

<style scoped>
.class-card-footer {
  background-color: #527da2;
}
</style>
