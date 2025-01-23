<template>
	<view class="container">
		<view class="top card" style="margin: 10rpx 20rpx">
			<uni-steps :options="stepMenus" :active="active" />
		</view>

		<scroll-view class="middle" scroll-y="true">
			<view class="uni-flex uni-column" style="padding: 0rpx 20rpx;">
				<view class="card">
					<picker mode="date" :value="selectedDate" @change="onDateChange" :end="today">
						<view class="uni-flex" style="align-items: center; justify-content: space-between;">
							<view>检测日期</view>
							<view class="uni-flex" style="align-items: center; justify-content: flex-end;">
								<view>{{selectedDate}}</view>
								<uni-icons style="margin-left: 20rpx;" type="arrowright"></uni-icons>
							</view>
						</view>
					</picker>
				</view>
				<view style="height: 20rpx;" />

				<view class="card">
					<view class="uni-bold" style="margin-bottom: 10rpx;">身体形状</view>
					<view v-for="(item,index) in bodyParamsUnit1"
						:class="{'list-item-divider': index<bodyParamsUnit1.length-1 }">
						<labelInputComponent :dataItem="item" />
					</view>
				</view>
				<view style="height: 20rpx;" />

				<view class="card">
					<view class="uni-bold" style="margin-bottom: 10rpx;">身体机能</view>
					<view v-for="(item,index) in bodyParamsUnit2"
						:class="{'list-item-divider': index<bodyParamsUnit2.length-1 }">
						<labelInputComponent :dataItem="item" />
					</view>
				</view>
				<view style="height: 20rpx;" />
				<view class="card">
					<view class="uni-bold" style="margin-bottom: 10rpx;">身体素质</view>
					<view v-for="(item,index) in bodyParamsUnit3"
						:class="{'list-item-divider': index<bodyParamsUnit3.length-1 }">
						<labelInputComponent :dataItem="item" />
					</view>
				</view>
				<view style="height: 20rpx;" />

			</view>

		</scroll-view>

		<view class="bottom uni-flex ">
			<button class="next-button" @click="doSkip">跳过</button>

			<button class="next-button" @click="doNext">下一步</button>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		ApplyRecordItem,
		LableInputDataItem
	} from '../../../common/data-model';

	import { BodyTestRecords } from '../../../common/data-model';
	import { mapState } from 'vuex';

	import {
		dateUtils
	} from '../../../common/util';

	import labelInputComponent from "@/components/label_input_unit_component.vue"
	import { bodyTestData } from '../../../common/constants';
	export default {
		components: {
			labelInputComponent
		},
		created() {
			const date = new Date();
			this.today = dateUtils.formatYYMMDD(date);
			this.selectedDate = this.today;
		},

		computed: {
			...mapState(['tempApplyRecordItem']),
		},

		data() {
			return {
				selectedDate: '', // 选中的日期
				today: "", // 限制最大日期				
				active: 2,

				bodyParamsUnit1: bodyTestData().bodyParamsUnit1 as LableInputDataItem[],
				bodyParamsUnit2: bodyTestData().bodyParamsUnit2 as LableInputDataItem[],
				bodyParamsUnit3: bodyTestData().bodyParamsUnit3 as LableInputDataItem[],
				stepMenus: [{
					title: "风险评估"
				}, {
					title: "健康问卷"
				}, {
					title: "体测数据"
				}, {
					title: "知情同意书"
				},],
			}
		},
		methods: {

			onDateChange(e) {
				this.selectedDate = e.detail.value; // 更新选择的日期
			},

			doSkip() {
				uni.navigateTo({
					url: "/pages/apply/apply_step_user_agreement/apply_step_user_agreement"
				})
			},

			doNext() {
				for (var item of this.bodyParamsUnit1) {
					if (!item.value) {
						uni.showToast({
							title: `请输入${item.name}`
						});
						return;
					}
				}
				for (var item of this.bodyParamsUnit2) {
					if (!item.value) {
						uni.showToast({
							title: `请输入${item.name}`
						})
						return;
					}
				}
				for (var item of this.bodyParamsUnit3) {
					if (!item.value) {
						uni.showToast({
							title: `请输入${item.name}`
						})
						return;
					}
				}

				var bodyTestData = {} as BodyTestRecords;
				bodyTestData.height = this.bodyParamsUnit1[0].value;
				bodyTestData.weight = this.bodyParamsUnit1[1].value;
				bodyTestData.waist = this.bodyParamsUnit1[2].value;
				bodyTestData.hipline = this.bodyParamsUnit1[3].value;
				bodyTestData.fatRate = this.bodyParamsUnit1[4].value;

				bodyTestData.systolicPressure = this.bodyParamsUnit2[0].value;
				bodyTestData.diastolicPressure = this.bodyParamsUnit2[1].value;
				bodyTestData.powerCarTestData = this.bodyParamsUnit2[2].value;
				bodyTestData.pulse = this.bodyParamsUnit2[3].value;
				bodyTestData.vitalCapacity = this.bodyParamsUnit2[4].value;

				// gripPower : number,//握力
				// 	carryPower : number,//背力
				// 	jumpPower : number,//跳跃
				// 	pushUpCount : number,//俯卧撑
				// 	kneelUpCount : number,//跪卧撑

				// 	sitUpCount : number,//仰卧起坐
				// 	sitAndReach : number,//坐位体前屈
				// 	standOnOne : number,//单脚站立
				// 	responseTime : number,//反应时间
				bodyTestData.gripPower = this.bodyParamsUnit3[0].value;
				bodyTestData.carryPower = this.bodyParamsUnit3[1].value;
				bodyTestData.jumpPower = this.bodyParamsUnit3[2].value;
				bodyTestData.pushUpCount = this.bodyParamsUnit3[3].value;
				bodyTestData.kneelUpCount = this.bodyParamsUnit3[4].value;

				bodyTestData.sitUpCount = this.bodyParamsUnit3[5].value;
				bodyTestData.sitAndReach = this.bodyParamsUnit3[6].value;
				bodyTestData.standOnOne = this.bodyParamsUnit3[7].value;
				bodyTestData.responseTime = this.bodyParamsUnit3[8].value;

				/**
				 * 测试日期
				 */
				bodyTestData.testDateTime = this.selectedDate;

				console.log(JSON.stringify(bodyTestData));
				if (this.tempApplyRecordItem) {
					(this.tempApplyRecordItem as ApplyRecordItem).bodyTestRecords = bodyTestData;
				} else {
					uni.showToast({
						title: "保存基础对象为空"
					})
					return;
				}

				uni.navigateTo({
					url: "/pages/apply/apply_step_user_agreement/apply_step_user_agreement"
				})
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		/* 垂直排列 */
		height: 95vh;
		padding-bottom: 10rpx;
		/* 设置全屏高度 */
		overflow: hidden;
		/* 防止 body 滚动 */
	}

	.top {
		padding: 10rpx 20rpx;
	}

	.middle {
		flex: 1;
		overflow: hidden;
		padding: 0rpx;
	}

	.bottom {
		margin-top: 20rpx;
		height: 100rpx;
	}

	.divier {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		background-color: #99999951;
		height: 1rpx;
	}
</style>