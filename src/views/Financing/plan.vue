<template>	
	<el-tabs type="border-card" v-model="tabName">
		<el-tab-pane name="com" label="企业">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.manageName" placeholder="所属客户经理"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.companyName" placeholder="企业名称"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.industry" placeholder="所属行业/职业">
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.productId" placeholder="贷款产品">
						<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.amount" placeholder="申请额度(万)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.useFunds" placeholder="资金用途"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.deadline" placeholder="申请期限（月）"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'6':'12'">
					<el-date-picker style="width: 100%;"
									v-model="filterData.applyDate"
									type="date"
									placeholder="申请时间"
									value-format="timestamp">
					</el-date-picker>
				</el-col>
				
				<el-col :span="device === 'desktop'?'9':'24'">
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="reset">重置</el-button>
					<!--<el-button type="" @click="piliang">批量提交</el-button>-->
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="selectionChangeCom" style="width: 100%" border>
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="所属部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属客户经理" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="companyName" label="企业名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="industry" label="所属行业" show-overflow-tooltip width="120"><!-- :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"> <!--:formatter='formatterPro'-->
					</el-table-column>
					<el-table-column prop="highestLevel" label="审批层级" show-overflow-tooltip width="120">
						<template slot-scope="scope">{{scope.row.highestLevel === 1?'总后台':'一级管理员'}}</template>
					</el-table-column>
					<el-table-column prop="amount" label="申请额度（万）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限（月）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="name" label="企业联系人" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="basicMaterial" label="基本资料" show-overflow-tooltip width="500">
					</el-table-column>
					<el-table-column prop="financeMaterial" label="财务资料" show-overflow-tooltip width="500">
					</el-table-column>
					<el-table-column prop="otherMaterial" label="其他资料" show-overflow-tooltip width="500">
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewUserName" label="审核人" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="replyAmount" label="实际批复额度(万)" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="replyDeadline" label="实际批复期限(月)" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="replyRate" label="实际批复利率(%/月)" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<el-button @click.native.prevent="reviewComLog(scope.row)" type="text" size="small">
								查看审核记录
							</el-button>
							<el-button @click.native.prevent="delComLog(scope.row)" type="text" size="small" v-if="role==='super'">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="filterData.pageNum"
				 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="total" class='zIndex9'>
				</el-pagination>
			</div>
			<template v-else>
				<plan-scroll :tableData="tableData" :key="'com'"
									:userRole="userRole"
						 @refreshScroll="refreshLoad"
						 @loadScroll="loadStart"
							 @reviewComLog="reviewComLog"
							 @delComLog="delComLog"></plan-scroll>

			</template>

			<el-dialog title="查看审核记录" :visible.sync="dialogComLog" :width="device === 'desktop'?'70%':'100%'" v-if="dialogComLog">
				<componentReviewLogCom :reviewLogData='reviewLogData'></componentReviewLogCom>
			</el-dialog>
		</el-tab-pane>
		<el-tab-pane name="per" label="个人">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.manageName" placeholder="所属客户经理"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.companyName" placeholder="姓名"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.industry" placeholder="职业">
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.productId" placeholder="贷款产品">
						<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.amount" placeholder="申请额度(万)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.useFunds" placeholder="资金用途"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.deadline" placeholder="申请期限（月）"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'6':'12'">
					<el-date-picker style="width: 100%;"
					  	v-model="filterDataPer.applyDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp">
					</el-date-picker>
				</el-col>
				
				<el-col :span="device === 'desktop'?'9':'24'">
					<el-button type="primary" @click="queryPer">查询</el-button>
					<el-button type="success" @click="resetPer">重置</el-button>
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableDataPer" tooltip-effect="dark" @selection-change="selectionChangePer" style="width: 100%" border>
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属客户经理" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="name" label="姓名" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="registerAddress" label="户籍" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="industry" label="职业" show-overflow-tooltip width="120"><!--  :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"> <!--:formatter='formatterPro'-->
					</el-table-column>
					<el-table-column prop="highestLevel" label="审批层级" show-overflow-tooltip width="120">
						<template slot-scope="scope">{{scope.row.highestLevel === 1?'总后台':'一级管理员'}}</template>
					</el-table-column>
					<el-table-column prop="amount" label="申请额度（万）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限（月）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="basicMaterial" label="基本资料" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="financeMaterial" label="资产证明" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="otherMaterial" label="其他资料" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="reviewUserName" label="审核人" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="replyAmount" label="实际批复额度(万)" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="replyDeadline" label="实际批复期限(月)" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="replyRate" label="实际批复利率(%/月)" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<el-button @click.native.prevent="reviewLogPer(scope.row)" type="text" size="small">
								查看审核记录
							</el-button>
							<el-button @click.native.prevent="delPerLog(scope.row)" type="text" size="small" v-if="role==='super'">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChangePer" @current-change="currentChangePer" :current-page="filterDataPer.pageNum"
				 :page-sizes="[10, 15, 20, 30]" :page-size="filterDataPer.pageSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="totalPer" class='zIndex9'>
				</el-pagination>
			</div>
			<template v-else>
				<plan-scroll :tableData="tableDataPer" :key="'per'"
									tableType="per"
									:userRole="userRole"
						 @refreshScroll="refreshLoadPer"
						 @loadScroll="loadStartPer"
							 @reviewLogPer="reviewLogPer"
							 @delPerLog="delPerLog"></plan-scroll>

			</template>

			<el-dialog title="查看审核记录" :visible.sync="dialogPerLog" :width="device === 'desktop'?'70%':'100%'" v-if="dialogPerLog">
				<componentReviewLogPer :reviewLogData='reviewLogData'></componentReviewLogPer>
			</el-dialog>
		</el-tab-pane>		 
	</el-tabs>
