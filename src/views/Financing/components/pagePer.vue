<template>
	<div v-if="device === 'desktop'" :key="'pc'">
		<el-row :gutter="20">
			<el-col :span="4">
				<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="filterData.manageName" placeholder="所属客户经理"></el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="filterData.name" placeholder="姓名"></el-input>
			</el-col>
			<el-col :span="4">
				<el-select v-model="filterData.industry" placeholder="职业">
					<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select v-model="filterData.productId" placeholder="贷款产品">
					<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-input v-model="filterData.amount" placeholder="申请额度(万)"></el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="filterData.mobile" placeholder="联系方式"></el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="filterData.registerAddress" placeholder="户籍"></el-input>
			</el-col>
			<el-col :span="6">
				<el-date-picker
				  	v-model="filterData.applyDate"
				  	type="date"
				  	placeholder="申请时间"
				   	value-format="timestamp">
				</el-date-picker>
			</el-col>
			<el-col :span="4" v-if="userRole!='second'">
				<el-select v-model="filterData.dept" placeholder="请选择部门">
					<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="success" @click="reset">重置</el-button>
			</el-col>
		</el-row>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
			<el-table-column prop="number" label="融资编号" width="150">
			</el-table-column>
			<el-table-column prop="officeName" label="所属部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
			</el-table-column>
			<el-table-column prop="manageName" label="所属客户经理" show-overflow-tooltip width="120">
			</el-table-column>
			<el-table-column prop="name" label="姓名" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
			</el-table-column>
			<el-table-column prop="registerAddress" label="户籍" show-overflow-tooltip width="120">
			</el-table-column>
			<el-table-column prop="industry" label="职业" show-overflow-tooltip width="120"> <!-- :formatter="formatterInd" -->
			</el-table-column>
			<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
			</el-table-column>
			<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"><!-- :formatter='formatterPro' -->
			</el-table-column>
			<el-table-column prop="amount" label="申请额度（万）" show-overflow-tooltip width="120">
			</el-table-column>
			<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
			</el-table-column>
			<el-table-column prop="deadline" label="申请期限（月）" show-overflow-tooltip width="120">
			</el-table-column>							
			<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
				<template slot-scope="scope">
					<el-button @click.native.prevent="check(scope.row)" type="text" size="small">
						查看
					</el-button>
					<el-button @click.native.prevent="review(scope.row)" type="text" size="small" v-if='reviewButton'>
						审核
					</el-button>
					<el-button @click.native.prevent="reviewLog(scope.row)" type="text" size="small" v-if='reviewLogButton'>
						查看审核记录
					</el-button>
					<el-button @click.native.prevent="deleteLog(scope.row)" type="text" size="small" v-if='deleteLogButton'>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.pageNum"
		 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
		 :total="total" class='zIndex9'>
		</el-pagination>		
	</div>
	<div v-else :key="'mobile'">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
			</el-col>
			<el-col :span="12">
				<el-input v-model="filterData.manageName" placeholder="所属客户经理"></el-input>
			</el-col>
			<el-col :span="12">
				<el-input v-model="filterData.name" placeholder="姓名"></el-input>
			</el-col>
			<el-col :span="12">
				<el-select v-model="filterData.industry" placeholder="职业">
					<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				<el-select v-model="filterData.productId" placeholder="贷款产品">
					<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				<el-input v-model="filterData.amount" placeholder="申请额度(万)"></el-input>
			</el-col>
			<el-col :span="12">
				<el-input v-model="filterData.mobile" placeholder="联系方式"></el-input>
			</el-col>
			<el-col :span="12">
				<el-input v-model="filterData.registerAddress" placeholder="户籍"></el-input>
			</el-col>
			<el-col :span="12">
				<el-date-picker style="width: 100%;"
				  	v-model="filterData.applyDate"
				  	type="date"
				  	placeholder="申请时间"
				   	value-format="timestamp">
				</el-date-picker>
			</el-col>
			<el-col :span="12" v-if="userRole!='second'">
				<el-select v-model="filterData.dept" placeholder="请选择部门">
					<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="24">
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="success" @click="reset">重置</el-button>
			</el-col>
		</el-row>

		<div class="infinite-list" ref="infiniteBox" style="overflow:auto">
			<el-card v-infinite-scroll="load" :infinite-scroll-immediate="false"
					 :infinite-scroll-disabled="disabled"
					 infinite-scroll-distance="1"
					 class="box-card" v-for="(item,index) in tableData" :key="item.number">
				<div slot="header" class="clearfix">
					<el-button @click.native.prevent="check(item)" type="text" size="small">
						查看
					</el-button>
					<el-button @click.native.prevent="review(item)" type="text" size="small" v-if='reviewButton'>
						审核
					</el-button>
					<el-button @click.native.prevent="reviewLog(item)" type="text" size="small" v-if='reviewLogButton'>
						查看审核记录
					</el-button>
					<el-button @click.native.prevent="deleteLog(item)" type="text" size="small" v-if='deleteLogButton'>
						删除
					</el-button>
				</div>
				<el-row :gutter="20">
					<el-col :span="24" class="clearfix">
						<p class="fl">融资编号:</p>
						<p class="fr">{{item.number}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" v-if="userRole!='second'">
						<p class="fl">所属部门:</p>
						<p class="fr">{{item.officeName}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">所属客户经理:</p>
						<p class="fr">{{item.manageName}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">姓名:</p>
						<p class="fr">{{item.name}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">联系方式:</p>
						<p class="fr">{{item.mobile}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">户籍:</p>
						<p class="fr">{{item.registerAddress}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">职业:</p>
						<p class="fr">{{item.industry}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">申请时间:</p>
						<p class="fr">{{item.applyDate}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">贷款产品:</p>
						<p class="fr">{{item.productName}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">申请额度（万）:</p>
						<p class="fr">{{item.amount}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">贷款用途:</p>
						<p class="fr">{{item.useFunds}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">申请期限（月）:</p>
						<p class="fr">{{item.deadline}}</p>
					</el-col>
				</el-row>
			</el-card>

			<p v-if="loading">加载中...</p>
			<p v-if="tableData.length == 0">暂无数据</p>
			<template v-else>
				<p v-if="noMore">没有更多了</p>
			</template>
		</div>

	</div>
</template>

<script>
	import {financingPage, sysOffice, proSelection, delPageLog } from '@/api/req'	
	import { productType, formatter } from '@/api/common'
	import job from '@/unit/job'
	export default {
		name: 'componentPage',
		props:['role', 'start', 'status', 'level', 'reviewButton', 'reviewLogButton', 'menuIndex','deleteLogButton'],
		computed: {
			_role: function (){
				return this.role;
			},
			_start: function(){
				return this.start;
			},
			_status: function(){
				return this.status;
			},
			_level: function(){
				return this.level;
			},
			_menuIndex: function(){
				return this.menuIndex;
			},
			device() {return this.$store.state.device;},
			noMore () {return this.total <= this.tableData.length;},
			disabled () {return this.loading || this.noMore}
		},
		data() {
			return {
			    loading: false,
				tableData: [], //表格数据
				productType: productType,
				department:[],//部门可选数据
				proSelectData:'',//产品可选数据
				job: job,//行业职业
				userRole:'',
				filterData: { //请求条件
					number: '', //融资编号
					manageName: '', //所属客户经理
					name: '', //姓名
					industry: '', //职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					registerAddress: "", //户籍
					deadline: "", //申请期限（月）
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					status: null,
					startType: null,
					level: null,
					menuIndex: null,
				},
				total: null, //总条数
				labelPosition: 'right',				
			}
		},
		created() {
			this.sendReq();
			this.getOffice();
			this.getProSelection();
			//console.log(this._level)
			this.userRole = this._role;
			this.filterData.status = this._status;
			this.filterData.startType = this._start;
			this.filterData.level = this._level;
			this.filterData.menuIndex = this._menuIndex;
			if(this.userRole === 'super'){
				this.$set(this.filterData,'highestLevel',1)
			}
		},
		methods: {
			handleSizeChange(val) {
				this.filterData.pageSize = val
				this.sendReq();
			},
			handleCurrentChange(val) {
				this.filterData.pageNum = val
				this.sendReq();
			},
			handleChange(value) {
			},
			formatterPro(row, column){
				return formatter(row.productId,this.proSelectData)
			},
			formatterInd(row, column){
				return formatter(row.industry,job)
			},
			getOffice(){
				sysOffice().then(res => {
					this.department = res.data;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			getProSelection(){
				proSelection().then(res => {
					this.proSelectData = res.data;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			load() {
			    this.loading = true;
				this.filterData.pageNum ++;
				this.sendReq();
			},
			sendReq() {
				//console.log(this.filterData)
				financingPage(this.filterData).then(res => {

					if(this.device === 'mobile'){
						this.loading = false;
						if(this.filterData.pageNum == 1){
						    this.$set(this,'tableData',res.data.records);
						}else{
						    this.$set(this,'tableData',this.tableData.concat(res.data.records));
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
			query() {				
				this.sendReq();
			},
			reset() {
				this.filterData = {
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: "", //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10 ,//每页条数
					status : null,
					startType :null,
					level: null,
					menuIndex: null,
				}
				this.filterData.status = this._status;
				this.filterData.startType = this._start;
				this.filterData.level = this._level;
				this.filterData.menuIndex = this._menuIndex;
				if(this.userRole === 'super'){
					this.$set(this.filterData,'highestLevel',1)
				}

				this.$set(this,'tableData',[]);
				this.$refs.infiniteBox.scrollTop=0;
				this.sendReq();
			},
			check(row){
				this.$emit('chakan',row)
			},
			review(row){
				this.$emit('shenhe',row)
			},
			reviewLog(row){
				this.$emit('shenheLog',row)
			},
			
			deleteLog(row) {
				delPageLog(row.id).then(res => {
					this.$message.success(res.msg);
					this.sendReq();
				}).catch(err => {
					this.$message.error(err.msg);
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-col {
		margin-bottom: 20px;
	}
	.el-dialog .el-col {
		margin-bottom: 0;
	}
	.el-dialog .el-input,.el-dialog .el-select {
		width:200px
	}
</style>
