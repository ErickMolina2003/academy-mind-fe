<template>
    <div>
      <h2 style="color: #CC6600; padding-bottom: 15px;">Lista de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Numero de cuenta</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Correo Institucional</th>
            <th>Carrera</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.dni">
            <td>{{ student.accountNumber }}</td>
            <td>{{ student.user.firstName }}</td>
            <td>{{ student.user.secondName }}</td>
            <td>{{ student.user.firstLastName }}</td>
            <td>{{ student.user.secondLastName }}</td>
            <td>{{ student.institutionalEmail }}</td>
            <td>{{ student.career }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import StudentService from '@/services/student/student.service';
  
  const students = ref([]);
  const isLoading = ref(false);
  const originalStudents = ref([]);
  const studentService = new StudentService();
  
  onMounted(async () => {
    isLoading.value = true;
    originalStudents.value = await studentService.getStudents();
    students.value = [...originalStudents.value];
    isLoading.value = false;
  });
  
  const filterStudents = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery === '') {
      students.value = [...originalStudents.value];
    } else {
      students.value = originalStudents.value.filter(student =>
        student.accountNumber.toLowerCase().includes(lowerCaseQuery)
      );
    }
  };
  
  const filteredStudents = computed(() => students.value);
  
  document.addEventListener('filter', event => {
    filterStudents(event.detail);
  });
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    border-bottom: 2px solid #ddd;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  