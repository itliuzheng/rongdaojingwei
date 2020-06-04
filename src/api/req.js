import service from '@/unit/request'
import Qs from 'qs'

/*
首页 
 * */
//获取统计数据
export function homeStatistics(){
	return service({
		url: '/home-Statistics/tobeProcessed',
		method: 'get',		
	})
}
//获取图表数据
export function homeChart(postData){
	return service({
		url: '/home-Statistics/home-chart',
		method: 'post',
		data: postData,
	})
}

/*
融资相关
*/

//融资申请
export function financingAdd(){
	return service({
		url: '/financing-application/add',
		method: 'post',		
	})
}

//融资申请
export function financingPage(postData){
	return service({
		url: '/financing-application/page',
		method: 'post',		
		data: postData
	})
}

//融资项目审批
export function financingApproval(postData){
	return service({
		url: '/financing-application/approval',
		method: 'post',		
		data: postData
	})
}

//公司部门请求
export function sysOffice(postData){
	return service({
		url: '/sys-office/selection_box',
		method: 'get',		
		params: {
			parentId:postData
		}
	})
}

//产品下拉列表
export function proSelection(){
	return service({
		url: '/product/selection_box',
		method: 'get',				
	})
}

//产品审核记录
export function historyPage(postData){
	return service({
		url: '/application-history/page',
		method: 'post',	
		data: postData
	})
}

//补录待审核列表
export function pendingReview(postData){
	return service({
		url: '/financing-application/pending-review',
		method: 'post',	
		data: postData,
	})
}

//补录待审核列表
export function supplementAuditRecord(postData){
	return service({
		url: '/financing-application/supplement-audit-record',
		method: 'post',	
		data: postData,
	})
}

//补录资料列表
export function supplementList(postData){
	return service({
		url: '/financing-application/supplementary-list',
		method: 'post',	
		data: postData,
	})
}

//补录资料提交
export function supplementSubmit(id){
	let postData = {};
	postData.applyId = id
	return service({
		url: '/financing-application/supplement-submit',
		method: 'post',	
		data: postData,
	})
}

//补录资料保存
export function supplementInformation(postData){
	return service({
		url: '/financing-application/supplementary-information',
		method: 'post',	
		data: postData,
	})
}

//审核通过的(流程彻底走完的)
export function passPage(postData){
	return service({
		url: '/financing-application/pass-page',
		method: 'post',	
		data: postData,
	})
}

//删除审批信息(流程彻底走完的)
export function delPageLog(id){
	return service({
		url: '/financing-application/delete/'+id,
		method: 'post',			
	})
}

/*
产品相关
*/

//新增产品配置
export function productAdd(postData){
	return service({
		url: '/product/add',
		method: 'post',
		data: postData,
	})
}

//产品列表
export function productPage(postData){
	return service({
		url: '/product/page',
		method: 'post',
		data: postData,
	})
}

//产品下架
export function productLower(id){
	return service({
		url: '/product/lower-racks/'+id,
		method: 'post',
		//data: postData,
	})
}

//产品上架
export function productUpper(id){
	return service({
		url: '/product/upper-racks/'+id,
		method: 'post',
		//data: postData,
	})
}

//产品更新
export function productUpdate(postData){
	return service({
		url: '/product/update',
		method: 'post',
		data: postData,
	})
}

//产品删除
export function productDelete(id){
	return service({
		url: '/product/delete/'+id,
		method: 'post',
	})
}


/*
用户相关
*/
/*用户列表*/
export function sysUserPage(postData){
	return service({
		url: '/sys-user/page-user-role-office',
		method: 'post',
		data: postData,
	})
}
/*新增用户*/
export function sysUserAdd(postData){
	return service({
		url: '/sys-user/add',
		method: 'post',
		data: postData,
	})
}
/*删除用户*/
export function sysUserDel(id){
	return service({
		url: '/sys-user/delete/'+id,
		method: 'post',		
	})
}
/*更新用户*/
export function sysUserUpdate(postData){
	return service({
		url: '/sys-user/update',
		method: 'post',
		data: postData,
	})
}

/*获取用户权限*/
export function userPower(postData){
	return service({
		url: '/product/products',
		method: 'post',
		data: postData,
	})
}

/*超管获取全部二级用户*/
export function pageSecondaryAll(postData){
	return service({
		url: '/sys-user/page-secondary-all',
		method: 'post',
		data: postData,
	})
}

/*添加/删除权限*/
export function userPowerAssign(postData){
	if(postData.pids.length > 0){
		postData.pids = postData.pids.join(",")
	}
	
	return service({
		url: '/product/assign-product',
		headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
		method: 'post',
		data: Qs.stringify(postData)
	})
}

/*超管重置一级账户*/
export function resetFirstLevel(postData){
	return service({
		url: '/sys-user/resetFirstLevel',
		method: 'post',
		data: postData,
	})
}

/*
业务员相关
*/
/*查看业务员分页列表*/
export function salesmanPage(postData){
	return service({
		url: '/salesman/page',
		method: 'post',
		data: postData,
	})
}

/*新增业务员*/
export function salesmanAdd(postData){
	return service({
		url: '/salesman/add',
		method: 'post',
		data: postData,
	})
}

/*删除务员*/
export function salesmanDelete(postData){
	return service({
		url: '/salesman/delete',
		method: 'post',
		data: postData,
	})
}

/*修改业务员*/
export function salesmanUpdate(postData){
	return service({
		url: '/salesman/update',
		method: 'post',
		data: postData,
	})
}

/*获取业务员权限*/
export function salesmanPro(postData){
	return service({
		url: '/salesman/products',
		method: 'post',
		data: postData,
	})
}

/*新增/删除业务员权限*/
export function salesmanAssign(postData){
	if(postData.pids.length > 0){
		postData.pids = postData.pids.join(",")
	}
	return service({
		url: '/salesman/assign-product',
		headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
		method: 'post',
		data: Qs.stringify(postData)
	})
}

/*
 移动端管理
 * */
/*banner分页*/
export function bannerPage(postData){
	return service({
		url: '/banner/page',
		method: 'post',
		data: postData,
	})
}
/*banner新增*/
export function bannerAdd(postData){
	return service({
		url: '/banner/add',
		method: 'post',
		data: postData,
	})
}
/*banner新增*/
export function bannerUpdate(postData){
	return service({
		url: '/banner/update',
		method: 'post',
		data: postData,
	})
}
/*banner删除*/
export function bannerDel(postData){
	return service({
		url: '/banner/update',
		method: 'post',
		data: postData,
	})
}

/*文案分页*/
export function copywritPage(){
	return service({
		url: '/copywriting/list',
		method: 'GET',
		//data: postData,
	})
}
/*文案新增*/
export function copywritAdd(postData){
	return service({
		url: '/copywriting/add',
		method: 'post',
		data: postData,
	})
}
/*文案删除*/
export function copywritDel(id){
	return service({
		url: '/copywriting/delete/'+id,
		method: 'post',
		//data: postData,
	})
}
/*文案更新*/
export function copywritUpdate(postData){
	return service({
		url: '/copywriting/update',
		method: 'post',
		data: postData,
	})
}