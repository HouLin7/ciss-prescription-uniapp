<template>

	<view style="display: flex;flex-direction: column;padding-top: 20rpx;align-items: center;">

		<view style="height: 200rpx;"></view>
		<image src="/static/logo.png" style="height: 150rpx;width: 150rpx;"></image>
		<view style="height: 150rpx;"></view>
		<view class="uni-label-text">登陆后才可查看</view>
		<view style="height: 20rpx;"></view>
		<button class="custom_button_wexin" @click="turnLoginPage">登录</button>
	</view>

</template>

<script>
	export default {
		name: "unlogin_guild",
		data() {
			return {

			};
		},
		methods: {
			turnLoginPage() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>