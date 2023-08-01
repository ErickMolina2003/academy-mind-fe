<template>
  <v-container fluid style="background-color: #fff;overflow: auto;" >
    <div class="ma-6">
      <h1 class="bg-blue-darken-3 text-center">Evaluacion de Docente</h1>
      <div class="d-flex mt-2">
        <h2 class="me-auto">Docente: {{chosenForEvaluation.docente}}</h2>
        <h2>Materia:{{chosenForEvaluation.asignatura}}</h2>
      </div>
      <v-divider></v-divider>
    </div>

    <v-form v-model="form" @submit.prevent>
    <div class="ma-6">
      
      <h3 class="bg-blue-darken-3 text-left pa-1">
        CARACTERÍSTICAS PERSONALES DEL DOCENTE
      </h3>
      <p>1. ¿El docente muestra interés para que los estudiantes aprendan?</p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="interest"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        2. ¿El docente tiene una buena relación con los estudiantes en el aula
        de clase?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="relationship"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        3. ¿El docente respeta la dignidad humana del estudiante y jamás acude a
        expresiones o sátiras que buscan humillar por sus resultados académicos
        o lo degrada por sus condiciones socioeconómicas ,sexo, creencias
        religiosas o políticas o forma de vestir?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="respect"
        :items="calification"
        density="comfortable"
      ></v-select>
      <v-divider></v-divider>
    </div>
    <div class="ma-6">
      <h3 class="bg-blue-darken-3 text-left pa-1">
        CARACTERÍSTICAS PEDAGÓGICAS Y DIDÁCTICAS DEL DOCENTE
      </h3>
      <p>
        1. ¿El profesor relaciona los saberes enseñados con el programa de
        estudio?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="relations"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        2. ¿El profesor indaga los conocimientos previos de los estudiantes
        frente al tema que enseña?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="prevKnowledge"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        3. ¿El docente ofrece a sus estudiantes una bibliografía de los temas de
        la asignatura?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="bibliography"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        4 ¿El docente tiene una secuencia en los temas de los contenidos de la
        asignatura?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="contentSequence"
        :items="calification"
        density="comfortable"
      ></v-select>
      <v-divider></v-divider>
    </div>
    <div class="ma-6">
      <h3 class="bg-blue-darken-3 text-left pa-1">
        CARACTERÍSTICAS DISCIPLINARES
      </h3>
      <p>
        1. ¿El docente demuestra dominio en su área o disciplina? seleccionar..
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="domain"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        2. ¿El docente promueve y facilita el aprendizaje de los contenidos de
        los estudiantes?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="promoteLearning"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        3. ¿El docente demuestra en el aula su capacidad de enseñar los saberes
        de su asignatura?
      </p>
      <v-select
        label="Seleccione:"
        :rules="[rules.required]"
        v-model="teachingAbility"
        :items="calification"
        density="comfortable"
      ></v-select>
      <v-divider></v-divider>
    </div>
    <div class="ma-6">
      <h3 class="bg-blue-darken-3 text-left pa-1">OBSERVACIONES</h3>
      <v-textarea
        class="mt-3"
        v-model="observations"
        name="input-7-1"
        variant="outlined"
        label="Califique"
        auto-grow
      ></v-textarea>
    </div>
    <div class="text-right ma-6">
      <v-btn
        style="width: 100px"
        class="bg-blue-darken-4 text-right"
        @click="emit('submitForm', false);"
        rounded
        variant="outlined"
      >
        Cerrar
      </v-btn>
      <v-btn
        style="width: 100px"
        type="submit"
        @click="submitForm"
        class="bg-blue-darken-4 text-right"
        rounded
        variant="outlined"
      >
        Enviar
      </v-btn>
    </div>
  </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(['submitForm']);
const props = defineProps(['chosenForEvaluation'])
console.log(props.chosenForEvaluation);
const calification = [
  "Excelente",
  "Bueno",
  "Regular",
  "Insuficiente",
  "Deficiente",
];
const form =ref(false);
const interest = ref(null);          // Pregunta 1: ¿El docente muestra interés para que los estudiantes aprendan?
const relationship = ref(null);     // Pregunta 2: ¿El docente tiene una buena relación con los estudiantes en el aula de clase?
const respect = ref(null);          // Pregunta 3: ¿El docente respeta la dignidad humana del estudiante y jamás acude a expresiones o sátiras que buscan humillar por sus resultados académicos o lo degrada por sus condiciones socioeconómicas, sexo, creencias religiosas o políticas o forma de vestir?
const relations = ref(null);        // Pregunta 1: ¿El profesor relaciona los saberes enseñados con el programa de estudio?
const prevKnowledge = ref(null);    // Pregunta 2: ¿El profesor indaga los conocimientos previos de los estudiantes frente al tema que enseña?
const bibliography = ref(null);     // Pregunta 3: ¿El docente ofrece a sus estudiantes una bibliografía de los temas de la asignatura?
const contentSequence = ref(null);  // Pregunta 4: ¿El docente tiene una secuencia en los temas de los contenidos de la asignatura?
const domain = ref(null);           // Pregunta 1: ¿El docente demuestra dominio en su área o disciplina?
const promoteLearning = ref(null);  // Pregunta 2: ¿El docente promueve y facilita el aprendizaje de los contenidos de los estudiantes?
const teachingAbility = ref(null);  // Pregunta 3: ¿El docente demuestra en el aula su capacidad de enseñar los saberes de su asignatura?
const observations = ref('');       // Pregunta de observaciones: Observaciones adicionales


function submitForm(){
  if(!form.value) return;
  
  emit('submitForm', true);
}

const rules = {
    required: (value) => !!value || "Campo obligatorio.",
};
</script>


<style scoped>
</style>