<template>
	<view style="padding: 40rpx 20rpx; align-items:center" class="uni-flex uni-column">

		<view style="height: 140rpx;"></view>
		<image mode="aspectFit" src="/static/logo.png" style="height: 200rpx;width: 200rpx; border-radius: 10rpx;" />
		<view style="height: 10rpx;"></view>
		<view class="uni-label-text">{{appName}}</view>
		<view style="height: 100rpx;"></view>

		<view v-if="isWexin()">
			<button class="custom_button_wexin" @click="handleLoginByWexinMask"
				v-show="userProvacyChecked===0">微信一键登录</button>

			<button class="custom_button_wexin" @click="handleLoginByWexin" open-type="getPhoneNumber"
				@getphonenumber="handlePhoneNumber" v-show="userProvacyChecked===1">微信一键登录</button>

			<view style="height: 40rpx;"></view>
		</view>

		<button class="custom_button_phone" @click="handleLoginByPhone">手机号登录</button>
		<view style="height: 40rpx;"></view>
		<view class="uni-flex uni-row">
			<checkbox-group @change="checkboxChange" style="width: 80rpx;">
				<checkbox color="#0000ff" checked="false" value="1" />
			</checkbox-group>
			<view class="underline-text" @click="openPrivacyUrl">我已同意隐私协议以及用户声明</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		mapMutations
	} from 'vuex'

	import {
		isWexinRuntime
	} from '../../common/util';
	export default {

		created() {


		},

		data() {
			return {
				userProvacyChecked: 1, // 用户隐私勾选标记 
			}
		},

		props: {
			type: {
				type: String,
				default: ''
			}
		},

		computed: {
			...mapState(["appName"]),
		},
		methods: {
			...mapMutations(['setHasLogin']),

			isWexin() {
				return isWexinRuntime();
			},
			
			checkboxChange(e) {
				const values = e.detail.value;
				if (values.length === 0) {
					this.userProvacyChecked = 0;
				} else {
					this.userProvacyChecked = 1;
				}

			},
			openPrivacyUrl() {
				uni.navigateTo({
					url: "/pages/user-privacy/user-privacy"
				})
			},

			handleLoginByWexinMask() {
				if (!this.userProvacyChecked) {
					uni.showToast({
						title: "请勾选用户隐私协议",
					})
					return;
				}
			},

			handleLoginByWexin() {
				// this.setHasLogin(true);
				// uni.switchTab({
				// 	url: "/pages/parking_post_page/parking_post_page"
				// })
				// uni.login({
				// 	provider: "weixin",
				// 	success(data) {
				// 		console.log(JSON.stringify(data));
				// 	},
				// 	fail(e) {
				// 		console.log(JSON.stringify(e));
				// 	},
				// });

				uni.getUserProfile({
					desc: "测试使用",
					success: (data) => {
						console.log(JSON.stringify(data));

					},
					fail(e) {
						console.log(JSON.stringify(e));
					},
				})

			},

			handlePhoneNumber(data) {
				console.log(data);
				if (data.detail.errMsg === "getPhoneNumber:ok") {
					const {
						encryptedData,
						iv
					} = data.detail;
				}
			},

			handleLoginByPhone() {
				uni.navigateTo({
					url: "/pages/login/login-by-phone"
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.custom_button_wexin {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 500rpx;
		height: 80rpx;
		border-radius: 100rpx;
		color: white;
		background-color: $uni-color-primary;
	}

	.custom_button_phone {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 500rpx;
		height: 80;
		border-radius: 100rpx;
		align-content: center;
		color: white;
		background-color: gray;
	}

	.center {
		padding: 100rpx;
	}
</style>