</template>

<script>
	import Bus from '@/unit/bus.js'
	import componentReviewLogCom from '@/views/Financing/components/reviewLogCom.vue'
	import componentReviewLogPer from '@/views/Financing/components/reviewLogPer.vue'
	import { sysOffice, proSelection, passPage, delPageLog } from '@/api/req'
	import { productType, formatter } from '@/api/common'
	import job from '@/unit/job'
    import PlanScroll from "./scrolls/planScroll";
	export default {
		components: {
            PlanScroll,
			componentReviewLogCom,
			componentReviewLogPer
		},
		created(){
			this.sendReq();
			this.sendReqPer();
			this.getOffice();
			this.getProSelection();
		},
		data() {
			return {
				tabName:'com',
				role: this.$store.state.userInfo.roles[0],
				tableData: [], //表格数据
				tableDataPer: [], //表格数据
				productType: productType,
				job: job,//行业职业
				department:[],//部门可选数据
				proSelectData:'',//产品可选数据				
				userRole:'',
				dialogCom: false,
				dialogPer: false,
				dialogComLog: false,
				dialogPerLog: false,
				formDataCom:{},
				formDataPer:{},
				filterData: { //请求条件
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					startType: null,
					level: 2,
					status: 1,
					menuIndex:7,
				},
				filterDataPer: { //请求条件
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					startType: null,
					level: 1,
					status: 1,
					menuIndex:7,
				},
				total: null, //总条数
				totalPer: null, //总条数
				multipleSelection: [], //总条数
				multipleSelectionPer: [], //总条数
				labelPosition: 'right',		
				reviewLogData:[]
			}
		},
		methods: {
			sizeChange(val) {
				this.filterData.pageSize = val
				this.sendReq();
			},
			currentChange(val) {
				this.filterData.pageNum = val
				this.sendReq();
			},
			sizeChangePer(val) {
				this.filterDataPer.pageSize = val
				this.sendReqPer();
			},
			currentChangePer(val) {
				this.filterDataPer.pageNum = val
				this.sendReqPer();
			},
			selectionChangeCom(value) {
				this.multipleSelection = val;
			},
			selectionChangePer(value) {
				this.multipleSelectionPer = val;
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
			refreshLoadPer() {
			    this.filterDataPer.pageNum = 1;
				this.sendReqPer();
			},
			loadStartPer() {
			    if(this.noMorePer){
			        Bus.$emit('loadEndPer',this.noMorePer);
			        return ;
				}
				this.filterDataPer.pageNum ++;
			    this.sendReqPer();
			},
			sendReq() {
				passPage(this.filterData).then(res => {
					//console.log(res)
					if(this.device === 'mobile'){
						if(this.filterData.pageNum == 1){
						    this.$set(this,'tableData',res.data.records);
						    Bus.$emit('refreshEnd');
						}else{
						    this.$set(this,'tableData',this.tableData.concat(res.data.records));
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
			sendReqPer() {
				passPage(this.filterDataPer).then(res => {
					if(this.device === 'mobile'){
						if(this.filterDataPer.pageNum == 1){
						    this.$set(this,'tableDataPer',res.data.records);
						    Bus.$emit('refreshEndPer');
						}else{
						    this.$set(this,'tableDataPer',this.tableDataPer.concat(res.data.records));
						    Bus.$emit('loadEndPer',false);
						}
						this.totalPer = res.data.total;
					}else{
						this.tableDataPer = res.data.records;
						this.totalPer = res.data.total;
					}
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			query() {				
				this.sendReq();
			},
			queryPer() {				
				this.sendReqPer();
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
					startType :null,
					level: 2,
					status: 1,
					menuIndex:7,
				}
				this.sendReq();
			},
			resetPer() {
				this.filterDataPer = {
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
					pageSize: 10 ,//a每页条数					
					startType :null,
					level: 1,
					status: 1,
					menuIndex:7,
				}
				this.sendReqPer();
			},
			reviewComLog(scope){
				this.dialogComLog = true;	
				this.reviewLogData = scope;
			},
			reviewLogPer(scope){
				this.dialogPerLog = true; 
				this.reviewLogData = scope;
			},
			delComLog(scope){
				this.$confirm(
					'谨慎操作,删除无法恢复',
					'确定删除',
					{
						confirmButtonText:'删除',
						cancelButtonText: '取消',
						type:'warning'

					}
				).then(() => {
					delPageLog(scope.id).then(res => {
						this.$message.success(res.msg);
						this.sendReq();
					})
				})
			},
			delPerLog(scope){
				this.$confirm(
					'谨慎操作,删除无法恢复',
					'确定删除',
					{
						confirmButtonText:'删除',
						cancelButtonText: '取消',
						type:'warning'
				
					}
				).then(() => {
					delPageLog(scope.id).then(res => {
						this.$message.success(res.msg);
						this.sendReqPer();
					})
				})
			},
		},
		computed:{
			device() {return this.$store.state.device;},
			noMore () {return this.total <= this.tableData.length;},
			noMorePer () {return this.total <= this.tableDataPer.length;},
		}
	}
</script>

<style scoped="scoped">
.el-col {
		margin-bottom: 20px;
	}
</style>
