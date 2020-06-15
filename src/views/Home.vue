<template>
	<div>
		<div class="home_cont" v-if="role!='first'">

			<el-tabs type="border-card">
			  	<el-tab-pane label="待处理申请">

					<el-row :gutter="20" class='zIndex9'>
						<el-col :span="24">
							<div class="home_apply">
								<h3>待处理申请</h3>
								<el-row :gutter="20">
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.ppendingReview}}</h6>
											<span>个贷待审核</span>
										</div>
									</el-col>
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.ppendingReturn}}</h6>
											<span>个贷被退回</span>
										</div>
									</el-col>
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.bpendingReview}}</h6>
											<span>企贷待审核</span>
										</div>
									</el-col>
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.bpendingReturn}}</h6>
											<span>企贷被退回</span>
										</div>
									</el-col>
								</el-row>
							</div>
						</el-col>
					</el-row>


			  	</el-tab-pane>
			  	<el-tab-pane label="补录待处理申请">

			  		<el-row :gutter="20" class='zIndex9'>
						<el-col :span="24">
								<div class="home_apply">
									<h3>补录待处理申请</h3>
									<el-row :gutter="20" >
										<el-col :span="device === 'desktop'?6:12">
											<div class="grid-content bg-purple">
												<h6>{{statistics.padded}}</h6>
												<span>个贷待补录</span>
											</div>
										</el-col>
										<el-col :span="device === 'desktop'?6:12">
											<div class="grid-content bg-purple">
												<h6>{{statistics.badded}}</h6>
												<span>企贷待补录</span>
											</div>
										</el-col>
									</el-row>
								</div>
							</el-col>
						</el-col>
					</el-row>

			  	</el-tab-pane>
			</el-tabs>

		</div>
		<div class="home_data" v-if="role==='first'">
			<el-tabs type="border-card">
			  	<el-tab-pane label="初审待处理申请">
			  		<el-row :gutter="20" class='zIndex9'>
						<el-col :span="24">
							<div class="home_apply">
								<h3>待处理申请</h3>
								<el-row :gutter="20">
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.ppendingReview}}</h6>
											<span>个贷待审核</span>
										</div>
									</el-col>
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.ppendingReturn}}</h6>
											<span>个贷被退回</span>
										</div>
									</el-col>
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.bpendingReview}}</h6>
											<span>企贷待审核</span>
										</div>
									</el-col>
									<el-col :span="device === 'desktop'?6:12">
										<div class="grid-content bg-purple">
											<h6>{{statistics.bpendingReturn}}</h6>
											<span>企贷被退回</span>
										</div>
									</el-col>
								</el-row>
							</div>
						</el-col>				
					</el-row>
			  	</el-tab-pane>
			  	<el-tab-pane label="补录待处理申请">

			  		<el-row :gutter="20" class='zIndex9'>
						<el-col :span="24">
								<div class="home_apply">
									<h3>待处理申请</h3>
									<el-row :gutter="20" >
										<el-col :span="device === 'desktop'?6:12">
											<div class="grid-content bg-purple">
												<h6>{{statistics.padded}}</h6>
												<span>个贷待补录</span>
											</div>
										</el-col>
										<el-col :span="device === 'desktop'?6:12">
											<div class="grid-content bg-purple">
												<h6>{{statistics.ptoBeProcessed}}</h6>
												<span>个贷待处理</span>
											</div>
										</el-col>
										<el-col :span="device === 'desktop'?6:12">
											<div class="grid-content bg-purple">
												<h6>{{statistics.badded}}</h6>
												<span>企贷待补录</span>
											</div>
										</el-col>
										<el-col :span="device === 'desktop'?6:12">
											<div class="grid-content bg-purple">
												<h6>{{statistics.btoBeProcessed}}</h6>
												<span>企贷待处理</span>
											</div>
										</el-col>
									</el-row>
								</div>
							</el-col>
						</el-col>
					</el-row>

			  	</el-tab-pane>
			</el-tabs>
		</div>
		<div class="home_data">
			<h3>业务统计</h3>
			<el-row :gutter="20" class='zIndex9'>
				<el-col :span="12">
					<div>范围：
						<el-radio-group v-model="home_range" @change='changeRange'>
							<el-radio-button label="1">个贷</el-radio-button>
							<el-radio-button label="2">企贷</el-radio-button>
						</el-radio-group>
					</div>
				</el-col>
				<el-col :span="12">
					<div>统计类型：
						<el-radio-group v-model="home_countType" @change='changeCountType'>
							<el-radio-button label="1">金额</el-radio-button>
							<el-radio-button label="2">数量</el-radio-button>
						</el-radio-group>
						<br/>
						<b>统计天数：近7天</b>
					</div>
				</el-col>
			</el-row>
			<echarts-main ref='echart' :key="EchartWidth" :width="EchartWidth" class='zIndex9' :XData='XData' :passData='passData' :type='postData.type'></echarts-main>
