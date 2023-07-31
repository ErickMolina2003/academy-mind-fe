<template>
    <h1 style="color: #CC6600;">Calificaciones del periodo</h1>
    <v-divider :thickness="5" class="pb-5 mt-2"></v-divider>
    <v-table class="table-grades" fixed-header density="comfortable">
        <thead>
            <tr>
                <th class="text-center">Código</th>
                <th class="text-center">Asignatura</th>
                <th class="text-center">HI</th>
                <th class="text-center">HF</th>
                <th class="text-center">Días</th>
                <th class="text-center">Sección</th>
                <th class="text-center">Docente</th>
                <th class="text-center">Calificación</th>
                <th v-if="needsEvalutions" class="text-center">Obs</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in subjects" :key="item.codigo">
                <td class="text-center">{{ item.codigo }}</td>
                <td class="text-center">{{ item.asignatura }}</td>
                <td class="text-center">{{ item.hi }}</td>
                <td class="text-center">{{ item.hf }}</td>
                <td class="text-center">{{ item.dias }}</td>
                <td class="text-center">{{ item.seccion }}</td>
                <td class="text-center">{{ item.docente }}</td>
                <td v-if="needsEvalutions" class="text-center">{{ item.calificacion }}</td>
                <td v-if="!needsEvalutions && !item.evaluation">
                    <v-icon class="icon icon-evaluation" @click="openEvaluation(item)" >{{ ' mdi-chat-question' }}</v-icon>
                </td>
                <td v-if="!needsEvalutions && item.evaluation">
                    <v-icon class="icon" >{{ ' mdi-check-bold' }}</v-icon>
                </td>
                <td class="text-center" v-if="needsEvalutions">{{ item.obs }}</td>
            </tr>
        </tbody>
    </v-table>
    <v-dialog v-model="dialog" width="auto">
        <TeacherEvaluation  :chosenForEvaluation="chosenForEvaluation" @submitForm="closeEvaluation"/>
        
    </v-dialog>
    
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import TeacherEvaluation from "@/components/Enroll/TeacherEvaluation";
const dialog = ref(false);
/*
{
            path: "/calificaciones",
            name: "calificaciones",
            component: () => import("@/components/Grades/ViewGrades.vue"),
          },
*/ 

const subjects = ref([

        {
            "codigo": "FS100",
            "asignatura": "Fisica 1",
            "hi": "1100",
            "hf": "1200",
            "dias": "LuMaMiJuVi",
            "seccion": "1100",
            "docente": "John Doe",
            "calificacion": 70,
            "obs": "APR",
            "evaluation": false
        },
        {
            "codigo": "EG011",
            "asignatura": "Español General 1",
            "hi": "1200",
            "hf": "1300",
            "dias": "LuMaMiJu",
            "seccion": 1100,
            "docente": "Maria Lopéz",
            "calificacion": 90,
            "obs": "APR",
            "evaluation": false
        },
        {
            "codigo": "MM110",
            "asignatura": "Matematica 1",
            "hi": "0700",
            "hf": "0800",
            "dias": "LuMaMiJuVi",
            "seccion": 9000,
            "docente": "Yelson Sandoval",
            "calificacion": 80,
            "obs": "APR",
            "evaluation": false
        },

    ]);

const needsEvalutions = ref(false);
const chosenForEvaluation = ref(null);
onMounted(() => {
    if (showPendingEvaluations().length === 0) {
        needsEvalutions.value = true;
    }
});

function showPendingEvaluations() {
    return subjects.value.filter(subject => subject.evaluation === false)
}

function openEvaluation(item){
    dialog.value = true;
    chosenForEvaluation.value = item;
}
function closeEvaluation(evaluationDone){
    if (evaluationDone) {
        chosenForEvaluation.value.evaluation = true;
    }else{
        chosenForEvaluation.value = null;
    }
    
    dialog.value = false;
    if (showPendingEvaluations().length === 0) {
        needsEvalutions.value = true;
    }
}
</script>
  
<style>
.table-grades {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}
.icon{
    color: green;
    font-size: 2rem;
}

.icon-evaluation{
    
    cursor: pointer;
}
</style>