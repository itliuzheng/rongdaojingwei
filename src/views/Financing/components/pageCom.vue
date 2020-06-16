<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.manageName" placeholder="所属业务员"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.companyName" placeholder="企业名称"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-select v-model="filterData.industry" placeholder="所属行业">
					<el-option v-for="item in job.industryList" :key="item.id" :label="item.name" :value="item.name">
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
			<!--<el-col :span="device === 'desktop'?'4':'12'">-->
				<!--<el-input v-model="filterData.useFunds" placeholder="资金用途"></el-input>-->
			<!--</el-col>-->
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.deadline" placeholder="申请期限（月）"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'6':'12'">
				<el-date-picker
						style="width: 100%;"
				  	v-model="filterData.applyDate"
				  	type="date"
				  	placeholder="申请时间"
				   	value-format="timestamp">
				</el-date-picker>
			</el-col>
			<!--<el-col :span="device === 'desktop'?'4':'12'" v-if="userRole!='second'">
				<el-select v-model="filterData.dept" placeholder="请选择公司">
					<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>-->
			<el-col :span="device === 'desktop'?'4':'12'" v-if="userRole!='second'">
				<el-select v-model="filterData.dept" placeholder="请选择部门">
					<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="device === 'desktop'?'6':'24'">
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="success" @click="reset">重置</el-button>
			</el-col>
		</el-row>
		<div v-if="device === 'desktop'">
			<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
				<el-table-column prop="number" label="融资编号" width="150">
				</el-table-column>
				<el-table-column prop="name" label="所属公司" show-overflow-tooltip width="200" v-if="userRole!='second'">
				</el-table-column>
				<el-table-column prop="officeName" label="所属部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
				</el-table-column>
				<el-table-column prop="manageName" label="所属业务员" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="industry" label="所属行业" show-overflow-tooltip width="120"><!-- :formatter="formatterInd" -->
				</el-table-column>
				<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"><!-- :formatter='formatterPro' -->
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
		<template v-else>
			<my-scroll :scrollColumns="scrollColumns"
					:tableData="tableData"
					:userRole="userRole"
					:scrollButtonList="scrollButtonList"
					@refreshScroll="refreshLoad"
					@loadScroll="loadStart"></my-scroll>
		</template>

	</div>
</template>

<script>
	import Bus from '@/unit/bus.js'
	import {financingPage, sysOffice, proSelection, delPageLog } from '@/api/req'	
	import { productType, formatter } from '@/api/common'
	import job from '@/unit/job'
    import MyScroll from "@/components/MyScroll";
	export default {
		name: 'componentPage',
        components: {MyScroll},
        props:['role', 'start', 'status', 'level', 'reviewButton', 'reviewLogButton','menuIndex','deleteLogButton'],
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
			/*_reviewLogButton: function(){
				return this.reviewLogButton;
			},*/
			device() {return this.$store.state.device;},
			noMore () {return this.total <= this.tableData.length;}
		},
		data() {
			return {
				tableData: [], //表格数据
				productType: productType,
				department:[],//部门可选数据
				proSelectData:'',//产品可选数据
				job: job,//行业职业
				userRole:'',
				filterData: { //请求条件
					number: '', //融资编号
					manageName: '', //所属业务员
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
					status: null,
					startType: null,
					level: null,
					menuIndex: null,
				},
				total: null, //总条数
				labelPosition: 'right',
				scrollColumns:[
					{
						label: '融资编号:',
						prop:'number',
						widthPart:24
					},
					{
						label: '所属公司:',
						prop:'name',
						isIf:true,
						widthPart:24
					},
					{
						label: '所属部门:',
						prop:'officeName',
						isIf:true,
						widthPart:24
					},
					{
						label: '所属业务员:',
						prop:'manageName',
						widthPart:24
					},
					{
						label: '企业名称:',
						prop:'companyName',
						widthPart:24
					},
					{
						label: '所属行业:',
						prop:'industry',
						widthPart:24
					},
					{
						label: '贷款产品:',
						prop:'productName',
						widthPart:24
					},
					{
						label: '申请额度（万）:',
						prop:'amount',
						widthPart:24
					},
					{
						label: '贷款用途:',
						prop:'useFunds',
						widthPart:24
					},
					{
						label: '申请期限（月）:',
						prop:'deadline',
						widthPart:24
					},
					{
						label: '申请时间:',
						prop:'applyDate',
						widthPart:24
					},
					{
						label: '企业联系人:',
						prop:'name',
						widthPart:24
					},
					{
						label: '联系方式:',
						prop:'mobile',
						widthPart:24
					},
				],
				scrollButtonList:[
					{
						type: 'text',
						text: '查看',
						isShow:true,
						atClick: row => {
							this.check(row);
						}
					},
					{
						type: 'text',
						text: '审核',
						isShow:this.reviewButton,
						atClick: row => {
							this.review(row);
						}
					},
					{
						type: 'text',
						text: '查看审核记录',
						isShow:this.reviewLogButton,
						atClick: row => {
							this.reviewLog(row);
						}

					},
					{
						type: 'text',
						text: '删除',
						isShow:this.deleteLogButton,
						atClick: row => {
							this.deleteLog(row);
						}
					},
				],
			}
		},
		created() {
			//console.log(this._menuIndex)
			this.sendReq();
			this.getOffice();
			this.getProSelection();

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
			sendReq() {
				//console.log(this.filterData)
				financingPage(this.filterData).then(res => {
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
			query() {				
				this.sendReq();
			},
			reset() {
				this.filterData = {
					number: '', //融资编号
					manageName: '', //所属业务员
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
