import type { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

import login from "../views/login/index.vue"
export const constantRoutes:RouteRecordRaw[]=[
    {
        path: "/",
        component: login,
        // meta: { hidden: true },    
      },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });
  
  // 全局注册 router
export function setupRouter(app: App<Element>) {
    app.use(router);
  }
  
/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}
  
  export default router;