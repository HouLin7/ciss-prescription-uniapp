<template>
	<view style="padding-left: 40rpx;padding-right: 40rpx; align-items:center" class="uni-flex uni-column">

		<view style="height: 140rpx;"></view>
		<image mode="aspectFit" src="/static/logo.png" @click="handleClose" style="height: 140rpx;width: 140rpx;" />
		<view style="height: 100rpx;"></view>



		<button class="custom_button_wexin" @click="uni.navigateTo({
			
		})">微信一键登录</button>
		<view style="height: 40rpx;"></view>



		<view style="height: 40rpx;"></view>
		<view class="uni-flex uni-row">
			<checkbox color="#0000ff"></checkbox>
			<view>我已同意隐私协议以及用户声明</view>
		</view>
	</view>
</template>

<script>
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

		methods: {

			handleLogin() {

			},

			handleClose() {
				uni.navigateBack();
			}

		}
	}
</script>

<style scoped>
	.custom_button_wexin {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 500rpx;		
		height: 80rpx;
		border-radius: 100rpx;
		color: white;
		background-color: var(--theme-color);
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