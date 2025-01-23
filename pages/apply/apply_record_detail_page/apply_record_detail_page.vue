<template>
	<view class="container">
		<view class="uni-flex uni-row tab-container" style="justify-content: center;">
			<view v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: currentIndex === index }"
				@click="currentIndex = index">
				{{ tab }}
			</view>
		</view>

		<!-- Swiper 实现分页 -->
		<swiper class="swiper-container" :current="currentIndex" @change="onSwiperChange">
			<swiper-item>
				<view class="card" style="margin: 10rpx 20rpx;">
					<QuestionItemCompoment :questions="risk_questions"></QuestionItemCompoment>
				</view>
			</swiper-item>

			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="uni-flex uni-column " style="margin: 0rpx 20rpx;">
						<view class="card" style="background-color: white; margin: ;">
							<QuestionItemCompoment :questions="heath_questions.questionsUni1"></QuestionItemCompoment>
						</view>

						<view class="card" style="background-color: white;">
							<view style="font-weight: bold;">您的亲属是否有过下列病史？</view>
							<view style="height: 10rpx;"></view>
							<QuestionItemTowCompoment v-for="(item,index) in heath_questions.questionsUni2" :key="index"
								:questions="item.data" :typeTitle="item.typeTitle" />
							<view style="height: 10rpx;"></view>
							<QuestionItemCompoment :questions="heath_questions.questionsUni3" answerLayout="flex"
								bold-title="true" />
						</view>
					</view>
				</scroll-view>
			</swiper-item>

			<swiper-item>
				<scroll-view scroll-y="true" style="height: 100%">
					<view class="uni-flex uni-column" style="padding: 0rpx 20rpx;">
						<view class="card">

							<view class="uni-flex" style="align-items: center; justify-content: space-between;">
								<view>检测日期</view>
								<view class="uni-flex" style="align-items: center; justify-content: flex-end;">
									<view>{{}}</view>
								</view>
							</view>

						</view>
						<view style="height: 20rpx;" />

						<view class="card">
							<view class="uni-bold" style="margin-bottom: 10rpx;">身体形状</view>
							<view v-for="(item,index) in bodyTestData.bodyParamsUnit1"
								:class="{'list-item-divider': index<bodyTestData.bodyParamsUnit1.length-1 }">
								<labelInputComponent :dataItem="item" />
							</view>
						</view>
						<view style="height: 20rpx;" />

						<view class="card">
							<view class="uni-bold" style="margin-bottom: 10rpx;">身体机能</view>
							<view v-for="(item,index) in bodyTestData.bodyParamsUnit2"
								:class="{'list-item-divider': index<bodyTestData.bodyParamsUnit2.length-1 }">
								<labelInputComponent :dataItem="item" />
							</view>
						</view>
						<view style="height: 20rpx;" />
						<view class="card">
							<view class="uni-bold" style="margin-bottom: 10rpx;">身体素质</view>
							<view v-for="(item,index) in bodyTestData.bodyParamsUnit3"
								:class="{'list-item-divider': index<bodyTestData.bodyParamsUnit3.length-1 }">
								<labelInputComponent :dataItem="item" />
							</view>
						</view>
						<view style="height: 20rpx;" />

					</view>

				</scroll-view>

			</swiper-item>
		</swiper>

	</view>
</template>

<script lang="js">
	import QuestionItemCompoment from "@/components/question_answer_list_componet.vue"

	import QuestionItemTowCompoment from "@/components/question_answer_list_tow_componet.vue"
	import {
		heathAskQuestion,
		bodyTestData,
		riskEvaluationQuestion
	} from '../../../common/constants';
	import {
		dateUtils
	} from '../../../common/util';
	import labelInputComponent from "@/components/label_input_unit_component.vue"

	export default {
		components: {
			QuestionItemCompoment,
			QuestionItemTowCompoment,
			labelInputComponent
		},

		onLoad() {
			const date = new Date();
			this.today = dateUtils.formatYYMMDD(date);
			this.selectedDate = this.today;
			this.risk_questions = riskEvaluationQuestion;

			this.heath_questions = heathAskQuestion;

			this.bodyTestData = bodyTestData;
		},
		data() {

			return {
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