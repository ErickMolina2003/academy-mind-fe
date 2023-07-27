<template>
  <v-card class="text-center w-100 fill-height pa-4 rounded-lg" outlined>
    <v-card-title class="text-h4 text-center"> Detalles de pago </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-table>
        <thead style="background-color: #0d47a1">
          <tr>
            <th class="text-left text-white">Descripcion</th>
            <th class="text-left text-white">Valor</th>
            <th class="text-left text-white">Pagado</th>
            <th class="text-left text-white">Banco</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in payments" :key="item.name">
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ item.value }}</td>
            <td class="text-left">{{ item.paid }}</td>
            <td class="text-left">{{ item.bank }}</td>
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

<script setup>
import { ref } from "vue";
import json from "../../mock/payments.json";
const dialog = ref(false);
const payments = ref(json);

function TotalPay() {
  let pay = 0;
  for (let i = 0; i < this.payments.length; i++) {
    pay += this.payments[i].value;
  }
  return pay;
}
</script>
