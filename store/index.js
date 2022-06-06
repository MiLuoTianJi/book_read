import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './commonData.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		commonData
	},
    state: {},
    mutations: {},
    actions: {}
})
export default store