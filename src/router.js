import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import Layout from "@/views/layout/Layout";
import Second from "@/views/layout/components/Second"

export const constantRouterMap = [
		{
			path: '/Login',
			name: 'Login',
			component :() => import('@/views/login/index.vue'),
			hidden: true
		},
		{
			path: '/',
			name: 'Home',
			component: Layout,
			redirect: '/home',
			hidden: true,                                                             
			meta: {title: '首页',icon: 'example'},
			children: [{
				path: 'home',
				name: 'home',
				component: () => import('@/views/Home.vue'),
				meta: {title: '首页',icon: 'example'},
			}]
		}
]


//实例化vue的时候只挂载constantRouter
export default new Router({
    //mode: "history",	
	//base: process.env.BASE_URL,
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
	{
		path: '/financing',
		name: 'financing',
		component: Layout,
		redirect: '/financing/waitConfirm',
		meta: {title: '项目管理', icon: 'el-iconrongzirongquan01'},
		children: [{
			path: 'waitConfirm',
			name: 'waitConfirm',
			component: () => import('@/views/Financing/waitConfirm.vue'),
			meta: {title: '待审核项目', icon: 'el-iconshenhe',role:['super','first','second']}
		},{
			path: 'auditLog',
			name: 'auditLog',
			component: () => import('@/views/Financing/auditLog.vue'),
			meta: {title: '项目审核记录', icon: 'el-iconrongziguanli',role:['super','first','second']}
		},{
			path: 'auditPass',
			name: 'auditPass',
			component: () => import('@/views/Financing/auditPass.vue'),
			meta: {title: '项目审核通过', icon: 'el-iconwoyaorongzi',role:['first','second']}
		},{
			path: 'btMaterial',
			name: 'btMaterial',
			component: () => import('@/views/Financing/btMaterial.vue'),
			meta: {title: '补录申请材料', icon: 'el-iconrzxm',role:['first','second']}
		},{
			path: 'backTracking',
			name: 'backTracking',
			component: () => import('@/views/Financing/backTracking.vue'),
			meta: {title: '补录待审核项目', icon: 'el-iconbulushenhe',role:['first']}
		},{
			path: 'btAuditLog',
			name: 'btAuditLog',
			component: () => import('@/views/Financing/btAuditLog.vue'),
			meta: {title: '补录项目审核记录', icon: 'el-iconrongzijihuasvg',role:['first']}
		},{
			path: 'btAuditPass',
			name: 'btAuditPass',
			component: () => import('@/views/Financing/btAuditPass.vue'),
			meta: {title: '补录项目审核通过', icon: 'el-iconrzxm',role:['first']}
		},{
			path: 'plan',
			name: 'plan',
			component: () => import('@/views/Financing/plan.vue'),
			meta: {title: '审批完成项目', icon: 'el-iconrongzijihuasvg',role:['super','first','second']}
		}]
	},
	{
		path: '/product',
		name: 'product',
		component: Layout,
		redirect: '/product/list',
		alwaysShow: true,
		meta: {title: '产品管理', icon: 'el-iconchanpin', role: ["super","first","second"]},
		children: [{
			path: 'list',
			name: 'list',
			component: () => import("@/views/Product/list.vue"),
			meta: {title: '产品大纲', icon: 'el-iconfuhao-dagangshu', role: ["super","first","second"]}
		},{
			path: 'loadSet',
			name: 'loadSet',
			component: () => import("@/views/Product/loadSet.vue"),
			meta: {title: '产品配置录入', icon: 'el-iconsystemConfigure', role: ["super"]}
		}]
	},
	{
		path: '/salesman',
		name: 'salesman',
		component: Layout,
		alwaysShow: true,
		redirect: '/salesman/index',
		meta: {title: '业务员管理', icon: 'el-iconmanagement', role: ["super","first","second"]},
		children: [{
			path: 'index',
			name: 'index',
			component: () => import("@/views/Salesman/index.vue"),
			meta: {title: '业务员管理', icon: 'el-iconfl-renyuan', role: ["super","first","second"]}
		},{
			path: 'powerIndex',
			name: 'powerIndex',
			component: () => import("@/views/Salesman/powerIndex.vue"),
			meta: {title: '业务员产品权限', icon: 'el-iconquanxian', role: ["first","second"]}
		}]
	},
	{
		path: '/mobile',
		name: 'mobile',
		component: Layout,
		redirect: '/mobile/banner',
		meta: {title: '移动端管理', icon: 'el-iconyidongduan', role: ["first","second"]},
		children: [{
			path: 'banner',
			name: 'banner',
			component: () => import("@/views/Mobile/banner.vue"),
			meta: {title: 'banner管理', icon: 'el-iconbanner', role: ["first","second"]}
		},{
			path: 'copyWriter',
			name: 'copyWriter',
			component: () => import("@/views/Mobile/copyWriter.vue"),
			meta: {title: '平台文案管理', icon: 'el-iconwenan', role: ["first","second"]}
		},/*{
			path: 'agreement',
			name: 'agreement',
			component: () => import("@/views/Mobile/agreement.vue"),
			meta: {title: '平台协议管理', icon: 'el-iconcloud-agreement', role: ["first"]}
		},*/]
	},
	{
		path: '/user',
		name: 'user',
		component: Layout,
		redirect: '/user/userIndex',
		meta: {title: '用户管理', icon: 'el-iconyonghuguanli1', role: ["super","first"]},
		children: [{
			path: 'userIndex',
			name: 'userIndex',
			component: () => import("@/views/User/index.vue"),
			meta: {title: '用户管理', icon: 'el-iconfl-renyuan', role: ["super","first"]}
		},{
			path: 'power',
			name: 'power',
			component: () => import("@/views/User/power.vue"),
			meta: {title: '用户产品权限', icon: 'el-iconquanxian', role: ["super","first"]}
		}]
	},
	{
		path: '/system',
		name: 'system',
		component: Layout,
		redirect: '/system/info',
		meta: {title: '系统管理', icon: 'el-iconxitongguanli', role: ["super","first","second"]},
		children: [{
			path: 'info',
			name: 'info',
			component: () => import("@/views/System/info.vue"),
			meta: {title: '个人信息', icon: 'el-iconyonghuguanli1', role: ["super","first","second"]}
		},{
			path: 'password',
			name: 'password',
			component: () => import("@/views/System/password.vue"),
			meta: {title: '修改密码', icon: 'el-iconxiugaimima', role: ["super","first","second"]}
		}]
	},
	{ path: '*', redirect: '/pages/404', hidden: true }
];