<!--			<echarts-main ref='echart' class='zIndex9' :XData='XData' :passData='passData' :type='postData.type'></echarts-main>-->
		</div>
	</div>
</template>

<script>
	import echartsMain from '@/components/Echart/index.vue'
	import { homeStatistics, homeChart } from '@/api/req'

	export default {
		name: 'Home',
		components: {
			echartsMain
		},
		data() {
			return {
				role: this.$store.state.userInfo.roles[0],
				home_range:1,
				home_countType:1,
				statistics: {
					badded: 0,
					bpendingReturn: 0,
					bpendingReview: 0,
					btoBeProcessed: 0,
					padded: 0,
					ppendingReturn: 0,
					ppendingReview: 0,
					ptoBeProcessed: 0,
				},
				passData:[],
				//cancelData: [],
				XData: [],
				postData: {
					level: 1,//范围 1-个人 2-企业
					type: 1//统计类型 1金额 2数量
				},
				clientWidth:'100%'
			}
		},
		created(){
			this.clientWidth = document.body.clientWidth;
			this.getXData();
			this.getStatistics();
		},
		mounted(){
			window.addEventListener('resize',this.resize,false)
		},
		beforeDestroy(){
			window.removeEventListener('resize',this.resize)
		},
		methods:{
			resize(){
				this.clientWidth = document.body.clientWidth;
			},
			getXData(){
				let arr  = [];
				for(let i = 7; i > 0; i --){
					let month = new Date(new Date().getTime() - 24*60*60*1000*i).getMonth()+1;
					let day = new Date(new Date().getTime() - 24*60*60*1000*i).getDate();
					let full = month + '.' + day;
					arr.push(full)
				}
				this.XData = arr
				//console.log(this.XData)
			},
			getStatistics(){
				homeStatistics().then(res => {
					//console.log(res)
					this.statistics = res.data;

					this.renderChart();
				}).catch(res =>{
					this.$message.error(res.msg)
				})
			},	
			renderChart(){
				homeChart(this.postData).then(res => {
					this.passData = res.data.approveList;
					//this.cancelData = res.data.refuseList;
					// this.$message.success(res.msg)
				}).catch(res =>{
					this.$message.error(res.msg)
				})
			},
			changeRange(val){
				//console.log(val)
				/* if(val === '1'){
					this.passData = [1,2,3,4,5,6,7]
					this.cancelData = [1,2,3,4,5,6,7]
				}else if (val === '2') {
					this.passData = [100,200,300,400,500,600,700]
					this.cancelData = [100,200,300,400,500,600,700]
				} */
				this.postData.level = parseInt(val);
				this.renderChart();
				
				//console.log(typeof(parseInt(val)))
				this.$refs.echart.initChart()
			},
			changeCountType(val){
				/* //console.log(val)
				if(val == 1){
					this.passData = [10,20,30,40,50,60,70]
				this.cancelData = [10,20,30,40,50,60,70]
				}else {
					this.passData = [1000,2000,3000,4000,5000,6000,7000]
					this.cancelData = [1000,2000,3000,4000,5000,6000,7000]
				} */
				this.postData.type = parseInt(val);
				this.renderChart();
				this.$refs.echart.initChart()
			}
		},
		computed:{
			device() {
			    return this.$store.state.device;
			},
			EchartWidth(){
				let width = this.clientWidth * 0.9 - 250;
				if(this.device === 'mobile') width += 250;
				return width + 'px'
			}
		}
	}
</script>

<style lang="scss">
	.home_cont {
		border: 1px solid #ddd;
		padding: 5px;
		box-shadow: 0 0 1px #ddd;
		margin-bottom: 10px
	}

	.home_data {
		border: 1px solid #ddd;
		padding: 5px;
		box-shadow: 0 0 1px #ddd;
	}

	.el-row {
		margin-bottom: 10px;
		margin-left: 0 !important;
		margin-right: 0 !important;

		&:last-child {
			margin-bottom: 0;
		}

		.el-row {
			margin-bottom: 20px;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple {
		background: rgba(210, 220, 230, 0.5);
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.home_apply h3,
	.home_backTrack h3 {
		margin-bottom: 10px;
		margin-top: 10px
	}

	.home_apply h3 {
		text-align: left;
	}

	.home_apply span {
		display: block;
		padding-bottom: 40px;
		font-size: 16px;
	}

	.home_apply h6 {
		font-size: 60px;
		color: #519be6;
		padding: 50px 0 20px 0;
	}

	.home_backTrack h6 {
		display: inline-block;
		font-size: 14px;
		color: #ec6262;
		width: 60%;
		line-height: 36px;
	}

	.home_backTrack span {
		display: inline-block;
		font-size: 14px;
		width: 40%;
	}
</style>
