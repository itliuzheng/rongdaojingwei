 <template>				
	<el-tabs type="border-card"  v-model="tabName">
		<el-tab-pane label="企业" name="com">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterData.manageName" placeholder="所属客户经理"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterData.companyName" placeholder="企业名称"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-select v-model="filterData.industry" placeholder="所属行业/职业">
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-select v-model="filterData.productId" placeholder="贷款产品">
						<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterData.amount" placeholder="申请额度(万)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterData.useFunds" placeholder="资金用途"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.deadline" placeholder="申请期限（月）"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'6':'12'">
					<el-date-picker style="width: 100%;"
					  	v-model="filterData.applyDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'9':'24'">
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="reset">重置</el-button>
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="selectionChangeCom" style="width: 100%" border>
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="所属部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属客户经理" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="companyName" label="企业名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="industry" label="所属行业" show-overflow-tooltip width="120"> <!-- :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"><!-- :formatter='formatterPro'-->
					</el-table-column>
					<el-table-column prop="amount" label="申请额度（万）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限（月）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="name" label="企业联系人" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
					</el-table-column>
					<!--<el-table-column prop="mobile" label="审核状态" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewUser" label="审核人" show-overflow-tooltip width="120">
					</el-table-column>-->
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<el-button @click.native.prevent="checkCom(scope.row)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewCom(scope.row)" type="text" size="small">
								审核
							</el-button>
							<el-button @click.native.prevent="reviewComLog(scope.row)" type="text" size="small">
								查看审核记录
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="filterData.pageNum"
				 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="total" class='zIndex9'>
				</el-pagination>
			</div>
			<template v-else>

				<div class="infinite-list" ref="infiniteBox" style="overflow:auto">
					<el-card v-infinite-scroll="load" :infinite-scroll-immediate="false"
							 :infinite-scroll-disabled="disabled"
							 infinite-scroll-distance="1"
							 class="box-card" v-for="(item,index) in tableData" :key="index">
						<div slot="header" class="clearfix">
							<el-button @click.native.prevent="checkCom(item)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewCom(item)" type="text" size="small">
								审核
							</el-button>
							<el-button @click.native.prevent="reviewComLog(item)" type="text" size="small">
								查看审核记录
							</el-button>
						</div>
						<el-row :gutter="20">
							<el-col :span="24" class="clearfix">
								<p class="fl">融资编号:</p>
								<p class="fr">{{item.number}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" v-if="userRole!='second'">
								<p class="fl">所属部门:</p>
								<p class="fr">{{item.officeName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">所属客户经理:</p>
								<p class="fr">{{item.manageName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">企业名称:</p>
								<p class="fr">{{item.companyName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">所属行业:</p>
								<p class="fr">{{item.industry}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">贷款产品:</p>
								<p class="fr">{{item.productName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">申请额度（万）:</p>
								<p class="fr">{{item.amount}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">贷款用途:</p>
								<p class="fr">{{item.useFunds}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">申请期限（月）:</p>
								<p class="fr">{{item.deadline}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">申请时间:</p>
								<p class="fr">{{item.applyDate}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">企业联系人:</p>
								<p class="fr">{{item.name}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">联系方式:</p>
								<p class="fr">{{item.mobile}}</p>
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
			<el-dialog title="" :visible.sync="dialogCom" :width="device === 'desktop'?'70%':'100%'" v-if='dialogCom'>
				<el-form ref='addFormCom' :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="formDataCom" :rules='ruleCom'>
					<el-row :gutter="20">
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="所属客户经理" prop="manageName">
								<el-input v-model="checkformDataCom.manageName" disabled></el-input><!-- :disabled="noEditCom"-->
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业名称" prop="companyName">
								<el-input v-model="checkformDataCom.companyName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="统一社会信用代码" prop="socialCreditCode">
								<el-input v-model="checkformDataCom.socialCreditCode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册资本" prop="registeredCapital">
								<el-input v-model="checkformDataCom.registeredCapital" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="成立时间" prop="establishmentDate">
								<el-date-picker
								  	v-model="checkformDataCom.establishmentDate"
								  	type="date"
								  	placeholder="成立时间"
								   	value-format="timestamp"
								   	disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册地址" prop="registerAddress">
								<el-input v-model="checkformDataCom.registerAddress" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="实际经营地址" prop="businessAddress">
								<el-input v-model="checkformDataCom.businessAddress" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="所属行业" prop="industry">
								<el-select v-model="checkformDataCom.industry" placeholder="所属行业/职业" disabled>
									<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="主要业务" prop="profession">
								<el-input v-model="checkformDataCom.profession" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年收入" prop="annualIncome">
								<el-input v-model="checkformDataCom.annualIncome" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年纳税额" prop="taxCredit">
								<el-input v-model="checkformDataCom.taxCredit" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="法人及股东最新变更时间" prop="legalChangeDate">
								<el-date-picker
								  	v-model="checkformDataCom.legalChangeDate"
								  	type="date"
								  	placeholder="申请时间"
								   	value-format="timestamp"
								   	disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款产品" prop="productName">
								<!--<el-select v-model="checkformDataCom.productId" placeholder="请选择" disabled>
									<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>-->
								<el-input v-model="checkformDataCom.productName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请额度(万)" prop="amount">
								<el-input v-model="checkformDataCom.amount" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款用途" prop="useFunds">
								<el-input v-model="checkformDataCom.useFunds" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请期限(月)" prop="deadline">
								<el-input v-model="checkformDataCom.deadline" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业联系人" prop="name">
								<el-input v-model="checkformDataCom.name" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="联系方式" prop="mobile">
								<el-input v-model="checkformDataCom.mobile" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="checkformDataCom.basicMaterial">
							<el-form-item label="基本资料" prop="basicMaterial">
								<!--<el-input v-model="checkformDataCom.basicMaterial" disabled></el-input>-->
								<el-link type="primary" :href="checkformDataCom.basicMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="checkformDataCom.financeMaterial">
							<el-form-item label="财务资料" prop="financeMaterial">
								<!--<el-input v-model="checkformDataCom.financeMaterial" disabled></el-input>-->
								<el-link type="primary" :href="checkformDataCom.financeMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="checkformDataCom.otherMaterial">
							<el-form-item label="其它资料" prop="otherMaterial">
								<!--<el-input v-model="checkformDataCom.otherMaterial" disabled></el-input>-->
								<el-link type="primary" :href="checkformDataCom.otherMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if='!noEditCom'>
							<el-form-item label="审核" prop="status">
								<el-radio-group v-model="formDataCom.status" size="medium" @change='changeRadioCom' >
									<el-radio border :label=1>通过</el-radio>
									<el-radio border :label=0>不通过</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditCom&& formDataCom.status === 0">
							<el-form-item label="不通过原因" prop="description">
								<el-input v-model="formDataCom.description"></el-input>
							</el-form-item>
						</el-col>	
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditCom && formDataCom.status === 1 && roleNum == checkformDataCom.highestLevel">
							<el-form-item label="实际批复额度(万)" prop="replyAmount">
								<el-input v-model="formDataCom.replyAmount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditCom && formDataCom.status === 1 && roleNum === checkformDataCom.highestLevel">
							<el-form-item label="实际批复期限(月)" prop="replyDeadline">
								<el-input v-model="formDataCom.replyDeadline"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditCom && formDataCom.status === 1 && roleNum === checkformDataCom.highestLevel">
							<el-form-item label="实际批复利率(%/月)" prop="replyRate">
								<el-input v-model="formDataCom.replyRate"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'20':'24'">
							<el-form-item>
								<el-button type="primary" @click="submitFormCom" v-if='!noEditCom'>提交</el-button>
								<el-button @click="closeCom">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-dialog>

			<el-dialog title="查看审核记录" :visible.sync="dialogComLog" :width="device === 'desktop'?'70%':'100%'">
				<componentReviewLogCom :reviewLogData='reviewLogData'></componentReviewLogCom>
			</el-dialog>

		</el-tab-pane>
		
		
		<el-tab-pane label="个人" name="per">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterDataPer.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterDataPer.manageName" placeholder="所属客户经理"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterDataPer.companyName" placeholder="企业名称"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.industry" placeholder="所属行业/职业">
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-select v-model="filterDataPer.productId" placeholder="贷款产品">
						<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterDataPer.amount" placeholder="申请额度(万)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterDataPer.useFunds" placeholder="资金用途"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-input v-model="filterDataPer.deadline" placeholder="申请期限（月）"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-date-picker style="width: 100%;"
					  	v-model="filterDataPer.applyDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="device === 'desktop'?'3':'12'">
					<el-select v-model="filterDataPer.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'9':'24'">
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="reset">重置</el-button>
				</el-col>
			</el-row>

			<div v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableDataPer" tooltip-effect="dark" @selection-change="selectionChangePer" style="width: 100%" border>
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属客户经理" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="name" label="姓名" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="registerAddress" label="户籍" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="industry" label="职业" show-overflow-tooltip width="120"> <!-- :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"><!-- :formatter='formatterPro'-->
					</el-table-column>
					<el-table-column prop="amount" label="申请额度（万）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限（月）" show-overflow-tooltip width="120">
					</el-table-column>
					<!--<el-table-column prop="mobile" label="审核状态" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewUser" label="审核人" show-overflow-tooltip width="120">
					</el-table-column>-->
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<el-button @click.native.prevent="checkPer(scope.row)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewPer(scope.row)" type="text" size="small">
								审核
							</el-button>
							<el-button @click.native.prevent="reviewPerLog(scope.row)" type="text" size="small">
								查看审核记录
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChangePer" @current-change="currentChangePer" :current-page="filterDataPer.pageNum"
				 :page-sizes="[10, 15, 20, 30]" :page-size="filterDataPer.pageSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="totalPer" class='zIndex9'>
				</el-pagination>
			</div>
			<template v-else>
				<div class="infinite-list" ref="infiniteBoxPer" style="overflow:auto">
					<el-card v-infinite-scroll="loadPer" :infinite-scroll-immediate="false"
							 :infinite-scroll-disabled="disabledPer"
							 infinite-scroll-distance="1"
							 class="box-card" v-for="(item,index) in tableDataPer" :key="index">
						<div slot="header" class="clearfix">
							<el-button @click.native.prevent="checkPer(item)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewPer(item)" type="text" size="small">
								审核
							</el-button>
							<el-button @click.native.prevent="reviewPerLog(item)" type="text" size="small">
								查看审核记录
							</el-button>
						</div>
						<el-row :gutter="20">
							<el-col :span="24" class="clearfix">
								<p class="fl">融资编号:</p>
								<p class="fr">{{item.number}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" v-if="userRole!='second'">
								<p class="fl">所属部门:</p>
								<p class="fr">{{item.officeName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">所属客户经理:</p>
								<p class="fr">{{item.manageName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">姓名:</p>
								<p class="fr">{{item.name}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">联系方式:</p>
								<p class="fr">{{item.mobile}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">户籍:</p>
								<p class="fr">{{item.registerAddress}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">职业:</p>
								<p class="fr">{{item.industry}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">申请时间:</p>
								<p class="fr">{{item.applyDate}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">贷款产品:</p>
								<p class="fr">{{item.productName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">申请额度（万）:</p>
								<p class="fr">{{item.amount}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">贷款用途:</p>
								<p class="fr">{{item.useFunds}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">申请期限（月）:</p>
								<p class="fr">{{item.deadline}}</p>
							</el-col>
						</el-row>
					</el-card>

					<p v-if="loadingPer">加载中...</p>

					<p v-if="tableDataPer.length == 0">暂无数据</p>
					<template v-else>
						<p v-if="noMorePer">没有更多了</p>
					</template>
				</div>
			</template>


			<el-dialog title="" :visible.sync="dialogPer" :width="device === 'desktop'?'70%':'100%'" v-if="dialogPer">
				<el-form ref='addFormPer' :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="formDataPer" :rules='rulesPer'>
					<el-row :gutter="20">
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="checkformDataPer.name" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="身份证号" prop="idCard">
								<el-input v-model="checkformDataPer.idCard" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="联系方式" prop="mobile">
								<el-input v-model="checkformDataPer.mobile" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年龄" prop="age">
								<el-input v-model="checkformDataPer.age" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="户籍" prop="registerAddress">
								<el-input v-model="checkformDataPer.registerAddress" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="职业" prop="industry">
								<el-input v-model="checkformDataPer.industry" disabled></el-input>
								<!--<el-select v-model="checkformDataPer.industry" placeholder="所属行业/职业"  :disabled="noEditPer">
									<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年收入" prop="annualIncome">
								<el-input v-model="checkformDataPer.annualIncome" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="名下财产" prop="assets">
								<el-input v-model="checkformDataPer.assets" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款产品" prop="productName">
								<!--<el-select v-model="checkformDataPer.productId" placeholder="请选择"  disabled>
									<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>-->
								<el-input v-model="checkformDataPer.productName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请额度" prop="amount">
								<el-input v-model="checkformDataPer.amount" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款用途" prop="useFunds">
								<el-input v-model="checkformDataPer.useFunds" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请期限（月）" prop="deadline">
								<el-input v-model="checkformDataPer.deadline" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="checkformDataPer.basicMaterial">
							<el-form-item label="基本资料" prop="basicMaterial">
								<!--<el-input v-model="checkformDataPer.basicMaterial" disabled></el-input>-->
								<el-link type="primary" :href="checkformDataPer.basicMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="checkformDataPer.financeMaterial">
							<el-form-item label="资产证明" prop="financeMaterial">
								<!--<el-input v-model="checkformDataPer.financeMaterial" disabled></el-input>-->
								<el-link type="primary" :href="checkformDataPer.financeMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="checkformDataPer.otherMaterial">
							<el-form-item label="其它资料" prop="otherMaterial">
								<!--<el-input v-model="checkformDataPer.otherMaterial" disabled></el-input>-->
								<el-link type="primary" :href="checkformDataPer.otherMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if='!noEditPer'>
							<el-form-item label="审核" prop='status'>
								<el-radio-group v-model="formDataPer.status" size="medium" @change='changeRadioPer'>
									<el-radio border :label=1>通过</el-radio>
									<el-radio border :label=0>不通过</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditPer && formDataPer.status === 0">
							<el-form-item label="不通过原因" prop='description'>
								<el-input v-model="formDataPer.description"></el-input>
							</el-form-item>
						</el-col>	
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditPer && formDataPer.status === 1 && roleNum === checkformDataPer.highestLevel">
							<el-form-item label="实际批复额度(万)" prop="replyAmount">
								<el-input v-model="formDataPer.replyAmount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditPer && formDataPer.status === 1 && roleNum === checkformDataPer.highestLevel">
							<el-form-item label="实际批复期限(月)" prop="replyDeadline">
								<el-input v-model="formDataPer.replyDeadline"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="!noEditPer && formDataPer.status === 1 && roleNum === checkformDataPer.highestLevel">
							<el-form-item label="实际批复利率(%/月)" prop="replyRate">
								<el-input v-model="formDataPer.replyRate"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'20':'24'">
							<el-form-item>
								<el-button type="primary" @click="submitFormPer" v-if='!noEditPer'>提交</el-button>
								<el-button @click="closePer">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-dialog>
			<el-dialog title="查看审核记录" :visible.sync="dialogPerLog" :width="device === 'desktop'?'70%':'100%'">
				<componentReviewLogPer :reviewLogData='reviewLogData'></componentReviewLogPer>
			</el-dialog>
		</el-tab-pane>		 
	</el-tabs>
</template>

<script>
	import componentReviewLogCom from '@/views/Financing/components/reviewLogCom.vue'
	import componentReviewLogPer from '@/views/Financing/components/reviewLogPer.vue'
	import { sysOffice, proSelection, pendingReview, financingApproval } from '@/api/req'
	import { productType, formatter } from '@/api/common'
	import job from '@/unit/job'
	export default {
		components: {
			componentReviewLogCom,
			componentReviewLogPer
		},
		
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
			    tabName:'com',
				role: this.$store.state.userInfo.roles[0],
				roleNum: 1,
				tableData: [], //表格数据
				tableDataPer: [], //表格数据
				productType: productType,
				job: job,//行业职业
				department:[],//部门可选数据
				proSelectData:'',//产品可选数据				
				userRole:'',
				dialogCom: false,
				dialogPer: false,
				dialogComLog: false,
				dialogPerLog: false,
				noEditCom: true,
				noEditPer: true,
				formDataCom: {
					description:"",//不通过原因
					replyAmount:"",//实际批复额度
					replyDeadline:"",//实际批复期限
					replyRate:"",//实际批复利率
					status:1,//审核结果  审批的状态 0-不通过，1-通过
					id:"",
				},
				checkformDataCom: {},
				formDataPer: {
					description:"",//不通过原因
					replyAmount:"",//实际批复额度
					replyDeadline:"",//实际批复期限
					replyRate:"",//实际批复利率
					status:1,//审核结果  审批的状态 0-不通过，1-通过
					id:"",
				},
				checkformDataPer: {},
				filterData: { //请求条件
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					status: null,
					startType: null,
					level: 2,
					menuIndex:5,
				},
				filterDataPer: { //请求条件
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					status: null,
					startType: null,
					level: 1,
					menuIndex:5,
				},
				total: null, //总条数
				totalPer: null, //总条数
				multipleSelection: [], //总条数
				multipleSelectionPer: [], //总条数
				labelPosition: 'right',		
				reviewLogData:[],
				ruleCom: {
					/* manageName: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					companyName: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					socialCreditCode: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					 
					registeredCapital: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					},{
						validator: lessThan0,
					}],					
					establishmentDate: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					registerAddress: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					businessAddress: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					industry: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					profession: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					annualIncome: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					taxCredit: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					legalChangeDate: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					productName: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					amount: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					useFunds: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					deadline: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					name: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}], */
					status: [{
						required: true,
						message: '输入不能为空',
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
				},
				rulesPer: {
					/* registerAddress: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],

					industry: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					idCard: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					annualIncome: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					age: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					productName: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					amount: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					useFunds: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					deadline: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					},{
						type: 'number',
						message: '请输入数字',
					}],
					name: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}], */
					status: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请审核',
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
				},
				loading: false,
				loadingPer: false,
			}
		},
		created(){
			this.sendReq();
			this.sendReqPer();
			this.getOffice();
			this.getProSelection();
			if(this.$store.state.userInfo.roles[0] === 'super'){
				this.roleNum = 1;
			}else if(this.$store.state.userInfo.roles[0] === 'first'){
				this.roleNum = 2;
			}
			//console.log(this.roleNum)
		},
		methods: {
			sizeChange(val) {
				this.filterData.pageSize = val
				this.sendReq();
			},
			currentChange(val) {
				this.filterData.pageNum = val
				this.sendReq();
			},
			sizeChangePer(val) {
				this.filterDataPer.pageSize = val
				this.sendReqPer();
			},
			currentChangePer(val) {
				this.filterDataPer.pageNum = val
				this.sendReqPer();
			},
			selectionChangeCom(value) {
				this.multipleSelection = val;
			},
			selectionChangePer(value) {
				this.multipleSelectionPer = val;
			},
			formatterPro(row, column){
				return formatter(row.productId,this.proSelectData)
			},
			formatterInd(row, column){
				return formatter(row.industry,job)
			},
			getOffice(){
				sysOffice().then(res => {
					this.department = res.data;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			getProSelection(){
				proSelection().then(res => {
					this.proSelectData = res.data;
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			changeRadioCom(val){
				this.$refs.addFormCom.clearValidate();
			},
			changeRadioPer(val){
				this.$refs.addFormPer.clearValidate();
			},
			load() {
			    this.loading = true;
				this.filterData.pageNum ++;
				this.sendReq();
			},
			loadPer() {
			    this.loadingPer = true;
				this.filterDataPer.pageNum ++;
				this.sendReqPer();
			},
			sendReq() {
				pendingReview(this.filterData).then(res => {
					//console.log(res)
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
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			sendReqPer() {
				pendingReview(this.filterDataPer).then(res => {
					if(this.device === 'mobile'){
						this.loadingPer = false;
						if(this.filterDataPer.pageNum == 1){
						    this.$set(this,'tableDataPer',res.data.records);
						}else{
						    this.$set(this,'tableDataPer',this.tableDataPer.concat(res.data.records));
						}
						this.totalPer = res.data.total;
					}else{
						this.tableDataPer = res.data.records;
						this.totalPer = res.data.total;
					}
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			query() {				
				this.sendReq();
			},
			queryPer() {				
				this.sendReqPer();
			},
			reset() {
				this.filterData = {
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: "", //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10 ,//每页条数
					status : null,
					startType :null,
					level: 2,
					menuIndex:5,
				}
				this.$set(this,'tableData',[]);
				this.$refs.infiniteBox.scrollTop=0;
				this.sendReq();
			},
			resetPer() {
				this.filterDataPer = {
					number: '', //融资编号
					manageName: '', //所属客户经理
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限（月）
					applyDate: "", //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10 ,//每页条数
					status : null,
					startType :null,
					level: 1,
					menuIndex:5,
				}
				this.$set(this,'tableDataPer',[]);
				this.$refs.infiniteBoxPer.scrollTop=0;
				this.sendReqPer();
			},
			checkCom(scope){
				this.dialogCom = true; 
				this.noEditCom = true;
				this.checkformDataCom = scope;
				this.checkformDataCom.legalChangeDate = new Date(this.checkformDataCom.legalChangeDate).getTime()
				this.checkformDataCom.establishmentDate = new Date(this.checkformDataCom.establishmentDate).getTime()
				
			},			
			reviewCom(scope){
				this.dialogCom = true; 
				this.noEditCom = false;
				this.checkformDataCom = scope;
				this.checkformDataCom.legalChangeDate = new Date(this.checkformDataCom.legalChangeDate).getTime()
				this.checkformDataCom.establishmentDate = new Date(this.checkformDataCom.establishmentDate).getTime()
			},
			reviewComLog(scope){
				this.dialogComLog = true;	
				this.reviewLogData = scope;
			},
			
			checkPer(scope){
				this.dialogPer = true; 
				this.noEditPer = true;
				this.checkformDataPer = scope;
				this.checkformDataPer.legalChangeDate = new Date(this.checkformDataPer.legalChangeDate).getTime()
				this.checkformDataPer.establishmentDate = new Date(this.checkformDataPer.establishmentDate).getTime()
			},
			reviewPer(scope){
				this.dialogPer = true; 
				this.noEditPer = false;
				this.checkformDataPer = scope;
				this.checkformDataPer.legalChangeDate = new Date(this.checkformDataPer.legalChangeDate).getTime()
				this.checkformDataPer.establishmentDate = new Date(this.checkformDataPer.establishmentDate).getTime()
			},
			reviewPerLog(scope){
				this.dialogPerLog = true; 
				this.reviewLogData = scope;
			},
			submitFormCom(){
				this.formDataCom.id = this.checkformDataCom.id;
				if(this.formDataCom.status === 1){
					this.formDataCom.description = ''
				}
				this.$refs.addFormCom.validate(valid => {
					if(valid){
						financingApproval(this.formDataCom).then(res => {
							this.$message.success(res.msg)
							this.dialogCom = false;
							this.sendReq();
						}).catch(res => {
							this.$message.error(res.msg)
						})
					}
				})				
			},
			closeCom(){
				this.dialogCom = false;
			},
			submitFormPer(){
				this.formDataPer.id = this.checkformDataPer.id;
				if(this.formDataPer.status === 1){
					this.formDataPer.description = ''
				}
				this.$refs.addFormPer.validate(valid => {
					if(valid){
						financingApproval(this.formDataPer).then(res => {
							this.$message.success(res.msg)
							this.dialogPer = false;
							this.sendReqPer();
						}).catch(res => {
							this.$message.error(res.msg)
						})
					}
				})				
			},
			closePer(){
				this.dialogPer = false;
			},
		},
		computed:{
			device() {return this.$store.state.device;},
			noMore () {return this.total <= this.tableData.length;},
			noMorePer () {return this.total <= this.tableDataPer.length;},
			disabled () {return this.loading || this.noMore},
			disabledPer () {return this.loadingPer || this.noMorePer}
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