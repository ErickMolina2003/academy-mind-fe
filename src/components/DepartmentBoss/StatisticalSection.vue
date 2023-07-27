<template>
    <v-container>
        <v-row>
        <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400" color="#1F7087" dark>
            <v-card-title class="text-h5 text-white">Total Estudiantes Matriculados</v-card-title>
            <v-card-text class="text-h7 text-white">
                <v-row class="d-flex justify-content-between">
                <v-col cols="6">
                    <p class="mb-2">Periodo Actual: {{ totalEstudiantesMatriculados.actual }}</p>
                </v-col>
                <v-col cols="6">
                    <p>Periodo Pasado: {{ totalEstudiantesMatriculados.pasado }}</p>
                </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center"></v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400" color="#1F7087" dark>
            <v-card-title class="text-h5 text-white">Total Secciones</v-card-title>
            <v-card-text class="text-h7 text-white">
                <v-row class="d-flex justify-content-between">
                <v-col cols="6">
                    <p class="mb-2">Periodo Actual: {{ totalSecciones.actual }}</p>
                </v-col>
                <v-col cols="6">
                    <p>Periodo Pasado: {{ totalSecciones.pasado }}</p>
                </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center"></v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400" color="#1F7087" dark>
            <v-card-title class="text-h5 text-white">Total Clases de Periodo</v-card-title>
            <v-card-text class="text-h7 text-white">
                <v-row class="d-flex justify-content-between">
                <v-col cols="6">
                    <p class="mb-2">Periodo Actual: {{ totalClasesPeriodo.actual }}</p>
                </v-col>
                <v-col cols="6">
                    <p>Periodo Pasado: {{ totalClasesPeriodo.pasado }}</p>
                </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center"></v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400" color="#1F7087" dark>
            <v-card-title class="text-h5 text-white">Tasa de Aprobación Promedio</v-card-title>
            <v-card-text class="text-h7 text-white">
                <v-row class="d-flex justify-content-between">
                <v-col cols="6">
                    <p class="mb-2">Periodo Actual: {{ tasaAprobacionPromedio.actual }}%</p>
                </v-col>
                <v-col cols="6">
                    <p>Periodo Pasado: {{ tasaAprobacionPromedio.pasado }}%</p>
                </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center"></v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400" color="#1F7087" dark>
            <v-card-title class="text-h5 text-white">Tasa de Reprobación Promedio</v-card-title>
            <v-card-text class="text-h7 text-white">
                <v-row class="d-flex justify-content-between">
                <v-col cols="6">
                    <p class="mb-2">Periodo Actual: {{ tasaReprobacionPromedio.actual }}%</p>
                </v-col>
                <v-col cols="6">
                    <p>Periodo Pasado: {{ tasaReprobacionPromedio.pasado }}%</p>
                </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center"></v-card-actions>
            </v-card>
        </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const totalEstudiantesMatriculados = ref({ actual: 200, pasado: 180 });
const totalSecciones = ref({ actual: 50, pasado: 40 });
const totalClasesPeriodo = ref({ actual: 20, pasado: 15 });
const tasaAprobacionPromedio = ref({ actual: 80, pasado: 75 });
const tasaReprobacionPromedio = ref({ actual: 20, pasado: 25 });
</script>

<style>

  </style>
  