<template>
	<el-form class="card-box login-form userInfoForm boxShadow" label-width="80px" :label-position="labelPosition" disabled>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item prop="phone" label="姓名">
					<el-input type="text" v-model="name" placeholder="姓名 " autoComplete="on"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item prop="mobile" label="手机号">
					<el-input type="text" v-model="mobile" placeholder="手机号 "/>
				</el-form-item>	
			</el-col>
			<el-col :span="24">
				<el-form-item prop="email" label="邮箱">
					<el-input type="text" v-model="email" placeholder="邮箱 "/>
				</el-form-item>	
			</el-col>
			<el-col :span="24">
				<el-form-item prop="roleName" label="角色">
					<el-input type="text" v-model="roleName" placeholder="邮箱 "/>
				</el-form-item>	
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default{
		data(){
			return {
				name: this.$store.state.userInfo.realName,//姓名
				mobile: this.$store.state.userInfo.mobile,//手机号
				email: this.$store.state.userInfo.email,//邮箱
				role: this.$store.state.userInfo.roles[0],//角色
				labelPosition: 'left',
			}
		},
		computed: {
			roleName() {
				let roleName = '';
				if(this.role === 'super'){
					roleName = '超级管理员'
				}else if(this.role === 'first'){
					roleName = '一级管理员'
				}else{
					roleName = '二级管理员'
				}
				return roleName
			}
		},
	}
</script>

<style>
	.userInfoForm {
		width: 50%;
		margin: 0 auto;
		margin-top:10%
	}
	.mobile .userInfoForm {
		width: 100%;
	}
</style>