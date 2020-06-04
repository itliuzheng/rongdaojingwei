<template>
	<div v-if="device === 'desktop'">
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
			<el-table-column prop="id" label="审核编号" width="150">
			</el-table-column>
			<el-table-column prop="userName" label="审核人" show-overflow-tooltip width="200" v-if="userRole!='second'">
			</el-table-column>
			<el-table-column prop="createDate" label="审核时间" show-overflow-tooltip width="200" v-if="userRole!='second'">
			</el-table-column>
			<el-table-column prop="description" label="审核意见" show-overflow-tooltip width="120">
			</el-table-column>
			<el-table-column prop="type" label="审核类型" show-overflow-tooltip width="120" :formatter='formatterType'>
			</el-table-column>
			<el-table-column prop="status" label="状态" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.status === 0 ? "拒绝" : "通过"}}</template>
			</el-table-column>								
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="postData.pageNum"
		 :page-sizes="[10, 15, 20, 30]" :page-size="postData.pageSize" layout="total, sizes, prev, pager, next, jumper"
		 :total="total" class='zIndex9'>
		</el-pagination>
	</div>
	<div v-else>

		<el-card class="box-card" v-for="(item,index) in tableData" :key="item.id">
			<el-row :gutter="20" class="card-list">
				<el-col :span="24" class="clearfix">
					<p class="fl">审核编号:</p>
					<p class="fr">{{item.id}}</p>
				</el-col>
				<el-col :span="24" class="clearfix" v-if="userRole!='second'">
					<p class="fl">审核人:</p>
					<p class="fr">{{item.userName}}</p>
				</el-col>
				<el-col :span="24" class="clearfix" v-if="userRole!='second'">
					<p class="fl">审核时间:</p>
					<p class="fr">{{item.createDate}}</p>
				</el-col>
				<el-col :span="24" class="clearfix" >
					<p class="fl">审核意见:</p>
					<p class="fr">{{item.description}}</p>
				</el-col>
				<el-col :span="24" class="clearfix" >
					<p class="fl">审核类型:</p>
					<p class="fr">{{formatterType(item)}}</p>
				</el-col>
				<el-col :span="24" class="clearfix" >
					<p class="fl">状态:</p>
					<p class="fr">{{item.status === 0 ? "拒绝" : "通过"}}</p>
				</el-col>
			</el-row>
		</el-card>
		<el-pagination  @current-change="handleCurrentChange" :current-page="postData.pageNum"
		 :page-sizes="[10, 15, 20, 30]" :page-size="postData.pageSize" layout="total, prev, pager, next, jumper"
		 :total="total" class='zIndex9'>
		</el-pagination>
	</div>
</template>

<script>
	import { historyPage } from '@/api/req'
	import { verifyType, formatter } from '@/api/common'
	export default {
		name: 'componentReviewLogCom',
		props: ["reviewLogData"],
		data(){
			return {
				tableData:[],
				verifyType: verifyType,
				postData: {
					applicationNumber:null,
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
				},
				total: null,
			}
		},
		computed: {
			_id:function(){
				return this.reviewLogData.number
			},
			device() {return this.$store.state.device;},
		},
		created(){
			this.getHistory()
		},
		mounted() {

		},
		methods:{
			handleSizeChange(val) {
				this.postData.pageSize = val
				this.getHistory();
			},
			handleCurrentChange(val) {
				this.postData.pageNum = val
				this.getHistory();
			},
			getHistory(){
				this.postData.applicationNumber = this._id;
				historyPage(this.postData).then(res => {
					//console.log(res)
					this.tableData = res.data.records
					this.total = res.data.total;
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},
			formatterType(row,column){
				return formatter(row.type,this.verifyType)
			}
		}
	}
</script>

<style>
</style>