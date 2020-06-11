<template>
	<div class="boxShadow">
		<div v-if="role === 'first'">

			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.loginName" placeholder="用户账号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.realName" placeholder="用户姓名"></el-input>
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
					<el-button type="" @click="add">新增用户</el-button>
				</el-col>
			</el-row>
			<template v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border >
					<el-table-column prop="id" label="序号" width="120">
					</el-table-column>
					<el-table-column prop="loginName" label="用户账号" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="realName" label="用户姓名" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="mobile" label="手机号" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="email" label="邮箱" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="officeName" label="所属机构" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="createName" label="创建人" show-overflow-tooltip width="">
					</el-table-column>
					<el-table-column prop="" label="操作" show-overflow-tooltip width="" fixed="right">
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
			</template>

			<template v-else>

					<my-scroll :scrollColumns="scrollColumns"
							:tableData="tableData"
							:scrollButtonList="scrollButtonList"
							@refreshScroll="refreshLoad"
							@loadScroll="loadStart"></my-scroll>

			</template>

		</div>
		<el-tabs type="border-card" v-if="role === 'super'">
  			<el-tab-pane label="一级用户">
  				<el-row :gutter="20">
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterData.loginName" placeholder="用户账号"></el-input>
					</el-col>
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterData.realName" placeholder="用户姓名"></el-input>
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
						<el-button type="" @click="add">新增用户</el-button>
					</el-col>
				</el-row>
				<template v-if="device === 'desktop'">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
						<el-table-column prop="id" label="序号" width="">
						</el-table-column>
						<el-table-column prop="loginName" label="用户账号" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="realName" label="用户姓名" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="mobile" label="手机号" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="email" label="邮箱" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="officeName" label="所属机构" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="secondaryCount" label="下属数量" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="createName" label="创建人" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="" label="操作" show-overflow-tooltip  fixed="right" width="200">
							<template slot-scope="scope">
								<el-button @click.native.prevent="del(scope.row)" type="text" size="small">
									删除
								</el-button>
								<el-button @click.native.prevent="update(scope.row)" type="text" size="small">
									修改
								</el-button>
								<el-button @click.native.prevent="resetPass(scope.row)" type="text" size="small">
									密码重置
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.pageNum"
					 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
					 :total="total" class='zIndex9'>
					</el-pagination>
				</template>
				<template v-else>

					<my-scroll :scrollColumns="scrollColumnsSuper"
							:tableData="tableData"
							:scrollButtonList="scrollButtonListSuper"
							@refreshScroll="refreshLoad"
							@loadScroll="loadStart"></my-scroll>

				</template>

  			</el-tab-pane>
  			<el-tab-pane label="二级用户">
  				<el-row :gutter="20">
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterDataSuperS.loginName" placeholder="用户账号"></el-input>
					</el-col>
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterDataSuperS.realName" placeholder="用户姓名"></el-input>
					</el-col>
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterDataSuperS.mobile" placeholder="手机号"></el-input>
					</el-col>
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterDataSuperS.email" placeholder="邮箱"></el-input>
					</el-col>
					<el-col :span="device === 'desktop'?'4':'12'">
						<el-input v-model="filterDataSuperS.officeName" placeholder="所属机构"></el-input>
					</el-col>
					<el-col :span="device === 'desktop'?'8':'24'">
						<el-button type="primary" @click="querySuperS">查询</el-button>
						<el-button type="success" @click="resetSuperS">重置</el-button>
					</el-col>
				</el-row>
				<template v-if="device === 'desktop'">
					<el-table :data="tableDataSuperS" tooltip-effect="dark" style="width: 100%" border>
						<el-table-column prop="id" label="序号" width="120">
						</el-table-column>
						<el-table-column prop="loginName" label="用户账号" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="realName" label="用户姓名" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="mobile" label="手机号" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="email" label="邮箱" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="officeName" label="所属机构" show-overflow-tooltip width="">
						</el-table-column>
						<el-table-column prop="createName" label="创建人" show-overflow-tooltip width="">
						</el-table-column>
						<!--<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
							<template slot-scope="scope">
								<el-button @click.native.prevent="del(scope.row)" type="text" size="small">
									删除
								</el-button>
								<el-button @click.native.prevent="update(scope.row)" type="text" size="small">
									修改
								</el-button>
							</template>
						</el-table-column>-->
					</el-table>
					<el-pagination @size-change="handleSizeChangeSuperS" @current-change="handleCurrentChangeSuperS" :current-page="filterDataSuperS.pageNum"
					 :page-sizes="[10, 15, 20, 30]" :page-size="filterDataSuperS.pageSize" layout="total, sizes, prev, pager, next, jumper"
					 :total="totalSuperS" class='zIndex9'>
					</el-pagination>
				</template>
				<template v-else>

					<my-scroll :scrollColumns="scrollColumns"
							:tableData="tableDataSuperS"
							@refreshScroll="refreshLoadSuperS"
							@loadScroll="loadStartSuperS"></my-scroll>

				</template>

  			</el-tab-pane>
		</el-tabs>

		<el-dialog title="用户" :visible.sync="dialogVisible" :width="device === 'desktop'?'70%':'100%'" @close="handleClose">
			<el-form ref="addForm" :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="addFromData" :rules="rules">
				<el-row :gutter="20">
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="用户账号" prop="loginName">
							<el-input v-model="addFromData.loginName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="用户姓名" prop="realName">
							<el-input v-model="addFromData.realName"></el-input>
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
					<el-col :span="device === 'desktop'?'12':'24'">
						<el-form-item label="所属机构" prop="officeName">
							<el-input v-model="addFromData.officeName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'" v-if="role === 'super'">
						<el-form-item label="权限" prop="email">
							<el-input disabled value="一级管理员"></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span="device === 'desktop'?'12':'24'" v-if="role === 'first'">
						<el-form-item label="权限" prop="">
							<el-input disabled value="二级管理员"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="device === 'desktop'?'12':'24'" v-if="role === 'super'">
						<el-form-item label="下属数量" prop="secondaryCount">
							<el-input v-model.number="addFromData.secondaryCount"></el-input>
						</el-form-item>
					</el-col>
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
	import { sysUserPage, sysUserAdd, sysUserDel, sysUserUpdate, pageSecondaryAll, resetFirstLevel } from '@/api/req'
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
			const less5= (rule, value, callback) => {
				if(value < 5){
					callback(new Error('数量不得少于5！'))
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
				role: this.$store.state.userInfo.roles[0],
				tableData: [], //表格数据
				tableDataSuperS: [], //表格数据 
				filterData: { //请求条件
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//roleId: null, //权限
					officeName: '', //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				total: null, //总条数
				
				filterDataSuperS: { //请求条件
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//roleId: null, //权限
					officeName: '', //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				totalSuperS: null, //总条数
				//department: [],//部门
				//roleType: roleType,
				dialogVisible: false,
				labelPosition: 'right',
				addOrupdate: 1,//1新增  2更新
				addFromData: { //新增信息
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					//roleId: '', //权限
					officeName: '', //所属机构
					//id:null,
					secondaryCount: 5,//下属数量
				},
				rules: {
					loginName: [{
						required: true,
						trigger: 'blur',
						message: '请输入登录账号',
					}],
					realName: [{
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
					officeName: [{
						required: true,
						trigger: 'blur',
						message: '请输入所属部门',
					}],
					secondaryCount: [{
						required: true,
						trigger: 'blur',
						message: '请输入下属数量',
					},{
						type: 'number',
						trigger: 'blur',
					},{
						type: 'number',
						validator: less5
					}]
				},

				scrollColumns:[
					{
						label: 'ID:',
						prop:'id',
						widthPart:24
					},
					{
						label: '用户账号:',
						prop:'loginName',
						widthPart:24
					},
					{
						label: '用户姓名:',
						prop:'realName',
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

				scrollColumnsSuper:[
					{
						label: 'ID:',
						prop:'id',
						widthPart:24
					},
					{
						label: '用户账号:',
						prop:'loginName',
						widthPart:24
					},
					{
						label: '用户姓名:',
						prop:'realName',
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
						label: '下属数量:',
						prop:'secondaryCount',
						widthPart:24
					},
					{
						label: '创建人:',
						prop:'createName',
						widthPart:24
					}
				],
				scrollButtonListSuper:[
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
					},
					{
						type: 'text',
						text: '密码重置',
						isShow:true,
						atClick: row => {
							this.resetPass(row);
						}
					}
				],

			}
		},
		created() {
			this.sendReq();
			if(this.role === 'super'){
				this.sendReqSuperS();
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
			handleSizeChangeSuperS(val) {
				this.filterDataSuperS.pageSize = val
				this.sendReqSuperS();
			},
			handleCurrentChangeSuperS(val) {
				this.filterDataSuperS.pageNum = val
				this.sendReqSuperS();
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


			refreshLoadSuperS() {
			    this.filterDataSuperS.pageNum = 1;
				this.sendReqSuperS();
			},
			loadStartSuperS() {
			    if(this.noMorePer){
			        Bus.$emit('loadEndPer',this.noMorePer);
			        return ;
				}
				this.filterDataSuperS.pageNum ++;
			    this.sendReqSuperS();
			},



			sendReq() {
				sysUserPage(this.filterData).then(res => {
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
			sendReqSuperS() {
				pageSecondaryAll(this.filterDataSuperS).then(res => {
					if(this.device === 'mobile'){
						if(this.filterDataSuperS.pageNum == 1){
							this.$set(this,'tableDataSuperS',res.data.records);
						    Bus.$emit('refreshEndSuperS');
						}else{
							this.$set(this,'tableDataSuperS',this.tableDataSuperS.concat(res.data.records));
						    Bus.$emit('loadEndSuperS',false);
						}
						this.totalSuperS = res.data.total;
					}else{
						this.tableDataSuperS = res.data.records;
						this.totalSuperS = res.data.total;
					}
				}).catch(res => {

				})
			},
			query() {
				this.sendReq();
			},
			reset() {
				this.filterData = {
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					roleId: '', //权限
					officeName: '', //所属机构
					//amount: [], //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				};
				this.sendReq();
			},
			querySuperS() {
				this.sendReqSuperS();
			},
			resetSuperS() {
				this.filterDataSuperS = {
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					roleId: '', //权限
					officeName: '', //所属机构
					//amount: [], //所属机构
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				};
				this.sendReqSuperS();
			},
			add(){
				this.addFromData = { //新增信息
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					roleId: '', //权限
					officeName: '', //所属机构
					secondaryCount: 5,//下属数量
					//id:null,
				},	
				this.dialogVisible = true;
				this.addOrupdate = 1;
			},
			update(scope){
				this.addFromData = scope;
				//console.log(this.addFromData)
				this.dialogVisible = true;
				this.addOrupdate = 2;
			},
			del(scope){
				sysUserDel(scope.id).then(res => {
					this.$message.success(res.msg);
					this.sendReq();
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},
			addSubmitForm(){
				this.$refs.addForm.validate(valid => {
					if(valid){
						//console.log(this.addFromData)
						sysUserAdd(this.addFromData).then(res => {
							this.dialogVisible = false;
							this.$message.success(res.msg);
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
						sysUserUpdate(this.addFromData).then(res => {
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
					loginName: '', //用户账号
					realName: '', //用户姓名
					mobile: '', //手机号
					email: '', //邮箱
					roleId: '', //权限
					officeName: '', //所属机构
					secondaryCount: 5,//下属数量
					//id:null,
				}
				this.$refs.addForm.clearValidate();
			},
			resetPass(scope){
				this.$confirm(					
					'确定重置该账号密码？',
					{
						confirmButtonText:'确定',
						cancelButtonText: '取消',
						type:'warning'

					}
				).then(() => {
					let postData = {};
					postData.userId = scope.id;
					resetFirstLevel(postData).then(res => {
						this.$message.success(res.msg);						
					})
				})
			}
		},
		computed:{
			device() {return this.$store.state.device;},
			noMoreSuperS () {return this.total <= this.tableDataSuperS.length;},
			noMore () {return this.total <= this.tableData.length;},
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
