<template>
  <div>
    <SearchableNavBar title="Procesos de Periodos" />

    <v-row class="justify-center mt-4">
      <v-btn-toggle v-model="selectedPeriod" mandatory>
        <v-btn v-for="(option, index) in periodOptions" :key="index" :value="option.value">
          {{ option.label }}
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-form>
      <v-row class="justify-center mt-4" style="margin: 0 4em;">
        <v-col cols="12" class="align-center">
          <h3>Procesos para {{ selectedPeriod === 'current' ? 'Período Actual' : 'Período Siguiente' }}</h3>
          <v-divider class="mb-6"></v-divider>

          <v-row class="process mb-6 align-center" v-for="(process, key) in getAvailableProcesses" :key="key">
            <v-col cols="6" >
              <h4>{{ process.label }}</h4>
            </v-col>
            <v-col cols="6" class="pa-0  mt-3">
              <v-switch v-model="process.active" inset :disabled="selectedPeriod === 'next' && process.period !== 'next'"
                color="success" @change="activateProcess(process.label)">
              </v-switch>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import SearchableNavBar from '../NavBars/SearchableNavBar.vue';

const processes = ref({
  enrollment: { label: 'Matrícula', period: 'current', active: false },
  gradesEntry: { label: 'Ingreso de Notas', period: 'current', active: false },
  exceptionalCancellations: { label: 'Cancelaciones Excepcionales', period: 'current', active: false },
  planning: { label: 'Planificación Académica', period: 'next', active: false },
});

const selectedPeriod = ref('current');


const periodOptions = [
  { label: 'Período actual', value: 'current' },
  { label: 'Período siguiente', value: 'next' },
];

//Activar el proceso selecccionado y desactivar los que podrian estar activos
function activateProcess(label) {
  Object.values(processes.value).forEach((process) => {
    if (process.label !== label && process.active) process.active = false
  });
}

// Procesos para el período actual o siguiente
const getAvailableProcesses = computed(() => {
  return Object.values(processes.value).filter((process) => {
    return process.period === selectedPeriod.value
  });
});
</script>

<style scoped>
.process{
  border-radius: 20px;
    background-color: #dfeff1;
    padding: 0 1.5em;
    font-size: 1.7rem;
}
</style>
  
  
