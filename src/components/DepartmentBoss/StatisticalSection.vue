<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row class="mb-4">
          <v-col cols="4">
            <v-select
              v-model="selectedPeriod"
              :items="periods"
              label="Periodo"
              item-text="id"
              item-title="displayText"
              item-value="id"
              no-data-text="No hay Periodos"
              
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="selectedClass"
              :items="classes"
              label="Clase"
              item-title="name"
              item-value="id"
              no-data-text="No hay Clases"
              
            ></v-select>
          </v-col>
          <v-col cols="4" v-if="selectedClass">
            <v-select
              v-model="selectedSection"
              :items="sections"
              label="Sección"
              item-title="codeSection"
              item-value="id"
              no-data-text="No hay Secciones"
              
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" @click="resetFilters">Restablecer filtros</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="item in analytics" :key="item.name" cols="12" md="6">
            <v-card class="mx-auto" max-width="400" color="#61c0c2" dark><!--#1F7087-->
              <v-card-title class="text-h5 text-white">{{ item.name }}</v-card-title>
              <v-card-text class="text-h7 text-white">
                <v-row class="d-flex justify-content-between">
                  <v-col cols="6">
                    <p class="mb-2">Cantidad: {{ item.count }}</p>
                  </v-col>
                  <v-col cols="6">
                    <p>{{ (item.percentage) ? `Porcentaje: ${ item.percentage }%` : `` }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <!-- <v-card-actions class="justify-center-space"></v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
        {{ selectedPeriod }}
        {{ selectedClass }}
        {{ selectedSection }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { watch, ref, onMounted, reactive } from 'vue';

const selectedPeriod = ref(null);
const selectedClass = ref(null);
const selectedSection = ref(null);
const analytics = ref([]);
const periods = ref([]);
const classes = ref([]);
const sections = ref([]);
const currentPeriod = ref('');
const idCareer = ref('');
const idCenter = ref('');

onMounted(() => {
  let academyUser = JSON.parse(localStorage.getItem("academy-user"));
  idCareer.value = academyUser.teacher.teachingCareer[0].centerCareer.career.id;
  idCenter.value = academyUser.teacher.teachingCareer[0].centerCareer.regionalCenter.id
  fetchCurrentPeriod();
  fetchPeriods();
  fetchClasses(idCareer.value);
  fetchAnalytics(idCareer.value, idCenter.value);
});

watch([selectedPeriod], ([newPeriod]) => {
  console.log('selectedPeriod:', newPeriod);
  if (selectedPeriod != newPeriod){
    selectedClass.value = null;
  }
});

watch([selectedClass], ([newClass]) => {
  // console.log('selectedClass:', newClass);
  if (selectedClass != newClass){
    selectedSection.value = null;
    fetchSection()
  }
});

watch([selectedSection], ([newSection]) => {
  console.log('selectedSection:', newSection);

});

async function fetchCurrentPeriod() {
  try {
    const response = await axios.get('http://localhost:3001/api/period/ongoing');
    currentPeriod.value = response.data.periods[0].id;
    selectedPeriod.value = currentPeriod.value;
  } catch (error) {
    console.error(error);
  }
}

async function fetchPeriods() {
  try {
    const response = await axios.get('http://localhost:3001/api/period');
    let array = []
    array = response.data.periods.map(period => (
      {
        id: period.id,
        displayText: `${period.numberPeriod} periodo ${period.year} ${(Number(period.id) == Number(currentPeriod.value)) ? ` (Vigente)` : ``}`
      }
    ));
    periods.value = array;
  } catch (error) {
    console.error(error);
  }
}

async function fetchClasses(career = idCareer.value) {
  try {
    const url = `http://localhost:3001/api/career-class/${career}`
    const response = await axios.get(url);
    classes.value = response.data.classes;
    fetchAnalytics()
  } catch (error) {
    console.error(error);
  }
}

async function fetchSection(classId = selectedClass.value, regionalCenter = idCenter.value) {
  const idPeriod = selectedPeriod.value || currentPeriod.value;
  try {
    
    const url = `http://localhost:3001/api/section/class-period/${classId}?period=${selectedPeriod.value}&center=${regionalCenter}`
    const response = await axios.get(url);
    sections.value = response.data.sections;
    if(selectedClass) console.log()

  } catch (error) {
    console.error(error);
  }
}

async function fetchAnalytics(career = idCareer.value, regionalCenter = idCenter.value) {
  const idPeriod = selectedPeriod.value || 4;
  const idClass = selectedClass.value;
  const idSection = selectedSection.value;

  let url = `http://localhost:3001/api/analytic/criteria?idPeriod=${idPeriod}&idCareer=${career}&idRegionalCenter=${regionalCenter}`;

  if (idClass) {
    url += `&idClass=${idClass || 1}`;
    if (idSection) {
      url += `&idSection=${idSection}`;
    }
  }

  try {
    const response = await axios.get(url);
    analytics.value = response.data.analytics;
  } catch (error) {
    console.error(error);
  }
}

function resetFilters() {
  selectedPeriod.value = currentPeriod.value;
  selectedClass.value = null;
  selectedSection.value = null;
  fetchAnalytics();
}

const state = reactive({
  selectedPeriod,
  selectedClass,
  selectedSection,
  analytics,
  periods,
  classes,
  sections
});
</script>

<style>
.asd {
  color: black;
}

</style>
