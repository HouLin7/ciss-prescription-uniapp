<template>
	<view style="padding: 40rpx 20rpx; align-items:center" class="uni-flex uni-column">

		<view style="height: 140rpx;"></view>
		<image mode="aspectFit" src="/static/logo.png" style="height: 140rpx;width: 140rpx;" />
		<view style="height: 10rpx;"></view>
		<view>{{appName}}</view>
		<view style="height: 100rpx;"></view>

		<button class="custom_button_wexin" @click="handleLoginByWexin">微信一键登录</button>
		<view style="height: 40rpx;"></view>

		<button class="custom_button_phone" @click="handleLoginByPhone">手机号登录</button>
		<view style="height: 40rpx;"></view>
		<view class="uni-flex uni-row">
			<checkbox color="#0000ff"></checkbox>
			<view>我已同意隐私协议以及用户声明</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},

		props: {
			type: {
				type: String,
				default: '222'
			}
		},

		computed: {
			...mapState(["appName"]),
		},
		methods: {

			handleLoginByWexin() {
				uni.login({
					provider: "weixin",
					success(data) {
						console.log(JSON.stringify(data));
					},
					fail(e) {
						console.log(JSON.stringify(e));
					},
				});
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