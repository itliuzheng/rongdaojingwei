<template>
	<div class="boxShadow">
		<el-row :gutter="20">
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.name" placeholder="业务员姓名"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.mobile" placeholder="手机号"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.email" placeholder="邮箱"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'4':'12'">
				<el-input v-model="filterData.officeName" placeholder="所属机构"></el-input>
			</el-col>
			<el-col :span="device === 'desktop'?'8':'24'">
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="success" @click="reset">重置</el-button>
				<el-button type="" @click="add"  v-if="loginRole != 'super'">新增业务员</el-button>
			</el-col>
		</el-row>

		<div v-if="device === 'desktop'">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
				<el-table-column prop="coding" label="识别码" width="">
				</el-table-column>
				<el-table-column prop="name" label="业务员姓名" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="mobile" label="手机号" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip width="300">
				</el-table-column>
				<el-table-column prop="officeName" label="所属机构" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="createDate" label="创建时间" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="createName" label="创建人" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="" label="操作" show-overflow-tooltip width="" v-if="loginRole != 'super'" fixed="right">
					<template slot-scope="scope">
						<el-button @click.native.prevent="del(scope.row)" type="text" size="small">
							删除
						</el-button>
						<el-button @click.native.prevent="update(scope.row)" type="text" size="small">
							修改
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
					:scrollButtonList="scrollButtonList"
					@refreshScroll="refreshLoad"
					@loadScroll="loadStart"></my-scroll>

		</template>

		<el-dialog title="业务员" :visible.sync="dialogVisible" :width="device === 'desktop'?'70%':'100%'" @close="handleClose">
			<el-form ref="addForm" :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="addFromData" :rules="rules">
				<el-row :gutter="20">
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="业务员姓名" prop="name">
							<el-input v-model="addFromData.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="addFromData.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="addFromData.email"></el-input>
						</el-form-item>
					</el-col>
					<!--<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="所属机构" prop="officeName">
							<el-input v-model="addFromData.officeName"></el-input>
						</el-form-item>
					</el-col>-->
					<el-col :span="device === 'desktop'?'20':'24'">
						<el-form-item>
							<el-button type="primary" @click="submitForm" v-if="addOrupdate === 2">提交</el-button>
							<el-button type="primary" @click="addSubmitForm" v-if="addOrupdate === 1">新增</el-button>
							<el-button @click="resetForm()">重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Bus from '@/unit/bus.js'
	import { salesmanPage, salesmanAdd, salesmanDelete, salesmanUpdate } from '@/api/req'
		import { roleType, formatter } from '@/api/common'
		import { regPhone, noEmpty, regEmail } from '@/api/reg'
    import MyScroll from "@/components/MyScroll";

	export default {
		components: {
			MyScroll
			//loadSet
		},
		data() {
			const validateMobile = (rule, value, callback) => {
				if(!regPhone(value)){
					callback(new Error('请输入手机号码！'))
				}else{
					callback()
				}
			}
			const validateEmail = (rule, value, callback) => {
				if(!regEmail(value)){
					callback(new Error('邮箱不正确！'))
				}else{
					callback()
				}
			}
			return {
				loginRole: this.$store.state.userInfo.roles[0],
				tableData: [], //表格数据
				filterData: { //请求条件
					name: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//officeName: '', //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				total: null, //总条数
				department: [],//部门
				//roleType: roleType,
				dialogVisible: false,
				labelPosition: 'right',
				addOrupdate: 1,//1新增  2更新
				addFromData: { //新增信息
					name: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//officeName: '', //所属机构
					id:null,
				},
				rules: {
					name: [{
						required: true,
						trigger: 'blur',
						message: '请输入真实姓名',
					}],
					mobile: [{
						required: true,
						trigger: 'blur',
						validator: validateMobile
					}],
					email: [{
						required: true,
						trigger: 'blur',
						validator: validateEmail
					}],
					/*officeName: [{
						required: true,
						trigger: 'blur',
						message: '请输入所属部门',
					}],*/
				},

				scrollColumns:[
					{
						label: '识别码1:',
						prop:'coding',
						widthPart:24
					},
					{
						label: '业务员姓名:',
						prop:'name',
						widthPart:24
					},
					{
						label: '手机号:',
						prop:'mobile',
						widthPart:24
					},
					{
						label: '邮箱:',
						prop:'email',
						widthPart:24
					},
					{
						label: '所属机构:',
						prop:'officeName',
						widthPart:24
					},
					{
						label: '创建时间:',
						prop:'createDate',
						widthPart:24
					},
					{
						label: '创建人:',
						prop:'createName',
						widthPart:24
					}
				],
				scrollButtonList:[
					{
						type: 'text',
						text: '删除',
						isShow:true,
						atClick: row => {
							this.del(row);
						}
					},
					{
						type: 'text',
						text: '修改',
						isShow:true,
						atClick: row => {
							this.update(row);
						}
					}
				],
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
			formatterDepart(row, column){
				return formatter(row.officeName,this.department)
			},
			/*formatterRole(row, column){
				return formatter(row.roleName,this.roleType)
			},*/
			handleClose(){
				this.$refs.addForm.clearValidate();
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
			query() {
				this.sendReq();
			},
			reset() {
				this.filterData = {
					name: '', //用户姓名
					mobile: '', //手机号
					//officeName: '', //所属机构
					amount: [], //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				}
				this.sendReq();
			},
			add(){
				this.addFromData = { //新增信息
					name: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//officeName: '', //所属机构
					id:null,
				},
				this.dialogVisible = true;
				this.addOrupdate = 1;
			},
			update(scope){
				this.addFromData = scope;
				this.dialogVisible = true;
				this.addOrupdate = 2;
			},
			del(scope){
				let post = {};
				post.id =  scope.id;
				salesmanDelete(post).then(res => {
					this.$message.success('删除成功');
					this.sendReq();
				}).catch(res => {
					// this.$message.error(res.msg)
				})
			},
			addSubmitForm(){
				this.$refs.addForm.validate(valid => {
					if(valid){
						//console.log(this.addFromData)
						salesmanAdd(this.addFromData).then(res => {
							this.dialogVisible = false;
							this.$refs.addForm.clearValidate();
							this.sendReq();
						}).catch(res => {
							this.$message.error(res.msg)
						})
					}
				})

			},
			submitForm(){
				this.$refs.addForm.validate(valid => {
					if(valid){
						salesmanUpdate(this.addFromData).then(res => {
							this.dialogVisible = false;
							this.$refs.addForm.clearValidate();
							this.sendReq();
						}).catch(res => {
							this.$message.error(res.msg)
						})
					}
				})

			},
			resetForm(){
				this.addFromData = { //新增信息
					name: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//officeName: '', //所属机构
					id:null,
				}
				this.$refs.addForm.clearValidate();
			}
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
		.el-dialog .el-col {
			margin-bottom: 0;
		}
		.el-dialog .el-input,.el-dialog .el-select {
			width:200px
		}
	</style>
	<style>
		.el-form-item__error {
			margin-left: 50px;
		}
	</style>
