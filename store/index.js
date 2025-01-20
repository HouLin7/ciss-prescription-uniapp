// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import {
	LoginToken,
	UserInfo
} from '../common/data-model';
Vue.use(Vuex)
const store = new Vuex.Store({
			// #endif
			// #ifdef VUE3
			import {
				createStore
			} from 'vuex'
			const store = createStore({
				// #endif
				state: {
					tokenInfo: null,
					appName: "运动处方",
					platformInfo: 'devtools'
				},
				mutations: {
					setPlatformInfo(state, flag) {
						state.platformInfo = flag;
					},

					clearToken(state) {
						state.tokenInfo = null;
						uni.removeStorageSync("tokenInfo");
					},

					setLoginToken(state, tokenInfo) {
						state.tokenInfo = tokenInfo
						uni.setStorageSync("tokenInfo",tokenInfo);						
					},

					setUserInfo(state, newUserInfo) {
						state.tokenInfo.user = newUserInfo;
					}
				},

				getters: {
					isLogin: (state) => state.tokenInfo != null,
					token: (state) => state.tokenInfo.token,
					userInfo: (state) => state.tokenInfo.user,
				},

				actions: {
					// lazy loading openid
					getUserOpenId: async function({
						commit,
						state
					}) {
						return await new Promise((resolve, reject) => {
							if (state.openid) {
								resolve(state.openid)
							} else {
								uni.login({
									success: (data) => {
										commit('login')
										setTimeout(function() { //模拟异步请求服务器获取 openid
											const openid = '123456789'
											console.log(
												'uni.request mock openid[' +
												openid + ']');
											commit('setOpenid', openid)
											resolve(openid)
										}, 1000)
									},
									fail: (err) => {
										console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务',
											err)
										reject(err)
									}
								})
							}
						})
					},

				}
			})

			export default store