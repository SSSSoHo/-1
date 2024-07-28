<template>
	<div class="login">
		<div style="position:absolute;top:200px;z-index:9999;text-align: center;">
			</div>
		<div class="box" style="text-align: center;">
			<!-- <img src="../images/logo.jpg" width="100%"/>-->

			<div id="table">
				<div style="height: 45px;"><img src="../images/logo.png" width="10%" style="position: absolute; "></div>
				<div style="height: 45px;text-align: center;"><h1 style="font-size: 30px;color: black;margin-top: 2%;">运输车辆电子台账系统</h1></div>
			</div>
			<el-form :model="loginForm" ref="ruleFormRef" :rules="ruleForm" label-width="60px">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="loginForm.userName" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item label="密码" prop="userPwd" style="color: white;">
					<el-input v-model="loginForm.userPwd" type="password" show-password />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm(ruleFormRef)" style="width:100%;">登录</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="frontDownload"  style="margin-left: 190px"><el-icon><Download /></el-icon>下载客户端</el-button>
					<!-- <a href="../../public/static/VehicleClient.rar" download="VehicleClient.rar" target="_blank" style="margin-left: 220px;">下载客户端</a> -->
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
	Download
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { $login } from '../api/UserInfo'
//获取全局状态
// import useUser from '../store/user.ts'
// const userStore = useUser();

const router = useRouter();
const ruleFormRef = ref<FormInstance>()
//表单数据
const loginForm = reactive({
	userName: '',
	userPwd: ''
})
//登录验证
const validateName = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('用户名不允许为空'))
	} else {
		callback()
	}
}
const frontDownload=()=> {
	var a = document.createElement("a"); // 创建一个<a></a>标签
	a.href = "http://36.41.184.182:8091/Upload/VehicleClient.rar";
	a.download = "VehicleClient.rar"; // 设置下载文件文件名
	a.style.display = "none"; // 隐藏a标签
	document.body.appendChild(a); // 将a标签追加到文档对象中
	a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
	a.remove(); // 一次性的，用完就删除a标签
}
const validatePwd = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('密码不允许为空'))
	} else {
		callback()
	}
}
const ruleForm = reactive<FormRules<typeof loginForm>>({
	userName: [{ validator: validateName, trigger: 'blur' }],
	userPwd: [{ validator: validatePwd, trigger: 'blur' }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			let res = await $login(loginForm) as any;
			if (res) {
				sessionStorage.setItem('user',JSON.stringify(res.Data));
				router.push('/index');
			}
		}
	})
}
</script>

<style lang="scss" scoped>
.login {
	width: 100vw;
	height: 100vh;
	background: linear-gradient(to bottom, #142334, #6894c7);
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url("../images/login_bg.jpg");
	width: 100%;
	height: 100%;
	position: fixed;
	background-size: 100% 100%;
}
h1 {
		color: #ffffff;
		
		font-family: 'Times New Roman', Times, serif;
		
	}
.box {
	position:relative;
	width: 450px;
	border: 1px solid #000000;
	border-radius: 10px;
	padding: 40px 40px 40px 40px;
	background-color: #FFF;
	::v-deep(.el-form-item__label) {
		color: #000000;
	}
}
#table{
	display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: space-around;
    justify-content: space-between;
	margin-bottom: 40px ;
    margin-top: 20px;
}
</style>