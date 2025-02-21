<template>

	<view class="root-container">
		<view style="width: 100%;height: 520rpx; position: relative;">

			<image style="position:absolute;height: 100%; width: 100% ;" mode="scaleToFill"
				:src=" userInfo.roleFlag == 1?'/static/banner_2.png':'/static/banner_1.png'">
			</image>

			<view style="position:absolute; width: 100%; top: 40rpx;">
				<view class="uni-flex" style="justify-content: center;align-items: center;">
					<view style="font-size: 38rpx;color: black;font-weight: bold;"> 健康管理</view>
				</view>
			</view>


			<view style="position:absolute; font-size: 32rpx; color: black; margin-left: 80rpx; margin-top: 100rpx;">早上好
				{{userName}}
			</view>

			<view
				style=" position:absolute; z-index: 3;left: 100rpx;top: 180rpx; color: white; font-size: 32rpx; border-radius: 10rpx;background-color: #e38e37;width: 180rpx; height: 50rpx; display: flex; justify-content: center; align-items: center;">
				{{getDate()}}
			</view>

			<view class="uni-flex" style="justify-content: space-between; margin: 0rpx,40rpx;">

				<view style="back">

				</view>
			</view>

			<view style="position:absolute; z-index: 2;left: 0rpx;top: 200rpx;width: 100%;">

				<view class="big_card">

					<view class="">
						<view class=" uni-flex uni-row" style="align-items: center;justify-content: center;">
							<view style="color: #2260FF;font-weight: bold;font-size: 28rpx;">健康小贴士</view>
						</view>
						<view style="height: 5rpx;" />
						<view style="font-size: 26rpx;">{{dailyheathHint}}</view>
					</view>


				</view>
			</view>
		</view>

		<view style="height: 20rpx;"></view>

		<view v-if="isProfessor">
			<view class="uni-flex" style="margin-top: 40rpx; padding: 0rpx 100rpx;justify-content: space-between;">

				<view class="cell_recipe_make_recipe" @click="onChange(0)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_recipe_apply.png"></image>
					<view class="cell_text">为用户开具处方</view>
				</view>

				<view class="cell_recipe_make_recipe_done" @click="onChange(1)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_recipe_apply.png"></image>
					<view class="cell_text">已开具的处方</view>
				</view>
			</view>
			<view style="height: 40rpx;" />
			<view class="uni-flex" style="padding: 0rpx 100rpx;justify-content: space-between;">
			
				<view class="cell_default" @click="onChange(100)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_order_service.png"></image>
					<view class="cell_text_default">预约服务</view>
				</view>
			
				<view class="cell_default" @click="onChange(100)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_attend.png"></image>
					<view class="cell_text_default">每日签到</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="uni-flex" style="padding: 0rpx 100rpx;justify-content: space-between;">

				<view class="cell_recipe_apply" @click="onChange(0)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_recipe_apply.png"></image>
					<view class="cell_text">运动处方申请</view>
				</view>

				<view class="cell_recipe_apply_record" @click="onChange(1)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_recipe_apply_record.png"></image>
					<view class="cell_text">处方申请记录</view>
				</view>
			</view>
			<view style="height: 40rpx;" />
			<view class="uni-flex" style="padding: 0rpx 100rpx;justify-content: space-between;">

				<view class="cell_recipe_apply_record_done" @click="onChange(2)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_recipe_apply.png"></image>
					<view class="cell_text">运动处方报告</view>
				</view>

				<view class="cell_default" @click="onChange(100)">
					<image style="width: 80rpx;height: 80rpx;" src="/static/icons/ic_order_service.png"></image>
					<view class="cell_text_default">预约服务</view>
				</view>
			</view>
		</view>


		<!-- <view style="padding: 40rpx 20rpx;">
			<uni-grid :column="2" :square="false" :show-border="false">
				<uni-grid-item v-for="(item,index) in gridItems " :key="index" class="custom-item">
					<view class="conetnt card" :style="{backgroundColor: item.bgColor}" @click="onChange(index)">
						{{item.name}}
					</view>
				</uni-grid-item>
			</uni-grid>
		</view> -->

		<view>
			<uni-popup ref="popup" type="dialog" background-color="#fff">
				<uni-popup-dialog ref="inputClose" title="友情提示" content="该功能正在开发中,敬请期待..."></uni-popup-dialog>
				<!-- <view style="font-size: 26rpx; font-weight: bold; color: #000; padding-bottom: 10rpx;">敬请期待</view> -->
			</uni-popup>
		</view>

	</view>

</template>

