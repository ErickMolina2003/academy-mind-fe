<template>
    <v-container>
        <SearchableNavBar title="Estudiantes Matriculados" label="No.Cuenta"/>
        <div>
            <h2 style="padding-bottom: 15px">Lista de Estudiantes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Número de cuenta</th>
                        <th>Carrera</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students">
                        <td>{{ student.firstName}} {{student.secondName}} {{student.firstLastName}} {{student.secondLastName}}</td>
                        <td>{{ student.accountNumber }}</td>
                        <td>{{ student.major }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchableNavBar from "@/components/NavBars/SearchableNavBar.vue";

const originalStudents = ref([]);
onMounted(() => {
   getStudents();
});

const students = ref([
    {firstName:"Julia", secondName:"Marcela", firstLastName:"Martinez", secondLastName:"Mejia", accountNumber:"20191002985", major:"Ingenieria en sistemas"},
    {firstName:"Karen", secondName:"Alessandra", firstLastName:"Ortiz", secondLastName:"Merlo", accountNumber:"20191001283", major:"Ingenieria en sistemas"},
    {firstName:"Marcela", secondName:"Gloria", firstLastName:"Mejia", secondLastName:"Pineda", accountNumber:"20191002268", major:"Ingenieria en sistemas"},
    {firstName:"Manuel", secondName:"Alejandro", firstLastName:"Lopez", secondLastName:"Palma", accountNumber:"20191002192", major:"Ingenieria en sistemas"},
    {firstName:"Gabriela", secondName:"Mariel", firstLastName:"Corrales", secondLastName:"Rivera", accountNumber:"20191002127", major:"Ingenieria en sistemas"}
]);


function getStudents() {
  originalStudents.value = students.value;
  students.value = [...originalStudents.value];
}


const filterStudents = (query) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (lowerCaseQuery === "") {
    students.value = [...originalStudents.value];
  } else {
    students.value = originalStudents.value.filter((student) =>
      student.accountNumber.toLowerCase().includes(lowerCaseQuery)
    );
  }
};

document.addEventListener("filter", (event) => {
  filterStudents(event.detail);
});

document.addEventListener("resetFilter", () => {
  students.value = [...originalStudents.value];
});

</script>

<style scoped>
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

</style>