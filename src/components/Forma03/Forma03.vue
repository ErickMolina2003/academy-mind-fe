<template>
    <v-container v-if="currentPeriod" fluid style="height:470px; overflow-y:scroll;">

        <v-row>
            <v-col cols="auto" class="mb-2">
                <img v-if="profilePicture" :src="profilePicture" alt="user-img" cover class="user-img rounded-lg" />
                <img v-else src="@/assets/default-picture.jpg" alt="user-img" cover class="user-img rounded-lg" />
            </v-col>


            <v-col class="user-info mb-6 ">

                <v-row>
                    <v-col cols="6">
                        <h4 class="font-weight-regular ">Número de cuenta: <span>{{ user.accountNumber }}</span></h4>
                    </v-col>

                    <v-col cols="6">
                        <h4 class="font-weight-regular">Centro: <span>{{ user.center }}</span></h4>
                    </v-col>
                </v-row>

                <v-row>

                    <v-col cols="6">
                        <h4 class="font-weight-regular">Nombre completo: <span>{{ fullName }}</span></h4>
                    </v-col>
                    <v-col cols="6">
                        <h4 class="font-weight-regular ">Año: <span>{{currentPeriod?.year}}</span></h4>
                    </v-col>
                </v-row>

                <v-row>

                    <v-col cols="6">
                        <h4 class="font-weight-regular">Carrera: <span>{{ user.career }}</span></h4>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>

        <v-card class="mt-5">
            <v-card-title class="text-center" style="background-color: rgb(var(--v-theme-secondary-lighthen-1));">
                <span class="headline text-white">Asignaturas Matriculadas</span>
            </v-card-title>
            <v-card-text class="pa-0">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-black pa-0 px-3">Cód.</th>
                            <th class="text-black pa-0 px-3">Asignatura</th>
                            <th class="text-black pa-0 px-3">Sección</th>
                            <th class="text-black pa-0 px-3">HI</th>
                            <th class="text-black pa-0 px-3">HF</th>
                            <th class="text-black pa-0 px-3">Días</th>
                            <th class="text-black pa-0 px-3">Edificio</th>
                            <th class="text-black pa-0 px-3">Aula</th>
                            <th class="text-black pa-0 px-3">UV</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="normalTuitions" v-for="item in normalTuitions" :key="item.id">
                            <td class="text-left pa-0 px-3">{{ item.section.idClass.code }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.idClass.name }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.codeSection }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.hour }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.finalHour }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.days }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.idClassroom.idBuilding.name }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.idClassroom.code }}</td>
                            <td class="text-left pa-0 px-3">{{ item.section.idClass.valueUnits }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from "@/store/app";
import SectionService from "@/services/section/section.service";
import TuitionService from "@/services/tuition/tuition.service";
import PeriodService from "@/services/period/period.service";

const store = useAppStore();
const tuitionService = new TuitionService();
const sectionService = new SectionService();
const servicePeriod = new PeriodService();
const periods = ref([]);
const profilePicture = ref();
const currentPeriod = ref();
const tuitions=ref([]);
const userLogged = store.user.student;
const studentCareer = userLogged.studentCareer[0].centerCareer;
const normalTuitions = ref([]);
const fullName =
    store.user.firstName.toUpperCase() +
    ` ` +
    store.user.secondName.toUpperCase() +
    ` ` +
    store.user.firstLastName.toUpperCase() +
    ` ` +
    store.user.secondLastName.toUpperCase();
const user = {
    name: fullName,
    accountNumber: userLogged.accountNumber,
    center: userLogged.studentCareer[0].centerCareer.regionalCenter.name,
    globalIndex: userLogged.overallIndex,
    periodIndex: userLogged.periodIndex,
    career: userLogged.studentCareer[0].centerCareer.career.name
}

onMounted(async () => {
  getPeriods();

})

async function getPeriods() {
    const response = await servicePeriod.getPeriodOngoing();
    periods.value = response.periods;
    currentPeriod.value = periods.value[0];
    
    if (currentPeriod.value) {
        getTuitionsByStudent();
        getProfilePicture(userLogged.currentPhoto);
    }else{
        store.setToaster({
            isActive: true,
            text: "El periodo actual no está en curso.",
            color: "error",
        });
    }

}

async function getTuitionsByStudent() {
  const response = await tuitionService.getTuitionsByStudent(userLogged.accountNumber, currentPeriod.value.id);
  tuitions.value = response.registrations;
  if (tuitions.value) {
    normalTuitions.value = tuitions.value.filter((tuition) => tuition.waitingList == "false");
  }
}


function getProfilePicture(index) {

if (index == 1) {
    profilePicture.value = store.user.student.photoOne;
} else if (index == 2) {
    profilePicture.value = store.user.student.photoTwo;
} else if (index == 3) {
    profilePicture.value = store.user.student.photoThree;
} else {
    profilePicture.value = null;
}

}
</script>

<style scoped>
.user-img {
    width: 128px;
    height: 128px;
    object-fit: cover;
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



  
  