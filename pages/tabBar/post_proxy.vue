<template>

	<unlogin_guild v-if="!hasLogin" />

	<view v-else class="uni-flex uni-column" style="height: 80vh; padding: 20rpx; justify-content:flex-end;">
		<uni-list-item showArrow title="发布信息" note="发布自己的车位信息" clickable="true" @click="handlePost()">

		</uni-list-item>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import unlogin_guild from '../../components/unlogin_guild.vue'
	export default {

		components: {
			unlogin_guild
		},
		computed: {
			...mapState(['hashLogin']),
		},

		methods: {
			turnLoginPage() {
				navi

			},

			handlePost(e) {

				uni.navigateTo({
					url: '/pages/parking_post_page/parking_post_page'
				})

			},

		},
		data() {
			return {

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