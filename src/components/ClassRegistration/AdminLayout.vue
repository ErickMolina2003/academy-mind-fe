<template>
  <v-container>
    <NavBar
      :title="getNavBarTitles.title"
      :btnTitle="getNavBarTitles.btnTitle"
      @createUser="toggleModal"
    />
    <router-view></router-view>
    <v-dialog v-model="showModal" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ getNavBarTitles.btnTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-if="getNavBarTitles.title === 'Estudiantes'">
              <v-file-input
                v-model="files"
                color="secondary-lighthen-1"
                label="Subir archivo"
                prepend-icon="mdi-paperclip"
                variant="outlined"
                :show-size="1000"
              >
                <template v-slot:selection="{ fileNames }">
                  <template
                    v-for="(fileName, index) in fileNames"
                    :key="fileName"
                  >
                    <v-chip
                      v-if="index < 2"
                      color="secondary-lighthen-1"
                      label
                      size="small"
                      class="me-2"
                    >
                      {{ fileName }}
                    </v-chip>
                  </template>
                </template>
              </v-file-input>
            </v-row>

            <v-row v-if="getNavBarTitles.title === 'Docentes'">
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeModal">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="submitModal">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
interface CSVRow {
  [key: string]: string;
}

import NavBar from "@/components/NavBars/NavBar.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();
const showModal = ref(false);
const files = ref([]);
const csvData = ref<CSVRow[]>([]);

const getNavBarTitles = computed(() => {
  let title;
  let btnTitle;
  let studentView;
  if (router.fullPath === "/docentes") {
    title = "Docentes";
    btnTitle = "Agregar Docente";
    studentView = false;
  }
  if (router.fullPath === "/estudiantes") {
    title = "Estudiantes";
    btnTitle = "Agregar Estudiantes";
    studentView = true;
  }
  return { title: title, btnTitle: btnTitle, studentView: studentView };
});

function toggleModal() {
  showModal.value = true;
}

function closeModal() {
  files.value = [];
  showModal.value = false;
}

function submitModal() {
  closeModal();
}

const parseCSV = (csvText: string): CSVRow[] => {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");
  const data: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row: CSVRow = {};

    for (let j = 0; j < headers.length; j++) {
      if (headers[j] && values[j]) {
        const key = headers[j].trim();
        const value = values[j].trim();
        row[key] = value;
      }
    }

    data.push(row);
  }

  return data;
};

watch(files, () => {
  if (files.value.length > 0) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const csvText = e.target.result.toString();
        const parsedData = parseCSV(csvText);
        csvData.value = parsedData;
      }
      console.log(csvData.value);
    };

    reader.readAsText(files.value[0]);
  }
});
</script>
