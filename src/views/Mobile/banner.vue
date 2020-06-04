<template>
	<div class="boxShadow">
		<el-row v-if="device === 'desktop'" :gutter="20">
			<el-col :span="3">
				<el-input v-model="filterData.title" placeholder="标题"></el-input>
			</el-col>
			<el-col :span="3">
				<el-select v-model="filterData.delflag" placeholder="请选择" @change='selectChange'>
					<el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
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
				<el-button type="primary" @click="addBanner">新增</el-button>
			</el-col>
		</el-row>
		<template v-else>

			<el-row :gutter="20" class="card-list">
				<el-col :span="12">
					<el-input v-model="filterData.title" placeholder="标题"></el-input>
				</el-col>
				<el-col :span="12">
					<el-select v-model="filterData.delflag" placeholder="请选择" @change='selectChange'>
						<el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="24" style="text-align: left;">
					<el-date-picker
						v-model="filterData.createDate"
						type="date"
						placeholder="创建时间"
						value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="24">
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="reset">重置</el-button>
					<el-button type="primary" @click="addBanner">新增</el-button>
				</el-col>
			</el-row>
		</template>

		<div v-if="device === 'desktop'" >
			<el-table ref="multipleTable" :data="tableData"
					  tooltip-effect="dark" style="width: 100%" border>
				<el-table-column prop="id" label="ID" width="50">
				</el-table-column>
				<el-table-column prop="title" label="标题" width="">
				</el-table-column>
				<el-table-column prop="imgUrl" label="图片地址" show-overflow-tooltip width="450">
				</el-table-column>
				<el-table-column prop="ordinal" label="排序" show-overflow-tooltip width="">
				</el-table-column>
				<el-table-column prop="delflag" label="状态" show-overflow-tooltip width="">
					<template slot-scope="scope">{{ scope.row.delFlag === 1? "有效" : "无效" }}</template>
				</el-table-column>
				<el-table-column prop="createUserName" label="创建人" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="createDate" label="创建时间" show-overflow-tooltip width="200">
				</el-table-column>
				<el-table-column prop="" label="操作" show-overflow-tooltip width="" fixed="right" width="150">
					<template slot-scope="scope">
						<el-button @click.native.prevent="check(scope.row)" type="text" size="small">
							查看
						</el-button>
						<el-button @click.native.prevent="edit(scope.row)" type="text" size="small">
							修改
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filterData.pageNum"
			 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 class='zIndex9'>
			</el-pagination>
		</div>

		<template v-else>
			<div class="infinite-list" ref="infiniteBox" style="overflow:auto">
				<el-card v-infinite-scroll="load" :infinite-scroll-immediate="false"
						 :infinite-scroll-disabled="disabled"
						 infinite-scroll-distance="1"
						 class="box-card" v-for="(item,index) in tableData" :key="item.id">
					<div slot="header" class="clearfix">
						<el-button @click.native.prevent="check(item)" type="text" size="small">
							查看
						</el-button>
						<el-button @click.native.prevent="edit(item)" type="text" size="small">
							修改
						</el-button>
					</div>
					<el-row :gutter="20" class="card-list">
						<el-col :span="24" class="clearfix">
							<p class="fl">ID:</p>
							<p class="fr">{{item.id}}</p>
						</el-col>
						<el-col :span="24" class="clearfix">
							<p class="fl">标题:</p>
							<p class="fr">{{item.title}}</p>
						</el-col>
						<el-col :span="24" class="clearfix">
							<p class="fl">图片地址:</p>
							<p class="fr">{{item.imgUrl}}</p>
						</el-col>
						<el-col :span="24" class="clearfix" >
							<p class="fl">排序:</p>
							<p class="fr">{{item.ordinal}}</p>
						</el-col>
						<el-col :span="24" class="clearfix" >
							<p class="fl">状态:</p>
							<p class="fr">{{ item.delFlag === 1? "有效" : "无效"  }}</p>
						</el-col>
						<el-col :span="24" class="clearfix" >
							<p class="fl">创建人:</p>
							<p class="fr">{{ item.createUserName }}</p>
						</el-col>
						<el-col :span="24" class="clearfix" >
							<p class="fl">创建时间:</p>
							<p class="fr">{{ item.createDate }}</p>
						</el-col>
					</el-row>
				</el-card>

				<p v-if="loading">加载中...</p>
				<p v-if="tableData.length == 0">暂无数据</p>
				<template v-else>
					<p v-if="noMore">没有更多了</p>
				</template>
			</div>
		</template>

		<el-dialog title="轮播图" :visible.sync="dialogVisible" :width="device === 'desktop'?'70%':'100%'" :before-close="handleClose">
			<el-form v-if="device === 'desktop'" ref="addForm" :label-position="labelPosition" label-width="150px" :model="addForm" :rules='rules'>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="banner标题" prop="title">
							<el-input v-model="addForm.title" :disabled='checkOrEdit===1'></el-input>
						</el-form-item>
					</el-col>		
					<el-col :span="12">
						<el-form-item label="banner排序" prop="ordinal">
							<el-input v-model.number="addForm.ordinal" :disabled='checkOrEdit===1'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="banner状态" prop="delflag">
							<el-select v-model="addForm.delFlag" placeholder="请选择" :disabled='checkOrEdit===1'>
								<el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>	
					<el-col :span="12">
						<el-form-item label="banner图片地址" prop="imgUrl">
							<el-input v-model="addForm.imgUrl" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="18">
					<el-form-item label="上传图片">
						<el-upload
							class="upload-demo"
							ref="upload"
							:action="imgUpUrl"
							:limit='1'
							:headers="header"
							:file-list="fileList"
							:before-upload="beforeUpload"
							:on-success='uploadSuccess'
							:auto-upload="false"
							:disabled='checkOrEdit===1'
							list-type="picture">
							<el-button size="small" slot="trigger" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
						</el-upload>						
					</el-form-item>
				</el-col>
				<el-col :span="20">
					<el-form-item>
						<el-button type="primary" @click="save" v-if='checkOrEdit===2'>保存</el-button>
						<el-button type="primary" @click="update" v-if='checkOrEdit===3'>确定</el-button>
						<el-button type="denger" @click="cancel">取消</el-button>
					</el-form-item>
				</el-col>
				</el-row>
			</el-form>
			<el-form v-else ref="addForm"
					 :label-position="labelPosition"
					 label-width="80px" :model="addForm" :rules='rules'>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="banner标题" prop="title">
							<el-input v-model="addForm.title" :disabled='checkOrEdit===1'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="banner排序" prop="ordinal">
							<el-input v-model.number="addForm.ordinal" :disabled='checkOrEdit===1'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="banner状态" prop="delflag">
							<el-select v-model="addForm.delFlag" placeholder="请选择" :disabled='checkOrEdit===1'>
								<el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="banner图片地址" prop="imgUrl">
							<el-input v-model="addForm.imgUrl" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
					<el-form-item label="上传图片">
						<el-upload
							class="upload-demo"
							ref="upload"
							:action="imgUpUrl"
							:limit='1'
							:headers="header"
							:file-list="fileList"
							:before-upload="beforeUpload"
							:on-success='uploadSuccess'
							:auto-upload="false"
							:disabled='checkOrEdit===1'
							list-type="picture">
							<el-button size="small" slot="trigger" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
						</el-upload>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item>
						<el-button type="primary" @click="save" v-if='checkOrEdit===2'>保存</el-button>
						<el-button type="primary" @click="update" v-if='checkOrEdit===3'>确定</el-button>
						<el-button type="denger" @click="cancel">取消</el-button>
					</el-form-item>
				</el-col>
				</el-row>
			</el-form>

		</el-dialog>

	</div>
