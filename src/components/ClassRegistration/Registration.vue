<template>
    <v-main>
      <v-container fluid>
        <h1 class="pt-0" style="color: #CC6600;">Matricula</h1>
        <v-divider :thickness="5" class="pb-1 pt-0"></v-divider>
        <div style="text-align: right;">
          <a href="#">Atrás</a>
          <span class="text-black"> | </span>
          <a href="#" >Cerrar Sesión</a>
        </div>
        <v-divider :thickness="5" class="pb-15 mt-1"></v-divider>
        <v-card class="mx-2">
            <v-card-title class="text-center text-white" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <span class="headline ">Datos del estudiante</span>
            </v-card-title>
            <v-card-text>
                <v-table>
                    <thead >
                        <tr >
                        <th class="text-left text-black">Nombre</th>
                        <th class="text-left text-black">Carrera</th>
                        <th class="text-left text-black">Año</th>
                        <th class="text-left text-black">Periodo</th>
                        <th class="text-left text-black">Unidades Valorativas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in estudiante" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.career }}</td>
                        <td>{{ item.year }}</td>
                        <td>{{ item.period }}</td>
                        <td>{{ item.uv }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
        <v-card
            class="mt-10 mx-2"
            max-width="500"
            variant="outlined"
            color="secondary-lighthen-1"
        >
        <div class="my-4 mx-5">
            <h2 class="text-black">Menu opciones:</h2>
            <v-card style="width: 100%; " class="mt-3" >
                <v-card-actions>
                <v-btn @click="openModal">Seleccionar Asignatura</v-btn>
                <span style="font-size: x-large;"> | </span>
                <v-btn @click="finishEnrollment">Finalizar Matricula</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        </v-card>
        <v-dialog v-model="showModal">
            <div class="modal">
                <div style="text-align: right;">
                <a href="#" @click="closeModal">Cerrar Ventana</a>
                </div>
                  <h3 style="text-align: center; color: rgb(var(--v-theme-text-2));">Detalles de asignatura</h3>
                <v-row>
                <v-col cols="4">
                  <div style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                    <h4 class="mb-2 text-white text-center">Departamentos</h4>
                  </div> 
                  <v-card class="pa-4">
                    <v-virtual-scroll :items="departamentos" item-height="48" class="virtual-scroll-list">
                        <template #default="{ item }">
                        <v-list-item
                            :key="item.id"
                            @click="seleccionarDepartamento(item)"
                            :class="{ 'list-item-selected': item === departamentoSeleccionado }"
                        >
                            <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                        </v-list-item>
                        </template>
                    </v-virtual-scroll>
                  </v-card>
                </v-col>

                <v-col cols="4">
                  <div style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                    <h4 class="mb-2  text-white text-center">Asignaturas</h4>
                  </div>
                    
                    <v-card class="pa-4">
                    <v-virtual-scroll :items="asignaturasFiltradas" item-height="48" class="virtual-scroll-list">
                        <template #default="{ item }">
                        <v-list-item
                            :key="item.id"
                            @click="seleccionarAsignatura(item) "
                            :class="{ 'list-item-selected': item === asignaturaSeleccionada }"
                        >
                            <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                        </v-list-item>
                        </template>
                    </v-virtual-scroll>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <div style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                      <h4 class="mb-2  text-white text-center">Secciones</h4>
                    </div>
                    <v-card class="pa-4">
                        <v-virtual-scroll :items="seccionesFiltradas" item-height="48" class="virtual-scroll-list">
                        <template #default="{ item }">
                            <v-list-item
                            :key="item.id"
                            @click="seleccionarSeccion(item)"
                            :class="{ 'list-item-selected': item === seccionSeleccionada }"
                            >
                            <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                            </v-list-item>
                        </template>
                        </v-virtual-scroll>
                    </v-card>
                </v-col>
                </v-row>
                <div class="pt-2 d-flex justify-end">
                <v-btn color="primary" dark @click="matricularAsignatura">Matricular</v-btn>
                </div>
            </div>
        </v-dialog>
        <v-card class="mt-10 mx-2">
            <v-card-title class="text-center" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <span class="headline text-white">Asignaturas Matriculadas</span>
            </v-card-title>
            <v-card-text >
                <v-table>
                <thead>
                    <tr>
                    <th class="text-left text-black">Cod.</th>
                    <th class="text-left text-black">Asignatura</th>
                    <th class="text-left text-black">Seccion</th>
                    <th class="text-left text-black">HI</th>
                    <th class="text-left text-black">HF</th>
                    <th class="text-left text-black">Dias</th>
                    <th class="text-left text-black">Edificio</th>
                    <th class="text-left text-black">Aula</th>
                    <th class="text-left text-black">UV</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in asignaturasMatriculadas" :key="item.cod">
                    <td>{{ item.cod }}</td>
                    <td>{{ item.asignatura }}</td>
                    <td>{{ item.seccion }}</td>
                    <td>{{ item.horarioInicio }}</td>
                    <td>{{ item.horarioFin }}</td>
                    <td>{{ item.dias }}</td>
                    <td>{{ item.edificio }}</td>
                    <td>{{ item.aula }}</td>
                    <td>{{ item.uv }}</td>
                    </tr>
                </tbody>
                </v-table>
            </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </template>
  
  <script setup>
import { ref } from 'vue';

const showModal = ref(false);
const estudiante = [
    {
      name: 'Hansel Hernandez',
      career: 'Computer Science',
      year: 2023,
      period: '1',
      uv: 20
    }
  ];
const departamentos = ref([
  { id: 1, nombre: 'Departamento 1' },
  { id: 2, nombre: 'Departamento 2' },
  { id: 3, nombre: 'Departamento 3' },
]);

const asignaturas = ref([
  { id: 1, nombre: 'Asignatura 1', departamento: 1, uv: 3 },
  { id: 2, nombre: 'Asignatura 2', departamento: 1, uv: 4 },
  { id: 3, nombre: 'Asignatura 3', departamento: 2, uv: 2 },
  { id: 4, nombre: 'Asignatura 4', departamento: 3, uv: 5 },
]);

const secciones = ref([
  { id: 1, nombre: 'Sección 1', asignatura: 1, horarioInicio: '8:00', horarioFin: '10:00', dias: 'Lunes, Miércoles', edificio: 'Edificio A', aula: 'A101' },
  { id: 2, nombre: 'Sección 2', asignatura: 1, horarioInicio: '10:00', horarioFin: '12:00', dias: 'Martes, Jueves', edificio: 'Edificio B', aula: 'B201' },
  { id: 3, nombre: 'Sección 3', asignatura: 2, horarioInicio: '14:00', horarioFin: '16:00', dias: 'Lunes, Miércoles', edificio: 'Edificio C', aula: 'C301' },
  { id: 4, nombre: 'Sección 4', asignatura: 3, horarioInicio: '16:00', horarioFin: '18:00', dias: 'Martes, Jueves', edificio: 'Edificio D', aula: 'D401' },
  { id: 5, nombre: 'Sección 5', asignatura: 4, horarioInicio: '8:00', horarioFin: '10:00', dias: 'Viernes', edificio: 'Edificio E', aula: 'E501' },
]);

const departamentoSeleccionado = ref(null);
const asignaturaSeleccionada = ref(null);
const seccionSeleccionada = ref(null);

const asignaturasFiltradas = ref([]);
const seccionesFiltradas = ref([]);

const asignaturasMatriculadas = ref([]);

const seleccionarDepartamento = (departamento) => {
  departamentoSeleccionado.value = departamento;
  asignaturaSeleccionada.value = null;
  seccionSeleccionada.value = null;
  asignaturasFiltradas.value = asignaturas.value.filter(
    (asignatura) => asignatura.departamento === departamento.id
  );
};

const seleccionarAsignatura = (asignatura) => {
  asignaturaSeleccionada.value = asignatura;
  seccionSeleccionada.value = null;
  seccionesFiltradas.value = secciones.value.filter(
    (seccion) => seccion.asignatura === asignatura.id
  );
};

const seleccionarSeccion = (seccion) => {
  seccionSeleccionada.value = seccion;
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const matricularAsignatura = () => {
  if (seccionSeleccionada.value) {
    const asignaturaMatriculada = {
      cod: seccionSeleccionada.value.id,
      asignatura: asignaturaSeleccionada.value.nombre,
      seccion: seccionSeleccionada.value.nombre,
      horarioInicio: seccionSeleccionada.value.horarioInicio,
      horarioFin: seccionSeleccionada.value.horarioFin,
      dias: seccionSeleccionada.value.dias,
      edificio: seccionSeleccionada.value.edificio,
      aula: seccionSeleccionada.value.aula,
      uv: asignaturaSeleccionada.value.uv,
    };

    asignaturasMatriculadas.value.push(asignaturaMatriculada);
  }

  closeModal();
};
  </script>
  
  <style scoped>
  .headline {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  } 
  .main-container {
    display: none;
  }
  .modal{
    position: fixed;
    width: 60%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:#f4f5fa;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  }
  .virtual-scroll-list {
  height: 300px; 
}
.list-item-selected {
  background-color: #E3F2FD;
}
  </style>
  