<template>				
	<el-tabs type="border-card" v-model="tabName">
		<el-tab-pane label="企业" name="com">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.manageName" placeholder="所属业务员"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.companyName" placeholder="企业名称"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterData.industry" placeholder="所属行业">
						<el-option v-for="item in job.industryList" :key="item.id" :label="item.name" :value="item.name">
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
				<!--<el-col :span="device === 'desktop'?'4':'12'">-->
					<!--<el-input v-model="filterData.useFunds" placeholder="资金用途"></el-input>-->
				<!--</el-col>-->
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterData.deadline" placeholder="申请期限(月)"></el-input>
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
				<el-col :span="device === 'desktop'?'8':'24'">
					<el-button type="primary" @click="query">查询</el-button>
					<el-button type="success" @click="reset">重置</el-button>
					<!--<el-button type="" @click="piliang">批量提交</el-button>-->
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="selectionChangeCom" style="width: 100%" border>
					<!--<el-table-column type="selection"width="55"></el-table-column>-->
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="所属部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属业务员" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="companyName" label="企业名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="industry" label="所属行业" show-overflow-tooltip width="120"> <!-- :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120"> <!-- :formatter='formatterPro' -->
					</el-table-column>
					<el-table-column prop="amount" label="申请额度(万)" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限(月)" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="name" label="企业联系人" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
					</el-table-column>
					<!-- <el-table-column prop="reviewStatus" label="补录审核状态" show-overflow-tooltip width="120" :formatter='formatterStatus'>
					</el-table-column>
					<el-table-column prop="reviewDate" label="审核时间" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="reviewUserName" label="审核人" show-overflow-tooltip width="120">
					</el-table-column> -->
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<!--<el-button @click.native.prevent="checkCom(scope.row)" type="text" size="small" v-if="scope.row.reviewStatus!=1">
								查看
							</el-button>-->
							<el-button @click.native.prevent="reviewCom(scope.row)" type="text" size="small" >
								补录
							</el-button>
							<el-button @click.native.prevent="tijiaoCom(scope.row)" type="text" size="small" >
								提交
							</el-button>
							<el-button @click.native.prevent="delCom(scope.row)" type="text" size="small">
								删除
							</el-button>
							<!--<el-button @click.native.prevent="xiugaiCom(scope.row)" type="text" size="small" v-if="scope.row.reviewStatus===4">
								修改
							</el-button>-->
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="filterData.pageNum"
				 :page-sizes="[10, 15, 20, 30]" :page-size="filterData.pageSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="total" class='zIndex9'>
				</el-pagination>
			</div>
			<template v-else>

				<my-scroll :scrollColumns="scrollColumns" :key="'com'"
						:tableData="tableData"
						:userRole="userRole"
						:scrollButtonList="scrollButtonList"
						@refreshScroll="refreshLoad"
						@loadScroll="loadStart"></my-scroll>
			</template>

			<el-dialog title="" :visible.sync="dialogCom" :width="device === 'desktop'?'70%':'100%'" v-if="dialogCom">
				<el-form ref='addFormCom' :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="formDataCom" :rules='ruleCom'>
					<el-row :gutter="20">
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业名称" prop="companyName">
								<el-input v-model="formDataCom.companyName" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="统一社会信用代码" prop="socialCreditCode">
								<el-input v-model="formDataCom.socialCreditCode" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册资本" prop="registeredCapital">
								<el-input v-model="formDataCom.registeredCapital" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="成立时间" prop="establishmentDate">
								<el-date-picker
								  	v-model="formDataCom.establishmentDate"
								  	type="date"
								  	placeholder="成立时间"
								   	value-format="timestamp"
								   	:disabled="noEditCom">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="注册地址" prop="registerAddress">
								<el-input v-model="formDataCom.registerAddress" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="实际经营地址" prop="businessAddress">
								<el-input v-model="formDataCom.businessAddress" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="所属行业" prop="industry">
								<el-select v-model="formDataCom.industry" placeholder="所属行业"  :disabled="noEditCom">
									<el-option v-for="item in job.industryList" :key="item.id" :label="item.name" :value="item.name">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="主要业务" prop="profession">
								<el-input v-model="formDataCom.profession" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年收入" prop="annualIncome">
								<el-input v-model="formDataCom.annualIncome" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年纳税额" prop="taxCredit">
								<el-input v-model="formDataCom.taxCredit" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="法人及股东最新变更时间" prop="legalChangeDate">
								<el-date-picker
								  	v-model="formDataCom.legalChangeDate"
								  	type="date"
								  	placeholder="申请时间"
								   	value-format="timestamp"
								   	:disabled="noEditCom">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<!-- <el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款产品" prop="productId">
								<el-select v-model="formDataCom.productId" placeholder="请选择" :disabled="noEditCom">
									<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请额度(万)" prop="amount">
								<el-input v-model="formDataCom.amount" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款用途" prop="useFunds">
								<el-input v-model="formDataCom.useFunds" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请期限(月)" prop="deadline">
								<el-input v-model="formDataCom.deadline" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="企业联系人" prop="name">
								<el-input v-model="formDataCom.name" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="联系方式" prop="mobile">
								<el-input v-model="formDataCom.mobile" :disabled="noEditCom"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="基本资料" prop="basicMaterial">
								<el-input v-model="formDataCom.basicMaterial" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="基本资料">
								<el-upload
									class="upload-demo"
									:action="imgUpUrl"
									:headers="header"
									:file-list="fileListBase"
									:before-upload="beforeUpload"
									:on-success='uploadSuccessBase'									
									:limit=1
									:disabled='fromList===true&&checkOrEdit===1'>
									<el-button size="small" slot="trigger" type="primary">上传文件</el-button>
									<div slot="tip" class="el-upload__tip">上传文件不超过50M，多项文件请生成一个压缩文件上传</div>
								</el-upload>						
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="财务资料" prop="financeMaterial">
								<el-input v-model="formDataCom.financeMaterial" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="财务资料">
								<el-upload
									class="upload-demo"
									:action="imgUpUrl"
									:headers="header"
									:file-list="fileListFinance"
									:before-upload="beforeUpload"
									:on-success='uploadSuccessFinance'
									:limit=1
									:disabled='fromList===true&&checkOrEdit===1'>
									<el-button size="small" slot="trigger" type="primary">上传文件</el-button>
									<div slot="tip" class="el-upload__tip">上传文件不超过50M，多项文件请生成一个压缩文件上传</div>
								</el-upload>						
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="其它资料" prop="otherMaterial">
								<el-input v-model="formDataCom.otherMaterial" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="其它资料">
								<el-upload
									class="upload-demo"
									:action="imgUpUrl"
									:headers="header"
									:file-list="fileListOther"
									:before-upload="beforeUpload"
									:on-success='uploadSuccessOther'
									:limit=1
									:disabled='fromList===true&&checkOrEdit===1'>
									<el-button size="small" slot="trigger" type="primary">上传文件</el-button>
									<div slot="tip" class="el-upload__tip">上传文件不超过50M，多项文件请生成一个压缩文件上传</div>
								</el-upload>						
							</el-form-item>
						</el-col>
						<el-col :span="20">
							<el-form-item>
								<el-button type="primary" @click="submitFormCom" v-if='noEditCom'>保存</el-button>
								<el-button @click="closeCom">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-dialog>

		</el-tab-pane>

		<el-tab-pane label="个人" name="per">
			<el-row :gutter="20">
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.number" placeholder="融资编号"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.manageName" placeholder="所属业务员"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-input v-model="filterDataPer.companyName" placeholder="姓名"></el-input>
				</el-col>
				<!--<el-col :span="device === 'desktop'?'4':'12'">-->
					<!--<el-select v-model="filterDataPer.industry" placeholder="职业">-->
						<!--<el-option v-for="item in job.job" :key="item.id" :label="item.name" :value="item.name">-->
						<!--</el-option>-->
					<!--</el-select>-->
				<!--</el-col>-->
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
					<el-input v-model="filterDataPer.deadline" placeholder="申请期限(月)"></el-input>
				</el-col>
				<el-col :span="device === 'desktop'?'6':'12'">
					<el-date-picker style="width: 100%;"
					  	v-model="filterDataPer.applyDate"
					  	type="date"
					  	placeholder="申请时间"
					   	value-format="timestamp">
					</el-date-picker>
				</el-col>
				<el-col :span="device === 'desktop'?'4':'12'">
					<el-select v-model="filterDataPer.dept" placeholder="请选择部门">
						<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="device === 'desktop'?'8':'24'">
					<el-button type="primary" @click="queryPer">查询</el-button>
					<el-button type="success" @click="resetPer">重置</el-button>
					<!--<el-button type="" @click="piliangPer">批量提交</el-button>-->
				</el-col>
			</el-row>
			<div v-if="device === 'desktop'">
				<el-table ref="multipleTable" :data="tableDataPer" tooltip-effect="dark" @selection-change="selectionChangePer" style="width: 100%" border>
					<!--<el-table-column type="selection"width="55"></el-table-column>-->
					<el-table-column prop="number" label="融资编号" width="150">
					</el-table-column>
					<el-table-column prop="officeName" label="部门" show-overflow-tooltip width="120" v-if="userRole!='second'">
					</el-table-column>
					<el-table-column prop="manageName" label="所属业务员" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="name" label="姓名" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="mobile" label="联系方式" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="registerAddress" label="户籍" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="industry" label="职业" show-overflow-tooltip width="120"><!-- :formatter="formatterInd" -->
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="productName" label="贷款产品" show-overflow-tooltip width="120" ><!-- :formatter='formatterPro' -->
					</el-table-column>
					<el-table-column prop="amount" label="申请额度(万)" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="useFunds" label="贷款用途" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="deadline" label="申请期限(月)" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="" label="操作" show-overflow-tooltip width="200" fixed="right">
						<template slot-scope="scope">
							<!--<el-button @click.native.prevent="checkPer(scope.row)" type="text" size="small" v-if="scope.row.reviewStatus!=1">
								查看
							</el-button>-->
							<el-button @click.native.prevent="reviewPer(scope.row)" type="text" size="small">
								补录
							</el-button>
							<el-button @click.native.prevent="tijiaoPer(scope.row)" type="text" size="small" >
								提交
							</el-button>
							<el-button @click.native.prevent="delCom(scope.row)" type="text" size="small">
								删除
							</el-button>
							<!--<el-button @click.native.prevent="xiugaiPer(scope.row)" type="text" size="small" v-if="scope.row.reviewStatus===4">
								修改
							</el-button>-->
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChangePer" @current-change="currentChangePer" :current-page="filterDataPer.pageNum"
			 :page-sizes="[10, 15, 20, 30]" :page-size="filterDataPer.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="totalPer" class='zIndex9'>
			</el-pagination>
			</div>
			<template v-else>


				<my-scroll :scrollColumns="scrollColumnsPer" :key="'per'"
						:tableData="tableDataPer"
						:userRole="userRole"
						:scrollButtonList="scrollButtonListPer"
						@refreshScroll="refreshLoadPer"
						@loadScroll="loadStartPer"></my-scroll>

			</template>



			<el-dialog title="" :visible.sync="dialogPer" :width="device === 'desktop'?'70%':'100%'" v-if='dialogPer'>
				<el-form ref='addFormPer' :label-position="labelPosition" :label-width="device === 'desktop'?'180px':'80px'" :model="formDataPer" :rules='rulesPer'>
					<el-row :gutter="20">
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="formDataPer.name" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="身份证号" prop="idCard">
								<el-input v-model="formDataPer.idCard" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="联系方式" prop="mobile">
								<el-input v-model="formDataPer.mobile" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年龄" prop="age">
								<el-input v-model="formDataPer.age" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="户籍" prop="registerAddress">
								<el-input v-model="formDataPer.registerAddress" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<!--<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="职业" prop="industry">
								<el-select v-model="formDataPer.industry" placeholder="所属行业/职业"  :disabled="noEditPer">
									<el-option v-for="item in job" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>-->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="年收入" prop="annualIncome">
								<el-input v-model="formDataPer.annualIncome" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="名下财产" prop="assets">
								<el-input v-model="formDataPer.assets" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<!-- <el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款产品" prop="productId">
								<el-select v-model="formDataPer.productId" placeholder="请选择"  :disabled="noEditPer">
									<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请额度" prop="amount">
								<el-input v-model="formDataPer.amount" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="贷款用途" prop="useFunds">
								<el-input v-model="formDataPer.useFunds" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="申请期限(月)" prop="deadline">
								<el-input v-model="formDataPer.deadline" :disabled="noEditPer"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="基本资料" prop="basicMaterial">
								<el-input v-model="formDataPer.basicMaterial" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="基本资料">
								<el-upload
									class="upload-demo"
									:action="imgUpUrl"
									:headers="header"
									:file-list="fileListBasePer"
									:before-upload="beforeUpload"
									:on-success='uploadSuccessBasePer'
									:limit=1
									:disabled='fromList===true&&checkOrEdit===1'>
									<el-button size="small" slot="trigger" type="primary">上传文件</el-button>
									<div slot="tip" class="el-upload__tip">上传文件不超过50M，多项文件请生成一个压缩文件上传</div>
								</el-upload>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="资产证明" prop="financeMaterial">
								<el-input v-model="formDataPer.financeMaterial" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="资产证明">
								<el-upload
									class="upload-demo"
									:action="imgUpUrl"
									:headers="header"
									:file-list="fileListFinancePer"
									:before-upload="beforeUpload"
									:on-success='uploadSuccessFinancePer'
									:limit=1
									:disabled='fromList===true&&checkOrEdit===1'>
									<el-button size="small" slot="trigger" type="primary">上传文件</el-button>
									<div slot="tip" class="el-upload__tip">上传文件不超过50M，多项文件请生成一个压缩文件上传</div>
								</el-upload>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="其它资料" prop="otherMaterial">
								<el-input v-model="formDataPer.otherMaterial" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'12':'24'">
							<el-form-item label="其它资料">
								<el-upload
									class="upload-demo"
									:action="imgUpUrl"
									:headers="header"
									:file-list="fileListOtherPer"
									:before-upload="beforeUpload"
									:on-success='uploadSuccessOtherPer'
									:limit=1
									:disabled='fromList===true&&checkOrEdit===1'>
									<el-button size="small" slot="trigger" type="primary">上传文件</el-button>
									<div slot="tip" class="el-upload__tip">上传文件不超过50M，多项文件请生成一个压缩文件上传</div>
								</el-upload>
							</el-form-item>
						</el-col>
						<el-col :span="device === 'desktop'?'20':'24'">
							<el-form-item>
								<el-button type="primary" @click="submitFormPer" v-if='noEditPer'>保存</el-button>
								<el-button @click="closePer">取消</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-dialog>
		</el-tab-pane>		 
	</el-tabs>
