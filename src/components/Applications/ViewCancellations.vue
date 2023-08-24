<template>
  <div v-if="ongoingClasses">
    <div class="mb-5">
      <h2 class="text-center py-2">Solicitud de cancelaciones excepcionales</h2>
    </div>
    <v-table class="classes-table pb-4" fixed-header density="comfortable">
      <thead>
        <tr>
          <th>CODIGO</th>
          <th>ASIGNATURA</th>
          <th>SECCIÓN</th>
          <th>HI</th>
          <th>HF</th>
          <th>DIAS</th>
          <th>UV</th>
          <th>PERIODO</th>
          <th>ESTADO</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="ongoingClasses" v-for="item in ongoingClasses" :key="item.id">
          <td>
            <span>{{ item.idTuition.section.idClass.code }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.idClass.name }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.codeSection }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.hour }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.finalHour }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.days }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.idClass.valueUnits }}</span>
          </td>
          <td>
            <span>{{ item.idTuition.section.idPeriod.numberPeriod }}</span>
          </td>
          <td>
            <span>{{ item.status }}</span>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-else>
    <h2 class="text-center py-2">
      No existe solicitud de cancelaciones excepcionales
    </h2>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import ExceptionalCancellationService from "@/services/exceptional-cancellation/exceptional.cancellation.service";

const serviceExceptionalCancellation = new ExceptionalCancellationService();
const store = useAppStore();
const accountStudent = store.user.student.accountNumber;
const selectedClass = ref({});
const file = ref([]);
const isValid = ref(false);
const reasonsChange = ref("");
const fileError = ref(false);
const tableError = ref(false);
const textError = ref(false);
const ongoingClasses = ref([]);

onMounted(async () => {
  getSections();
});

async function getSections() {
  const response =
    await serviceExceptionalCancellation.getExceptionalCancellation(
      accountStudent
    );
  ongoingClasses.value = response.tuitions;
}
</script>

<style scoped>
.classes-table {
  font-size: 0.7rem;
}
.selected-row {
  background-color: lightyellow;
}
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
