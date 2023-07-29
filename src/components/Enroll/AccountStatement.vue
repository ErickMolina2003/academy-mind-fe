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
          <tr>
            <td class="text-left">
              Matricula {{ store.user.student.periodIndex }}-PAC
            </td>
            <td class="text-left">270</td>
            <td class="text-left d-flex">
              <v-checkbox
                v-if="store.user.student.payment"
                :model-value="true"
                disabled
              ></v-checkbox>
              <v-checkbox v-else :model-value="false" disabled></v-checkbox>
            </td>
            <td class="text-left">1</td>
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
function TotalPay() {
  let pay = 0;
  if (!store.user.student.payment) {
    pay = 270;
    return pay;
  }
  return pay;
}
</script>
