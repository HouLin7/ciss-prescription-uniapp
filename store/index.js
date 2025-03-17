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
					/**
					 * 临时的缓存（一次处方申请记录）
					 */
					tempApplyRecordItem: null,
					platformInfo: 'devtools',
					systemConfig: [], //系统字典
				},

				mutations: {
					setSystemConfig(state, item) {
						state.systemConfig = item;
					},

					setTempApplyRecordItem(state, item) {
						state.tempApplyRecordItem = item;
					},
					setPlatformInfo(state, flag) {
						state.platformInfo = flag;
					},

					clearToken(state) {
						state.tokenInfo = null;
						uni.removeStorageSync("tokenInfo");
					},

					initLoginToken(state, tokenInfo) {
						state.tokenInfo = tokenInfo
					},

					setLoginToken(state, tokenInfo) {
						state.tokenInfo = tokenInfo
						uni.setStorageSync("tokenInfo", tokenInfo);
					},

					setUserInfo(state, newUserInfo) {
						state.tokenInfo.user = newUserInfo;
					}
				},

				getters: {
					isLogin: (state) => state.tokenInfo,
					token: (state) => {
						if (state.tokenInfo) {
							return state.tokenInfo.token;
						} else {
							return null;
						}
					},
					userInfo: (state) => state.tokenInfo.user,
					sickConfig: (state) => {
						return (state.systemConfig).filter((value) => value.type == "sick")
					},
					sportConfig: (sate) => {
						return (state.systemConfig).filter((value) => value.type == "sport")
					},
				},

				actions: {


				}
			})

			export default store