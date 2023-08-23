<template>
  <v-card class="text-center w-100 fill-height pa-4 rounded-lg" outlined>
    <v-card-title class="text-h4 text-center"> Detalles de pago </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-table>
        <thead style="background-color: #0d47a1">
          <tr>
            <th class="text-left text-black">Descripcion</th>
            <th class="text-left text-black">Valor</th>
            <th class="text-left text-black">Pagado</th>
            <th class="text-left text-black">Banco</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Matrícula</td>
            <td class="text-left">270</td>
            <td class="text-left d-flex">
              <v-checkbox
                v-if="store.user.student.payment"
                :model-value="true"
                disabled
              ></v-checkbox>
              <v-checkbox v-else :model-value="false" disabled></v-checkbox>
            </td>
            <td v-if="store.user.student.payment" class="text-left">0</td>
            <td v-else class="text-left">1</td>
          </tr>
          <tr v-if="store.user.careerChange !== undefined">
            <td class="text-left">Cambio de Carrera</td>
            <td class="text-left">200</td>
            <td class="text-left d-flex">
              <v-checkbox
                v-if="store.user.careerChange"
                :model-value="true"
                disabled
              ></v-checkbox>
              <v-checkbox v-else :model-value="false" disabled></v-checkbox>
            </td>
            <td v-if="store.user.careerChange" class="text-left">0</td>
            <td v-else class="text-left">1</td>
          </tr>
          <tr v-if="store.user.centerChange !== undefined">
            <td class="text-left">Cambio de Centro</td>
            <td class="text-left">150</td>
            <td class="text-left d-flex">
              <v-checkbox
                v-if="store.user.centerChange"
                :model-value="true"
                disabled
              ></v-checkbox>
              <v-checkbox v-else :model-value="false" disabled></v-checkbox>
            </td>
            <td v-if="store.user.centerChange" class="text-left">0</td>
            <td v-else class="text-left">1</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="text-left text-h6">
      Total a pagar: {{ TotalPay() }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { ref, computed, onMounted } from "vue";

const store = useAppStore();

function TotalPay() {
  let pay = 0;
  if (!store.user.student.payment) {
    pay += 270;
    return pay;
  }
  if (!store.user.careerChange && store.user.careerChange !== undefined) {
    pay += 200;
  }
  if (!store.user.centerChange && store.user.centerChange !== undefined) {
    pay += 150;
  }
  return pay;
}
</script>