<script lang="ts">
	import {
		mapState, mapGetters
	} from 'vuex';

	import { AmapPoiItem, DistrictItem } from '../../common/data-model';
	import { nextTick } from 'vue';

	export default {


		computed: {
			...mapState(["platformInfo", "isLogin"]),
			...mapGetters(['userInfo']),
			userName() {
				if (this.userInfo) {
					return this.userInfo.name;
				}
				return ""
			},

			isProfessor() {
				return this.userInfo && this.userInfo.roleFlag == 1;
			},

			gridItems() {
				if (this.isProfessor) {
					return [
						{ name: "为用户开具处方", bgColor: "#e38e37" },
						{ name: "已开具的处方", bgColor: "#70a82a" },
					];
				}
				return [
					{ name: "运动处方申请", bgColor: "#e38e37" },
					// { name: "体质监测信息", bgColor: "#58afb7" },
					{ name: "处方申请记录", bgColor: "#70a82a" },
					{ name: "运动处方报告", bgColor: "#83c8f0" },
					{ name: "预约服务", bgColor: "#b99bac" },
					{ name: "每日打卡", bgColor: "#b99bac" },
				];
			}
		},

		data() {
			return {

				dailyheathHint: "每天饮用足够的水，建议成人摄入 1500-2000 毫升水，以保持身体正常代谢。",

			}
		},

		methods: {
			getDate() {
				const date = new Date(); // 当前日期
				const formattedDate = date.toLocaleDateString('zh-CN', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				});
				return formattedDate;
			},

			showWelcomDialog() {
				this.$refs.popup.open('center');
			},

			onChange(index) {

				if (this.userInfo != null && this.userInfo.roleFlag == 1) {
					if (index == 0) {
						uni.navigateTo({
							url: "/pages/apply/apply_record_list/apply_record_list"
						})
					} else if (index == 1) {
						uni.navigateTo({
							url: "/pages/apply/apply_record_list/apply_record_list?status=" + 1
						})
					} else {
						this.showWelcomDialog();
					}
				} else {
					if (index == 0) {
						uni.navigateTo({
							url: "/pages/apply/apply_step_risk/apply_step_risk"
						})
					} else if (index == 1) {
						uni.navigateTo({
							url: "/pages/apply/my_apply_record_list/my_apply_record_list"
						})
					} else if (index == 2) {
						uni.navigateTo({
							url: "/pages/apply/my_apply_record_list/my_apply_record_list?status=" + 1
						})
					} else {
						this.showWelcomDialog();
					}
				}




			}
		}

	}
</script>


<style lang="scss">
	$cell-size: 220rpx;

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
		margin: 20rpx 20rpx;
		align-items: center;
		border-radius: 10rpx;
		height: 100rpx;
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


	.small_card {
		border-radius: 14px;
		background-color: #E4EBF7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10rpx 20rpx;
	}

	.big_card {
		border-radius: 20px;
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
		height: 220rpx;
		margin: 0 60rpx;
		padding: 10rpx 50rpx;
	}

	.cell_text {
		font-size: 26rpx;
		color: white;
		margin-top: 20rpx;
		font-weight: bold;
	}

	.cell_recipe_apply {
		display: flex;
		border-radius: 20rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $cell-size;
		height: $cell-size;
		/* background: linear-gradient(135deg, #FFECBB, #EDAE5F, #DE8320); */
		/* background: linear-gradient( 135deg, #f00, #afc, #000 ); */

		background: linear-gradient(318deg, #DE8320 0%, #EDAE5F 61%, #FFECBB 94%);
		box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
	}

	.cell_recipe_apply_record {
		display: flex;
		border-radius: 20rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $cell-size;
		height: $cell-size;
		/* background: linear-gradient(135deg, #A9F9CD, #16E774, #0FD25A); */
		background: linear-gradient(139deg, #A9F9CD 0%, #16E774 42%, #0FD25A 88%);
		box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
	}

	.cell_recipe_apply_record_done {
		display: flex;
		border-radius: 20rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $cell-size;
		height: $cell-size;
		/* background: linear-gradient(135deg, #C7ECFF, #1AC4FD, #3B89E9); */
		background: linear-gradient(140deg, #C7ECFF 8%, #1AC4FD 47%, #3B89E9 92%);
		box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
	}

	.cell_recipe_make_recipe {
		display: flex;
		border-radius: 20rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $cell-size;
		height: $cell-size;
		/* background: linear-gradient(135deg, #FCD9C4, #EF8863, #E3774F); */
		background: linear-gradient(318deg, #E3774F 0%, #EF8863 54%, #FCD9C4 94%);
		box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
	}

	.cell_recipe_make_recipe_done {
		display: flex;
		border-radius: 20rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $cell-size;
		height: $cell-size;
		/* background: linear-gradient(135deg, #D0DBFB, #6583FB, #4263EB); */
		background: linear-gradient(139deg, #D0DBFB 8%, #6583FB 68%, #4263EB 92%);
		box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
	}


	.cell_text_default {
		font-size: 26rpx;
		color: black;
		margin-top: 20rpx;
		font-weight: bold;
	}

	.cell_default {
		display: flex;
		border-radius: 20rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $cell-size;
		height: $cell-size;
		/* box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.1); */
		background: #F3FBFF;
		box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
		border-radius: 17px 17px 17px 17px;
		border-image: linear-gradient(180deg, rgba(235, 243, 255, 1), rgba(225, 237, 255, 1)) 1 1;
	}
</style>