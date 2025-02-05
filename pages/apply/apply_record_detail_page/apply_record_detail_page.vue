<template>
	<view class="container">
		<view style="justify-content: center;padding: 10rpx 40rpx;">
			<!-- <view v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: currentIndex === index }"
				@click="currentIndex = index">
				{{ tab }}
			</view> -->

			<uni-segmented-control :current="currentIndex" :values="tabs" style-type="button" active-color="#007aff"
				@clickItem="onClickItem" />
		</view>

		<!-- Swiper 实现分页 -->
		<swiper class="swiper-container" :current="currentIndex" @change="onSwiperChange">
			<swiper-item>
				<view class="card" style="margin: 10rpx 20rpx;">
					<QuestionItemCompoment :questions="risk_questions" :enable="false"></QuestionItemCompoment>
				</view>
			</swiper-item>

			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="uni-flex uni-column " style="margin: 0rpx 20rpx;">
						<view class="card" style="background-color: white; margin: ;">
							<QuestionItemCompoment :questions="heath_questions.questionsUni1" :enable="false">
							</QuestionItemCompoment>
						</view>

						<view class="card" style="background-color: white;">
							<view style="font-weight: bold;">您的亲属是否有过下列病史？</view>
							<view style="height: 10rpx;"></view>
							<QuestionItemTowCompoment v-for="(item,index) in heath_questions.questionsUni2" :key="index"
								:questions="item.data" :typeTitle="item.typeTitle" :enable="false" />
							<view style="height: 10rpx;"></view>
							<QuestionItemCompoment :questions="heath_questions.questionsUni3" answerLayout="flex"
								bold-title="true" :enable="false" />
						</view>
					</view>
				</scroll-view>
			</swiper-item>

			<swiper-item>

				<scroll-view v-if="applyRecordItem!=null && applyRecordItem.bodyTestRecords!=null" scroll-y="true"
					style="height: 100%">
					<view class="uni-flex uni-column" style="padding: 0rpx 20rpx;">
						<view class="card">

							<view class="uni-flex" style="align-items: center; justify-content: space-between;">
								<view>检测日期</view>
								<view class="uni-flex" style="align-items: center; justify-content: flex-end;">
									<view>{{selectedDate}}</view>
								</view>
							</view>

						</view>
						<view style="height: 20rpx;" />

						<view class="card">
							<view class="uni-bold" style="margin-bottom: 10rpx;">身体形状</view>
							<view v-for="(item,index) in bodyTestData.bodyParamsUnit1"
								:class="{'list-item-divider': index<bodyTestData.bodyParamsUnit1.length-1 }">
								<labelInputComponent :dataItem="item" :enable="false" />
							</view>
						</view>
						<view style="height: 20rpx;" />

						<view class="card">
							<view class="uni-bold" style="margin-bottom: 10rpx;">身体机能</view>
							<view v-for="(item,index) in bodyTestData.bodyParamsUnit2"
								:class="{'list-item-divider': index<bodyTestData.bodyParamsUnit2.length-1 }">
								<labelInputComponent :dataItem="item" :enable="false" />
							</view>
						</view>
						<view style="height: 20rpx;" />
						<view class="card">
							<view class="uni-bold" style="margin-bottom: 10rpx;">身体素质</view>
							<view v-for="(item,index) in bodyTestData.bodyParamsUnit3"
								:class="{'list-item-divider': index<bodyTestData.bodyParamsUnit3.length-1 }">
								<labelInputComponent :dataItem="item" :enable="false" />
							</view>
						</view>
						<view style="height: 20rpx;" />

					</view>

				</scroll-view>
				<view v-else class="uni-flex uni-row" style="justify-content: center; padding: 30rpx;">没有填报体测数据</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script lang="ts">
	import QuestionItemCompoment from "@/components/question_answer_list_componet.vue"
	import QuestionItemTowCompoment from "@/components/question_answer_list_tow_componet.vue"

	import applyApi from "@/api/apply_api.js"
	import {
		heathAskQuestion,
		bodyTestData,
		riskEvaluationQuestion
	} from '../../../common/constants';
	import {
		dateUtils
	} from '../../../common/util';
	import labelInputComponent from "@/components/label_input_unit_component.vue"
	import { BodyTestRecords, QuestionItem, QuestionTypeItem } from "../../../common/data-model";

	export default {
		components: {
			QuestionItemCompoment,
			QuestionItemTowCompoment,
			labelInputComponent
		},

		onLoad(params : Map<string, any>) {
			const date = new Date();

			var id = params["id"];
			applyApi.getApplyRecordDetail(id).then(data => {
				this.applyRecordItem = data;
				var str = data.riskEvaluation as string;
				var strRiskArray = str.split(',');
				var riskQuestions = this.risk_questions as QuestionItem[];
				var index = 0;
				for (var item of riskQuestions) {
					if (strRiskArray[index] == undefined) {
						item.selectIndexSet = [-1];
					} else {
						item.selectIndexSet = [Number(strRiskArray[index])];
					}
					index++;
				}

				index = 0;
				var str = data.healthQuestion as string;
				var strHeathArray = str.split(',');


				for (var item of this.heath_questions.questionsUni1) {
					var currSelectResult = strHeathArray[index];
					if (currSelectResult != "-1") {
						if (currSelectResult.length > 1) {
							var selectValue = currSelectResult.split(/\s+/);
							item.selectIndexSet = [];
							selectValue.forEach((value, index, array) => {
								item.selectIndexSet.push(Number(value));
							})
						} else {
							item.selectIndexSet = [Number(currSelectResult)];
						}
					}
					index++;
				}

				for (var itemType of (this.heath_questions.questionsUni2 as QuestionTypeItem[])) {
					for (var item of itemType.data) {
						var currSelectResult = strHeathArray[index];
						if (currSelectResult != "-1") {
							if (currSelectResult.length > 1) {
								var selectValue = currSelectResult.split(/\s+/);
								item.selectIndexSet = [];
								selectValue.forEach((value, index, array) => {
									item.selectIndexSet.push(Number(value));
								})
							} else {
								item.selectIndexSet = [Number(currSelectResult)];
							}
						}
						index++;
					}
				}


				for (var item of this.heath_questions.questionsUni3) {
					var currSelectResult = strHeathArray[index];
					if (currSelectResult != "-1") {
						if (currSelectResult.length > 1) {
							var selectValue = currSelectResult.split(/\s+/);
							item.selectIndexSet = [];
							selectValue.forEach((value, index, array) => {
								item.selectIndexSet.push(Number(value));
							})
						} else {
							item.selectIndexSet = [Number(currSelectResult)];
						}
					}
					index++;
				}

				if (data.bodyTestRecords != null) {
					const item = data.bodyTestRecords as BodyTestRecords;
					this.selectedDate = item.testDateTime;
					this.bodyTestData.bodyParamsUnit1[0].value = item.height;
					this.bodyTestData.bodyParamsUnit1[1].value = item.weight;
					this.bodyTestData.bodyParamsUnit1[2].value = item.waist;
					this.bodyTestData.bodyParamsUnit1[3].value = item.hipline;
					this.bodyTestData.bodyParamsUnit1[4].value = item.fatRate;
					
					this.bodyTestData.bodyParamsUnit2[0].value = item.systolicPressure;
					this.bodyTestData.bodyParamsUnit2[1].value = item.diastolicPressure;
					this.bodyTestData.bodyParamsUnit2[2].value = item.powerCarTestData;
					this.bodyTestData.bodyParamsUnit2[3].value = item.pulse;
					this.bodyTestData.bodyParamsUnit2[4].value = item.vitalCapacity;
					
					this.bodyTestData.bodyParamsUnit3[0].value = item.gripPower;
					this.bodyTestData.bodyParamsUnit3[1].value = item.carryPower;
					this.bodyTestData.bodyParamsUnit3[2].value = item.jumpPower;
					this.bodyTestData.bodyParamsUnit3[3].value = item.pushUpCount;
					this.bodyTestData.bodyParamsUnit3[4].value = item.kneelUpCount;
					
					this.bodyTestData.bodyParamsUnit3[5].value = item.sitUpCount;
					this.bodyTestData.bodyParamsUnit3[6].value = item.sitAndReach;
					this.bodyTestData.bodyParamsUnit3[7].value = item.standOnOne;
					this.bodyTestData.bodyParamsUnit3[8].value = item.responseTime;
					
				}

			});

			this.today = dateUtils.formatYYMMDD(date);
			this.selectedDate = this.today;
			this.risk_questions = riskEvaluationQuestion();

			this.heath_questions = heathAskQuestion();

			this.bodyTestData = bodyTestData();
		},
		data() {

			return {

				applyRecordItem: null,
				selectedDate: '', // 选中的日期
				today: "", // 限制最大日期	
				risk_questions: [],
				heath_questions: {},
				bodyTestData: {},
				currentIndex: 0,
				tabs: ["风险评估", "健康报告", "体测数据"]
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.currentIndex = e.currentIndex
				}
			},
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;

			}

		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.tab-container {
		white-space: nowrap;
		width: 100%;
		overflow-x: auto;
		display: flex;
		background-color: #f5f5f5;
	}

	.tab {
		padding: 10px 20px;
		font-size: 18px;
		cursor: pointer;
	}

	.active {
		color: $uni-color-primary;
		font-weight: bold;
	}

	.swiper-container {
		width: 100%;
		flex: 1;
	}

	.page-content {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		height: 100%;
		background-color: lightgreen;
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
</style>