import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from './utils/api.js'
import * as tools from "./utils/tools"
//引入vuex
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(uView);

Vue.prototype.$store=store
Vue.prototype.$request=request
Vue.prototype.$tools=tools

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
