<template>
	<view style="padding-left: 40rpx;padding-right: 40rpx;" class="uni-flex uni-column">

		<view style="height: 100rpx;"></view>
		<view class="uni-center">
			<image mode="aspectFit" src="/static/logo.png" style="height: 140rpx;width: 140rpx;" />
		</view>

		<view class="uni-flex uni-row" style="justify-content: center;margin-top: 10rpx;">{{appName}}</view>

		<view style="height: 100rpx;"></view>


		<view class="uni-row uni-flex" style="align-items: center;justify-content: start;">
			<view style="padding-right: 10rpx;">+86</view>
			<input placeholder="请输入手机号" type="number" name="phone" value="" />
		</view>

		<view>
			<view style="height: 1rpx;flex: 1; background-color: grey;opacity: 0.5;margin-top: 10rpx;"></view>
		</view>



		<view style="height: 100rpx;"></view>
		<button class="custom_button_wexin" @click="handleLogin()">登陆并同意注册</button>
		<view style="height: 40rpx;"></view>

		<view style="height: 40rpx;"></view>
		<view class="uni-flex uni-row " style="align-items:center;">
			<checkbox-group @change="checkboxChange" style="width: 80rpx;">
				<checkbox color="#0000ff" checked="false" value="1" />
			</checkbox-group>
			<view class="underline-text">我已同意隐私协议以及用户声明</view>
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
	export default {
		data() {
			return {

			}
		},

		computed: {
			...mapState(["appName"]),
		},
		props: {
			type: {
				type: String,
				default: '222'
			}
		},

		methods: {

			...mapMutations(['setHasLogin']),

			handleLogin() {
				this.setHasLogin(true);
				uni.switchTab({
					url: '/pages/tabBar/home_page'
				})
				// uni.redirectTo({
				// 	url:'/pages/parking_post_page/parking_post_page'	
				// })				
			},

			handleClose() {
				uni.navigateBack();
			},

		}
	}
</script>

<style scoped lang="scss">
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