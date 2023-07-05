<template>
    <div v-if="data.length != 0">
        <v-table class="classes-table pb-4" fixed-header density="comfortable">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header.text">{{ header.text }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.codigo" :class="{ 'selected-oneClass': isSelected(item) }"
                    @click="toggleSelection(item)">
                    <td v-for="header in headers" :key="header.value">{{ item[header.value] }}</td>
                </tr>
            </tbody>
        </v-table>
        <p v-if="tableError" class="error-message pb-5">Por favor, seleccione al menos una clase.</p>

        <v-file-input v-model="file" accept="application/pdf"
            label="Adjunte un PDF que respalde su solicitud"></v-file-input>
        <p v-if="fileError" class="error-message pb-4">Por favor, adjunte un archivo PDF.</p>

        <v-btn color="deep-purple-accent-4" @click="submitApplication">
            Realizar solicitud
        </v-btn>
    </div>
    <h2 class="text-center py-2" v-else>
        NO TIENE CLASES MATRICULADAS
    </h2>
</template>
  
<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
    headers: Array,
    data: Array
})


const selectedClasses = ref([]);
const file = ref([])
const isValid = ref(false);
const mensajeError = ref([]);
const fileError = ref(false);
const tableError = ref(false);


const emit = defineEmits(['update-selected-classes']);

function isSelected(item) {
    for (const key in selectedClasses.value) {
        if (selectedClasses.value[key].codigo === item.codigo) {
            return true;
        }
    }
    return false;
}

function findIndexByCodigo(arr, codigo) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].codigo === codigo) {
            return i;
        }
    }
    return -1;
}

function toggleSelection(item) {
    let index = -1;

    for (let i = 0; i < selectedClasses.value.length; i++) {
        if (selectedClasses.value[i].codigo === item.codigo) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        selectedClasses.value.push(item);
    } else {
        selectedClasses.value.splice(index, 1);
    }
}

function checkTable() {
    if (selectedClasses.value.length === 0) {
        tableError.value = true;
        isValid.value = false;
        return isValid.value;
    } else {
        isValid.value = true;
        tableError.value = false;
        return isValid.value;
    }
}

function checkFile() {
    if (!file.value || file.value.length === 0) {
        fileError.value = true;
        isValid.value = false;
        return isValid.value;
    } else {
        isValid.value = true;
        fileError.value = false;
        return isValid.value;
    }
}

function submitApplication() {
    if (checkTable()) {
        if (checkFile()) {
            alert(`SOLICITUD REALIZADA ÉXITOSAMENTE`);
            emit('update-selected-classes', selectedClasses.value);
            borrar();
        } else {
            checkTable();
        }
    } else {
        checkFile();
    }
}

function borrar() {
    fileError.value = false;
    tableError.value = false;
    selectedClasses.value = [];
    file.value = null;
}

</script>
  
<style scoped>
.classes-table {
    font-size: .7rem;
}

.selected-oneClass {
    background-color: lightblue;
    cursor: pointer;
}

.error-message {
    color: red;
    font-size: .8rem;
}
</style>