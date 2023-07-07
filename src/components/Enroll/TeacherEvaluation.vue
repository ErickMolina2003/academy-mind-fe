<template>
  <v-container fluid>
    <div class="ma-6">
      <h1 class="bg-blue-darken-3 text-center">Evaluacion de Docente</h1>
      <div class="d-flex mt-2">
        <h2 class="me-auto">Docente: Juan Roberto de la Cruz</h2>
        <h2>Materia: Inteligencia Artificial</h2>
      </div>
      <v-divider></v-divider>
    </div>

    <div class="ma-6">
      <h3 class="bg-blue-darken-3 text-left pa-1">
        CARACTERÍSTICAS PERSONALES DEL DOCENTE
      </h3>
      <p>1. ¿El docente muestra interés para que los estudiantes aprendan?</p>
      <v-select
        label="Seleccione:"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        2. ¿El docente tiene una buena relación con los estudiantes en el aula
        de clase?
      </p>
      <v-select
        label="Seleccione:"
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
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        2. ¿El profesor indaga los conocimientos previos de los estudiantes
        frente al tema que enseña?
      </p>
      <v-select
        label="Seleccione:"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        3. ¿El docente ofrece a sus estudiantes una bibliografía de los temas de
        la asignatura?
      </p>
      <v-select
        label="Seleccione:"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        4 ¿El docente tiene una secuencia en los temas de los contenidos de la
        asignatura?
      </p>
      <v-select
        label="Seleccione:"
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
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        2. ¿El docente promueve y facilita el aprendizaje de los contenidos de
        los estudiantes?
      </p>
      <v-select
        label="Seleccione:"
        :items="calification"
        density="comfortable"
      ></v-select>
      <p>
        3. ¿El docente demuestra en el aula su capacidad de enseñar los saberes
        de su asignatura?º
      </p>
      <v-select
        label="Seleccione:"
        :items="calification"
        density="comfortable"
      ></v-select>
      <v-divider></v-divider>
    </div>

    <div class="ma-6">
      <h3 class="bg-blue-darken-3 text-left pa-1">OBSERVACIONES</h3>
      <v-textarea
        class="mt-3"
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
        rounded
        variant="outlined"
      >
        Enviar
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
const calification = [
  "Excelente",
  "Bueno",
  "Regular",
  "Insuficiente",
  "Deficiente",
];
</script>
