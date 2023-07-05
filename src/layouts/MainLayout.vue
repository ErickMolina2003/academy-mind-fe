<template>
  <span style="height: 100%; width: 100%">
    <MainSideBar />
    <span class="toaster-view">
      <ToasterVue />
      <router-view></router-view>
    </span>
  </span>
</template>

<script setup>
import MainSideBar from "@/components/SideBars/MainSideBar.vue";
import ToasterVue from "@/components/Toaster.vue";
</script>
