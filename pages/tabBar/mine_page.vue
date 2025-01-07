<template>


	<view v-show="!hasLogin" style="display: flex;flex-direction: column;padding-top: 20rpx;align-items: center;">

		<view style="height: 200rpx;"></view>
		<image src="/static/logo.png" style="height: 150rpx;width: 150rpx;"></image>
		<view style="height: 150rpx;"></view>
		<view class="uni-label-text">登陆后才可查看</view>
		<view style="height: 20rpx;"></view>
		<button class="custom_button_wexin" @click="turnLoginPage">登录</button>
	</view>

	<view v-show="hasLogin" class="uni-flex uni-column" style="padding: 0rpx;">
		<view class="uni-flex uni-row" style="align-items: center;background-color: white;padding: 20rpx;">

			<image mode="aspectFit" :src="avatraUrl" class="avatar"></image>

			<view class="container" style="padding-left: 20rpx;">
				<text> {{name}}</text>
				<view style="height: 20px;"></view>
				<text> 备注</text>
			</view>

		</view>

		<view style="height: 60rpx;"></view>

		<!-- <uni-list> -->
		<uni-list-item showArrow title="发布的共享车位" clickable="true" @click="turnMySpacePost" />
		<uni-list-item showArrow title="租赁他人车位订单" clickable="true" @click="turnMyTenantSpaceOrder" />
		<uni-list-item showArrow title="自己的车位出租订单" clickable="true" @click="turnMySpaceOwnerOrder" />

		<!-- </uni-list> -->


		<view style="height: 200rpx;"></view>

		<button class="custom_button_wexin" @click="logout">退出登录</button>

	</view>
</template>

<script>
	import {
		nextTick
	} from 'vue';
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex';


	export default {

		computed: {
			...mapState(['hasLogin'])
		},

		methods: {

			...mapMutations(['setHasLogin']),

			logout() {
				this.setHasLogin(false);

				nextTick(() => {
					alert(this.hasLogin);
				});
				// uni.navigateTo({
				// 	url:'/pages/login/login'
				// })
			},

			//自己的车位出租
			turnMySpaceOwnerOrder(e) {
				uni.navigateTo({
					url: '/pages/my-order/my-owner-space-order-list/my-owner-space-order-list'
				})
			},

			//租赁别人车位订单
			turnMyTenantSpaceOrder(e) {
				uni.navigateTo({
					url: '/pages/my-order/my-order-list/my-order-list'
				})
			},

		},

		data() {
			return {
				avatraUrl: "/static/logo.png",
				name: "张三",
			};
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50%;
	}

	.avatar {
		width: 150rpx;
		/* 或者你需要的尺寸 */
		height: 150rpx;
		/* 或者你需要的尺寸 */
		border-radius: 10%;
		/* 圆形头像 */
		border: 1px solid white;
		/* 可选的边框 */
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		/* 可选的阴影效果 */
	}
</style>