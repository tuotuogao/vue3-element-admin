<template>
    <div>
      <p>我是dashboard页面</p>
      <el-button>我是按钮</el-button>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    console.log('Component mounted');
    console.log('aaaa');
  });
  </script>
  
  <style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }
  </style>