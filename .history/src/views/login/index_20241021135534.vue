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
        <el-form
          ref="loginFormRef"
        
          class="login-form"
        >
          <h2 class="text-xl font-medium text-center flex-center relative">
            {{ $t("login.login") }}
            <el-dropdown style="position: absolute; right: 0">
              <div class="cursor-pointer">
                <el-icon>
                  <arrow-down />
                </el-icon>
              </div>
       
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
               
                :placeholder="$t('login.username')"
                name="username"
                size="large"
                class="h-[48px]"
              />
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-tooltip
            
            :content="$t('login.capsLock')"
            placement="right"
          >
            <el-form-item prop="password">
              <div class="input-wrapper">
                <el-icon class="mx-2">
                  <Lock />
                </el-icon>
                <el-input
                 
                  :placeholder="$t('login.password')"
                  type="password"
                  name="password"
                  size="large"
                  class="h-[48px] pr-2"
                  show-password
                 
                />
              </div>
            </el-form-item>
          </el-tooltip>

          <!-- 验证码 -->
          <el-form-item prop="captchaCode">
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
               
                auto-complete="off"
                size="large"
                class="flex-1"
                :placeholder="$t('login.captchaCode')"
               
              />

              <el-image
                
                class="captcha-image"
      
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
