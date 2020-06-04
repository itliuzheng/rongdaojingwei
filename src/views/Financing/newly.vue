<template>
	<div>
		<el-row>
			<el-button type="primary" @click="dialogVisible = true">新增</el-button>
			<el-button type="primary">批量申请</el-button>
		</el-row>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
		 border>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column label="日期" width="120">
				<template slot-scope="scope">{{ scope.row.date }}</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="address" label="地址" show-overflow-tooltip>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.currentPage"
		 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 class='zIndex9'>
		</el-pagination>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :label-position="labelPosition" label-width="80px" :model="addFromData">
				<el-form-item label="所属客户经理">
					<el-input v-model="addFromData.manageName"></el-input>
				</el-form-item>
				<el-form-item label="企业名称">
					<el-input v-model="addFromData.companyName"></el-input>
				</el-form-item>
				<el-form-item label="统一社会信用代码">
					<el-input v-model="addFromData.socialCreditCode"></el-input>
				</el-form-item>
				<el-form-item label="注册资本">
					<el-input v-model="addFromData.registeredCapital"></el-input>
				</el-form-item>
				<el-form-item label="成立时间">
					<el-input v-model="addFromData.establishmentDate"></el-input>
				</el-form-item>
				<el-form-item label="注册地址">
					<el-input v-model="addFromData.registerAddress"></el-input>
				</el-form-item>
				<el-form-item label="实际经营地址">
					<el-input v-model="addFromData.businessAddress"></el-input>
				</el-form-item>
				<el-form-item label="所属行业">
					<el-input v-model="addFromData.industry"></el-input>
				</el-form-item>
				<el-form-item label="主要业务">
					<el-input v-model="addFromData.profession"></el-input>
				</el-form-item>
				<el-form-item label="年收入">
					<el-input v-model="addFromData.annualIncome"></el-input>
				</el-form-item>
				<el-form-item label="年纳税额">
					<el-input v-model="addFromData.taxCredit"></el-input>
				</el-form-item>
				<el-form-item label="法人及股东最新变更时间">
					<el-date-picker v-model="addFromData.legalChangeDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="贷款产品">
					<el-select v-model="addFromData.productId" placeholder="请选择">
						<el-option v-for="item in loanType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请额度(万)">
					<el-input v-model="addFromData.amount"></el-input>
				</el-form-item>
				<el-form-item label="贷款用途">
					<el-input v-model="addFromData.useFunds"></el-input>
				</el-form-item>
				<el-form-item label="申请期限(月)">
					<el-select v-model="addFromData.deadline" placeholder="请选择">
						<el-option v-for="item in loanTimeLimit" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业联系人">
					<el-input v-model="addFromData.name"></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="addFromData.mobile"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">提交</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import { financingAdd } from '@/api/req'
	import { loanType, loanTimeLimit } from '@/api/common'
	export default {
		data() {
			return {
				tableData: [], //表格数据
				selection: [], //列表多选
				filterData: { //请求条件
					currentPage: 1, //当前页码
					size: 10 //每页条数
				},
				total: null, //总条数
				dialogVisible:false,
				labelPosition:'right',
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
			handleSelectionChange(val) {
				this.selection = val;
			},
			handleSizeChange(val) {
				this.filterData.size = val
				this.sendReq();
			},
			handleCurrentChange(val) {
				this.filterData.currentPage = val
				this.sendReq();
			},
			sendReq() {

			},
			submitForm(){
				financingAdd(this.addFromData).then(res => {

				}).catch(res => {
					this.$message.error(res.msg);
				})
			}
		}
	}
</script>

<style>
</style>
