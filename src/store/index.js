import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		navBarText:"",
		dateType:['Active Disaster'],
		pathBefore:"",
		selectedDisaster:{},
		licenseKey:''
	},
	mutations: {
		setState (state, newData) {
			state[newData.state] = newData.data
		},
	},
	actions: {
	},
	modules: {
	}
})
