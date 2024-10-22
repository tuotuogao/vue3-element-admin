// 导入路由对象
import { createRouter,createWebHistory } from 'vue-router'
// 路径配置 .vue 不可省略
const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/pages/index.vue') //.vue不可省略
	}
]
