<script>
	import config from './api/env_config.js';

	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	import httpUtils from './api/http-utils.js';
	import loginApi from './api/login_api.js';

	export default {

		methods: {
			...mapMutations(['initLoginToken', 'setPlatformInfo', 'clearToken', 'setSystemConfig'])
		},

		computed: {
			...mapGetters(['token'])
		},

		onLaunch: function() {
			console.log('App Launch')
			var tokenInfo = uni.getStorageSync("tokenInfo");			
			if (tokenInfo) {
				this.initLoginToken(tokenInfo);
			}

			uni.getSystemInfo({
				success: res => {
					// console.log('设备品牌:', res.brand);
					// console.log('设备型号:', res.model);
					// console.log('操作系统:', res.system);
					// console.log('微信版本:', res.version);
					// console.log('运行平台:', res.platform);
					this.setPlatformInfo(res.platform);
				},
				fail: error => {
					console.error('获取系统信息失败:', err);
				}
			});

			uni.addInterceptor('request', {
				invoke: (args) => {
					args.url = config['API_BASE_URL'] + args.url

					if (!args.header) {
						args.header = {}; // 如果没有 headers，则初始化为空对象
					}
					if (this.token) {
						args.header['Authorization'] = `${this.token}`; // 添加 token 到 Authorization 字段	
					}
					return args;
				},

				// 请求完成后拦截
				success: (response) => {
					console.log('请求成功', response);
					if (response.statusCode == 401) {
						this.clearToken();
						setTimeout(() => {
								uni.showToast({
									title: "token已失效,请您重新登录"
								});
							}, 2000),

							uni.reLaunch({
								url: "/pages/login/login-by-phone"
							})
					}
					return response;
				},

			});

			loginApi.getSysConfig().then((res) => {
				this.setSystemConfig(res);				
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import '@/static/customicons.css';

	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		/* line-height: 1.8; */
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}


	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	:root {
		--theme-color: #1B76F8;
		--text-color: #333333;
	}

	.input_box {
		background-color: #fff;
		opacity: 1;
		border-radius: 8rpx;
		border: 1px solid #ddd;
		height: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 12rpx;
		padding-right: 12rpx;
	}

	.underline-text {
		text-decoration: underline;
		/* 添加下划线 */
	}

	.next-button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 70rpx;
		border-radius: 10rpx;
		color: white;
		width: calc(100% - 40rpx);
		margin: 0rpx 20rpx;
		background-color: $uni-color-primary;
	}

	.custom_button_wexin {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 85%;
		height: 70rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		color: white;
		background-color: $uni-color-primary;
	}

	.custom_button_wexin_disabled {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		width: 85%;
		height: 70rpx;
		border-radius: 10rpx;
		color: #000;
		background-color: #999;
	}

	.card {
		// display: flex;
		// flex-direction: column;		
		padding: 10rpx 20rpx;
		background-color: white;
		border-radius: 10rpx;
	}

	.accent-color {
		color: $uni-color-primary;
	}


	.accent-bg-color {
		background-color: $uni-color-primary;
	}

	.divier {
		margin-top: 5rpx;
		margin-bottom: 5rpx;
		background-color: #ddd;
		height: 1rpx;
	}

	.list-item-divider {
		border-bottom: 1rpx solid #ddd;
		margin: 6rpx 0rpx;
	}

	/* #endif*/
</style>