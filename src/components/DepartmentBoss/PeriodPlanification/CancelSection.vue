<template>
    <SearchableNavBar title="Cancelar secciones" label="Cód.Asignatura" btnTitle="Cancelar sección"
            @createSection="cancelSection" />
    <div >
        <h2 style="padding-bottom: 15px">Lista de Secciones</h2>
        <v-table class="classes-table pb-4" fixed-header density="comfortable">
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
                    <th>Cupos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="section in sections" :class="{ 'selected-oneClass': isSelected(section) }"
                    @click="toggleSelection(section)">
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
                    <td>{{ section.seats }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

const sections = store.sections;
const selectedClasses = ref([]);
const isValid = ref(false);



function isSelected(item) {
    for (const key in selectedClasses.value) {
        if (selectedClasses.value[key].id === item.id) {
            return true;
        }
    }
    return false;
}

function toggleSelection(item) {
    let index = -1;

    for (let i = 0; i < selectedClasses.value.length; i++) {
        if (selectedClasses.value[i].id === item.id) {
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
        isValid.value = false;
        return isValid.value;
    } else {
        isValid.value = true;
        return isValid.value;
    }
}

function cancelSection(cancel) {
    // if (checkTable()) {
    //     
    // }
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