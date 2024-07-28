import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import {store} from './store'
import {createPinia} from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VueQrcode from 'vue-qrcode'
import 'default-passive-events'

createApp(App)
.use(router)
.use(ElementPlus,{locale:zhCn})
.use(store)
.use(createPinia()).component('vue-qrcode', VueQrcode)
.mount('#app')

