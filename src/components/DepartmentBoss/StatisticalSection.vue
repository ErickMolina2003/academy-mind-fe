<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- <v-row class="mb-4">
            <v-col cols="4">
              <v-select
                v-model="selectedPeriod"
                :items="periods"
                label="Periodo Actual"
                item-text="displayText"
                item-value="id"
                @change="fetchAnalytics"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="selectedClass"
                :items="classes"
                label="Clase"
                item-text="name"
                item-value="id"
                @change="fetchAnalytics"
              ></v-select>
            </v-col>
            <v-col cols="4" v-if="selectedClass">
              <v-select
                v-model="selectedSection"
                :items="sections"
                label="Sección"
                item-text="name"
                item-value="id"
                @change="fetchAnalytics"
              ></v-select>
            </v-col>
          </v-row> -->
          <v-row>
            <v-col v-for="item in analytics" :key="item.name" cols="12" md="6">
              <v-card class="mx-auto" max-width="400" color="#61c0c2" dark><!--#1F7087-->
                <v-card-title class="text-h5 text-white">{{ item.name }}</v-card-title>
                <v-card-text class="text-h7 text-white">
                  <v-row class="d-flex justify-content-between">
                    <v-col cols="6">
                      <p class="mb-2">Periodo Actual: {{ item.count }}</p>
                    </v-col>
                    <v-col cols="6">
                      <p>{{ (item.percentage) ? `Porcentaje: ${ item.percentage }%` : `` }}</p>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center"></v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted, reactive } from 'vue';
  
  const selectedPeriod = ref(4);
  const selectedClass = ref(null);
  const selectedSection = ref(null);
  const analytics = ref([]);
  const periods = ref([]);
  const classes = ref([]);
  const sections = ref([]);
  const idCareer = ref('');
  const idCenter = ref('');

  
  onMounted(() => {
    let academyUser = JSON.parse(localStorage.getItem("academy-user"));
    idCareer.value = academyUser.teacher.teachingCareer[0].centerCareer.career.id;
    idCenter.value = academyUser.teacher.teachingCareer[0].centerCareer.regionalCenter.id
    fetchPeriods();
    fetchClasses(idCareer.value);
    fetchAnalytics(idCareer.value,idCenter.value);
  });


  async function fetchPeriods() {
    try {
      const response = await axios.get('http://localhost:3001/api/period');
      let array = []
      array = response.data.periods.map(period => (
        {
          id: period.id,
          displayText: `${period.numberPeriod} periodo ${period.year}`
        }
      ));

      periods.value = array;
      periods.value = [1,2,3,4];

      
      
      
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchClasses(career = idCareer.value) {
    try {
      const url = `http://localhost:3001/api/career-class/${career}`
      const response = await axios.get(url);
      classes.value = response.data.classes;
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchAnalytics(career = idCareer.value , regionalCenter = idCenter.value) {
      
    const idPeriod = selectedPeriod.value || 4;

    const idClass = selectedClass.value;
    const idSection = selectedSection.value;
  
    let url = `http://localhost:3001/api/analytic/criteria?idPeriod=${idPeriod}&idCareer=${career}&idRegionalCenter=${regionalCenter}`;
  
    if (idClass) {
      url += `&idClass=${idClass || 1}`;
    //   if (idSection) {
    //     url += `&idSection=${idSection}`;
    //   }
    }
  
  
    try {
      const response = await axios.get(url);
      analytics.value = response.data.analytics;
    } catch (error) {
      console.error(error);
    }
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
   .asd{
    color: black;
   }
  </style>
  