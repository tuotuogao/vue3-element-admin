import type { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

export const Layout = () => import("@/Layout/index.vue");

export const constantRoutes:RouteRecordRaw[]=[
    {
      // path是对应的路径，component是相对的组件，name是路由名称
        path: "/redirect",
        component: Layout,
        meta: { hidden: true },
        children:[
          {
            path: "/redirect/:path(.*)",
            // 使用函数导入可以实现路由懒加载，解决首次加载慢的问题
            component: () => import("@/views/redirect/index.vue"),
          },
        ]    
      },
      {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        meta: { hidden: true },
      },
      {
        path:"/",
        name:"/",
        component: Layout,
        redirect: "/dashboard",
        children: [
          {
            path: "dashboard",
            component: () => import("@/views/dashboard/index.vue"),

            name: "Dashboard",
            meta: {
              title: "dashboard",
              icon: "homepage",
              affix: true,
              keepAlive: true,
            },
          },
          {
            path: "401",
            component: () => import("@/views/error/401.vue"),
            meta: { hidden: true },
          },
          {
            path: "404",
            component: () => import("@/views/error/404.vue"),
            meta: { hidden: true },
          },
          // {
          //   path: "profile",
          //   name: "Profile",
          //   component: () => import("@/views/profile/index.vue"),
          //   meta: { title: "个人中心", icon: "user", hidden: true },
          // },
          // {
          //   path: "myNotice",
          //   name: "MyNotice",
          //   component: () => import("@/views/system/notice/my-notice.vue"),
          //   meta: { title: "我的通知", icon: "user", hidden: true },
          // },
        ],
          
      }
    
]
// 创建路由
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