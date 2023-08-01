

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
              <v-icon class="me-3" @click="dialog = true;">{{ 'mdi-pencil' }}</v-icon>

            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-text>
          <v-form  v-model="form">
            <v-autocomplete v-model="chosenState" class="mt-4" label="Estados" :items="filteredStates()" :rules="[rules.required]">
            </v-autocomplete>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="blue" @click=" openConfirmationDialog()">Cambiar de estado</v-btn>
          <v-btn color="red" @click="closeDialog()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" width="300px">
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
import { ref, computed, watch,onMounted } from 'vue';
import SearchableNavBar from '../NavBars/SearchableNavBar.vue';
import StatePeriodService from "@/services/state-period/statePeriod.service";
import PeriodService from "@/services/period/period.service";



const dialog = ref(false);
const form = ref(false);
const dialogConfirmation = ref(false);
const showAutocomplete = ref(false);
const chosenState = ref("");

const states = ref([]);
const serviceStatePeriod = new StatePeriodService();
const servicePeriod = new PeriodService();
const periodData = ref({
  id:0,
  label: '',
  state: ''
});


onMounted(()=>{
  getStates();
  getRecentPeriod();
})

async function getRecentPeriod(){
    let mostRecentPeriod = null;

    const response = await servicePeriod.getPeriods();
    
    const periods = response.periods;
    

    // Filtrar el periodo más reciente basado en el año y número de periodo
    const currentYear = new Date().getFullYear();
    const mostRecentYear = Math.max(...periods.map((period) => period.year));
    const mostRecentPeriodNumber = Math.max(
      ...periods
        .filter((period) => period.year === mostRecentYear)
        .map((period) => period.numberPeriod)
    );

    mostRecentPeriod = periods.find(
      (period) =>
        period.year === mostRecentYear && period.numberPeriod === mostRecentPeriodNumber
    );
    periodData.value.label = `${mostRecentPeriod.numberPeriod} PAC ${mostRecentPeriod.year}`;
    periodData.value.state = mostRecentPeriod.idStatePeriod.name;
    periodData.value.id = mostRecentPeriod.id;
    
  
};

async function getStates(){
  states.value = await serviceStatePeriod.getStatePeriods();
  
}





function filteredStates() {
  let statesNames = [];
  states.value.statePeriods.forEach((state) => {
    if(state.name !== periodData.value.state){
      statesNames.push(state.name);
    }
  });
  return statesNames;
}

function openConfirmationDialog() {
  if (!form.value)  return;
  
  dialogConfirmation.value = true;
  
}

function closeDialog() {
  dialogConfirmation.value = false;
  dialog.value = false;
  chosenState.value = '';
  showAutocomplete.value = false;
}

async function confirmAndChange() {
  
  const newState = states.value.statePeriods.find((state) => state.name===chosenState.value);
  
  await servicePeriod.updatePeriod(periodData.value.id, {
    idStatePeriod: newState.id,
  });
  periodData.value.state = chosenState.value;
  closeDialog();
}

const rules = {
  required: (value) => !!value || "Campo obligatorio.",
};
</script>



  
  
