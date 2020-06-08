<template>
	<div class="login-container" style="margin: 0px;overflow: hidden;">
		<el-form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" class="card-box login-form" :class="device === 'mobile'?'mobile-login-form':''">
			<h3 class="title">融 道 经 纬</h3>
			<el-form-item prop="phone">
				<el-input type="text" v-model="loginForm.phone" placeholder="手机号码" autoComplete="on" />
				<i type="ios-person-outline" slot="prepend"></i>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter.native="handleLogin" />
				<i type="ios-locked-outline" slot="prepend"></i>
			</el-form-item>
			<el-form-item prop="identifyVal">
				<el-input v-model="loginForm.identifyVal" name="identifyVal" type="text" auto-complete="off" placeholder="验证码" class='identifyVal'/>
				<span @click="refreshCode" class="changeCode"> 换一换</span>
				<SIdentify :identifyCode="identifyCode" class="identifyCode" ></SIdentify>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleLogin('loginForm')">登 录</el-button>
			</el-form-item>
		</el-form>
		<div style="position: fixed;bottom: 0;left: 0;text-align: center;width: 100%;padding: 20px;background: #013856;height: 60px;color: #cfcccc;font-size: 12px;letter-spacing: 1px;">
			<p>天津融道经纬网络科技有限公司 | 版权所有 | <a :href='targetWeb' target="_blank">津ICP备19009520号-1</a></p>
		</div>
	</div>
</template>

<script>
	import { regPhone, regPass, noEmpty } from '@/api/reg.js'
	import SIdentify from '@/views/identify/index.vue'
	import ResizeMixin from '@/views/layout/mixin/ResizeHandler'

	export default {
		name: 'login',
		components:{ SIdentify },
		mixins: [ResizeMixin],
		data() {
			const validatePhone = (rule, value, callback) => {
				if(!regPhone(value)){
					callback(new Error('请输入手机号码！'))
				}else{
					callback()
				}
			}
			const validatePass = (rule, value, callback) => {
				if(!regPass(value)){
					callback(new Error('密码不正确！'))
				}else{
					callback()
				}
			}
			const validateIdentify = (rule, value, callback) => {
				if(this.identifyCode != value){
					callback(new Error('验证码不正确！'))
				}else{
					callback()
				}
			}

			return {
				//18622116168
				loginForm: {
					phone: '',
					password: '',
					identifyVal: '',
				},
				loginRules: {
					// phone: [{
					// 	required: true,
					// 	trigger: 'blur',
					// 	validator: validatePhone
					// }],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePass
					}],
					identifyVal: [{
						required: true,
						trigger: 'bulr',
						validator: validateIdentify
					}]
				},
				loading: false,
				showDialog: false,
				identifyCode: "",
				identifyCodes: "1234567890",
                targetWeb: 'http://beian.miit.gov.cn/'
			}
		},
		mounted() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
			//console.log(this.identifyCode)
		},
		methods: {
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true;
						this.$store.dispatch('Login', this.loginForm).then(() => {
							this.$message.success('登录成功');
							this.loading = false;
							this.$router.push({path: '/home'});
						 }).catch(res => {
							this.$message.error(res.msg);
							this.loading = false;
						});
					} else {
						return false;
					}
				});
			},

			//执行验证码生成
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				for(let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
			}
		},
		computed:{
			device() {
				return this.$store.state.device;
			}
		}
	}
</script>

<style scoped="scoped">
	.login-container {
		background: url(../../assets/bg2.png) no-repeat;
		background-size: cover;
	}
	.login-container a {
		color: #0078de;
	}
	#canvascontainer {
		position: absolute;
		top: 0px;
	}
#canvas {background-color: #2d3a4b;}
	.wz-input-group-prepend {
		background-color: #141a48;
		border: 1px solid #2d8cf0;
		border-right: none;
		color: #2d8cf0;
	}
</style>

<style rel="stylesheet/scss" lang="scss">
	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 5px;
	}

	.login-container {
		height: 100vh;
		background-color: #013856;
		background-blend-mode: overlay;
		input:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
			-webkit-text-fill-color: #fff !important;
		}

		input {
			background: #fff;
			border: 1px solid #2d8cf0;
			-webkit-appearance: none;
			border-radius: 3px;
			padding: 12px 5px 12px 15px;
			color: #000;
			height: 40px;
		}

		.el-input {
			display: inline-block;
			height: 40px;
			width: 100%;
		}

		.svg-container {
			padding: 6px 5px 6px 15px;
			color: #889aa4;
		}

		.title {
			font-size: 34px;
			color: #eeeeee;
			margin: 0px auto 30px auto;
			text-align: center;
			font-weight: bold;
		}

		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 400px;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
			z-index: 1999;
		}
		.mobile-login-form{
			width: 100%;
			padding: 10px;
		}

		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
			margin-bottom: 15px;
		}

		.forget-pwd {
			color: #fff;
		}

		.el-button {
			width: 100%
		}
		.identifyVal {
			width:50%;
			display: inline-block;
		}

		.identifyCode {
			width:30%;
			float:right;
			height:40px;
		}
		.identifyCode canvas{
			line-height:40px;
			width:100%;
			height:40px;
			margin-left: 2px;
			border-radius: 3px;
		}
		.changeCode {
			float: right;
			display: inline-block;
			margin-right:10px;
			margin-left: 10px;
			line-height:40px;
			cursor: pointer;
			color:#0486F9
		}
	}
</style>
