<template>
  <div class="text-center">
    <v-btn color="primary" @click="dialog = true"> Open Dialog </v-btn>
    <v-dialog v-model="dialog" width="auto">
      <v-card class="mx-auto pa-4 rounded-lg" width="600px" outlined>
        <v-card-title class="text-h4 text-center">
          Detalles de pago
        </v-card-title>

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
                <td class="text-center">{{ item.value }}</td>
                <td class="text-center">{{ item.paid }}</td>
                <td class="text-center">{{ item.bank }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-text class="text-h6">
          Total a pagar: {{ TotalPay() }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-col class="text-right">
            <v-btn
              color="blue-darken-4"
              variant="elevated"
              @click="dialog = false"
            >
              Close Dialog
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
