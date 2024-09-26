<template>

	<view class="counter">

		<view v-if="hasLogin" style="counter">
			<uni-section type="line"> 区域</uni-section>

		</view>
		<view v-if="!hasLogin" style="display: flex;flex-direction: column;padding-top: 20rpx;align-items: center;">

		<view style="height: 200rpx;"></view>
			<image src="/static/logo.png" style="height: 150rpx;width: 150rpx;"></image>
			<view style="height: 150rpx;"></view>
			<text>登陆后才可以发布</text>
			<view style="height: 10rpx;"></view>
			<button type="primary" style="width: 300rpx;" @click="turnLoginPage">登陆</button>

		</view>


	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {

		created() {

		},


		data() {
			return {
				isLogined: false,

			}
		},

		computed: {
			...mapState(['hasLogin'])
		},

		methods: {

			turnLoginPage() {
					
					uni.navigateTo({
						url:'/pages/login/login'
					})
			},


		}
	}
</script>

<style>
	.counter {
		padding: 15rpx;
		display: flex;
		flex-direction: column;
	}
</style>