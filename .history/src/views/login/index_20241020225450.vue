<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <div class="login-content">
        <div class="login-image">
      </div>
      <div class="login-box"></div>
    </div>
  </div>
  <div>
    
    <el-image :src="logo" style="width: 30px; height: 30px" />
    <span class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1">vue3-element-admin</span>
  </div>

</template>

<script>

import { ref,defineExpose } from 'vue';
const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
console.log(logo.value);
<el-button>ddssd</el-button>

</script>
<style scoped></style>
