<template>
  <v-card class="ma-4">
    <v-col cols="12" class="rounded-lg mb-2 px-7 py-2">
      <h2 class="text-center py-2">
        Solicitud {{ typeApplication }}
      </h2>
      <hr>
      <slot></slot>
    </v-col>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-2">
      <v-autocomplete v-model="selected" :items="array" :label="labelCreate" :rules="[rules.required]"
        return-object></v-autocomplete>
      <v-textarea v-model="reasonsChange" :label="labelReason" :rules="[rules.required]" auto-grow variant="filled"
        rows="1"></v-textarea>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="() => borrar()">
        Borrar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isValid" color="deep-purple-accent-4" @click="submitApplication">
        Realizar solicitud
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script setup >
import { ref, defineEmits } from 'vue';

// const props = defineProps({
//     headers: Array,
//     data: Array
// })


const emit = defineEmits(['update-selected-majors', 'update-selected-centers']);

const rules = {
  required: (value) => !!value || "Campo obligatorio",
};


const props = defineProps(['typeApplication', 'array', 'labelCreate', 'labelReason'])

const isValid = ref(false);
const reasonsChange = ref('Quiero hacer una solicitud de cambio por que ...');
const selected = ref('');


function borrar() {
  selected.value = "";
  reasonsChange.value = 'Quiero hacer una solicitud de cambio por que ...';
}

function submitApplication() {
  if (!isValid.value) return

  alert(`SOLICITUD REALIZADA ÉXITOSAMENTE`);
  if (props.typeApplication === 'cambio de carrera') {
    emit('update-selected-majors', selected.value);
  } else {
    emit('update-selected-centers', selected.value);
  }
  borrar();
}

</script>