// 全局注册图标组件,再引入到main.ts文件里面去
import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 注册所有图标
export function setupElIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
