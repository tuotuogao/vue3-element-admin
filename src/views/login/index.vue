<template>
  <div class="login-container">
    <div class="flex-x-between absolute-lt w-full p-2">
      <div class="flex-center">
        <el-image :src="logo" style="width: 30px; height: 30px" />
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
        <lang-select class="ml-2 cursor-pointer" />
      </div>
    </div>
    <!-- 登录表单 -->
    <div class="login-content">      
      <div class="login-image">
        <el-image :src="loginImage" style="width: 210px; height: 210px" />
      </div>
      <div class="login-box">
        <el-form
          ref="loginFormRef"
          :model="loginData"
          :rules="loginRules"
          class="login-form"
        >
          <h2 class="text-xl font-medium text-center flex-center relative">
            {{ $t("login.login") }}
            <!-- 登录 -->
            <el-dropdown style="position: absolute; right: 0">
              <div class="cursor-pointer">
                <el-icon>
                  <arrow-down></arrow-down>
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="setLoginCredentials('root', '123456')"
                  >
                    超级管理员：root/123456
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="setLoginCredentials('admin', '123456')"
                  >
                    系统管理员：admin/123456
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="setLoginCredentials('test', '123456')"
                  >
                    测试小游客：test/123456
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </h2>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <User />
              </el-icon>
              <el-input
                ref="username"
                v-model="loginData.username"
                :placeholder="$t('login.username')"
                name="username"
                size="large"
                class="h-[48px]"
              ></el-input>
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-tooltip
            :visible="isCapslock"
            :content="$t('login.capsLock')"
            placement="right"
          >
            <el-form-item prop="password">
              <div class="input-wrapper">
                <el-icon class="mx-2">
                  <Lock />
                </el-icon>
                <el-input
                  v-model="loginData.password"
                  :placeholder="$t('login.password')"
                  type="password"
                  name="password"
                  size="large"
                  class="h-[48px] pr-2"
                  show-password
                  @keyup="checkCapslock"
                  @keyup.enter="handleLoginSubmit"

                />
              </div>
            </el-form-item>
          </el-tooltip>
          <!-- 验证码 -->
          <el-form-item>
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
              v-model="loginData.captchaCode"
                auto-complete="off"
                size="large"
                :placeholder="$t('login.captchaCode')"
                class="flex-1"
                @keyup.enter="handleLoginSubmit"

              />
              <el-image
                :src="captchaBase64"
                class="captcha-image"
                @click="getCaptcha"
              />
            </div>
          </el-form-item>
          <div class="flex-x-between w-full py-1">
            <el-checkbox>
              {{ $t("login.rememberMe") }}
            </el-checkbox>

            <el-link type="primary" href="/forget-password">
              {{ $t("login.forgetPassword") }}
            </el-link>
          </div>

          
            <!-- 登录按钮 -->
            <el-button
              :loading="loading"
              type="primary"
              size="large"
              class="w-full"
              @click.prevent="handleLoginSubmit"
            >
              {{ $t("login.login") }}
            </el-button>
          

          <el-divider>
            <span class="text-12px">{{ $t("login.otherLoginMethods") }}</span>
          </el-divider>

          <!-- 第三方登录 -->
          <div class="flex-x-center text-lg color-gray-5">
            <svg-icon icon-class="wechat" class="cursor-pointer" />
            <svg-icon icon-class="qq" class="cursor-pointer ml-5" />
            <svg-icon icon-class="github" class="cursor-pointer ml-5" />
            <svg-icon icon-class="gitee" class="cursor-pointer ml-5" />
          </div>
        </el-form>
      </div>
    </div>
    <!-- ICP备案 -->
    <div class="absolute bottom-0 w-full text-center text-12px">
      <p>
        Copyright © 2021 - 2024 youlai.tech All Rights Reserved.
        <a
          href="http://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          皖ICP备20006496号-2
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultSettings from "@/settings";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ThemeEnum } from "@/enums/ThemeEnum";
import "../../styles/login.scss";
import AuthAPI, { type LoginData } from "@/api/auth";
// 内部依赖
import { useI18n } from "vue-i18n";
import { useSettingsStore, useUserStore } from "@/store";
import router from "@/router";
import { LocationQuery, useRoute } from "vue-router";
const userStore = useUserStore();

const { t } = useI18n();
// 是否大写锁定
const isCapslock = ref(false);
// 验证码图片Base64字符串
const captchaBase64 = ref();
const numberValidateForm = reactive({
  age: "",
});

// const submitForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.validate((valid) => {
//     if (valid) {
//       console.log("submit!");
//     } else {
//       console.log("error submit!");
//     }
//   });
// };

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };
// const formRef = ref<FormInstance>();

const logo = ref(new URL("../../assets/logo.png", import.meta.url).href);
const loginImage = ref(
  new URL("../assets/../../assets/images/login-image.svg", import.meta.url).href
);
// 使用导入的依赖和库
// const userStore = useUserStore();
const settingsStore = useSettingsStore();
const route = useRoute();
//
const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
  captchaKey: "",
  captchaCode: "",
});
// 按钮 loading 状态
const loading = ref(false);

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
const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username.required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      {
        min: 6,
        message: t("login.message.password.min"),
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode.required"),
      },
    ],
  };
});
/** 获取验证码 */
function getCaptcha() {
  AuthAPI.getCaptcha().then((data) => {
    console.log(data)
    loginData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}
// console.log(captchaBase64.value)
/** 登录表单提交 */
function handleLoginSubmit() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore.login(loginData.value)
        .then(() => {
          const { path, queryParams } = parseRedirect();
          router.push({ path: path, query: queryParams });
        })
        .catch(() => {
          getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}
/** 解析 redirect 字符串 为 path 和  queryParams */
function parseRedirect(): {
  path: string;
  queryParams: Record<string, string>;
} {
  const query: LocationQuery = route.query;
  const redirect = (query.redirect as string) ?? "/";

  const url = new URL(redirect, window.location.origin);
  const path = url.pathname;
  const queryParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { path, queryParams };
}
/** 设置登录凭证 */
const setLoginCredentials = (username: string, password: string) => {
  loginData.value.username = username;
  loginData.value.password = password;
};
/** 检查输入大小写 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

onMounted(() => {
  getCaptcha();
});
</script>
<style lang="scss" scoped></style>

