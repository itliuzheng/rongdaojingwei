import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getTokenStorage} from '@/api/cookies'
import router from '@/router'

//import {baseUrl} from '@/unit/env'
//创建axios实例
const service = axios.create({
	baseURL: process.env.BASE_URL,  // api 的 base_url
	timeout: 50000,
})

// request拦截器
service.interceptors.request.use(
	config => {		
		if(store.state.token){
			//config.headers['X-token'] = getTokenStorage()
			config.headers.common["Authorization"] = getTokenStorage();
		}
		return config;
	},
	error => {
		// Do something with request error
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		/**
		 * code为非0是抛错 可结合自己业务进行修改
		 */

		const res = response.data;
		if(res.code != 200){
			Message({
				message:res.msg,
				type:'error',
				duration:5*1000,
			})
			//各种错误类型  50008:非法的token; 50012:其他客户端登录了;  401:Token 过期了;  根据需求更改
			if(res.code === 50008 || res.code === 50012 || res.code === 401){
				MessageBox.confirm(
					'你已被登出，可以取消继续留在该页面，或者重新登录',
					'确定登出',
					{
						confirmButtonText:'重新登录',
						cancelButtonText: '取消',
						type:'warning'
					}
				).then(() => {
					store.dispatch('FedLogOut').then(() => {
						// location.reload()		// 为了重新实例化vue-router对象 避免bug
						router.push({path: '/Login' });
					})
				})
			}
			return Promise.reject(res)
		}else{		
			return response.data
		}
	},
	error => {
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)
export default service
