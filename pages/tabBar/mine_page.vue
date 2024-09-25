<template>
	<view class="uni-flex,uni-column" style="padding: 20rpx;">
		<view class="uni-flex,uni-row" style="align-items: center;">

			<image mode="aspectFit" :src="avatraUrl" class="avatar"></image>

			<view class="container" style="padding-left: 20rpx;">
				<text> {{name}}</text>
				<view style="height: 20px;"></view>
				<text> 备注</text>
			</view>

		</view>

		<view style="height: 100rpx;"></view>

		<uni-list>
			<uni-list-item showArrow title="我已共享的车位" />
			<uni-list-item showArrow title="我的订单" rightText="" />
		</uni-list>
		

	</view>
</template>

<script>
	export default {
		
		
		data() {
			return {
				avatraUrl: "/static/logo.png",
				name: "张三",
			};
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50%;
	}

	.avatar {
		width: 150px;
		/* 或者你需要的尺寸 */
		height: 150px;
		/* 或者你需要的尺寸 */
		border-radius: 50%;
		/* 圆形头像 */
		border: 3px solid white;
		/* 可选的边框 */
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		/* 可选的阴影效果 */
	}
</style>