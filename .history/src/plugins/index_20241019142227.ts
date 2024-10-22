import type { App } from "vue";
import { setupRouter } from "@/router";
import { install } from "element-plus";
export default {
    install(app: App<Element>) {
      // 路由(router)
      setupRouter(app);
      // 国际化
      setupI18n(app);
      // Element-plus图标
      setupElIcons(app);
    },
  };