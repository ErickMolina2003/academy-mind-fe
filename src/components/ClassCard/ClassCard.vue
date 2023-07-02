<template>
    <v-card class="">
        <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover />
        <v-row class="class-card-footer">
            <v-col class="py-1" cols="12" md="12" lg="12">
                <v-card-text class="pt-4 text-white">
                    {{ periodo }} PAC {{ anio }}
                </v-card-text>
            </v-col>
            <v-col class="py-1" cols="12" md="12" lg="12">
                <v-card-text class="text-white">
                    <div>{{ clase }}</div>
                </v-card-text>
            </v-col>
        </v-row>


    </v-card>
</template>
<script setup lang="ts">
const props = defineProps<{
    clase: string,
    periodo: string,
    anio: string
}>()


</script>

<style scoped>
.class-card-footer {
    background-color: rgb(var(--v-theme-secondary));
}
</style>