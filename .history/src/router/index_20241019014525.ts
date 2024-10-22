import type { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
export const constantRoutes:RouteRecordRaw[]=[
    
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
  
  export default router;