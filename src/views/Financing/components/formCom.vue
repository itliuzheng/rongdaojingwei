<template>

	<el-form ref='addForm' :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'100px'" :model="addFormData"  :rules="addFromRules">
		<el-row :gutter="20">
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="所属业务员" prop="manageName">
					<el-input v-model="formData.manageName" disabled></el-input>
					 <!--:disabled="_lookOrReview===1"-->
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="企业名称" prop="companyName">
					<el-input v-model="formData.companyName" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="统一社会信用代码" prop="socialCreditCode">
					<el-input v-model="formData.socialCreditCode" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="注册资本" prop="registeredCapital">
					<el-input v-model="formData.registeredCapital" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="成立时间" prop="establishmentDate">
					<el-date-picker
					  	v-model="formData.establishmentDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp"
					   	disabled>
					</el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="注册地址" prop="registerAddress">
					<el-input v-model="formData.registerAddress" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="实际经营地址" prop="businessAddress">
					<el-input v-model="formData.businessAddress" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="所属行业" prop="industry">
					<!-- <el-select v-model="formData.industry" placeholder="所属行业/职业" disabled>
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select> -->
					<el-input v-model="formData.industry" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="主要业务" prop="profession">
					<el-input v-model="formData.profession" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="年收入" prop="annualIncome">
					<el-input v-model="formData.annualIncome" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="年纳税额" prop="taxCredit">
					<el-input v-model="formData.taxCredit" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="法人及股东最新变更时间" prop="legalChangeDate">
					<el-date-picker
					  	v-model="formData.legalChangeDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp"
					   	disabled>
					</el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="贷款产品" prop="productName">
					<el-input v-model="formData.productName" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="申请额度(万)" prop="amount">
					<el-input v-model="formData.amount" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="贷款用途" prop="useFunds">
					<el-input v-model="formData.useFunds" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="申请期限(月)" prop="deadline">
					<el-input v-model="formData.deadline" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="企业联系人" prop="name">
					<el-input v-model="formData.name" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'">
				<el-form-item label="联系方式" prop="mobile">
					<el-input v-model="formData.mobile" disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="formData.basicMaterial">
				<el-form-item label="基本资料" prop="basicMaterial">
					<!--<el-input v-model="formData.basicMaterial" disabled></el-input>-->
					<el-link type="primary" :href="formData.basicMaterial">点击下载</el-link>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="formData.financeMaterial">
				<el-form-item label="财务资料" prop="financeMaterial">
					<!--<el-input v-model="formData.financeMaterial" disabled></el-input>-->
					<el-link type="primary" :href="formData.financeMaterial">点击下载</el-link>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="formData.otherMaterial">
				<el-form-item label="其它资料" prop="otherMaterial">
					<!--<el-input v-model="formData.otherMaterial" disabled></el-input>-->
					<el-link type="primary" :href="formData.otherMaterial">点击下载</el-link>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if='withReview'>
				<el-form-item label="审核结果">
					<el-radio-group v-model="formData.reviewStatus" size="medium" disabled>
						<el-radio border :label=1>通过</el-radio>
						<el-radio border :label=0>不通过</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="formData.reviewStatus === 0">
				<el-form-item label="不通过原因">
					<el-input v-model="formData.description"></el-input>
				</el-form-item>
			</el-col>
			<!--审核组件-->
			<el-col :span="24" v-if='lookOrReview === 2'>
				<el-divider content-position="left">审核</el-divider>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if='lookOrReview === 2'>
				<el-form-item label="审核" prop="status">
					<el-radio-group v-model="addFormData.status" size="medium" @change='changeRadio'>
						<el-radio border :label=1>通过</el-radio>
						<el-radio border :label=0>不通过</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="lookOrReview === 2 && addFormData.status === 0">
				<el-form-item label="不通过原因" prop='description'>
					<el-input v-model="addFormData.description"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="lookOrReview === 2 && addFormData.status === 1 && role === 'super'">
				<el-form-item label="实际批复额度(万)" prop="replyAmount">
					<el-input v-model="addFormData.replyAmount"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="lookOrReview === 2 && addFormData.status === 1 && role === 'super'">
				<el-form-item label="实际批复期限(月)" prop="replyDeadline">
					<el-input v-model="addFormData.replyDeadline"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="device === 'desktop'?'12':'24'" v-if="lookOrReview === 2 && addFormData.status === 1 && role === 'super'">
				<el-form-item label="实际批复利率(%/月)" prop="replyRate">
					<el-input v-model="addFormData.replyRate"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24" v-if='lookOrReview === 2'>
				<el-form-item>
					<el-button type="primary" @click="submitForm">提交</el-button>
					<el-button @click="close">取消</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import { financingApproval, proSelection } from '@/api/req'	
		
	export default {
		name: 'componentForm',
		props: ["formData", "lookOrReview", 'withReview'],
		data() {
			const lessThan0 = (rule, value, callback) => {
				if(value < 0){
					callback(new Error('数值不能小于0'))
				}else{
					callback()
				}
			}
			const regNumPoint = (rule, value, callback) => {
				var re=/^\d*\.{0,1}\d{0,1}$/;
				if(!re.test(value)){
					callback(new Error('请输入数字'))
				}else{
					callback()
				}
			}
			return {
				role: this.$store.state.userInfo.roles[0],
				
				labelPosition: 'right',
				checkData: {}, //表单显示数据
				fromList: true, //在列表页显示表单
				checkOrEdit: 1, //1 check   2 edit
				productType:[],
				addFormData: { //新增信息
					description:"",//不通过原因
					replyAmount:"",//实际批复额度
					replyDeadline:"",//实际批复期限
					replyRate:"",//实际批复利率
					status:1,//审核结果  审批的状态 0-不通过，1-通过
					id:"",
				},
				
				addFromRules: {					
					status: [{
						required: true,
						message: '请审核',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					replyAmount: [{
						trigger: 'blur',
						validator: lessThan0,
					},{
						trigger: 'blur',
						validator: regNumPoint,
					}],
					replyDeadline: [{
						trigger: 'blur',
						validator: lessThan0,
					},{
						trigger: 'blur',
						validator: regNumPoint,
					}],
					replyRate: [{
						trigger: 'blur',
						validator: lessThan0,
					},{
						trigger: 'blur',
						validator: regNumPoint,
					}],
				}
			}
		},
		created() {
			this.getProduct()
			this.formData.legalChangeDate = new Date(this.formData.legalChangeDate).getTime()
			this.formData.establishmentDate = new Date(this.formData.establishmentDate).getTime()
		},
		computed: {
			_lookOrReview: function (){
				return this.lookOrReview;
			},	
			_formData: function (){
				return this.formData;
			},
			device() {return this.$store.state.device;},
		},
		methods: {
			changeRadio(val){
				this.$refs.addForm.clearValidate();
			},
			submitForm() {
				this.addFormData.id = this.formData.id;
				if(this.addFormData.status === 1){
					this.addFormData.description = ''
				}
				this.$refs.addForm.validate(valid => {					
					if(valid){
						financingApproval(this.addFormData).then(res => {
							this.$message.success(res.msg);
							this.$emit('reviewOk')
						}).catch(res => {
							this.$message.error(res.msg);
						}) 
					}
				})				
			},	
			getProduct(){
				proSelection().then(res => {
					this.productType = res.data
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			close(){
				this.$emit('close')
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.el-col {
		margin-bottom: 20px;
	}
	.el-dialog .el-col {
		margin-bottom: 0;
	}
	.el-dialog .el-input,.el-dialog .el-select {
		/*width:200px*/
		width: 90%;
	}
</style>
