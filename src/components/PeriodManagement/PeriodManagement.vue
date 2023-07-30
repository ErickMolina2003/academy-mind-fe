

<template>
  <div>
    <SearchableNavBar title="Estados del Periodo" />

    <v-table class="mx-6 mt-4">
      <thead>
        <tr>
          <th class="text-left">Periodo</th>
          <th class="text-left">Estado</th>
          <th class="text-left pa-0">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ periodData.label }}</td>
          <td>{{ periodData.state }}</td>
          <td>
            <v-row align="center">
              <v-icon class="me-3" @click="showStates">{{ 'mdi-pencil' }}</v-icon>
              <v-autocomplete v-if="showAutocomplete" v-model="chosenState" class="mt-4" label="Estados"
                :items="filteredStates()"></v-autocomplete>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="dialog" width="300px">
      <v-card>
        <v-card-text>
          ¿Está seguro que quiere cambiar el estado del período a: <strong>{{ chosenState }}</strong>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="blue" @click="confirmAndChange()">Confirmar</v-btn>
          <v-btn color="red" @click="closeDialog()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import SearchableNavBar from '../NavBars/SearchableNavBar.vue';

const periodData = ref({
  label: 'II PAC 2023',
  state: 'Ningún estado'
});

const dialog = ref(false);
const showAutocomplete = ref(false);
const chosenState = ref("");
const states = [
  'Matrícula',
  'Ingreso de Notas',
  'Cancelaciones Excepcionales',
  'Planificación Académica',
  'Ningún estado'
];



function filteredStates() {
  return states.filter((state) => state !== periodData.value.state);
}

function showStates() {
  showAutocomplete.value = !showAutocomplete.value;
}

function closeDialog() {
  dialog.value = false;
  chosenState.value = '';
  showAutocomplete.value = false;
}

function confirmAndChange() {
  periodData.value.state = chosenState.value;
  dialog.value = false;
  chosenState.value = '';
  showAutocomplete.value = false;
}

watch(chosenState, (newValue) => {
  if (newValue !== null && newValue !== '') {

    dialog.value = true;
  }
})
</script>



  
  
