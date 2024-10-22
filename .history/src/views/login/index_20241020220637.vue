<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <div class="login-content">
        <div class="login-image">
        <el-image :src="loginImage" style="width: 210px; height: 210px" />
      </div>
      <div class="login-box"></div>
    </div>
  </div>
  <div>
    <span class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1">vue3-element-admin</span>
  </div>

</template>

<script>

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
