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
  <div>登录页面</div>
  <div class="flex-x-between absolute-lt w-full p-2">
      <div class="flex-center">
        <el-image :src="logo" style="width: 30px; height: 30px" />
 
      </div>

      <div class="flex-center">
        <el-switch
          v-model="isDark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="toggleTheme"
        />
        <lang-select class="ml-2 cursor-pointer" />
      </div>
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
