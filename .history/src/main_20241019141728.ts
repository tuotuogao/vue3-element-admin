import { createApp } from 'vue'
import App from './App.vue'
import setupPlugins from "@/plugins"
import router from './router'

// 样式
// src/main.ts
// import 'virtual:svg-icons-register';
// src/main.ts
// import 'uno.css'


const app = createApp(App);
app.use(setupPlugins);
app.mount("#app")