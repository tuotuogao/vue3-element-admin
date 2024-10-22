<template>
  <div class="login-container">
    <div class="flex-x-between absolute-lt w-full p-2">
      <div class="flex-center">
        <el-image :src="logo" style="width: 30px; height: 30px" />
        <span
          class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1"
        >
        </span>
        <span
          class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mx-1"
        >
          {{ defaultSettings.title }}
        </span>
        <el-tag size="small" type="success">
          {{ defaultSettings.version }}
        </el-tag>
      </div>
    </div>

    <!-- 登录表单 -->
    <div class="login-content">
      <div class="login-image">
        <el-image :src="loginImage" style="width: 210px; height: 210px" />
      </div>
      <div class="login-box">
        <el-form ref="loginFormRef" :model="loginData"
          :rules="loginRules"
          class="login-form"> </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultSettings from "@/settings";
import { ref } from "vue";
import type { FormInstance } from "element-plus";

const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
const loginImage = ref(
  new URL("../assets/../../assets/images/login-image.svg", import.meta.url).href
);
// 登录表单ref
const loginFormRef = ref<FormInstance>();
</script>
<style scoped></style>
