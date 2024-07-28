import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			meta: { title: '登录' },
			component: () => import('../views/login2.vue')
		},
		{
			path: '/AddVechicle',
			meta: { title: '添加车辆' },
			component: () => import('../views/vechicle/addVehicleFromPhone.vue')
		},
		{
			path: '/AddVechicle2',
			meta: { title: '添加车辆2' },
			component: () => import('../views/vechicle/AddVehicletest.vue')
		},
		{
			path: '/index',
			meta: { title: '综合平台' },
			component: () => import('../views/index.vue'),
			children: [
				{
					path: 'device',
					name:'device',
					meta: { title: '道闸基本信息' },
					component: () => import('../views/device/entranceList.vue')
				},
				{
					path: 'enterpriseInfo',
					name:'enterpriseInfo',
					meta: { title: '企业基础信息' },
					component: () => import('../views/enterprise/enterpriseInfo.vue')
				},
				{
					path: 'home',
					name:'home',
					meta: { title: '首页' },
					component: () => import('../views/home/homeindex.vue')
				},
				{
					path: 'passRecord',
					name:'passRecord',
					meta: { title: '进出场记录' },
					component: () => import('../views/vechicle/passRecord.vue')
				},
				{
					path: 'applyStop',
					name:'applyStop',
					meta: { title: '开业停业申请' },
					component: () => import('../views/enterprise/applyStop.vue')
				},
				{
					path: 'passRecordchangnei',
					name:'passRecordchangnei',
					meta: { title: '场内运输车辆' },
					component: () => import('../views/vechicle/passRecordchangnei.vue')
				},
				{
					path: 'passRecordmove',
					name:'passRecordmove',
					meta: { title: '非道路移动机械' },
					component: () => import('../views/vechicle/passRecordchangnei.vue')
				},
				{
					path: 'vehicleManage',
					name:'vehicleManage',
					meta: { title: '车辆管理' },
					component: () => import('../views/vechicle/vehicleManage.vue')
				},
				{
					path: 'vehicleSearch',
					name:'vehicleSearch',
					meta: { title: '备案车辆查询' },
					component: () => import('../views/vechicle/vehicleSearch.vue')
				}
				,
				{
					path: 'enterpriseManage',
					name:'enterpriseManage',
					meta: { title: '企业管理' },
					component: () => import('../views/enterprise/EnterpriseList.vue')
				}
				,
				{
					path: 'whitepassRecord',
					name:'whitepassRecord',
					meta: { title: '白名单过车记录' },
					component: () => import('../views/vechicle/whitePassRecord.vue')
				},
				{
					path: 'recordCountStatistic',
					name:'recordCountStatistic',
					meta: { title: '过车统计' },
					component: () => import('../views/passrecord/recordCountStatistic.vue')
				}
				
			]
		}

	]
})
router.beforeEach((to, from, next) => {
	let curentUser =sessionStorage.getItem('user') || '';
    if (to.path !== '/AddVechicle2'&&to.path !== '/AddVechicle'&&to.path !== '/login'&&curentUser==''&&from.path != '/login') {
        // 如果会话已经过期，则跳转到登录页面
        next('/login')
    } else {
        // 若会话未过期，则正常导航到目标页面
        next()
    }
})
export default router;