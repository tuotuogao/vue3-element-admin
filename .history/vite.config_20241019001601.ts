import vue from "@vitejs/plugin-vue";
import { type UserConfig, type ConfigEnv, loadEnv, defineConfig } from "vite";



import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { resolve } from "path";
// import {
//   name,
//   version,
//   engines,
//   dependencies,
//   devDependencies,
// } from "./package.json";

// 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示
// const __APP_INFO__ = {
//   pkg: { name, version, engines, dependencies, devDependencies },
//   buildTimestamp: Date.now(),
// };

const pathSrc = resolve(__dirname, "src");
/**
 * Vite配置 @see https://cn.vitejs.dev/config
 */
// vite.config.js
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          api: "modern-compiler",
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        },
      },
    },
    server: {
      // 主机地址
      host: "0.0.0.0",
      // 端口号
      port: +env.VITE_APP_PORT,
      // 是否自动在浏览器中打开
      open: true,
      proxy: {
        // 代理前缀为 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标真实接口地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    }
  };
});
