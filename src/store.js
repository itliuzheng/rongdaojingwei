 import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'
import { asyncRouterMap, constantRouterMap } from '@/router';
import {getTokenStorage, setTokenStorage, removeTokenStorage} from '@/api/cookies'
import { login, logout, getinfo } from '@/api/common'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: getTokenStorage(),
		userInfo:{
			roles: [],
			name: "",
			realName: "",
			mobile: '',
			email: '',
		},
		addRouters: [],
		routers:constantRouterMap,
		sidebar:{
			opened:true,
			withoutAnimation:false,
		},
		siderBar_routers: [],
		device: 'desktop'
	},
	mutations: {
		//设置token
		setToken(state,token) {
			state.token = token;
		},
		//设置用户信息
		setUserInfo(state,userinfo) {
			let roles = [];
			roles[0] = userinfo.englishName
			state.userInfo.roles = roles;
			state.userInfo.name = userinfo.name;
			state.userInfo.realName = userinfo.realName;
			state.userInfo.mobile = userinfo.mobile;
			state.userInfo.email = userinfo.email;
		},
		//设置路由组成
		setRouters(state,routers){
			state.addRouters = routers;
			state.routers = constantRouterMap.concat(routers)
		},

		setNowRouters(state,to){
			// 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
			state.addRouters.forEach(e =>{
				if(e.children && e.children.length){
					if(getNowRouter(e.children,to) === true){
						state.siderBar_routers = e
					}
				}
			})
		},

		//张开关闭菜单栏
		ToggleSideBar: (state) => {
		  state.sidebar.opened = !state.sidebar.opened;
		  state.sidebar.withoutAnimation = false;
		},
		CloseSideBar: (state, withoutAnimation) => {
		  cookies.set('sidebarStatus', 1);
		  state.sidebar.opened = false;
		  state.sidebar.withoutAnimation = withoutAnimation;
		},
		ToggleDevice: (state, device) => {
		  state.device = device;
		}
	},
	actions: {
		//登录
		Login({commit}, loginForm){
			const phoneNum = loginForm.phone.trim();
			return new Promise((resolve, reject) => {
				login(phoneNum,loginForm.password).then(res => {
					setTokenStorage(res.data);
					commit('setToken', res.data)
					resolve()
				}).catch(error =>{
					reject(error)
				})
			})

		},

		//根据token获取用户信息并存储
		GetInfo({commit, state}) {
			return new Promise((resolve, reject) => {
				getinfo().then(res => {
					const data = res.data;
					commit('setUserInfo', data);
					resolve(res)
				}).catch(error =>{
					reject(error)
				})
			})
		},

		//整理当前角色可用的路由
		GeneraterRouters({commit}, data){
			return new Promise(resolve => {
				const {roles} = data;
				let accessedRouters;
				if(roles.indexOf('admin') >= 0){
					accessedRouters = asyncRouterMap;
				}else{
					accessedRouters = filterAsyncRouter(asyncRouterMap,roles)	//参数（动态的路由集合，角色集合）
				}
				commit('setRouters',accessedRouters)
				resolve();
			})
		},

		//获取当前已整理路由
		getNowRouters({commit},data){
			return new Promise(resolve => {
				//date => to
				commit('setNowRouters',data)
				resolve()
			})
		},
		// 前端 登出
		FedLogOut({commit}){
			return new Promise(resolve => {
				commit('setToken','')
				removeTokenStorage();
				resolve();
			})
		}
	}
})

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap,roles){
	const accessedRouters = asyncRouterMap.filter(route => {
		if(hasPermission(roles,route)){
			if(route.children && route.children.length){
				route.children = filterAsyncRouter(route.children, roles)
			}
			return true
		}
		return false
	})
	return accessedRouters
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles,route){		//(角色表，路由表)
	if(route.meta && route.meta.role){
		return roles.some(role => route.meta.role.indexOf(role) >= 0)
	}else {
		return true
	}
}

//获取已经整理好的路由
function getNowRouter(asyncRouterMap, to){
	return asyncRouterMap.some(route => {
      if(to.path.indexOf(route.path) !==-1) {
          return true;
      }
      else if (route.children && route.children.length) { //如果有孩子就遍历孩子
        return  getNowRouter(route.children, to)
      }
  })
}



