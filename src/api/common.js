import service from '@/unit/request'
//import md5 from 'js-md5'
import Qs from 'qs'

export function login(loginName,pass){
	//let password = md5(pass)
	let postData = {
			"loginName":loginName,
			"password":pass
		}
	return service({
		url: '/login',
		headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
		method: 'post',
		data:Qs.stringify(postData),
	})
}

export function logout(){
	return service({
		url: '/logout',
		method: 'get',
	})
}

export function getinfo(){
	return service({
		url: '/sys-user/info',
		method: 'get',
		//params:{token},
	})
}
//修改密码
export function changePass(postData){
	return service({
		url: '/sys-user/change-password',
		method: 'POST',
		data:postData,
	})
}


export function formatter(id,selectData) {			//格式化下拉列表
	let word = '';
	if(id == null){
		word = '';
	}else{
		if(selectData){
			selectData.forEach(item =>{
				if(item.id == id.toString()){
					word = item.name;
				}
			})
		}
	}
	return word;
}

/*
通用数据
*/
//贷款产品
var appilyType = [{
		id:2,
		name: '企业'
	},{
		id:1,
		name: '个人'
	}]


//还款方式
var returnPayType = [{
		id: '先息后本',
		name: '先息后本'
	},{
		id: '等额本金',
		name: '等额本金'
	},{
		id: '等额本息',
		name: '等额本息'
	},{
		id:'其它',
		name: '其它'
	}]

//产品类型
var productType = [{
		id: 1,
		name: '信用贷'
	},{
		id: 2,
		name: '抵押贷'
	},{
		id: 3,
		name: '供应链'
	},{
		id:4,
		name: '融资租赁'
	},{
		id:5,
		name: '其他'
	}]

//审批层级
var highestLevelType = [{
		id: 1,
		name: '总后台'
	},{
		id: 2,
		name: '一级管理员'
}]

//上下架状态
var status = [{
		id: 1,
		name: '下架'
	},{
		id: 2,
		name: '上架'
}]

//审批类型
var verifyType = [{
		id: 1,
		name: '二级审核'
	},{
		id: 2,
		name: '一级审核'
	},{
		id: 3,
		name: '补录审核'
	},{
		id: 4,
		name: '总后台审核'
	}]

//角色类型
var roleType = [{
		id: 1,
		name: '超级管理员'
	},{
		id: 2,
		name: '一级管理'
	},{
		id: 3,
		name: '二级管理'
	},{
		id: 4,
		name: '业务员'
	}]

//角色类型
var Wposition = [{
		id: 1,
		name: '新手规则'
	},{
		id: 2,
		name: '常见问题'
	},{
		id: 3,
		name: '关于我们'
	}]

//角色类型
var reviewStatus = [{
		id: 1,
		name: '未提交'
	},{
		id: 2,
		name: '待审核'
	},{
		id: 3,
		name: '审核通过'
	},{
		id: 4,
		name: '审核不通过'
	}]

//var imgUpUrl = 'http://refined.iok.la/rongdao/file-operation/upload'
var imgUpUrl = 'http://www.rongdaojingwei.com/rongdao/file-operation/upload'

export {
	appilyType,
	returnPayType,
	productType,
	highestLevelType,
	status,
	verifyType,
	roleType,
	imgUpUrl,
	Wposition,
	reviewStatus,
}
