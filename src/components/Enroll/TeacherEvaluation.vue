<template>
    <v-container fluid style="background-color: #fff;overflow: auto;">
        <div class="ma-6">
            <h1 class="bg-blue-darken-3 text-center">Evaluacion de Docente</h1>
            <div class="d-flex mt-2">
                <h2 class="me-auto">Docente: {{ chosenForEvaluation.section.idTeacher.user.firstName }}
                    {{ chosenForEvaluation.section.idTeacher.user.firstLastName }}</h2>
                <h2>Materia:{{ chosenForEvaluation.section.idClass.name }}</h2>
            </div>
            <v-divider></v-divider>
        </div>

        <v-form v-model="form" @submit.prevent>
            <div class="ma-6">

                <h3 class="bg-blue-darken-3 text-left pa-1">
                    CARACTERÍSTICAS PERSONALES DEL DOCENTE
                </h3>
                <div v-for="(item, index) in everything.slice(0, 4)" :key="index">
                    <p>
                        {{ item.question?.question }}
                    </p>
                    <v-select label="Seleccione:" :rules="[rules.required]" v-model="item.answer"
                        :items="calification" density="comfortable">
                    </v-select>
                </div>
                <v-divider></v-divider>
            </div>
            <div class="ma-6">
                <h3 class="bg-blue-darken-3 text-left pa-1">
                    CARACTERÍSTICAS PEDAGÓGICAS Y DIDÁCTICAS DEL DOCENTE
                </h3>
                <div v-for="(item, index) in everything.slice(4, 7)" :key="index">
                    <p>
                        {{ item.question?.question }}
                    </p>
                    <v-select label="Seleccione:" :rules="[rules.required]" v-model="item.answer"
                        :items="calification" density="comfortable">
                    </v-select>
                </div>
                <v-divider></v-divider>
            </div>
            <div class="ma-6">
                <h3 class="bg-blue-darken-3 text-left pa-1">
                    CARACTERÍSTICAS DISCIPLINARES
                </h3>
                <div v-for="(item, index) in everything.slice(7, 10)" :key="index">
                    
                    <p>
                        {{ item.question?.question }}
                    </p>
                    <v-select label="Seleccione:" :rules="[rules.required]" v-model="item.answer"
                        :items="calification" density="comfortable">
                    </v-select>
                </div>
                <v-divider></v-divider>
            </div>
            <div class="ma-6">
                <h3 class="bg-blue-darken-3 text-left pa-1">{{ everything[10].question?.question }}</h3>
                <v-textarea class="mt-3" v-model=everything[10].answer :rules="[rules.required]" name="input-7-1"
                    variant="outlined" label="Califique" auto-grow></v-textarea>
            </div>
            <div class="text-right ma-6">
                <v-btn style="width: 100px" class="bg-blue-darken-4 text-right" @click="emit('submitForm', false);" rounded
                    variant="outlined">
                    Cerrar
                </v-btn>
                <v-btn style="width: 100px" type="submit" @click="submitForm" class="bg-blue-darken-4 text-right" rounded
                    variant="outlined">
                    Enviar
                </v-btn>
            </div>
        </v-form>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";

import TeacherEvaluation from "@/components/Enroll/TeacherEvaluation";
import TuitionService from "@/services/tuition/tuition.service";
import PeriodService from "@/services/period/period.service";
import QuestionService from "@/services/question/question.service";


const store = useAppStore();
const questionService = new QuestionService();
const servicePeriod = new PeriodService();
const tuitionService = new TuitionService();
const emit = defineEmits(['submitForm']);
const props = defineProps(['chosenForEvaluation']);
const calification = [
    "Excelente",
    "Bueno",
    "Intermedio",
    "Insuficiente",
    "Deficiente",
];

const questions = ref([]);
const form = ref(false);
const everything = ref([
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    },
    {
        question: null,
        answer: null,
    }
]);
onMounted(() => {
    getQuestions();

});

async function getQuestions() {
    const response = await questionService.getQuestions();
    questions.value = response.questions;

    for (const i in questions.value) {
        everything.value[i].question = questions.value[i]
    }
}

async function submitForm() {

    if (!form.value) return;
    await createEvaluation();
    emit('submitForm', true);
}

async function createEvaluation() {
    
    let tuitionId = props.chosenForEvaluation.id;
    let data =
    {
        tuitionId: String(tuitionId),
        questionId: String(everything.value[10].question.id),
        openAnswer: String(everything.value[10].answer)
    }

    // open answer
    let response = await questionService.createEvaluation(data);

    for (let i = 0; i < everything.value.length-1; i++) {

        let questionId = everything.value[i].question.id;
        let answer = everything.value[i].answer;
        let data =
        {
            tuitionId: tuitionId,
            questionId: questionId,
            answer: answer
        }

        let response = await questionService.createEvaluation(data);

    }
}

const rules = {
    required: (value) => !!value || "Campo obligatorio.",
};
</script>


<style scoped></style>