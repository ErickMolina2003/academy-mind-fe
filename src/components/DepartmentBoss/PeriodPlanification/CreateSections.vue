<template>
    <v-container>
        <SearchableNavBar title="Crear secciones" label="Cód.Asignatura" btnTitle="Crear sección"
            @createSection="createSection" />

        <div>
            <h2 style="padding-bottom: 15px">Lista de Secciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Asignatura</th>
                        <th>Sección</th>
                        <th>HI</th>
                        <th>HF</th>
                        <th>Docente</th>
                        <th>UV</th>
                        <th>Días</th>
                        <th>Edificio</th>
                        <th>Aula</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in sections">
                        <td>{{ section.classCode }}</td>
                        <td>{{ section.className }}</td>
                        <td>{{ section.section }}</td>
                        <td>{{ section.initialHour }}</td>
                        <td>{{ section.finalHour }}</td>
                        <td>{{ section.teacher }}</td>
                        <td>{{ section.uv }}</td>
                        <td>{{ section.days }}</td>
                        <td>{{ section.building }}</td>
                        <td>{{ section.classroom }}</td>
                        <td><v-btn @click="openModifyModal" style="font-size: .8rem;">
                                {{ section.modify }}
                            </v-btn></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>

    <v-dialog v-model="showCreateModal" persistent width="1440">
        <v-card class="pa-4">
            <v-card-title class="text-h5 pa-0 pb-4">
                Crear una sección
            </v-card-title>

            <v-card-text>

                <v-form v-model="formCreateSection" @submit.prevent="createSection">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="cod" type="text" label="Cód.Asignatura" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete v-model="selectedClass" :items="classNames" label="Elija una asignatura"
                                return-object></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-form>


            </v-card-text>
            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="modifySection">
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="showModifyModal" persistent width="1440">
        <v-card class="pa-4">
            <v-card-title class="text-h5 pa-0 pb-4">
                Modificar una sección
            </v-card-title>

            <v-card-text>


            </v-card-text>
            <v-card-actions class="fixed-footer">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                    Cerrar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="modifySection">
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";

const showModifyModal = ref(false);
const showCreateModal = ref(false);
const props = defineProps(['sections']);

const classNames = [
    "Contabilidad I"
]

function openModifyModal() {
    showModifyModal.value = true;
}

function modifySection() {
    showModifyModal.value = false;
}

function closeModal() {
    showModifyModal.value = false;
    showCreateModal.value = false
}

function createSection(modalCreate) {
    console.log(modalCreate);
    showCreateModal.value = modalCreate;

}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    font-size: .8rem;
}

th,
td {
    padding: 8px;
    border-bottom: 2px solid #ddd;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}
</style>