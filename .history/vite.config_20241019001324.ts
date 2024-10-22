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
export default {
  // 配置选项
}