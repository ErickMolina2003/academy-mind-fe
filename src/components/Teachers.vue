<template>
    <div>
      <h2 style="color: #CC6600; padding-bottom: 15px;">Lista de Docentes</h2>
      <table>
        <thead>
          <tr>
            <th>Número de empleado</th>
            <th>Nombres</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Correo Institucional</th>
            <th>Es Jefe</th>
            <th>Es Coordinador</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in filteredTeachers" :key="teacher.employeeNumber">
            <td>{{ teacher.employeeNumber }}</td>
            <td>{{ teacher.user.firstName }}</td>
            <td>{{ teacher.user.secondName }}</td>
            <td>{{ teacher.user.firstLastName }}</td>
            <td>{{ teacher.user.secondLastName }}</td>
            <td>{{ teacher.institutionalEmail }}</td>
            <td>{{ teacher.isBoss ? 'Sí' : 'No' }}</td>
            <td>{{ teacher.isCoordinator ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import TeacherService from '@/services/teacher/teacher.service';
  
  const teachers = ref([]);
  const isLoading = ref(false);
  const originalTeachers = ref([]);
  const teacherService = new TeacherService();
  
  onMounted(async () => {
    isLoading.value = true;
    originalTeachers.value = await teacherService.getTeachers();
    teachers.value = [...originalTeachers.value];
    isLoading.value = false;
  });
  
  const filterTeachers = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery === '') {
      teachers.value = [...originalTeachers.value];
    } else {
      teachers.value = originalTeachers.value.filter(teacher =>
        teacher.employeeNumber.toLowerCase().includes(lowerCaseQuery)
      );
    }
  };
  
  const filteredTeachers = computed(() => teachers.value);
  
  // Capturar el evento personalizado 'filter' emitido desde NavBar.vue
  document.addEventListener('filter', event => {
    filterTeachers(event.detail);
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
  