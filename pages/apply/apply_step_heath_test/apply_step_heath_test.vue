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
								<view>{{testDate}}</view>
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
						<labelInputComponent :label="item.name" :unit="item.unit" />
					</view>
				</view>
				<view style="height: 20rpx;" />

				<view class="card">
					<view class="uni-bold" style="margin-bottom: 10rpx;">身体机能</view>
					<view v-for="(item,index) in bodyParamsUnit2"
						:class="{'list-item-divider': index<bodyParamsUnit2.length-1 }">
						<labelInputComponent :label="item.name" :unit="item.unit" />
					</view>
				</view>
				<view style="height: 20rpx;" />
				<view class="card">
					<view class="uni-bold" style="margin-bottom: 10rpx;">身体素质</view>
					<view v-for="(item,index) in bodyParamsUnit3"
						:class="{'list-item-divider': index<bodyParamsUnit3.length-1 }">
						<labelInputComponent :label="item.name" :unit="item.unit" />
					</view>
				</view>
				<view style="height: 20rpx;" />

			</view>

		</scroll-view>

		<view class="bottom ">
			<button class="next-button" @click="doNext">下一步</button>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		LableInputDataItem
	} from '../../../common/data-model';

	import {
		dateUtils
	} from '../../../common/util';

	import labelInputComponent from "@/components/label_input_unit_componet.vue"

	export default {
		components: {
			labelInputComponent
		},
		created() {
			const date = new Date();
			this.testDate = dateUtils.formatYYMMDD(date);
			this.today = dateUtils.formatYYMMDD(date);
			this.selectedDate = this.today;
		},

		data() {
			return {
				selectedDate: '', // 选中的日期
				today: "", // 限制最大日期
				testDate: "",
				active: 2,

				bodyParamsUnit1: [{
					"name": "身高",
					"unit": "厘米:cm",
					"value:": null,
				}, {
					"name": "体重",
					"unit": "千克:kg",
					"value:": null,
				}, {
					"name": "腰围",
					"unit": "厘米:cm",
					"value:": null,
				}, {
					"name": "臀围",
					"unit": "厘米:cm",
					"value:": null,
				}, {
					"name": "体脂率",
					"unit": "百分比:%",
					"value:": null,
				},],


				bodyParamsUnit2: [{
					"name": "收缩压",
					"unit": "毫米汞柱:mmHg",
					"value:": null,
				}, {
					"name": "舒张压",
					"unit": "毫米汞柱:mmHg",
					"value:": null,
				}, {
					"name": "功率车二级负荷实验",
					"unit": "毫升/千克/分钟:ml/kg/min",
					"value:": null,
				}, {
					"name": "安静脉搏",
					"unit": "次/分钟:bpm",
					"value:": null,
				}, {
					"name": "肺活量",
					"unit": "毫升:ml",
					"value:": null,
				},],

				bodyParamsUnit3: [{
					"name": "握力",
					"unit": "千克:kg",
					"value:": null,
				}, {
					"name": "背力",
					"unit": "千克:kg",
					"value:": null,
				}, {
					"name": "纵跳",
					"unit": "厘米:cm",
					"value:": null,
				}, {
					"name": "俯卧撑",
					"unit": "次",
					"value:": null,
				}, {
					"name": "跪卧撑",
					"unit": "次",
					"value:": null,
				}, {
					"name": "一分钟仰卧起坐",
					"unit": "次",
					"value:": null,
				}, {
					"name": "坐位体前屈",
					"unit": "厘米:cm",
					"value:": null,
				}, {
					"name": "闭眼单脚站立",
					"unit": "秒:s",
					"value:": null,
				}, {
					"name": "选择反应时",
					"unit": "秒:s",
					"value:": null,
				},],
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

			doNext() {
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
		height: 100vh;
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