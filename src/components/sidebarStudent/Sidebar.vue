<template>
  
  <h2>Serivios Estudiantes</h2>
  <v-navigation-drawer  app permanent color="primary"  class="custom d-flex justify-center  align-center">
    <h2>Servicios Estudiantiles</h2>
    <v-row class="center">
      <v-col class="center">
          <v-list class="element-one">
        <v-list-item link>
          <v-list-item-title>Historial Académico</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Solicitudes</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Matricula</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Matricula de Laboratorio</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Censo de Matricula</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Cambio de Clave</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Ver Calificaciones del periodo</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Ver programación académica</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-col>

      <v-col class="center">
        <v-list class="element-two">
        <v-list-item>
          <v-list-item-title>
            Puedes Ver tu historial academico
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Ahora puedes hacer tu solicitud de cambio de centro, carrera, activación, de pago para examen de reposición, historiales y certificaciones
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Realiza tu Mátricula del periodo
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Realiza tu matricula de laboratorio
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Realiza tu censo de periodo academico
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Realiza cambio de tu clave de acceso al sistema
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Podras ver las calificaciones del periodo actual
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            Podras ver la programación academica del siguiente periodo
          </v-list-item-title>
        </v-list-item>
      </v-list>
      </v-col>
    </v-row>
  </v-navigation-drawer>
  

</template>

<style scoped>
  .custom{
    width: 100% !important;
    /* margin: auto !important; */
    /* padding-top: 12%; */
    margin-top: 7%;
    padding-top: 7%;
  }


  .element-one , .element-two{
    justify-content: center;
    align-items: center;
    
  }

  .element-one{
    width: 40%;
    text-decoration: underline;
  }

  .center{
    margin: auto;
  }
  
</style>
