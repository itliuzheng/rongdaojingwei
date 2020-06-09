<template>
	<div class="boxShadow" ref="boxShadow">
		<div v-if="device === 'desktop'">
			<el-row  :gutter="20">
				<el-col :span="3">
					<el-select v-model="filterData.ptype" placeholder="请选择产品类型">
						<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-input v-model="filterData.name" placeholder="产品名称"></el-input>
				</el-col>
				<el-col :span="3">
					<el-input v-model="filterData.provider" placeholder="产品提供方"></el-input>
				</el-col>
				<el-col :span="4">
					<el-select v-model="filterData.status" placeholder="请选择状态">
						<el-option
							v-for="item in status"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
			  </el-select>
				</el-col>
				<el-col :span="6">
					<el-date-picker
						v-model="filterData.createDate"
						type="date"
						placeholder="选择日期"
						value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="query">查询</el-button>
				</el-col>
				<el-col :span="2">
					<el-button type="success" @click="reset">重置</el-button>
				</el-col>
			</el-row>

			<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
				<el-table-column prop="id" label="产品ID" width="120">
				</el-table-column>
				<el-table-column prop="name" label="产品名称" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="ptype" label="产品类型" show-overflow-tooltip width="120" :formatter="formatterType">
				</el-table-column>
				<el-table-column prop="provider" label="产品提供方" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="" label="额度范围（万）" show-overflow-tooltip width="120">
					<template slot-scope="scope">{{ scope.row.amountLower }}-{{ scope.row.amountUpper }}</template>
				</el-table-column>
				<el-table-column prop="" label="期限范围（月）" show-overflow-tooltip width="120">
					<template slot-scope="scope">{{ scope.row.deadlineLower }}-{{ scope.row.deadlineUpper }}</template>
				</el-table-column>
				<el-table-column prop="" label="利率范围(%/月)" show-overflow-tooltip width="120">
					<template slot-scope="scope">{{ scope.row.rateLower }}-{{ scope.row.rateUpper }}</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" show-overflow-tooltip width="120">
					<template slot-scope="scope">{{ scope.row.status == 1?"下架":"上架" }}</template>
				</el-table-column>
				<el-table-column prop="highestLevel" label="审批层级" show-overflow-tooltip width="120">
					<template slot-scope="scope">{{ scope.row.highestLevel == 1?"总后台":"一级管理员" }}</template>
				</el-table-column>
				<el-table-column prop="createDate" label="创建时间" show-overflow-tooltip width="200">
				</el-table-column>
				<el-table-column prop="updateDate" label="更新时间" show-overflow-tooltip width="200">
				</el-table-column>
				<el-table-column prop="" label="产品图片" show-overflow-tooltip width="200">
					<template slot-scope="scope"><el-image style="width: 50px;" :src="scope.row.image" :fit="fit"></el-image></template>
				</el-table-column>
				<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
					<template slot-scope="scope">
						<el-button @click.native.prevent="check(scope.row)" type="text" size="small">
							查看
						</el-button>
						<el-button @click.native.prevent="edit(scope.row)" type="text" size="small" v-if="role === 'super'">
							修改
						</el-button>
						<el-button @click.native.prevent="del(scope.row)" type="text" size="small" v-if="role === 'super'">
							删除
						</el-button>
						<!-- <el-button @click.native.prevent="up(scope)" type="text" size="small" v-if="scope.row.status===1&&role === 'super'">
							上架
						</el-button>
						<el-button @click.native.prevent="down(scope)" type="text" size="small" v-if="scope.row.status===2" style='color:red'>
							下架
						</el-button> -->
					</template>
				</el-table-column>
			</el-table>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.pageNum"
			 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 class='zIndex9'>
			</el-pagination>
		</div>


		<template v-else>
			<el-row ref="list_top" class="col-m-b-10" :gutter="20">
				<el-col :span="12">
					<el-select v-model="filterData.ptype" placeholder="请选择产品类型">
						<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="12">
					<el-input v-model="filterData.name" placeholder="产品名称"></el-input>
				</el-col>
				<el-col :span="12">
					<el-input v-model="filterData.provider" placeholder="产品提供方"></el-input>
				</el-col>
				<el-col :span="12">
					<el-select v-model="filterData.status" placeholder="请选择状态">
						<el-option
							v-for="item in status"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
			  </el-select>
				</el-col>
				<el-col :span="24">
					<el-date-picker
							style="width: 100%;"
						v-model="filterData.createDate"
						type="date"
						placeholder="选择日期"
						value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="12">
					<el-button type="primary" @click="query">查询</el-button>
				</el-col>
				<el-col :span="12">
					<el-button type="success" @click="reset">重置</el-button>
				</el-col>
			</el-row>
			<list-scroll :tableData="tableData" :role="role"
						 @refreshScroll="refreshLoad"
						 @loadScroll="loadStart"
						 @check="check"
						 @edit="edit"
						 @del="del"
			></list-scroll>
		</template>


		<el-dialog title="提示" :visible.sync="dialogVisible" :width="device === 'desktop'?'70%':'100%'" :before-close="handleClose" v-if="dialogVisible">
			<loadSet :formData='checkData' :fromList='fromList' :checkOrEdit='checkOrEdit' @closeDialog='closeDialog'></loadSet>
		</el-dialog>
	</div>
