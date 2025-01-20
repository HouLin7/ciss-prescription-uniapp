<template>

	<view class="root-container">
		<view style="width: 100%;height: 400rpx; position: relative;">
			<view style="position:absolute;height: 200rpx; width: 100% ; background-color: rgb(93, 179, 188);">
				<view style="font-size: 36rpx; color: white; margin-left: 80rpx; margin-top: 40rpx;">早上好 {{userName}}
				</view>
			</view>

			<view style="position:absolute; z-index: 2;left: 0rpx;top: 130rpx;width: 100%;">

				<view class="big_card" style="">
					<view class=" uni-flex uni-row" style="align-items: center;">
						<view
							style="color: white; font-size: 32rpx; border-radius: 6rpx;background-color: #e38e37;width: 100rpx; height: 45rpx; display: flex; justify-content: center; align-items: center;">
							{{getDate()}}
						</view>
						<view style="margin-left: 20rpx;color: #e38e37;font-weight: bold;font-size: 30rpx;">健康条贴士</view>
					</view>
					<view style="height: 20rpx;" />
					<view>{{dailyheathHint}}</view>

				</view>
			</view>
		</view>

		<uni-grid :column="2" :square="false" :show-border="false">
			<uni-grid-item v-for="(item,index) in gridItems " :key="index" class="custom-item">
				<view class="conetnt card" :style="{backgroundColor: item.bgColor}" @click="onChange(index)">
					{{item.name}}</view>
			</uni-grid-item>
		</uni-grid>>
	</view>

</template>

<script lang="ts">
	import {
		mapState, mapGetters
	} from 'vuex';

	import { AmapPoiItem, DistrictItem } from '../../common/data-model';
	import { nextTick } from 'vue';

	export default {

		created() {

		},


		computed: {

			...mapState(["platformInfo", "hasLogin", "userName"]),

		},

		data() {
			return {

				dailyheathHint: "每天饮用足够的水，建议成人摄入 1500-2000 毫升水，以保持身体正常代谢。",
				gridItems: [
					{ name: "运动风险评估", bgColor: "#e38e37" },
					{ name: "体质监测信息", bgColor: "#58afb7" },
					{ name: "处方申请记录", bgColor: "#70a82a" },
					{ name: "触动处方报告", bgColor: "#83c8f0" },
					{ name: "预约服务", bgColor: "#b99bac" },
					{ name: "每日打卡", bgColor: "#b99bac" },
				],

			}
		},

		methods: {

			getDate() {
				const date = new Date(); // 当前日期
				const formattedDate = date.toLocaleDateString('en-US', {
					month: '2-digit',
					day: '2-digit'
				});
				return formattedDate;
			},

			onChange(index) {
				console.log(index);
				if (index == 0) {
					uni.navigateTo({
						url: "/pages/apply/apply_step_risk/apply_step_risk"
					})
				}				

			}
		}

	}
</script>


<style>
	.custom-item {
		/* padding: 40rpx; */
		/* height: 300rpx; */
		/* margin: 40rpx; */
	}

	.custom-item .conetnt {
		display: flex;
		justify-content: center;
		background-color: #e38e37;
		color: white;
		font-size: 30rpx;
		font-weight: 200;
		margin: 30rpx 30rpx;
		align-items: center;
		border-radius: 10rpx;
		height: 120rpx;
	}

	.root-container {
		display: flex;
		flex-direction: column;
		background-color: white;
		height: 90vh;
		/* 设置页面的高度为全屏 */
	}

	.text-label {
		margin-right: 10rpx;
		font-size: 24rpx;
		color: #666666;
	}

	.text-value {
		font-size: 24rpx;
		color: #333;
	}

	.input-panel {
		align-items: center;
		justify-content: space-between;
		padding-left: 15rpx;
		padding-right: 15rpx;
		padding-bottom: 15rpx;
	}

	.filter-panel {
		position: absolute;
		top: 200rpx;
		width: 100%;
		background-color: white;
		border-top: 1px solid #ccc;
		/* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
		z-index: 100;
		height: 0;
		overflow: hidden;
		transition: height 0.3s ease;
		/* 添加高度的平滑过渡 */
	}

	.custom_button_confirm {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 200rpx;
		height: 70rpx;
		border-radius: 10rpx;
		color: white;
		background-color: $uni-color-primary;
	}

	.card {
		border-radius: 10px;
		background-color: #ffffff;
		/* 添加过渡效果 */
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1),
			0 4px 6px rgba(0, 0, 0, 0.1);
		/* 多层阴影实现立体效果 */
		transition: box-shadow 0.3s ease;
		/* 鼠标悬停过渡效果 */
	}

	.card:hover {
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2),
			0 6px 8px rgba(0, 0, 0, 0.15);
		/* 悬停时的阴影效果 */
	}

	.big_card {
		border-radius: 6px;
		background-color: #ffffff;
		/* 添加过渡效果 */
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1),
			0 4px 6px rgba(0, 0, 0, 0.1);
		/* 多层阴影实现立体效果 */
		transition: box-shadow 0.3s ease;
		/* 鼠标悬停过渡效果 */

		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		height: 180rpx;
		margin: 0 40rpx;
		padding: 10rpx 20rpx;
	}
</style>