<template>
  <span class="d-flex login-layout">
    <div class="left-side-layout d-flex justify-center">
      <img src="@/assets/login_bg.jpg" alt="UNAH-logo" class="login-img" />
    </div>
    <div class="right-side-layout d-flex align-center justify-center">
      <router-view></router-view>
    </div>
  </span>
</template>

<script setup></script>

<style scoped>
.login-layout {
    width: 100%;
  height: 100%;
  align-items: center;
}

.left-side-layout {
  width: 60%;
}

.right-side-layout {
  height: 100%;
  width: 40%;
  background-color: rgb(var(--v-theme-primary-darken-1));
}

.login-img {
  margin-top: 5px;
  max-width: 152%;
}
</style>
