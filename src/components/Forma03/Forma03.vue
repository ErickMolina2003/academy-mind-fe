<template>
    <v-container class="">

        <v-row>
            <v-col cols="auto" class="mb-2">
                <img src="@/assets/user-img.png" alt="user-img" class="user-img rounded-lg" />
            </v-col>


            <v-col class="user-info mb-6 ">

                <v-row>
                    <v-col cols="6">
                        <h4 class="font-weight-regular ">Número de cuenta: <span>{{ usarInfo.cuenta }}</span></h4>
                    </v-col>

                    <v-col cols="6">
                        <h4 class="font-weight-regular">Centro: <span>{{ usarInfo.centro }}</span></h4>
                    </v-col>
                </v-row>

                <v-row>

                    <v-col cols="6">
                        <h4 class="font-weight-regular">Nombre completo: <span>{{ usarInfo.nombre }}</span></h4>
                    </v-col>
                    <v-col cols="6">
                        <h4 class="font-weight-regular ">Año: <span>{{ usarInfo.anio }}</span></h4>
                    </v-col>
                </v-row>

                <v-row>

                    <v-col cols="6">
                        <h4 class="font-weight-regular">Carrera: <span>{{ usarInfo.carrera }}</span></h4>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>

        <v-card>

            <v-card-title class="text-center text-white"
                style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <span class="headline ">Asignaturas Matriculadas</span>
            </v-card-title>

            <v-card-text>
                <v-table class="forma03-table" fixed-header density="comfortable">
                    <thead>
                        <tr>
                            <th class="font-weight-bold px-0">CÓD.</th>
                            <th class="font-weight-bold px-0">ASIGNATURA</th>
                            <th class="font-weight-bold px-0">SECCIÓN</th>
                            <th class="font-weight-bold px-0">HI</th>
                            <th class="font-weight-bold px-0">HF</th>
                            <th class="font-weight-bold px-0">DÍAS</th>
                            <th class="font-weight-bold px-0">EDIFICIO</th>
                            <th class="font-weight-bold px-0">AULA</th>
                            <th class="font-weight-bold px-0">UV</th>
                            <th class="font-weight-bold px-0">OBS</th>
                            <th class="font-weight-bold px-0">PERIODO</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr v-for="item in classes" :key="item.codigo">
                            <td class="px-0">{{ item.codigo }}</td>
                            <td class="text-uppercase px-0">{{ item.asignatura }}</td>
                            <td class="px-0">{{ item.seccion }}</td>
                            <td class="px-0">{{ item.hi }}</td>
                            <td class="px-0">{{ item.hf }}</td>
                            <td class="px-0">{{ item.dias }}</td>
                            <td class="px-0">{{ item.edificio }}</td>
                            <td class="px-0">{{ item.aula }}</td>
                            <td class="px-0">{{ item.uv }}</td>
                            <td class="px-0">{{ item.obs }}</td>
                            <td class="px-0">{{ item.periodo }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>

const classes = [
    { codigo: "IS802", asignatura: "Ingeniería de Software", seccion: 9000, hi: 9000, hf: 1000, dias: "LuMaMiJu", edificio: "B2", aula: "301", uv: 4, obs: "", periodo: "2" },
    { codigo: "IS811", asignatura: "Seguridad Informática", seccion: 1000, hi: 1000, hf: 1100, dias: "LuMaMiJu", edificio: "B2", aula: "306", uv: 4, obs: "", periodo: "2" },
    { codigo: "IS910", asignatura: "Teoria de la simulación opt.", seccion: 1200, hi: 1200, hf: 1300, dias: "LuMaMi", edificio: "B2", aula: "301", uv: 3, obs: "", periodo: "2" },
    { codigo: "IS912", asignatura: "Sistemas expertos opt.", seccion: 1200, hi: 1200, hf: 1300, dias: "LuMaMi", edificio: "B2", aula: "LAB 2", uv: 3, obs: "", periodo: "2" },
];

const usarInfo =
    { cuenta: "20191002985", nombre: "Julia Marcela Martínez Mejía", centro: "Ciudad Universitaria", carrera: "Ingeniería en sistemas", anio: "2023" }


</script>

<style scoped>
.user-img {
    width: 128px;
    height: 128px;
}

.forma03-table {
    font-size: 13px;
}

.headline {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style> 



  
  