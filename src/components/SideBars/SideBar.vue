<template>
  <div v-for="item in sidebarOptions" :key="item.name">
    <v-list class="py-0">
      <v-list-item
        v-if="!item?.submenu || item?.submenu.length <= 0"
        :to="item?.to"
        color="success"
      >
        <v-list-item-title class="text-wrap">{{ item.name }}</v-list-item-title>
      </v-list-item>

      <v-list-group
        :value="item.name"
        v-if="item.submenu && item.submenu.length > 0"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="item.name"
            :to="item.to"
            color="success"
          >
          </v-list-item>
        </template>

        <div v-for="item2 in item.submenu" :key="item2.name">
          <v-list-item
            v-if="!item2.submenu || item2.submenu.length <= 0"
            :to="item2.to"
            color="success"
          >
            <v-list-item-title class="text-wrap">{{
              item2.name
            }}</v-list-item-title>
          </v-list-item>

          <v-list-group
            :value="item2.name"
            v-if="item2.submenu && item2.submenu.length > 0"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="item2.name"
                :to="item2.to"
                color="sucess"
              ></v-list-item>
            </template>

            <div v-for="item3 in item2.submenu" :key="item3.name">
              <v-list-item :to="item3.to" color="sucess">
                <v-list-item-title class="text-wrap">{{
                  item3.name
                }}</v-list-item-title>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list-group>
    </v-list>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sidebarOptions: Array<any>;
}>();
</script>
