<template>
	<div class="boxShadow">
		<el-row :gutter="20">
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.realName" placeholder="业务员姓名"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.mobile" placeholder="手机号"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.email" placeholder="邮箱"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-select v-model="filterData.officeId" placeholder="所属机构">
					<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="device === 'desktop'?'8':'24'">
				<el-button type="primary" @click="queryUser">查询</el-button>
				<el-button type="success" @click="resetUser">重置</el-button>
			</el-col>
		</el-row>
		<div v-if="device === 'desktop'">
			<el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
				<el-table-column prop="coding" label="识别码" width="120">
				</el-table-column>
				<el-table-column prop="name" label="业务员姓名" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="mobile" label="手机号" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="officeName" label="所属机构" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="" label="操作" show-overflow-tooltip width="" fixed="right">
					<template slot-scope="scope">
						<el-button @click.native.prevent="setPower(scope.row)" type="text" size="small">
							设置权限
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.pageNum"
			 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total" class='zIndex9'>
			</el-pagination>
		</div>
		<template v-else>

			<power-index-scroll :tableData="tableData" :key="'power'"
						 @refreshScroll="refreshLoad"
						 @loadScroll="loadStart"
						 @setPower="setPower"></power-index-scroll>

		</template>

		<el-dialog title="权限" :visible.sync="dialogVisible" :width="device === 'desktop'?'70%':'100%'" :before-close="handleClose">
			<el-form :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="addFromData">
				<el-row :gutter="20">
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="业务员姓名">
							<el-input v-model="userFormData.name" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="手机号">
							<el-input v-model="userFormData.mobile" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="邮箱">
							<el-input v-model="userFormData.email" disabled></el-input>
						</el-form-item>
					</el-col>				
					<el-col :span="24">
						<el-divider content-position="left">产品权限信息</el-divider>
					</el-col>
					<el-col :span="24">
						<el-row :gutter="20">
							<el-col :span="device === 'desktop'?'5':'24'">
								<el-input v-model="productFilterData.name" placeholder="产品名称"></el-input>
							</el-col>
							<el-col :span="device === 'desktop'?'9':'24'">
								<el-button type="primary" @click="queryPro">查询</el-button>								
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="24">
						<el-table :data="productTableData" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChangePro" border>
							<el-table-column type="selection" :width="device === 'desktop'?'55':''"></el-table-column>
							<el-table-column prop="id" label="产品ID" :width="device === 'desktop'?'120':''">
							</el-table-column>
							<el-table-column prop="name" label="产品名称" show-overflow-tooltip width="">
							</el-table-column>
							<el-table-column prop="provider" label="产品提供方" show-overflow-tooltip width="">
							</el-table-column>
							<el-table-column prop="" label="额度范围（万）" show-overflow-tooltip :width="device === 'desktop'?'':'120'">
								<template slot-scope="scope">{{ scope.row.amountLower }}-{{ scope.row.amountUpper }}</template>
							</el-table-column>
							<el-table-column prop="" label="期限范围（月）" show-overflow-tooltip width="">
								<template slot-scope="scope">{{ scope.row.deadlineLower }}-{{ scope.row.deadlineUpper }}</template>
							</el-table-column>
							<el-table-column prop="" label="利率范围(%/月)" show-overflow-tooltip width="">
								<template slot-scope="scope">{{ scope.row.rateLower }}-{{ scope.row.rateUpper }}</template>
							</el-table-column>
						</el-table>
						<el-pagination  v-if="device === 'desktop'" @size-change="sizeChangePro" @current-change="currentChangePro" :current-page="productFilterData.pageNum"
						 :page-sizes="[10, 15, 20, 30]" :page-size="productFilterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
						 :total="proListtotal" class='zIndex9'>
						</el-pagination>
						<el-pagination  v-else  @current-change="currentChangePro" :current-page="productFilterData.pageNum"
						 :page-sizes="[10, 15, 20, 30]" :page-size="productFilterData.pageSize" layout="total, prev, pager, next, jumper"
						 :total="proListtotal" class='zIndex9'>
						</el-pagination>
					</el-col>
					
					<!-- 权限列表 -->
					<el-col :span="24">
						<el-row :gutter="20">
							<el-divider content-position="left">权限列表</el-divider>
						</el-row>
						<el-button type="success" @click="addToPower">添加列表</el-button>
						<el-button type="danger" @click="delToPower">移除列表</el-button>
						<el-table :data="powerTableData" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChangePower" border>
							<el-table-column type="selection" :width="device === 'desktop'?'55':''"></el-table-column>
							<el-table-column prop="id" label="产品ID" :width="device === 'desktop'?'120':''">
							</el-table-column>
							<el-table-column prop="name" label="产品名称" show-overflow-tooltip width="">
							</el-table-column>
							<el-table-column prop="provider" label="产品提供方" show-overflow-tooltip width="">
							</el-table-column>
							<el-table-column prop="" label="额度范围（万）" show-overflow-tooltip :width="device === 'desktop'?'':'120'">
								<template slot-scope="scope">{{ scope.row.amountLower }}-{{ scope.row.amountUpper }}</template>
							</el-table-column>
							<el-table-column prop="" label="期限范围（月）" show-overflow-tooltip width="">
								<template slot-scope="scope">{{ scope.row.deadlineLower }}-{{ scope.row.deadlineUpper }}</template>
							</el-table-column>
							<el-table-column prop="" label="利率范围(%/月)" show-overflow-tooltip width="">
								<template slot-scope="scope">{{ scope.row.rateLower }}-{{ scope.row.rateUpper }}</template>
							</el-table-column>
						</el-table>
						<el-pagination  v-if="device === 'desktop'"  @size-change="sizeChangePower" @current-change="currentChangePower" :current-page="powerFilterData.pageNum"
						 :page-sizes="[10, 15, 20, 30]" :page-size="powerFilterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
						 :total="powerListtotal" class='zIndex9'>
						</el-pagination>
						<el-pagination  v-else  @current-change="currentChangePower" :current-page="powerFilterData.pageNum"
						 :page-sizes="[10, 15, 20, 30]" :page-size="powerFilterData.pageSize" layout="total, prev, pager, next, jumper"
						 :total="powerListtotal" class='zIndex9'>
						</el-pagination>
					</el-col>
					<el-col :span="24">
						<el-button type="primary" @click="dialogVisible=false">确定</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Bus from '@/unit/bus.js'
	import { salesmanPage, sysOffice, salesmanPro, salesmanAssign } from '@/api/req'
	import { roleType, formatter } from '@/api/common'
    import PowerIndexScroll from "./scrolls/powerIndexScroll";
	export default {
		components: {
            PowerIndexScroll
			//loadSet
		},
		data() {
			return {
				roleType: roleType,
				department: [],
				tableData: [], //表格数据
				powerTableData: [],//已有权限列表
				productTableData: [],//产品列表
				filterData: { //请求条件
					realName: '', //业务员姓名
					mobile: '', //手机号
					email: '', //邮箱
					officeId: null, //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				productFilterData: { //请求条件
					name: '', //产品名称
					status: 0,
					uid: '',
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				powerFilterData: { //请求条件
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					status: 1,
					uid: '',
				},
				userFormData: [],
				total: null, //总条数
				proListtotal: null, //总条数
				powerListtotal: null, //总条数
				dialogVisible: false,
				labelPosition: 'right',		
				addDelPower: {
					mark: 0,//0删除1添加
					pids: [],//选中的列表数组
					uid: '',
				}
			}
		},
		created() {
			this.sendReqUser();
			this.getOffice();
		},
		methods: {
			handleSizeChange(val) {
				this.filterData.pageSize = val
				this.sendReqUser();
			},
			handleCurrentChange(val) {
				this.filterData.pageNum = val
				this.sendReqUser();
			},
			sizeChangePro(val){
				this.productFilterData.pageSize = val
				this.sendReqPro();
			},
			currentChangePro(val){
				this.productFilterData.pageNum = val
				this.sendReqPro();
			},
			sizeChangePower(val){
				this.powerFilterData.pageSize = val
				this.sendReqPower();
			},
			currentChangePower(val){
				this.powerFilterData.pageNum = val;
				this.sendReqPower();
			},
			selectionChangePro(value) {
				let arr = [];
				value.map(function(item){
					arr.push(item.id)
				});
				this.addDelPower.pids = arr;
			},		
			selectionChangePower(value) {
				let arr = [];
				value.map(function(item){
					arr.push(item.id)
				});
				this.addDelPower.pids = arr;
			},
			refreshLoad() {
				this.filterData.pageNum = 1;
				this.sendReq();
			},
			loadStart() {
				if(this.noMore){
					Bus.$emit('loadEnd',this.noMore);
					return ;
				}
				this.filterData.pageNum ++;
				this.sendReq();
			},
			sendReqUser() {
				var _this = this;
				salesmanPage(this.filterData).then(res => {
					if(this.device === 'mobile'){
						if(_this.filterData.pageNum == 1){
							_this.$set(_this,'tableData',res.data.records);
							Bus.$emit('refreshEnd');
						}else{
							let totalData = _this.tableData.concat(res.data.records);
							_this.$set(_this,'tableData',totalData);
							Bus.$emit('loadEnd',false);
						}
						this.total = res.data.total;
					}else{
						this.tableData = res.data.records;
						this.total = res.data.total;
					}
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			queryUser() {
				this.sendReqUser();
			},
			resetUser() {
				this.filterData = {
					realName: '', //业务员姓名
					mobile: '', //手机号
					email: '', //邮箱
					officeId: null, //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				}

				this.sendReqUser();
			},
			sendReqPro() {				
				salesmanPro(this.productFilterData).then(res => {
					this.productTableData = res.data.records;
					this.proListtotal = res.data.total;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			sendReqPower() {
				salesmanPro(this.powerFilterData).then(res => {
					this.powerTableData = res.data.records;
					this.powerListtotal = res.data.total;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			queryPro() {
				this.sendReqPro();
			},
			getOffice(){				
				sysOffice(0).then(res => {
					this.department = res.data;					
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			setPower(scope){
				this.dialogVisible = true;
				this.userFormData = scope;
				this.powerFilterData.uid = scope.id;
				this.productFilterData.uid = scope.id;
				this.addDelPower.uid = scope.id;
				this.sendReqPower();
				this.sendReqPro();
			},
			addToPower(){
				this.addDelPower.mark = 1;
				if(this.addDelPower.pids.length > 0){
					salesmanAssign(this.addDelPower).then(res => {
						this.sendReqPower();
						this.sendReqPro();
					}).catch(res => {
						this.$message.error(res.msg)
					})
				}				
			},
			delToPower(){
				this.addDelPower.mark = 0;
				if(this.addDelPower.pids.length > 0){
					salesmanAssign(this.addDelPower).then(res => {
						this.sendReqPower();
						this.sendReqPro();
					}).catch(res => {
						this.$message.error(res.msg)
					})
				}				
			},
		},
		computed:{
			device() {return this.$store.state.device;},
			noMore () {return this.total <= this.tableData.length;}
		}
	}
</script>

<style scoped="scoped">
	.el-col {
		margin-bottom: 20px;
	}

	.el-dialog .el-input,.el-dialog .el-select {
		width:200px
	}
</style>
