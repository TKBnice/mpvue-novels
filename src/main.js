import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import WXrequest from './utils/wx-request'



Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$httpWX = WXrequest

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
