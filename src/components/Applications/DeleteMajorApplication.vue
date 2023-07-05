<template>
    <v-card class="ma-4" v-if="applicationToDelete !== '' && wantsToDelete === false">
        <h2 class="text-center py-2">
            Borrar solicitud cambio de carrera
        </h2>
        <v-table>
            <thead>
                <tr>
                    <th v-for="header of headers" class="text-left">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="key in Object.keys(applications)" :key="key">
                    <td v-for="header in headers">{{ applications[key][header] }}</td>
                    {{ applications[key][header] }}
                </tr>
            </tbody>
        </v-table>

        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="deep-purple-accent-4" @click="deleteApplication">
                Borrar solicitud
            </v-btn>
        </v-card-actions>

    </v-card>
    <v-card v-else>
        <p class="text-center font-weight-medium text-h5 text-lg-h4 mb-3 pt-3">
            Usted no tiene solicitudes en tramite.
        </p>
    </v-card>
</template>

<script setup >
import { ref, defineEmits } from 'vue';


defineProps({
    applicationToDelete: String,
    applications: Array,
    headers: Array
})



const wantsToDelete = ref(false);
const emit = defineEmits(['update-delete-majors']);

function deleteApplication() {
    wantsToDelete.value = true;
    alert(`SOLICITUD BORRADA ÉXITOSAMENTE`);
    emit('update-delete-majors', wantsToDelete.value);

}

</script>