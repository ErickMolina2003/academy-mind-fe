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
          <v-col cols="4" v-if="false">
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
          <v-card class="v-card-w">
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab value="one">Estudiantes del Periodo Actual (Grafico lineal)</v-tab>
              <v-tab value="two">Datos del Periodo</v-tab>
              <v-tab value="three">Estudiantes del Periodo Actual (Hamburguesa)</v-tab>
            </v-tabs>
            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">

                  <div v-if="graf">
                    <Bar :options="chartOptions" :data="chartData" />
                  </div>

                  <v-col>
                    <v-row>
                      <v-card v-for="student in allStudent" :key="student.id" class="mb-2">
                        <v-card-title class="text-h6">Total de Estudiantes de la carrera: {{ student.count }}</v-card-title>
                      </v-card>
                    </v-row>
                  </v-col>

                </v-window-item>
                <v-window-item value="two">

                  <v-row>
                    <v-col v-for="item in analytics" :key="item.name" cols="12" md="6">
                      <v-card class="mx-auto" max-width="400" color="#5e9be6" dark>
                        <v-card-title class="text-h5 text-white">{{ item.name }}</v-card-title>
                        <v-card-text class="text-h7 text-white">
                          <v-row class="d-flex justify-content-between">
                            <v-col cols="6">
                              <p class="mb-2">Cantidad: {{ item.count }}</p>
                            </v-col>
                            <v-col cols="6">
                              <p>{{ item.percentage ? `Porcentaje: ${Math.round(item.percentage)}%` : '' }}</p>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                      </v-card>
                    </v-col>
                  </v-row>

                </v-window-item>
                <v-window-item value="three">
                  
                  <div v-if="doughnutTwo">
                    <Doughnut :options="optionsDoughnut" :data="dataDoughnut" />
                  </div>

                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from 'axios';
import { watch, ref, onMounted, reactive, shallowRef, computed, nextTick } from 'vue';

const selectedPeriod = ref(null);
const selectedClass = ref(null);
const selectedSection = ref(null);
const analytics = ref([]);
const allStudent = ref([])
const periods = ref([]);
const classes = ref([]);
const sections = ref([]);
const currentPeriod = ref('');
const idCareer = ref('');
const idCenter = ref('');
const tab = ref(null);
const graf = ref(true);
const doughnutTwo = ref(true);

import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const chartData = computed(() => ({
  labels: [],
  datasets: [{
    data: [40, 20, 12],
    label: 'Matrícula del periodo',
    backgroundColor: ['#f4f5fa','#ff4c51','#9155fd']
  }]
}));

const chartOptions = computed(() => ({
  responsive: true
}));

const dataDoughnut = ref({
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      // backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
});

const optionsDoughnut = ref({
  responsive: true,
  maintainAspectRatio: false
})

onMounted(() => {
  let academyUser = JSON.parse(localStorage.getItem('academy-user'));
  idCareer.value = academyUser.teacher.teachingCareer[0].centerCareer.career.id;
  idCenter.value = academyUser.teacher.teachingCareer[0].centerCareer.regionalCenter.id;
  fetchCurrentPeriod();
  fetchPeriods();
  // fetchClasses(idCareer.value);
  fetchAnalytics(idCareer.value, idCenter.value);
});

watch([selectedPeriod], ([newPeriod]) => {
  if (selectedPeriod != newPeriod) {
    selectedClass.value = null;
  }
  fetchAnalytics()
});

watch([selectedClass], ([newClass]) => {
  if (selectedClass != newClass) {
    selectedSection.value = null;
    fetchSection();
  }
});

watch([selectedSection], ([newSection]) => {
});

