<template>
	<div class="boxShadow">
		<!--<el-row :gutter="20">
			<el-col :span="4">
				<el-select v-model="filterData.position" placeholder="请选择位置">
					<el-option v-for="item in Wposition" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="3">
				<el-input v-model="filterData.createUserName" placeholder="创建人"></el-input>
			</el-col>
			
			<el-col :span="6">
				<el-date-picker
			      	v-model="filterData.createDate"
			      	type="date"
			      	placeholder="创建时间"
			       	value-format="timestamp">
			    </el-date-picker>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="success" @click="reset">重置</el-button>
			</el-col>
			<el-col :span="3">
				<el-button type="primary" @click="addWriteCopy">新增</el-button>
			</el-col>
		</el-row>-->
		<el-table v-if="device === 'desktop'" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
			<!--<el-table-column prop="id" label="ID" width="" >
			</el-table-column>-->
			<el-table-column prop="position" label="位置" width="" :formatter='formatterPOsition'>
			</el-table-column>
			<el-table-column prop="createDate" label="创建时间" show-overflow-tooltip width="">
			</el-table-column>
			<el-table-column prop="content" label="内容" show-overflow-tooltip width="">
			</el-table-column>
<!--			<el-table-column prop="lastUpdateDate" label="最近一次修改时间" show-overflow-tooltip width="">
			</el-table-column>
			<el-table-column prop="updateUserName" label="修改人" show-overflow-tooltip width="120">
			</el-table-column>	-->		
			<el-table-column prop="" label="操作" show-overflow-tooltip width="" fixed="right">
				<template slot-scope="scope">
					<!--<el-button @click.native.prevent="check(scope)" type="text" size="small">
						查看
					</el-button>-->
					<el-button @click.native.prevent="edit(scope.row)" type="text" size="small">
						修改
					</el-button>
					<!--<el-button @click.native.prevent="up(scope)" type="text" size="small">
						删除
					</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<template v-else>
			<el-card class="box-card" v-for="(item,index) in tableData" :key="index">
				<div slot="header" class="clearfix">
					<el-button @click.native.prevent="edit(item)" type="text" size="small">
						修改
					</el-button>
				</div>
				<el-row :gutter="20" class="card-list">
					<el-col :span="24" class="clearfix">
						<p class="fl">位置:</p>
						<p class="fr">{{formatterPOsitionHtml(item)}}</p>
					</el-col>
					<el-col :span="24" class="clearfix">
						<p class="fl">创建时间:</p>
						<p class="fr">{{item.createDate}}</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p class="fl">内容:</p>
					</el-col>
					<el-col :span="24" class="clearfix" >
						<p v-html="item.content"></p>
					</el-col>
				</el-row>
			</el-card>

		</template>
		<!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.pageNum"
		 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 class='zIndex9'>
		</el-pagination>-->
		<el-dialog title="文案" :visible.sync="dialogVisible" :width="device === 'desktop'?'70%':'100%'" :before-close="handleClose">
			<el-form v-if="device === 'desktop'"  ref="addForm" :label-position="labelPosition" label-width="120px" :model="checkData" :rules="addFromRules">
				<el-row :gutter="20">					
					<el-col :span="12">
						<el-form-item label="位置" prop="position">
							<el-select v-model="addFormData.position" placeholder="请选择" disabled>
								<el-option v-for="item in Wposition" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>	
					<el-col :span="24">
						<el-form-item label="编辑文案" prop="materials">
							<quill-editor v-model="addFormData.content" :config="editorOption">
							</quill-editor>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="update">确定</el-button>
							<el-button type="denger" @click="cancel">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-form v-else ref="addForm" :label-position="labelPosition" label-width="80px" :model="checkData" :rules="addFromRules">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="位置" prop="position">
							<el-select v-model="addFormData.position" placeholder="请选择" disabled>
								<el-option v-for="item in Wposition" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="编辑文案" prop="materials">
							<quill-editor class="mobile-quill" v-model="addFormData.content" :config="editorOption">
							</quill-editor>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="update">确定</el-button>
							<el-button type="denger" @click="cancel">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

		</el-dialog>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	
	import { copywritPage, copywritAdd, copywritDel, copywritUpdate } from '@/api/req'
	import { quillEditor } from 'vue-quill-editor'
	import { Wposition, formatter } from "@/api/common"
	export default {
		components:{ quillEditor },
		data() {
			return {
				Wposition: Wposition,
				tableData: [], //表格数据
				/*filterData: { //请求条件
					createDate:'',//创建日期
					createUserName:'',//创建人名称
					position:null,//文案显示的位置
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				total: null, //总条数*/
				dialogVisible:false,
				labelPosition:'right',
				addFormData: { //新增信息
					content:'',	//文案内容
					position:1,	//位置				
				}
			}
		},
		created() {
			this.sendReq();
		},
		methods: {
			/*handleSizeChange(val) {
				this.filterData.pageSize = val
				this.sendReq();
			},
			handleCurrentChange(val) {
				this.filterData.pageNum = val
				this.sendReq();
			},*/
			formatterPOsition(row, column){
				return formatter(row.position,Wposition)
			},
			formatterPOsitionHtml(row){
				return formatter(row.position,Wposition)
			},
			sendReq() {
				copywritPage().then(res => {
					this.tableData = res.data;
//					this.total = res.data.total;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			/*query(){
				this.sendReq();
			},
			reset(){
				this.filterData = {
					createDate:'',//创建日期
					createUserName:'',//创建人名称
					position:null,//文案显示的位置
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				}
			},*/
			/*check(scope){
				this.addFormData = scope.row;
				this.dialogVisible = true;
				this.checkOrEdit = 1;
			},
			save(){
				copywritAdd(this.addFormData).then(res => {
					this.dialogVisible = false;
					this.$refs.addForm.clearValidate();
					this.sendReq()
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},*/
			edit(row){
				this.addFormData = row;
				//this.checkOrEdit = 2;
				this.dialogVisible = true;
			},
			/*del(scope){
				copywritDel(scope.row.id).then(res => {
					this.sendReq()
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},*/
			update(){
				copywritUpdate(this.addFormData).then(res => {
					this.dialogVisible = false;					
					this.sendReq()
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},
			cancel(){this.dialogVisible = false}
			/*addWriteCopy(){
				this.dialogVisible = true;
				this.checkOrEdit = 3;
			},*/
		},
		computed:{
			device(){ return this.$store.state.device },
		}
	}
</script>

<style lang="scss">
	.el-table {
		margin-top:20px
	}
	
	.quill-editor {
		min-height: 300px;
		.ql-container {
			height: 150px;
		}
	}
	.mobile-quill{
		.ql-container {
			min-height: 300px;
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
