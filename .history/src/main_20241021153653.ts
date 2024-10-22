import { createApp } from "vue";
import App from './App.vue'
import setupPlugins from "@/plugins"
import { createPinia } from 'pinia'

// 样式
// src/main.ts
// import 'virtual:svg-icons-register';
// src/main.ts
// import 'uno.css'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(setupPlugins);
app.mount("#app")