async function fetchCurrentPeriod() {
  try {
    const response = await axios.get('http://localhost:3001/api/period/ongoing');
    currentPeriod.value = response.data.periods[0].id;
    selectedPeriod.value = currentPeriod.value;
  } catch (error) {
    try {
      const urlYearPeriod = `http://localhost:3001/api/period/year/${new Date().getFullYear()}`
      const responseTwo = await axios.get(urlYearPeriod);
      currentPeriod.value = responseTwo.data.periods[0].id;
      selectedPeriod.value = currentPeriod.value;
    } catch (error) {
      console.error(error);
    }
  }
}

async function fetchPeriods() {
  try {
    const response = await axios.get('http://localhost:3001/api/period');
    let array = [];
    array = response.data.periods.map((period) => ({
      id: period.id,
      displayText: `${period.numberPeriod} periodo ${period.year} ${
        Number(period.id) == Number(currentPeriod.value) ? ' (Vigente)' : ''
      }`,
    }));
    periods.value = array;
  } catch (error) {
    console.error(error);
  }
}

async function fetchClasses(career = idCareer.value) {
  try {
    const url = `http://localhost:3001/api/career-class/${career}`;
    const response = await axios.get(url);
    classes.value = response.data.classes;
    fetchAnalytics();
  } catch (error) {
    console.error(error);
  }
}

async function fetchSection(classId = selectedClass.value, regionalCenter = idCenter.value) {
  const idPeriod = selectedPeriod.value || currentPeriod.value;
  try {
    const url = `http://localhost:3001/api/section/class-period/${classId}?period=${selectedPeriod.value}&center=${regionalCenter}`;
    const response = await axios.get(url);
    sections.value = response.data.sections;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAnalytics(career = idCareer.value, regionalCenter = idCenter.value) {
  const idPeriod = selectedPeriod.value || 4;
  const idClass = selectedClass.value;
  const idSection = selectedSection.value;

  let url = `http://localhost:3001/api/analytic/criteria?idPeriod=${idPeriod}&idCareer=${career}&idRegionalCenter=${regionalCenter}`;

  // if (idClass) {
  //   url += `&idClass=${idClass || 1}`;
  //   if (idSection) {
  //     url += `&idSection=${idSection}`;
  //   }
  // }

  try {
    const response = await axios.get(url);
    analytics.value = response.data.analytics;
    allStudent.value[0] = {count: analytics.value[0].count};
    chartData.value.labels =[
        `Total ${analytics.value[1].name} ${analytics.value[1].percentage ? analytics.value[1].percentage.toFixed(1) : '0'}%`,
        `${analytics.value[2].name} ${analytics.value[2].percentage ? analytics.value[2].percentage.toFixed(1) : '0'}%`,
        `${analytics.value[3].name} ${analytics.value[3].percentage ? analytics.value[3].percentage.toFixed(1) : '0'}%`
      ];

    chartData.value.datasets[0].data = [(analytics.value[1].percentage) ? parseInt(analytics.value[1].percentage): 0, (analytics.value[2].percentage) ? parseInt(analytics.value[2].percentage): 0, (analytics.value[3].percentage) ? parseInt(analytics.value[3].percentage): 0];

    dataDoughnut.value.labels =[
        `${analytics.value[2].name} ${analytics.value[2].percentage ? analytics.value[2].percentage.toFixed(1) : '0'}%`,
        `${analytics.value[3].name} ${analytics.value[3].percentage ? analytics.value[3].percentage.toFixed(1) : '0'}%`
      ];
    dataDoughnut.value.datasets[0].data = [(analytics.value[2].percentage) ? parseInt(analytics.value[2].percentage): 0, (analytics.value[3].percentage) ? parseInt(analytics.value[3].percentage): 0];
    dataDoughnut.value.datasets[0].backgroundColor = ['#E46651', '#41B883', '#00D8FF', '#DD1B16'];

    graf.value = false;
    doughnutTwo.value = false;
    setTimeout(() => {
      graf.value = true;
      doughnutTwo.value = true;
    }, 100);

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
  sections,
});

</script>

<style>
.v-card-w {
  width: 100%;
}
</style>
