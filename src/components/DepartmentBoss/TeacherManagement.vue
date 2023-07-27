<template>
    <div>
        <SearchableNavBar :title="myTitle" :label="myLabel" />
        <table>
        <thead>
            <tr>
            <th>Número de empleado</th>
            <th>Nombre</th>
            <th>Correo Institucional</th>
            <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="teacher in displayedTeachers" :key="teacher.employeeNumber">
            <td>{{ teacher.employeeNumber }}</td>
            <td>
                {{ `${teacher.user.firstName} ${teacher.user.secondName} ${teacher.user.firstLastName} ${teacher.user.secondLastName}` }}
            </td>
            <td>{{ teacher.institutionalEmail }}</td>
            <td>
                <v-btn color="primary" @click="showClassDetails(teacher)" class="mr-2">Reiniciar Clave</v-btn>
            </td>
            </tr>
        </tbody>
        </table>

        <v-pagination v-model="currentPage" :total-visible="5" :length="totalPages" @input="updateDisplayedTeachers" />

        <!-- Modal -->
        <v-dialog v-model="showModal" persistent max-width="600">
        <v-card>
            <v-card-title class="text-h5 text-center">
            Reinicio de Clave
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text class="pa-4">
                <v-container>
                    <v-row>
                    <v-col cols="12" class="text-center">
                        <img
                        v-if="selectedTeacher.photoOne"
                        :src="selectedTeacher.photoOne"
                        alt="Foto del Docente"
                        class="mb-4 mx-auto d-block"
                        style="max-width: 200px; max-height: 200px; border-radius: 50%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
                        />
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12">
                        <p class="mb-2"><strong>Nombre:</strong> {{ selectedTeacher.user.firstName }} {{ selectedTeacher.user.secondName }} {{ selectedTeacher.user.firstLastName }} {{ selectedTeacher.user.secondLastName }}</p>
                        <p class="mb-2"><strong>Correo Institucional:</strong> {{ selectedTeacher.institutionalEmail }}</p>
                        <p class="mb-2"><strong>Número de empleado:</strong> {{ selectedTeacher.employeeNumber }}</p>
                        <p class="mb-2"><strong>DNI:</strong> {{ selectedTeacher.user.dni}}</p>
                        <p class="mb-2"><strong>Email Personal:</strong> {{ selectedTeacher.email }}</p>
                        
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>


            <v-card-actions class="fixed-footer">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-4" text @click="showModal = false">Cerrar</v-btn>
            <v-btn color="blue darken-4" @click="resetPassword(selectedTeacher.user.dni)">Reiniciar Clave</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import TeacherService from "@/services/teacher/teacher.service";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";
import LoginService from "@/services/login/login.service";
import ToasterVue from "@/components/Toaster.vue";


const myTitle = "Reinicio de Clave de Docentes";
const myLabel = "No. Empleado";
const teacherService = new TeacherService();

const teachers = ref([]);
const isLoading = ref(false);
const originalTeachers = ref([]);

const filteredTeachers = computed(() => teachers.value);

const itemsPerPage = 10;
const currentPage = ref(1);
const displayedTeachers = ref([]);

const totalPages = computed(() => Math.ceil(filteredTeachers.value.length / itemsPerPage));

const updateDisplayedTeachers = () => {
const startIndex = (currentPage.value - 1) * itemsPerPage;
displayedTeachers.value = filteredTeachers.value.slice(startIndex, startIndex + itemsPerPage);
};

watch(currentPage, updateDisplayedTeachers);
watch(filteredTeachers, updateDisplayedTeachers);

const getTeachers = async () => {
isLoading.value = true;
originalTeachers.value = await teacherService.getTeachers();
teachers.value = [...originalTeachers.value];
isLoading.value = false;
};

const filterTeachers = (query) => {
const lowerCaseQuery = query.toLowerCase().trim();
if (lowerCaseQuery === "") {
    teachers.value = [...originalTeachers.value];
} else {
    teachers.value = originalTeachers.value.filter((teacher) =>
    teacher.employeeNumber.toLowerCase().includes(lowerCaseQuery)
    );
}
};

document.addEventListener("filter", (event) => {
filterTeachers(event.detail);
});

const selectedTeacher = ref(null);
const showModal = ref(false);

const showClassDetails = (teacher) => {
selectedTeacher.value = teacher;
showModal.value = true;
};

const resetPassword = async (dni) => {
    const service = new LoginService();
    const response = await service.resetTeacherPassword(dni);
    if (response) {
        showModal.value = false;
    }
};

onMounted(async () => {
await getTeachers();
updateDisplayedTeachers();
});
</script>

<style>
table {
width: 100%;
border-collapse: collapse;
}

th,
td {
padding: 8px;
border-bottom: 2px solid #ddd;
text-align: center;
}

th {
background-color: #f2f2f2;
}
.fixed-footer {
position: sticky;
bottom: 0;
background-color: white;
border-top: 1px solid rgba(var(--v-theme-base-border-color), 0.12);
padding: 16px;
}
</style>