</template>

<script>
	import Bus from '@/unit/bus.js'
	import { sysOffice, proSelection, supplementList, supplementSubmit, supplementInformation,delPageLog } from '@/api/req'
	import { productType, formatter, reviewStatus, imgUpUrl } from '@/api/common'
	import { getTokenStorage } from '@/api/cookies'
	import job from '@/unit/job'
    import MyScroll from "@/components/MyScroll";
	export default {
        components: {
            MyScroll
		},
        created(){
			this.sendReq();
			this.sendReqPer();
			this.getOffice();
			this.getProSelection();
		},
		data() {
			const lessThan0 = (rule, value, callback) => {
				if(value < 0){
					callback(new Error('数值不能小于0'))
				}else{
					callback()
				}
			}
			return {
			    tabName:'com',
				header:{
					Authorization: getTokenStorage()
				},
				imgUpUrl: imgUpUrl,
				tableData: [], //表格数据
				tableDataPer: [], //表格数据
				productType: productType,
				reviewStatus: reviewStatus,
				job: job,//行业职业
				department:[],//部门可选数据
				proSelectData:'',//产品可选数据				
				userRole:'',
				dialogCom: false,
				dialogPer: false,
				formDataCom: {},
				formDataPer: {},
				noEditCom: true,
				noEditPer: true,
				filterData: { //请求条件
					number: '', //融资编号
					manageName: '', //所属业务员
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限(月)
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					status: null,
					startType: null,
					level: 2,
					menuIndex:4,
				},
				filterDataPer: { //请求条件
					number: '', //融资编号
					manageName: '', //所属业务员
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限(月)
					applyDate: null, //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10, //每页条数
					status: null,
					startType: null,
					level: 1,
					menuIndex:4,
				},
				total: null, //总条数
				totalPer: null, //总条数
				multipleSelection: [], //总条数
				multipleSelectionPer: [], //总条数
				labelPosition: 'right',		
				//reviewLogData:[],
				fileListBase:[],
				fileListFinance:[],
				fileListOther:[],
				fileListBasePer:[],
				fileListFinancePer:[],
				fileListOtherPer:[],
				ruleCom: {
					manageName: [{
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
					productId: [{
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
					}],
					status: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
				},
				rulesPer: {
					registerAddress: [{
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
					productId: [{
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
					}],
					status: [{
						required: true,
						message: '输入不能为空',
						trigger: 'blur'
					}],
				},

				scrollColumns:[
					{
						label: '融资编号:',
						prop:'number',
						widthPart:24
					},
					{
						label: '所属部门:',
						prop:'officeName',
						isIf:true,
						widthPart:24
					},
					{
						label: '所属业务员:',
						prop:'manageName',
						widthPart:24
					},
					{
						label: '企业名称:',
						prop:'companyName',
						widthPart:24
					},
					{
						label: '所属行业:',
						prop:'industry',
						widthPart:24
					},
					{
						label: '贷款产品:',
						prop:'productName',
						widthPart:24
					},
					{
						label: '申请额度(万):',
						prop:'amount',
						widthPart:24
					},
					{
						label: '贷款用途:',
						prop:'useFunds',
						widthPart:24
					},
					{
						label: '申请期限(月):',
						prop:'deadline',
						widthPart:24
					},
					{
						label: '申请时间:',
						prop:'applyDate',
						widthPart:24
					},
					{
						label: '企业联系人:',
						prop:'name',
						widthPart:24
					},
					{
						label: '联系方式:',
						prop:'mobile',
						widthPart:24
					},
				],
				scrollButtonList:[
					{
						type: 'text',
						text: '补录',
						isShow:true,
						atClick: row => {
							this.reviewCom(row);
						}
					},
					{
						type: 'text',
						text: '提交',
						isShow:true,
						atClick: row => {
							this.tijiaoCom(row);
						}
					},
					{
						type: 'text',
						text: '删除',
						isShow:true,
						atClick: row => {
							this.delCom(row);
						}
					}
				],

				scrollColumnsPer:[
					{
						label: '融资编号:',
						prop:'number',
						widthPart:24
					},
					{
						label: '部门:',
						prop:'officeName',
						isIf:true,
						widthPart:24
					},
					{
						label: '所属业务员:',
						prop:'manageName',
						widthPart:24
					},
					{
						label: '姓名:',
						prop:'name',
						widthPart:24
					},
					{
						label: '联系方式:',
						prop:'mobile',
						widthPart:24
					},
					{
						label: '户籍:',
						prop:'registerAddress',
						widthPart:24
					},
					{
						label: '职业:',
						prop:'industry',
						widthPart:24
					},
					{
						label: '申请时间:',
						prop:'applyDate',
						widthPart:24
					},
					{
						label: '贷款产品:',
						prop:'productName',
						widthPart:24
					},
					{
						label: '申请额度(万):',
						prop:'amount',
						widthPart:24
					},
					{
						label: '贷款用途:',
						prop:'useFunds',
						widthPart:24
					},
					{
						label: '申请期限(月):',
						prop:'deadline',
						widthPart:24
					}
				],
				scrollButtonListPer:[
					{
						type: 'text',
						text: '补录',
						isShow:true,
						atClick: row => {
							this.reviewPer(row);
						}
					},
					{
						type: 'text',
						text: '提交',
						isShow:true,
						atClick: row => {
							this.tijiaoPer(row);
						}
					},
					{
						type: 'text',
						text: '删除',
						isShow:true,
						atClick: row => {
							this.delPer(row);
						}
					}
				],
			}
		},
		methods: {
			sizeChange(val) {
				this.filterData.pageSize = val;
				this.sendReq();
			},
			currentChange(val) {
				this.filterData.pageNum = val;
				this.sendReq();
			},
			sizeChangePer(val) {
				this.filterDataPer.pageSize = val;
				this.sendReqPer();
			},
			currentChangePer(val) {
				this.filterDataPer.pageNum = val;
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
			formatterStatus(row, column){
				return formatter(row.reviewStatus,reviewStatus)
			},
			uploadSuccessBase(response, file, fileList){
				this.$set(this.formDataCom,'basicMaterial',response.data)
				//console.log(this.formDataCom)
			},
			uploadSuccessFinance(response, file, fileList){
				this.$set(this.formDataCom,'financeMaterial',response.data)
			},
			uploadSuccessOther(response, file, fileList){
				this.$set(this.formDataCom,'otherMaterial',response.data)
			},
			uploadSuccessBasePer(response, file, fileList){
				this.$set(this.formDataPer,'basicMaterial',response.data)
			},
			uploadSuccessFinancePer(response, file, fileList){
				this.$set(this.formDataPer,'financeMaterial',response.data)
			},
			uploadSuccessOtherPer(response, file, fileList){
				this.$set(this.formDataPer,'otherMaterial',response.data)
			},
			beforeUpload(file) {				
				const isLt5M = file.size / 1024 / 1024 < 50;
				if (!isLt5M) {
				  this.$message.error('上传头像图片大小不能超过 50MB!');
				}
				return isLt5M;
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

			refreshLoadPer() {
			    this.filterDataPer.pageNum = 1;
				this.sendReqPer();
			},
			loadStartPer() {
			    if(this.noMorePer){
			        Bus.$emit('loadEndPer',this.noMorePer);
			        return ;
				}
				this.filterDataPer.pageNum ++;
			    this.sendReqPer();
			},

			sendReq() {
				supplementList(this.filterData).then(res => {
					//console.log(res)
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
			sendReqPer() {
				supplementList(this.filterDataPer).then(res => {

					if(this.device === 'mobile'){
						if(this.filterDataPer.pageNum == 1){
						    this.$set(this,'tableDataPer',res.data.records);
						    Bus.$emit('refreshEndPer');
						}else{
						    this.$set(this,'tableDataPer',this.tableDataPer.concat(res.data.records));
						    Bus.$emit('loadEndPer',false);
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
					manageName: '', //所属业务员
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限(月)
					applyDate: "", //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10 ,//每页条数
					status : null,
					startType :null,
					level: 2,
					menuIndex:4,
				}

				this.sendReq();
			},
			resetPer() {
				this.filterDataPer = {
					number: '', //融资编号
					manageName: '', //所属业务员
					companyName: '', //企业名称
					industry: '', //所属行业/职业
					productId: '', //贷款产品
					amount: "", //申请的额度
					useFunds: "", //资金用途
					deadline: "", //申请期限(月)
					applyDate: "", //申请时间
					dept: '', //公司部门
					pageNum: 1, //当前页码
					pageSize: 10 ,//每页条数
					status : null,
					startType :null,
					level: 1,
					menuIndex:4,
				}
				this.sendReqPer();
			},

			checkCom(scope){
				this.dialogCom = true;
				this.noEditCom = true;
				this.formDataCom = scope;
				this.formDataCom.legalChangeDate = new Date(this.formDataCom.legalChangeDate).getTime()
				this.formDataCom.establishmentDate = new Date(this.formDataCom.establishmentDate).getTime()
			},
			reviewCom(scope){
				this.dialogCom = true;
				this.noEditCom = true;
				this.formDataCom = JSON.parse(JSON.stringify(scope));
				this.formDataCom.legalChangeDate = new Date(this.formDataCom.legalChangeDate).getTime()
				this.formDataCom.establishmentDate = new Date(this.formDataCom.establishmentDate).getTime()
			},
			delCom(scope){
				this.$confirm(
					'谨慎操作,删除无法恢复',
					'确定删除',
					{
						confirmButtonText:'删除',
						cancelButtonText: '取消',
						type:'warning'
			
					}
				).then(() => {
					delPageLog(scope.id).then(res => {
						this.$message.success(res.msg);
						this.sendReq();
					})
				})
			},
			delPer(scope){
				this.$confirm(
					'谨慎操作,删除无法恢复',
					'确定删除',
					{
						confirmButtonText:'删除',
						cancelButtonText: '取消',
						type:'warning'

					}
				).then(() => {
					delPageLog(scope.id).then(res => {
						this.$message.success(res.msg);
						this.sendReqPer();
					})
				})
			},
			tijiaoCom(scope){
				//console.log(scope)
				supplementSubmit(scope.id).then(res => {
					//console.log(res)
					this.$message.success(res.msg);
					this.sendReq();
				}).catch(res => {
					this.$message.error(res.msg);
				})
			},
			editCom(scope){
				this.dialogCom = true;
				this.noEditCom = true;
				this.formDataCom = scope;
				this.formDataCom.legalChangeDate = new Date(this.formDataCom.legalChangeDate).getTime()
				this.formDataCom.establishmentDate = new Date(this.formDataCom.establishmentDate).getTime()
			},
			xiugaiCom(scope){
				this.dialogCom = true;
				this.noEditCom = true;
				this.formDataCom = scope;
				this.formDataCom.legalChangeDate = new Date(this.formDataCom.legalChangeDate).getTime()
				this.formDataCom.establishmentDate = new Date(this.formDataCom.establishmentDate).getTime()
			},
			submitFormCom(){
				this.$set(this.formDataCom,'applyId',this.formDataCom.id)
				this.$refs.addFormCom.validate(valid => {
					if(valid){
						supplementInformation(this.formDataCom).then(res => {
							this.$message.success(res.msg);
							this.dialogCom = false;
							this.sendReq();
						}).catch(res => {
							this.$message.error(res.msg);
						})
					}
				})
				
			},
			closeCom(){
				this.dialogCom = false;
			},
			checkPer(scope){
				this.dialogPer = true;
				this.noEditPer = true;
				this.formDataPer = scope;
				this.formDataPer.legalChangeDate = new Date(this.formDataPer.legalChangeDate).getTime()
				this.formDataPer.establishmentDate = new Date(this.formDataPer.establishmentDate).getTime()
			},
			reviewPer(scope){
				this.dialogPer = true;
				this.noEditPer = true;				
				this.formDataPer = JSON.parse(JSON.stringify(scope));
				this.formDataPer.legalChangeDate = new Date(this.formDataPer.legalChangeDate).getTime()
				this.formDataPer.establishmentDate = new Date(this.formDataPer.establishmentDate).getTime()
			},
			tijiaoPer(scope){
				supplementSubmit(scope.id).then(res => {
					this.$message.success(res.msg);
					this.sendReqPer();
				}).catch(res => {
					this.$message.error(res.msg);
				})			
			},
			editPer(scope){
				this.dialogPer = true;
				this.noEditPer = true;
				this.formDataPer = scope;
				this.formDataPer.legalChangeDate = new Date(this.formDataPer.legalChangeDate).getTime()
				this.formDataPer.establishmentDate = new Date(this.formDataPer.establishmentDate).getTime()
			},
			xiugaiPer(scope){
				this.dialogPer = true;
				this.noEditPer = true;
				this.formDataPer = scope;
				this.formDataPer.legalChangeDate = new Date(this.formDataPer.legalChangeDate).getTime()
				this.formDataPer.establishmentDate = new Date(this.formDataPer.establishmentDate).getTime()
			},	
			submitFormPer(){
				this.$set(this.formDataPer,'applyId',this.formDataPer.id)
				this.$refs.addFormPer.validate(valid => {
					if(valid){
						supplementInformation(this.formDataPer).then(res => {
							this.$message.success(res.msg);
							this.dialogCom = false;
							this.sendReqPer();
						}).catch(res => {
							this.$message.error(res.msg);
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
		}
	}	
</script>
<style scoped="scoped" lang="scss">
	.el-col {
		margin-bottom: 20px;
	}
	.el-dialog .el-col {
		margin-bottom: 0;
	}
	.el-dialog .el-input,.el-dialog .el-select {
		width:200px
	}
	.mobile{
		.el-input,.el-select,.el-cascader {
			width: 100%
		}
	}
</style>