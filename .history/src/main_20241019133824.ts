import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// src/main.ts
// import 'virtual:svg-icons-register';
// src/main.ts
// import 'uno.css'


const app = createApp(App);
app.use(router)/*  */
app.mount("#app")