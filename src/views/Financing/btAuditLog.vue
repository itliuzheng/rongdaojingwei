<template>				
	<el-tabs type="border-card" v-model="tabName">
		<el-tab-pane label="企业" name="com">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.manageName" placeholder="所属客户经理"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.companyName" placeholder="企业名称"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.industry" placeholder="所属行业/职业">
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.productId" placeholder="贷款产品">
						<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.amount" placeholder="申请额度(万)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.useFunds" placeholder="资金用途"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.deadline" placeholder="申请期限（月）"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'6':'12'">
					<el-date-picker style="width: 100%;"
					  	v-model="filterData.applyDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp">
					</el-date-picker>
				</el-col>
				
				<el-col :span="device === 'desktop'?'8':'24'">
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="reset">重置</el-button>
					<!--<el-button type="" @click="piliang">批量提交</el-button>-->
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="" :data="tableData" tooltip-effect="dark" @selection-change="selectionChangeCom" style="width: 100%" border>
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="所属部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属客户经理" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="companyName" label="企业名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="industry" label="所属行业" show-overflow-tooltip width="120"><!-- :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"> <!--:formatter='formatterPro'-->
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
					<el-table-column prop="reviewStatus" label="补录审核状态" show-overflow-tooltip width="120">
						<template slot-scope="scope">{{scope.row.reviewStatus === 1?'通过':'不通过'}}</template>
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewUserName" label="审核人" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="description" label="不通过原因" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<el-button @click.native.prevent="check(scope.row)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewLog(scope.row)" type="text" size="small">
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
							<el-button @click.native.prevent="check(item)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewLog(item)" type="text" size="small">
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
							<el-col :span="24" class="clearfix" >
								<p class="fl">补录审核状态:</p>
								<p class="fr">{{item.reviewStatus === 1?'通过':'不通过'}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">审核时间:</p>
								<p class="fr">{{item.reviewDate}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">审核人:</p>
								<p class="fr">{{item.reviewUserName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">不通过原因:</p>
								<p class="fr">{{item.description}}</p>
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



			<el-dialog title="查看" :visible.sync="dialogCom" :width="device === 'desktop'?'70%':'100%'">
				<el-form :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="formDataCom">
					<el-row :gutter="20">
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="所属客户经理">
								<el-input v-model="formDataCom.manageName" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业名称">
								<el-input v-model="formDataCom.companyName" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="统一社会信用代码">
								<el-input v-model="formDataCom.socialCreditCode" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册资本">
								<el-input v-model="formDataCom.registeredCapital" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="成立时间">
								<el-input v-model="formDataCom.establishmentDate" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册地址">
								<el-input v-model="formDataCom.registerAddress" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="实际经营地址">
								<el-input v-model="formDataCom.businessAddress" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="所属行业">
								<el-select v-model="formDataCom.industry" placeholder="所属行业" disabled=true>
									<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="主要业务">
								<el-input v-model="formDataCom.profession" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年收入">
								<el-input v-model="formDataCom.annualIncome" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年纳税额">
								<el-input v-model="formDataCom.taxCredit" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="法人及股东最新变更时间">
								<el-input v-model="formDataCom.legalChangeDate" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款产品">
								<!--<el-select v-model="formDataCom.productId" placeholder="请选择" :disabled=true>-->
									<!--<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">-->
									<!--</el-option>-->
								<!--</el-select>-->
								<p>{{formDataCom.productName}}</p>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请额度(万)">
								<el-input v-model="formDataCom.amount" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款用途">
								<el-input v-model="formDataCom.useFunds" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请期限(月)">
								<el-input v-model="formDataCom.deadline" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业联系人">
								<el-input v-model="formDataCom.name" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="联系方式">
								<el-input v-model="formDataCom.mobile" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataCom.basicMaterial">
							<el-form-item label="基本资料" prop="basicMaterial">
								<!--<el-input v-model="formDataCom.basicMaterial" disabled></el-input>-->
								<el-link type="primary" :href="formDataCom.basicMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataCom.financeMaterial">
							<el-form-item label="财务资料" prop="financeMaterial">
								<!--<el-input v-model="formDataCom.financeMaterial" disabled></el-input>-->
								<el-link type="primary" :href="formDataCom.financeMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataCom.otherMaterial">
							<el-form-item label="其它资料" prop="otherMaterial">
								<!--<el-input v-model="formDataCom.otherMaterial" disabled></el-input>-->
								<el-link type="primary" :href="formDataCom.otherMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="审核">
								<el-radio-group v-model="formDataCom.status" size="medium" disabled>
									<el-radio border :label=1>通过</el-radio>
									<el-radio border :label=0>不通过</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataCom.status === 0" disabled>
							<el-form-item label="不通过原因">
								<el-input v-model="formDataCom.description"></el-input>
							</el-form-item>
						</el-col>		-->				
					</el-row>
				</el-form>
			</el-dialog>
			<el-dialog title="查看审核记录" :visible.sync="dialogComLog" :width="device === 'desktop'?'70%':'100%'" v-if='dialogComLog'>
				<componentReviewLogCom :reviewLogData='reviewLogData'></componentReviewLogCom>
			</el-dialog>
		</el-tab-pane>
		
		
		<el-tab-pane label="个人" name="per">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.manageName" placeholder="所属客户经理"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.companyName" placeholder="企业名称"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.industry" placeholder="所属行业/职业">
						<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.productId" placeholder="贷款产品">
						<el-option v-for="item in proSelectData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.amount" placeholder="申请额度(万)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.useFunds" placeholder="资金用途"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.deadline" placeholder="申请期限（月）"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'6':'12'">
					<el-date-picker
							style="width: 100%;"
					  	v-model="filterDataPer.applyDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="device === 'desktop'?'8':'24'">
					<el-button type="primary" @click="queryPer">查询</el-button>
					<el-button type="success" @click="resetPer">重置</el-button>
					<!--<el-button type="" @click="piliangPer">批量提交</el-button>-->
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="" :data="tableDataPer" tooltip-effect="dark" @selection-change="selectionChangePer" style="width: 100%" border>
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
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"> <!--:formatter='formatterPro'-->
					</el-table-column>
					<el-table-column prop="amount" label="申请额度（万）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限（月）" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewStatus" label="补录审核状态" show-overflow-tooltip width="120">
						<template slot-scope="scope">{{scope.row.reviewStatus === 1?'通过':'不通过'}}</template>
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewUserName" label="审核人" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="description" label="不通过原因" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<el-button @click.native.prevent="check(scope.row)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewLogPer(scope.row)" type="text" size="small">
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
							<el-button @click.native.prevent="check(item)" type="text" size="small">
								查看
							</el-button>
							<el-button @click.native.prevent="reviewLogPer(item)" type="text" size="small">
								查看审核记录
							</el-button>
						</div>
						<el-row :gutter="20">
							<el-col :span="24" class="clearfix">
								<p class="fl">融资编号:</p>
								<p class="fr">{{item.number}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" v-if="userRole!='second'">
								<p class="fl">部门:</p>
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
							<el-col :span="24" class="clearfix" >
								<p class="fl">补录审核状态:</p>
								<p class="fr">{{item.reviewStatus === 1?'通过':'不通过'}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">审核时间:</p>
								<p class="fr">{{item.reviewDate}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">审核人:</p>
								<p class="fr">{{item.reviewUserName}}</p>
							</el-col>
							<el-col :span="24" class="clearfix" >
								<p class="fl">不通过原因:</p>
								<p class="fr">{{item.description}}</p>
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

			<el-dialog title="查看" :visible.sync="dialogPer" :width="device === 'desktop'?'70%':'100%'">
				<el-form :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="formDataPer">
					<el-row :gutter="20">
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="所属客户经理">
								<el-input v-model="formDataPer.manageName" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业名称">
								<el-input v-model="formDataPer.companyName" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="统一社会信用代码">
								<el-input v-model="formDataPer.socialCreditCode" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册资本">
								<el-input v-model="formDataPer.registeredCapital" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="成立时间">
								<el-input v-model="formDataPer.establishmentDate" disabled=true></el-input>
							</el-form-item>
						</el-col>-->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="户籍">
								<el-input v-model="formDataPer.registerAddress" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="实际经营地址">
								<el-input v-model="formDataPer.businessAddress" disabled=true></el-input>
							</el-form-item>
						</el-col>-->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="职业">
								<el-select v-model="formDataPer.industry" placeholder="职业" disabled=true>
									<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="主要业务">
								<el-input v-model="formDataPer.profession" disabled=true></el-input>
							</el-form-item>
						</el-col>-->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年收入">
								<el-input v-model="formDataPer.annualIncome" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年纳税额">
								<el-input v-model="formDataPer.taxCredit" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="法人及股东最新变更时间">
								<el-input v-model="formDataPer.legalChangeDate" disabled=true></el-input>
							</el-form-item>
						</el-col>-->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款产品">
								<el-select v-model="formDataPer.productId" placeholder="请选择" :disabled=true>
									<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请额度(万)">
								<el-input v-model="formDataPer.amount" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款用途">
								<el-input v-model="formDataPer.useFunds" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请期限(月)">
								<el-input v-model="formDataPer.deadline" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请人姓名">
								<el-input v-model="formDataPer.name" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请人手机号">
								<el-input v-model="formDataPer.mobile" disabled=true></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataPer.basicMaterial">
							<el-form-item label="基本资料" prop="basicMaterial">
								<!--<el-input v-model="formDataPer.basicMaterial" disabled></el-input>-->
								<el-link type="primary" :href="formDataPer.basicMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataPer.financeMaterial">
							<el-form-item label="资产证明" prop="financeMaterial">
								<!--<el-input v-model="formDataPer.financeMaterial" disabled></el-input>-->
								<el-link type="primary" :href="formDataPer.financeMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataPer.otherMaterial">
							<el-form-item label="其它资料" prop="otherMaterial">
								<!--<el-input v-model="formDataPer.otherMaterial" disabled></el-input>-->
								<el-link type="primary" :href="formDataPer.otherMaterial">点击下载</el-link>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="审核">
								<el-radio-group v-model="formDataPer.status" size="medium" disabled>
									<el-radio border :label=1>通过</el-radio>
									<el-radio border :label=0>不通过</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'" v-if="formDataPer.status === 0" disabled>
							<el-form-item label="不通过原因">
								<el-input v-model="formDataPer.description"></el-input>
							</el-form-item>
						</el-col>-->						
					</el-row>
				</el-form>
			</el-dialog>
			<el-dialog title="查看审核记录" :visible.sync="dialogPerLog" :width="device === 'desktop'?'70%':'100%'" v-if='dialogPerLog'>
				<componentReviewLogPer :reviewLogData='reviewLogData'></componentReviewLogPer>
			</el-dialog>
		</el-tab-pane>

	</el-tabs>
</template>

<script>
	import componentReviewLogCom from '@/views/Financing/components/reviewLogCom.vue'
	import componentReviewLogPer from '@/views/Financing/components/reviewLogPer.vue'
	import { sysOffice, proSelection, supplementAuditRecord } from '@/api/req'
	import { productType, formatter } from '@/api/common'
	import job from '@/unit/job'
	export default {
		components: {
			componentReviewLogCom,
			componentReviewLogPer
		},
		created(){
			this.sendReq();
			this.sendReqPer();
			this.getOffice();
			this.getProSelection();
		},
		data() {
			return {
			    tabName:'com',
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
				formDataCom:{},
				formDataPer:{},
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
					startType: null,
					level: 2,
					menuIndex:6,
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
					startType: null,
					level: 1,
					menuIndex:6,
				},
				total: null, //总条数
				totalPer: null, //总条数
				multipleSelection: [], //总条数
				multipleSelectionPer: [], //总条数
				labelPosition: 'right',		
				reviewLogData:[],
				loading: false,
				loadingPer: false,
			}
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
				supplementAuditRecord(this.filterData).then(res => {
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
				supplementAuditRecord(this.filterDataPer).then(res => {
					//console.log(res)
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
					startType :null,
					level: 2,
					menuIndex:6,
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
					pageSize: 10 ,//a每页条数					
					startType :null,
					level: 1,
					menuIndex:6,
				}
				this.$set(this,'tableDataPer',[]);
				this.$refs.infiniteBoxPer.scrollTop=0;
				this.sendReqPer();
			},
			reviewLog(scope){
				this.dialogComLog = true;	
				this.reviewLogData = scope;
			},
			reviewLogPer(scope){
				this.dialogPerLog = true; 
				this.reviewLogData = scope;
			},
			check(scope){
				this.dialogCom = true;
				this.formDataCom = scope;
			},
			checkPer(scope){
				this.dialogPer = true;
				this.formDataPer = scope;
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