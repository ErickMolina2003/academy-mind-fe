<template>
  <span style="height:100%">
    <MainSideBar />
    <router-view></router-view>
  </span>
</template>

<script setup>
import MainSideBar from "@/components/SideBars/MainSideBar.vue";
</script>
