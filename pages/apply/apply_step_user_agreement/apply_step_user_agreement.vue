<template>
	<view class="container">
		<view class="top card" style="margin: 10rpx 20rpx">
			<uni-steps :options="stepMenus" :active="active" />
		</view>

		<view class="middle">
			<web-view fullscreen="false" style="margin-top: 110rpx; margin-bottom: 10rpx;" :src="url"></web-view>
		</view>

		<!-- <view class="bottom"> -->
		<view class="uni-flex bottom" style="padding: 10rpx 40rpx;">
			<button class="custom_button_wexin" style="background-color: #999;" @click="reject">拒绝</button>
			<view style="width: 40rpx"></view>
			<button class="custom_button_wexin">同意</button>
		</view>
		<!-- </view> -->

	</view>
</template>

<script>
	import {
		userAgreementUrl
	} from "@/common/constants.js"
	export default {

		data() {
			return {
				url: userAgreementUrl,
				active: 3,

				stepMenus: [{
					title: "风险评估"
				}, {
					title: "健康问卷"
				}, {
					title: "体测数据"
				}, {
					title: "知情同意书"
				}, ],
			}
		},

		methods: {
			reject() {
				uni.switchTab({
					url: "/pages/tabBar/home_page"
				})
			},
			agree() {

			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		/* 垂直排列 */
		height: 100vh;
		padding-bottom: 20rpx;
		/* 设置全屏高度 */
		overflow: hidden;

	}

	.top {
		height: 80rpx;
		padding: 10rpx 20rpx;
		overflow: hidden;		
	}

	.middle {
		flex: 1;
		width: 100%;
		overflow: hidden;
	}

	.bottom {
		height: 80rpx;
		background-color: white;
		/* height: 100rpx; */
	}
</style>