</template>

<script>
	import Bus from '@/unit/bus.js'
	import { productPage, productLower, productUpper, productDelete } from '@/api/req'
	import loadSet from '@/views/Product/loadSet.vue'
	import { status, productType, formatter } from "@/api/common"
    import ListScroll from "./listScroll";

	export default {
		components:{ListScroll, loadSet },
		data() {
			return {
				role: this.$store.state.userInfo.roles[0],
				tableData: [], //表格数据
				status:status,
				productType: productType,
				filterData: { //请求条件
					createDate:'',//创建日期
					pType:'',//产品名称iD
					name:'',//产品名称
					provider:'',//产品提供方
					status:'',//产品状态 1-下架 2-上架
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				total: null, //总条数
				dialogVisible:false,
				labelPosition:'right',
				checkData: {},//表单显示数据
				fromList: true,//在列表页显示表单
				checkOrEdit:1,//1 check   2 edit
				addFromData: { //新增信息
					manageName:'',	//所属客户经理
					companyName:'',	//企业名称
					socialCreditCode:'',	//社会统一信用代码
					registeredCapital:'',	//注册资本
					establishmentDate:'',	//成立时间
					registerAddress:'',	//注册地址/户籍
					businessAddress:'',	//实际经营地址
					industry:'',	//所属行业/职业
					profession:'',	//主要业务
					annualIncome:'',	//年收入
					taxCredit:'',	//年纳税额度
					legalChangeDate:null,	//法人及股东最新变更时间
					productId:'',	//申请产品的id
					amount:'',	//申请的额度
					useFunds:'',	//资金用途
					deadline:'',	//申请期限（月）
					name:'',	//企业联系人/申请人姓名
					mobile:'',	//申请人手机号/联系方式
				}
			}
		},
		created() {
		    this.sendReq();
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
			formatterType(row, column){
				
				return formatter(row.ptype,productType)
			},
			sendReq() {
				var _this = this;

				productPage(this.filterData).then(res => {
					//console.log(res)
					if(_this.device === 'mobile'){
						if(_this.filterData.pageNum == 1){
						    _this.$nextTick(()=>{
						        _this.$set(_this,'tableData',res.data.records);
						        Bus.$emit('refreshEnd');
							});
						}else{
						    let totalData = _this.tableData.concat(res.data.records);
						    _this.$nextTick(()=>{
						        _this.$set(_this,'tableData',totalData);
						        Bus.$emit('loadEnd',false);
							});
						}
						_this.total = res.data.total;
					}else{
						_this.tableData = res.data.records;
						_this.total = res.data.total;
					}

				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			query(){
				this.sendReq();
			},
			reset(){
				this.filterData = {
					createDate:'',//创建日期
					id:'',//产品名称iD
					name:'',//产品名称
					provider:'',//产品提供方
					status:'',//产品状态 1-下架 2-上架
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				};
				this.sendReq();
			},
			check(row){
				this.checkData = row;
				this.dialogVisible = true;
				this.checkOrEdit = 1;
			},
			edit(row){
				this.checkData = row;
				this.checkOrEdit = 2;
				this.dialogVisible = true;
			},
			del(row) {
				this.$confirm(
					'谨慎操作,删除无法恢复',
					'确定删除',
					{
						confirmButtonText:'删除',
						cancelButtonText: '取消',
						type:'warning'
				
					}
				).then(() => {
					productDelete(row.id).then(res => {
						this.$message.success(res.msg)
						this.sendReq();
					}).catch(res => {
						this.$message.error(res.msg)
					})
				})
				
			},
			closeDialog(){
				this.dialogVisible = false;
			},
			up(scope){
				productUpper(scope.row.id).then(res => {
					this.$message.success(res.msg)
					this.sendReq();
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},
			down(scope){
				productLower(scope.row.id).then(res => {
					this.$message.success(res.msg)
					this.sendReq();
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},
			formatterList(val,productType){
			    return formatter(val,productType)
			}
		},
		computed:{
			device() {return this.$store.state.device;},
			noMore () {return this.total <= this.tableData.length;}
		}
	}
</script>

<style>
	.el-table {
		margin-top:20px
	}
	.boxShadow .col-m-b-10 .el-col{
		margin-bottom: 10px;
	}
</style>
