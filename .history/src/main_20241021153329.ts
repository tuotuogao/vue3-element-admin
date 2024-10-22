import { createApp } from "vue";
import App from './App.vue'
import setupPlugins from "@/plugins"
import 'virtual:uno.css'
import defaultSettings from './settings';
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(setupPlugins);
app.mount("#app")