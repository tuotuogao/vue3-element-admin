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
      <div class="flex-center">
        <el-switch
          v-model="isDark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="toggleTheme"
        />
      </div>
    </div>

    <!-- 登录表单 -->
    <div class="login-content">
      <div class="login-image">
        <el-image :src="loginImage" style="width: 200px; height: 200px" />
      </div>
      <div class="login-box">
        <el-form ref="loginFormRef" class="login-form">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <User />
              </el-icon>
              <el-input ref="username" size="large" class="h-[48px]"></el-input>
            </div>
          </el-form-item>
          <!-- 密码 -->
          <el-tooltip
           
            placement="right"
          >
          <el-form-item prop="password">
              <div class="input-wrapper">
                <el-icon class="mx-2">
                  <Lock />
                </el-icon>
                <el-input
               
                  type="password"
                  name="password"
                  size="large"
                  class="h-[48px] pr-2"
                  show-password
                />
              </div>
            </el-form-item>
            ></el-tooltip
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultSettings from "@/settings";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ThemeEnum } from "@/enums/ThemeEnum";

const numberValidateForm = reactive({
  age: "",
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const formRef = ref<FormInstance>();

// 内部依赖
import { useSettingsStore } from "@/store";
const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
const loginImage = ref(
  new URL("../assets/../../assets/images/login-image.svg", import.meta.url).href
);
// 使用导入的依赖和库
// const userStore = useUserStore();
const settingsStore = useSettingsStore();
const route = useRoute();
// 登录表单ref
const loginFormRef = ref<FormInstance>();
// 是否显示暗黑模式
const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
/** 主题切换 */
const toggleTheme = () => {
  const newTheme =
    settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};
</script>
<style scoped lang="ts"></style>
