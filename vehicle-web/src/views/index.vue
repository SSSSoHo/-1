<template>
	<div>
		<el-container class="my-layout">
			<!-- 头部 -->
			<el-header class="my-title">
				<!-- <img src="../images/logo.jpg" width="192" height="60" style="margin-left: -20px;"/> -->
				<h2 style="width: 30%;padding-left: 10px;">运输车辆电子台账系统</h2>
				<el-menu mode="horizontal" :ellipsis="false" background-color="#142334" text-color="#FFF"
					style="width: 70%;display: flex;justify-content: flex-end;">
					<el-menu-item index="1" @click="openPage('home')">
						<el-icon>
							<HomeFilled />
						</el-icon>
						首页</el-menu-item>
					<el-menu-item index="2">
						<el-icon>
							<ChatLineSquare />
						</el-icon>
						消息</el-menu-item>
					<el-sub-menu index="3">
						<template #title><el-icon>
								<User />
							</el-icon>管理员</template>
						<el-menu-item index="2-1">个人信息</el-menu-item>
						<el-menu-item index="2-2">重置密码</el-menu-item>
						<el-menu-item index="2-3" @click="exitsystem()">退出</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</el-header>
			<el-container>
				<!-- 左侧菜单 -->
				<el-aside class="my-left">
					<el-menu active-text-color="#ffd04b" background-color="#142334" class="el-menu-vertical-demo"
						default-active="2" text-color="#fff">
						<el-sub-menu index="1">
							<template #title>
								<el-icon>
									<Memo />
								</el-icon>
								<span>基本信息</span>
							</template>
							<el-menu-item index="1-1" @click="openPage('enterpriseInfo')" v-if="form.enterpriseId!='0'">企业基本信息</el-menu-item>
							<el-menu-item index="1-2" @click="openPage('device')">设备基本信息</el-menu-item> 
						</el-sub-menu>
						<el-sub-menu index="2">
							<template #title>
								<el-icon><Document /></el-icon>
								<span>车辆信息</span>
							</template>
							<el-menu-item index="2-3" @click="openPage('vehicleManage')">车辆管理</el-menu-item>
							<el-menu-item index="2-1" @click="openPage('vehicleSearch')">备案车辆查询</el-menu-item>
							<el-menu-item index="2-4" @click="openPage('vehicleManage')">非道路移动机械</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="3">
							<template #title>
								<el-icon><Notebook /></el-icon>
								<span>进出台账</span>
							</template>
							<el-menu-item index="2-2" @click="openPage('passRecord')" >进出场车辆</el-menu-item>
							<el-menu-item index="3-3" @click="openPage('whitepassRecord')" >白名单进出场记录</el-menu-item>
							<el-menu-item index="3-2" @click="openPage('passRecordchangnei')" >场内运输车辆</el-menu-item>
							<el-menu-item index="3-3" @click="openPage('passRecordmove')" >非道路移动机械</el-menu-item>
						</el-sub-menu>
						<el-menu-item index="4">
							<el-icon><Collection /></el-icon>
							<span>复议申请</span>
						</el-menu-item>
						<el-menu-item index="5"  @click="openPage('enterpriseManage')" v-if="curentUser.IsAdmin">
							<el-icon><Collection /></el-icon>
							<span>企业管理</span>
						</el-menu-item>
					 <el-menu-item index="5" @click="openPage('applyStop')">
							<el-icon><ScaleToOriginal /></el-icon>
							<span>开业停业申请</span>
						</el-menu-item> 
						<el-menu-item index="6">
							<el-icon><Warning /></el-icon>
							<span>预警信息</span>
						</el-menu-item>
						<!-- <el-menu-item index="7">
							<el-icon><CircleClose /></el-icon>
							<span>车辆黑名单</span>
						</el-menu-item> -->
						<!-- <el-menu-item index="8">
							<el-icon><Link /></el-icon>
							<span>管控策略</span>
						</el-menu-item> -->
					</el-menu>
				</el-aside>
				<!-- 主体内容 -->
				<el-main style="background-color:#eef2fb;">
					<tabBar />

				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import {
	Memo,
	Document,
	Notebook,
  HomeFilled,
  ChatLineSquare,
  User,
  Collection,ScaleToOriginal,Warning
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import tabBar from './components/tabBar.vue'
import useUser from '../store/user.ts'
const router = useRouter();
const userStore = useUser();
const form = ref({
  daterange: '',
  enterpriseId: '',
  vehicleNumber: '',
  numberColor: '3',
  emissionStage: '',
  inOut: '',
  vehicleType: '',
  IsWhite:false
})
let curentUser =JSON.parse(sessionStorage.getItem('user') || '');
onMounted(() => {
	openPage('home')
	if (!userStore.user) {
		router.push('/login')
	}
})
const exitsystem=()=>{
	sessionStorage.setItem('user','');
	router.push('/login');
}
const openPage = (menuid: string) => {
	router.push({ name: menuid });
};
</script>

<style scoped lang="scss">
.my-layout {
	width: 100vw;
	height: 100vh;
	.el-main {
		padding: 0px;
	}

	.my-title {
		display: flex;
		height: 60px;
		background-color: #142334;
		color: white;
		align-items: center;
		width: 100%;

		.el-menu {
			border-bottom: none;

		}
	}
	.el-menu-inline{
				background-color: rgb(48, 65, 86);
			}

	.my-left {
		width: 192px;
		background-color: #142334;
		color: white;
	}

	.my-content {
		flex: 1;
		display: flex;
		flex-direction: column;

	}

}

</style>