<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'LoginView',
    setup() {
      const username = ref('');
      const password = ref('');
  
      const handleLogin = () => {
        // 在这里处理登录逻辑
        console.log('Username:', username.value);
        console.log('Password:', password.value);
        // 可以在这里进行表单验证和 API 请求
      };
  
      return {
        username,
        password,
        handleLogin,
      };
    },
  });
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-container h1 {
    text-align: center;
  }
  
  .login-container form div {
    margin-bottom: 10px;
  }
  
  .login-container label {
    display: block;
    margin-bottom: 5px;
  }
  
  .login-container input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .login-container button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-container button:hover {
    background-color: #45a049;
  }
  </style>