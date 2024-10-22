<template>
  <div class="login-container">
    <div class="flex-x-between absolute-lt w-full p-2">
      <div class="flex-center">
        <el-image :src="logo" style="width: 30px; height: 30px" />
        <span
          class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1"
        >
          
        </span>
        <el-tag size="small" type="success">
      </div>


    <!-- 登录表单 -->
    <div class="login-content">
        <div class="login-image">
      </div>
      <div class="login-box"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
console.log(logo.value);

</script>
<style scoped></style>

