<template>
	<el-form ref="userForm" autoComplete="on" :model="userForm" :rules='rules' class="card-box login-form userInfoForm boxShadow" label-width="100px" :label-position="labelPosition">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item prop="" label="账号">
					<el-input type="text " v-model="userForm.loginName" placeholder="账号 " autoComplete="on" disabled/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item prop="oldPassword" label="原密码">
					<el-input type="text" v-model="userForm.oldPassword" placeholder="原密码 "/>
				</el-form-item>	
			</el-col>
			<el-col :span="24">
				<el-form-item prop="newPassword" label="新密码">
					<el-input type="text" v-model="userForm.newPassword" placeholder="新密码 "/>
				</el-form-item>	
			</el-col>
			<el-col :span="24">
				<el-form-item prop="newPasswordAgain" label="确认密码">
					<el-input type="text" v-model="userForm.newPasswordAgain" placeholder="确认密码 "/>
				</el-form-item>	
			</el-col>
			<el-col :span="20">
				<el-form-item>
					<el-button type="primary" @click="sure">确定</el-button>
					<el-button type="success" @click="reset">重置</el-button>
				</el-form-item>	
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import { changePass } from '@/api/common'
	import { regPass } from '@/api/reg'
	export default{
		data(){
			const validatePass = (rule, value, callback) => {
				if(!regPass(value)){
					callback(new Error('请输入6-15字母数字！'))
				}else{
					callback()
				}
			}
			const validateRePass = (rule, value, callback) => {
				if(value != this.userForm.newPassword){
					callback(new Error('两次密码不一致！'))
				}else{
					callback()
				}
			}
			return {
				
				userForm: {				
					loginName: this.$store.state.userInfo.mobile,//姓账号
					oldPassword: '',//旧密码
					newPassword: '',//新密码
					newPasswordAgain: '',//确认密码
				},
				labelPosition: 'right',
				rules: {
					oldPassword: [{
						required: true,
						trigger: 'blur',
						message: '请输入原密码',
					}],
					newPassword: [{
						required: true,
						trigger: 'blur',
						validator: validatePass
					}],
					newPasswordAgain: [{
						required: true,
						trigger: 'blur',
						validator: validateRePass
					}],					
				}
			}
		},
		methods: {
			sure(){
				changePass(this.userForm).then(res => {	
					let that = this;
					this.$message({
					  showClose: true,
					  message: '修改成功，返回登录',
					  type: 'success',
					  onClose: function(aaaa){
						  that.logout()
					  }
					});					
					
				}).catch(res => {
					this.$message.error(res.msg)
				})
			},
			reset(){
				this.userForm = {				
					loginName: this.$store.state.userInfo.mobile,//姓账号
					oldPassword: '',//旧密码
					newPassword: '',//新密码
					newPasswordAgain: '',//确认密码
				}
				this.$refs.userForm.clearValidate();
			},
			logout() {
				this.$store.dispatch('FedLogOut').then(() => {
					location.reload() // 为了重新实例化vue-router对象 避免bug
				})
			}
		}
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