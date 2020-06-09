<template>
	<div>
		<el-form :class="device === 'mobile'?'mobile-el-form':''" ref="addForm" :label-position="labelPosition"
				 :label-width="device === 'desktop'?'120px':'120px'" :model="addFromData" :rules="addFromRules">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="产品名称" prop="name">
						<el-input v-model="addFromData.name" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="产品提供方" prop="provider">
						<el-input v-model="addFromData.provider" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="产品类型" prop="ptype">
						<el-select v-model="addFromData.ptype" placeholder="请选择" :disabled="fromList===true&&checkOrEdit===1">
							<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="申请对象" prop="ptype">
						<el-select v-model="addFromData.level" placeholder="请选择" :disabled="fromList===true&&checkOrEdit===1">
							<el-option v-for="item in appilyType" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="展业区域" prop="province">
						<el-select v-model="addFromData.areaPath" multiple placeholder="全国" :disabled="fromList===true&&checkOrEdit===1">
						 	<el-option
						    v-for="item in province"
						    :key="item.value"
						    :label="item.label"
						    :value="item.label"
						    >
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="产品链接" prop="pointStatus">
						<el-radio-group v-model="addFromData.pointStatus">
							<el-radio-button :label=1>可用</el-radio-button>
							<el-radio-button :label=2>不可用</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'" v-if="addFromData.pointStatus === 1">
					<el-form-item label="链接地址" prop="externalUrl">
						<el-input v-model.number="addFromData.externalUrl" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="额度下限(万)" prop="amountLower">
						<el-input v-model.number="addFromData.amountLower" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="额度上限(万)" prop="amountUpper">
						<el-input v-model.number="addFromData.amountUpper" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="期限下限(月)" prop="deadlineLower">
						<el-input v-model.number="addFromData.deadlineLower" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="期限上限(月)" prop="deadlineUpper">
						<el-input v-model.number="addFromData.deadlineUpper" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="利率下限(%/月)" prop="rateLower">
						<el-input v-model="addFromData.rateLower" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="利率上限(%/月)" prop="rateUpper">
						<el-input v-model="addFromData.rateUpper" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'" v-if="!fromList||checkOrEdit===2">
					<el-form-item label="还款方式" prop="repayment">
						<el-select v-model="returnPay" placeholder="请选择" @change='selectChange' :disabled="fromList===true&&checkOrEdit===1">
							<el-option v-for="item in returnPayType" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="审批层级" prop="highestLevel">
						<el-select v-model="addFromData.highestLevel" placeholder="请选择审批层级" :disabled="fromList===true&&checkOrEdit===1">
							<el-option v-for="item in highestLevelType" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="还款方式"  v-if="returnPay=='其它'||checkOrEdit===1" prop="repayment">
						<el-input v-model="addFromData.repayment" :disabled="fromList===true&&checkOrEdit===1"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'12':'24'">
					<el-form-item label="产品图片"   prop="image">
						<el-input v-model="addFromData.image" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="device === 'desktop'?'18':'24'">
					<el-form-item label="上传图片">
						<el-upload
							class="upload-demo"
							ref="upload"
							:action="imgUpUrl"
							:headers="header"
							:file-list="fileList"
							:before-upload="beforeUpload"
							:on-success='uploadSuccess'
							:auto-upload="false"
							:limit=1
							:disabled='fromList===true&&checkOrEdit===1'
							list-type="picture">
							<el-button size="small" slot="trigger" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
						</el-upload>						
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="产品特色" prop="description">
						<quill-editor v-model="addFromData.description" :config="editorOption" :disabled="fromList===true&&checkOrEdit===1">
						</quill-editor>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="适用对象" prop="userAudience">
						<quill-editor v-model="addFromData.userAudience" :config="editorOption" :disabled="fromList===true&&checkOrEdit===1">
						</quill-editor>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="所需材料" prop="materials">
						<quill-editor v-model="addFromData.materials" :config="editorOption" :disabled="fromList===true&&checkOrEdit===1">
						</quill-editor>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="申请流程" prop="applicationProcess">
						<quill-editor v-model="addFromData.applicationProcess" :config="editorOption" :disabled="fromList===true&&checkOrEdit===1">
						</quill-editor>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item>
						<el-button type="primary" @click="save" v-if="!fromList && saveOk === 1">保存</el-button>
						<el-button type="info" v-if="!fromList && saveOk === 2">保存</el-button>
						<el-button type="primary" @click="upload" v-if="!fromList && saveOk === 2">上架</el-button>
						<el-button type="info" v-if="!fromList && saveOk === 1">上架</el-button>
						
						<el-button type="primary" @click="check" v-if="fromList===true&&checkOrEdit===1">确定</el-button>
						<el-button type="primary" @click="update" v-if="fromList===true&&checkOrEdit===2">提交</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

	</div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import { quillEditor } from 'vue-quill-editor'
	import { returnPayType, productType, highestLevelType, appilyType, imgUpUrl } from '@/api/common'
	import { productAdd, productUpdate,productUpper } from '@/api/req'
	//import { provinceAndCityDataPlus, CodeToText } from '@/unit/app'
	import { province } from '@/unit/province'
	import { getTokenStorage } from '@/api/cookies'
	export default {
		name: 'loadSet',
		props: ['formData', 'fromList', 'checkOrEdit'],
		components: {
			quillEditor
		},
		data() {
			const validateAmount = (rule, value, callback) => {
				if(value < this.addFromData.amountLower){
					callback(new Error('上限不能低于下限'))
				}else{
					callback()
				}
			}
			const validateDeadline = (rule, value, callback) => {
				if(value < this.addFromData.deadlineLower){
					callback(new Error('上限不能低于下限'))
				}else{
					callback()
				}
			}
			const validateRate = (rule, value, callback) => {
				if(value < this.addFromData.rateLower){
					callback(new Error('上限不能低于下限'))
				}else{
					callback()
				}
			}
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
				imgUpUrl: imgUpUrl,
				fileList: [],
				header:{
					Authorization: getTokenStorage()
				},
				saveOk: 1,//1保存成功前  2保存成功后
				labelPosition: 'right',
				returnPay: "",
				returnPayType: returnPayType,
				productType: productType,
				appilyType: appilyType,
				province:province,
				highestLevelType: highestLevelType,
				areaCode:[],
				addFromDatas: { //新增信息
					name: '', //产品名称
					provider: '', //产品提供方
					ptype: '', //产品类型
					level: 2,//1个人  2企业
					province: '', //省
					city: '',//市
					areaPath: [],
					district: '',//区县
					image: '',
					amountLower: '', //额度下限
					amountUpper: '', //额度上限
					deadlineLower: '', //期限下限
					deadlineUpper: '', //期限上限
					rateLower: '', //利率下限
					rateUpper: '', //利率上限
					repayment: '', //还款方式
					highestLevel: 1,//审批层级
					description: '', //产品特色
					userAudience: '', //使用对象
					materials: '', //所需材料
					applicationProcess: '', //申请流程
					status: 1,
					externalUrl: '',//外部链接
					pointStatus: 1,//链接是否可用 1 可用 2 不可用

				},
				addFromRules: {
					name: [{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur'
					}],
					provider: [{
						required: true,
						message: '请输入产品提供方',
						trigger: 'blur'
					}],
					ptype: [{
						required: true,
						message: '请输入产品类型',
						trigger: 'blur'
					}],
					 
					amountLower: [{
						required: true,
						message: '请输入额度下限',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					},{
						validator: lessThan0,
					}],
					amountUpper: [{
						required: true,
						message: '请输入额度上限',
						trigger: 'blur'
					},{
						validator: validateAmount,
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					deadlineLower: [{
						required: true,
						message: '请输入期限下限',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					},{
						validator: lessThan0,
					}],
					deadlineUpper: [{
						required: true,
						message: '请输入期限上限',
						trigger: 'blur'
					},{
						validator: validateDeadline,
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					rateLower: [{
						required: true,
						message: '请输入利率下限',
						trigger: 'blur'
					},{
						validator: lessThan0,
						trigger: 'blur'
					},{
						validator: regNumPoint,
						trigger: 'blur'
					}],
					rateUpper: [{
						required: true,
						message: '请输入利率上限',
						trigger: 'blur'
					},{
						validator: validateRate,
						trigger: 'blur'
					},{
						validator: regNumPoint,
						trigger: 'blur'
					}],
					repayment: [{
						required: true,
						message: '请选择还款方式',
						trigger: 'blur'
					}],
					image: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入产品特色',
						trigger: 'blur'
					}],
					userAudience: [{
						required: true,
						message: '请输入使用对象',
						trigger: 'blur'
					}],
					materials: [{
						required: true,
						message: '请输入所需材料',
						trigger: 'blur'
					}],
					applicationProcess: [{
						required: true,
						message: '请输入申请流程',
						trigger: 'blur'
					}],
					highestLevel: [{
						required: true,
						message: '请选择审批层级',
						trigger: 'blur'
					}],
					pointStatus: [{
						required: true,
						message: '请设置链接是否可用',
						trigger: 'blur'
					}],
					externalUrl: [{
						required: true,
						message: '请输入外部链接',
						trigger: 'blur'
					}],
				}
			}
		},
		computed: {
			device() {return this.$store.state.device},
			addFromData() {
				let data = {};
				if(this.fromList){
					data = this.formData;
				}else{
					data = this.addFromDatas
				}
				return data
			}
		},
		created(){
			
			if(this.fromList && this.formData.areaPath != '全国'){
				this.addFromData.areaPath = this.formData.areaPath.split('-')
			}else{
				this.addFromData.areaPath = [];
			}
			//console.log(this.addFromData.areaPath)
			if(this.formData){
				if(this.formData.repayment!='先息后本'&&this.formData.repayment!='等额本息'&&this.formData.repayment!='等额本金'&&this.formData.repayment!='其它'){
					this.returnPay = "其它"
				}else{
					this.returnPay = this.formData.repayment
				}
			}
		},
		methods: {
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt5M = file.size / 1024 / 1024 < 5;
				if (!isJPG && !isPNG) {
				  this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt5M) {
				  this.$message.error('上传头像图片大小不能超过 5MB!');
				}
				return (isJPG || isPNG) && isLt5M;
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			uploadSuccess(response, file, fileList){
				this.addFromData.image = response.data;
			},
			save(){
				this.addFromData.status = 1;
				this.submitForm();
			},
			upload(){
				productUpper(this.addFromData.id).then(res => {
					this.$message.success(res.msg)
				}).catch(res =>{
					this.$message.error(res.msg)
				})
			},
			submitForm(){
				//console.log(this.addFromData.areaPath)
				this.$refs.addForm.validate(valid => {
					if(valid){
						if(this.addFromData.areaPath.length>0){
							this.addFromData.areaPath = this.addFromData.areaPath.join('-')
						}else{
							this.addFromData.areaPath = '全国'
						}
						productAdd(this.addFromData).then(res => {
							this.$message.success(res.msg)
							//console.log(res)
							this.addFromData.id = res.data;
							this.saveOk = 2;
							this.addFromData.areaPath = this.formData.areaPath.split('-')
							
						}).catch(res =>{
							this.$message.error(res.msg)
						})
					}
				})
			},
			check(){
				this.$emit('closeDialog')
			},
			update(){
				
				this.$refs.addForm.validate(valid => {
					if(valid){
						if(this.addFromData.areaPath.length>0){
							this.addFromData.areaPath = this.addFromData.areaPath.join('-')
						}else{
							this.addFromData.areaPath = '全国'
						}
						productUpdate(this.addFromData).then(res => {
							this.$message.success(res.msg)
							this.$emit('closeDialog')
						}).catch(res =>{
							this.$message.success(res.msg)
						})
					}
				})

			},
			selectChange(val){
				if(val === '其它'){
					this.addFromData.repayment = ''
				}else{
					this.addFromData.repayment = val
				}

			},
			/*areaChange(val){
				//console.log(val)
				val.some(item => {
					if(item === '全国'){
						condole.log()
					}
				})
			},*/
		},
	}
</script>
<style scoped="scoped" lang="scss">
	.el-input,.el-select,.el-cascader {
			width: 200px
	}
	.el-form-item__error {
		margin-left:60px
	}
	.el-form {
		width: 80%;
		margin: 0 auto;
		padding: 10px;
		border: 1px solid #ddd;
		box-shadow: 0 0 1px #ddd
	}
	.mobile-el-form{
		width: 100%;
		margin: 0 auto;
		padding: 10px;
	}
</style>
<style lang="scss">
	.quill-editor {
		min-height: 600px;
		.ql-container {
			min-height: 150px;
		}
	}
	.mobile-el-form{
		.el-form-item__label{
			font-size: 12px;
		}
	}

	.limit {
		height: 30px;
		border: 1px solid #ccc;
		line-height: 30px;
		text-align: right;

		span {
			color: #ee2a7b;
		}
	}

	.ql-snow .ql-picker {
		height: 42px
	}

	.ql-snow .ql-editor img {
		max-width: 200px;
	}

	.ql-editor .ql-video {
		max-width: 200px;
	}
</style>
