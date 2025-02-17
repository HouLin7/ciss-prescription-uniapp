import App from './App'
import store from './store'
import VConsole from 'vconsole'
const vConsole = new VConsole()
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.use(vConsole)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store);
	app.use(vConsole);
	return {
		app
	}
}
// #endif