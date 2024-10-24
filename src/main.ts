import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from './App.vue'
import setupPlugins from "@/plugins"
import 'virtual:uno.css'
import defaultSettings from './settings';
// console.log(defaultSettings);

// 样式
// src/main.ts
// import 'virtual:svg-icons-register';
// src/main.ts
// import 'uno.css'


const app = createApp(App);
const pinia = createPinia();
app.use(pinia); 
app.use(setupPlugins);
app.mount("#app")