</template>

<script>
	import { bannerPage, bannerAdd, bannerUpdate } from '@/api/req'
	import { imgUpUrl } from '@/api/common'
	import {getTokenStorage} from '@/api/cookies'
	export default {
		data() {
			return {
			    loading: false,
				imgUpUrl: imgUpUrl,
				fileList: [],
				header:{
					Authorization: getTokenStorage()
				},
				tableData: [], //表格数据
				status:[{
					id:1,
					name: "有效"
				},{
					id:2,
					name: "无效"
				}],
				filterData: { //请求条件
					createDate:'',//创建日期
					title:'',//banner的标题
					delFlag:'',//状态 1-有效 2-无效
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				},
				total: null, //总条数
				dialogVisible:false,
				labelPosition:'right',
				checkOrEdit:1,//1 check   2 add 3 update
				addForm: { //新增信息
					imgUrl:'',//banner图片地址
					title:'',//banner的标题
					delFlag:1,//状态 1-有效 2-无效
					ordinal:1,
					id:null,
				},
				rules:{
					imgUrl: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					ordinal: [{
						required: true,
						message: '请输入排序',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}]
				}
			}
		},
		created() {
			this.sendReq();
		},
		methods: {
			load() {
			    this.loading = true;
				this.filterData.pageNum ++;
				this.sendReq();
			},
			handleSizeChange(val) {
				this.filterData.pageSize = val
				this.sendReq();
			},
			handleCurrentChange(val) {
				this.filterData.pageNum = val
				this.sendReq();
			},
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
				this.addForm.imgUrl = response.data;
			},
			sendReq() {
				bannerPage(this.filterData).then(res => {
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

					this.$message.success(res.msg);
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
					title:'',//banner的标题
					delFlag:'',//状态 1-有效 2-无效
					pageNum: 1, //当前页码
					pageSize: 10 //每页条数
				}
				this.$set(this,'tableData',[]);
				this.$refs.infiniteBox.scrollTop=0;
				this.sendReq();
			},
			addBanner(){				
				this.dialogVisible = true;
				this.checkOrEdit = 2;
				this.fileList = [];
				//this.$refs.addForm.resetFields();
				this.addForm = { //新增信息
					imgUrl:'',//banner图片地址
					title:'',//banner的标题
					delFlag:1,//状态 1-有效 2-无效
					ordinal:1,
					id:null,
				}
			},
			edit(row){
				this.addForm = row;
				//console.log(this.addForm)
				this.dialogVisible = true;
				this.checkOrEdit = 3;
			},
			check(row){
				this.addForm = row;
				
				this.dialogVisible = true;
				this.checkOrEdit = 1;
			},
			save(){
				this.$refs.addForm.validate(valid => {
					if(valid){
						bannerAdd(this.addForm).then(res => {
							this.dialogVisible = false;
							this.$refs.addForm.clearValidate();
							this.$message.success(res.msg);
							this.sendReq();							
						}).catch(res => {
							this.$message.error(res.msg)
						})
					}					
				})				
			},
			cancel(){
				this.dialogVisible = false;
				this.$refs.addForm.clearValidate();
			},
			update(scope){
				this.$refs.addForm.validate(valid => {
					if(valid){
						//console.log(this.addForm)
						bannerUpdate(this.addForm).then(res => {
							this.dialogVisible = false;
							this.$refs.addForm.clearValidate();
							this.$message.success(res.msg);
							this.sendReq()
						}).catch(res => {
							this.$message.error(res.msg)
						})
					}					
				})				
			}
		},
		computed:{
			device(){ return this.$store.state.device },
			noMore (){ return this.total <= this.tableData.length;},
			disabled (){ return this.loading || this.noMore}
		}
	}
</script>

<style lang="scss">
	.el-table {
		margin-top:20px
	}
	.el-dialog{
		.el-input,.el-select,.el-cascader {
			width: 200px
		}
	}
	
</style>
