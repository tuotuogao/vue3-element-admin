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
console.log("logo");

import { log } from 'console';
import { ref } from 'vue';
const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
export default {
  components: {},
  props: {},
  setup(props, context) {},
  mounted() {
    console.log("1");
    
  },
};
</script>
<style scoped></style>
