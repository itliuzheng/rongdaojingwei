<template>	
	<el-tabs type="border-card" @tab-click="changeTab">
		<el-tab-pane label="企业">
			<componentPageCom ref='pageCom' :menuIndex='2' :role='role' :level='2' :status='status' :start='startType' :reviewButton='reviewButton' :reviewLogButton='reviewLogButton' @chakan='look' @shenheLog='verifyLog'></componentPageCom>
			<el-dialog title="查看审核" :visible.sync="dialogCom" :width="device === 'desktop'?'70%':'100%'" v-if='dialogCom'>
				<componentFormCom ref='formCom' :formData='formData' :lookOrReview='lookOrReview' :withReview='withReview' @close='close'></componentFormCom>
			</el-dialog>
			<el-dialog title="查看审核记录" :visible.sync="dialogComLog" :width="device === 'desktop'?'70%':'100%'" v-if='dialogComLog'>
				<componentReviewLogCom :reviewLogData='reviewLogData'></componentReviewLogCom>
			</el-dialog>
		</el-tab-pane>
		<el-tab-pane label="个人">
			<componentPagePer ref='pagePer' :menuIndex='2' :role='role' :level='1' :status='status' :start='startType' :reviewButton='reviewButton' :reviewLogButton='reviewLogButton' @chakan='lookPer' @shenheLog='verifyLogPer'></componentPagePer>
			<el-dialog title="查看审核" :visible.sync="dialogPer" :width="device === 'desktop'?'70%':'100%'" v-if='dialogPer'>
				<componentFormPer ref='formPer' :formData='formData' :lookOrReview='lookOrReview' :withReview='withReview' @close='closePer'></componentFormPer>
			</el-dialog>
			<el-dialog title="查看审核记录" :visible.sync="dialogPerLog" :width="device === 'desktop'?'70%':'100%'" v-if='dialogPerLog'>
				<componentReviewLogPer :reviewLogData='reviewLogData'></componentReviewLogPer>
			</el-dialog>
		</el-tab-pane>		 
	</el-tabs>
</template>

<script>
	import componentPageCom from '@/views/Financing/components/pageCom.vue'
	import componentPagePer from '@/views/Financing/components/pagePer.vue'
	import componentFormCom from '@/views/Financing/components/formCom.vue'
	import componentFormPer from '@/views/Financing/components/formPer.vue'
	import componentReviewLogCom from '@/views/Financing/components/reviewLogCom.vue'
	import componentReviewLogPer from '@/views/Financing/components/reviewLogPer.vue'
	export default {
		components: {
			componentPageCom,
			componentPagePer,
			componentFormCom,
			componentFormPer,
			componentReviewLogCom,
			componentReviewLogPer
		},
		data() {
			return {
				role:this.$store.state.userInfo.roles[0],
				dialogCom: false,
				dialogPer: false,
				dialogComLog: false,
				dialogPerLog: false,
				formData: {},
				reviewLogData: [],
				lookOrReview:1,//1 查看  2 审核
				startType: 2,//判断登录角色登记
				status:30,	//申请状态
				withReview:true,//查看带审核结果  
				reviewButton:false,//审核按钮
				reviewLogButton:true,//审核记录按钮
				deleteLogButton: true,//删除按钮
			}	
		},
		created() {
			if(this.role != 'second'){
				this.startType = ''	
			}
			if(this.role === 'first'){
				this.status = 11;
			}
			if(this.role === 'super'){
				this.status = 21;
			}
		},
		methods: {
			look($event){
				this.formData = $event;
				//console.log(this.formData)
				this.dialogCom = true;
				this.lookOrReview = 1
			},
			/*verify($event){
				//console.log(2222222)
				this.formData = $event.row
				this.dialogCom = true
				this.lookOrReview = 2
			},*/
			verifyLog($event){
				this.dialogComLog = true;
				this.reviewLogData = $event;
				//console.log(this.reviewLogData)
			},
			close(){
				this.dialogCom = false
			},			
			/*reviewOk(){
				this.dialogCom = false;
				this.$refs.pageCom.sendReq();
			},*/
			
			lookPer($event){
				//console.log($event)
				this.formData = $event;
				this.dialogPer = true;
				this.lookOrReview = 1
			},
			verifyLogPer($event){
				this.dialogPerLog = true;
				this.reviewLogData = $event;
			},
			/*verifyPer($event){
				this.dialogPer = true
				this.formData = $event.row
				this.lookOrReview = 2
			},*/
			/*reviewOkPer(){
				this.dialogPer = false;
				this.$refs.pagePer.sendReq();
			},*/
			closePer(){
				this.dialogPer = false
			},
		},
		computed:{
			device() {return this.$store.state.device;},
		}
	}
</script>

<style scoped="scoped">

</style>
