import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from './App.vue'
import setupPlugins from "@/plugins"
import 'virtual:uno.css'
// 本地SVG图标
import "virtual:svg-icons-register";
import defaultSettings from './settings';
// console.log(defaultSettings);
import router from '@/router';
import "@/styles/index.scss";
// 本地SVG图标
import "virtual:svg-icons-register";

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";



const app = createApp(App);
// const pinia = createPinia();

app.use(router);
// app.use(pinia);
app.use(createPinia());

app.use(setupPlugins);
app.mount("#app")