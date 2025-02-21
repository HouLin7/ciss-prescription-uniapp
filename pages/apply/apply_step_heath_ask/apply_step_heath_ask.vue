<template>
	<view class="container">
		<view class="top card" style="margin: 10rpx 20rpx;">
			<uni-steps :options="stepMenus" :active="active" />
		</view>

		<scroll-view class="middle" scroll-y="true">
			<view class="uni-flex uni-column " style="margin: 0rpx 20rpx;">
				<view class="card" style="background-color: white; margin: ;">
					<QuestionItemCompoment :questions="questionsUni1"></QuestionItemCompoment>
				</view>

				<view class="card" style="background-color: white;">
					<view style="font-weight: bold;">您的亲属是否有过下列病史？</view>
					<view style="height: 10rpx;"></view>
					<QuestionItemTowCompoment v-for="(item,index) in questionsUni2" :key="index" :questions="item.data"
						:typeTitle="item.typeTitle" />
					<view style="height: 10rpx;"></view>
					<QuestionItemCompoment :questions="questionsUni3" answerLayout="flex" bold-title="true" />
				</view>
			</view>
		</scroll-view>

		<view class="bottom ">
			<button class="next-button" @click="doNext">下一步</button>
		</view>

		<uni-popup ref="message" type="message">
			<uni-popup-message type="warning" :message="messageText" :duration="2000" />
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import QuestionItemCompoment from "@/components/question_answer_list_componet.vue"

	import QuestionItemTowCompoment from "@/components/question_answer_list_tow_componet.vue"
	import { ApplyRecordItem, QuestionTypeItem } from '../../../common/data-model';
	import { QuestionItem } from "../../../common/data-model";
	import { heathAskQuestion } from '../../../common/constants';
	import { mapState } from 'vuex';
	export default {
		components: {
			QuestionItemCompoment, QuestionItemTowCompoment
		},

		created() {
			this.questionsUni1 = heathAskQuestion().questionsUni1;
			this.questionsUni2 = heathAskQuestion().questionsUni2;
			this.questionsUni3 = heathAskQuestion().questionsUni3;
		},
		data() {
			return {
				messageText: "",
				active: 1, //导航进度
				questionsUni1: [] as QuestionItem[],
				questionsUni2: [] as QuestionTypeItem[],
				questionsUni3: [] as QuestionItem[],
				answers: [0, 0, 0, 0, 0],
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

		computed: {
			...mapState(['tempApplyRecordItem']),
		},

		methods: {
			showMessage(message:string) {
				this.messageText = message;
				this.$refs.message.open();
			},
			
			doNext() {

				for (var item of this.questionsUni1) {
					if (item.selectIndexSet.length == 0) {
						this.showMessage("请先完成单选部分");
						return;
					}
				}

				var unitAnswers = [];
				for (var item of this.questionsUni1) {
					if (item.selectIndexSet.length == 0) {
						uni.showToast({
							title: "请先完成单选部分"
						});
						return;
					}
					unitAnswers.push(item.selectIndexSet[0]);
				}


				for (var typeItem of this.questionsUni2) {
					for (var dataItem of typeItem.data) {
						if (dataItem.selectIndexSet.length == 0) {
							unitAnswers.push('-1');
						} else {
							unitAnswers.push(dataItem.selectIndexSet.join(" "));
						}
					}
				}

				for (var item of this.questionsUni3) {
					if (item.selectIndexSet.length == 0) {
						unitAnswers.push('-1');
					} else {
						unitAnswers.push(item.selectIndexSet.join(" "));
					}
				}

				if (this.tempApplyRecordItem) {
					(this.tempApplyRecordItem as ApplyRecordItem).healthQuestion = unitAnswers.join(',');
				} else {
					uni.showToast({
						title: "保存基础对象为空"
					})
					return;
				}

				console.log(JSON.stringify(this.tempApplyRecordItem));
				uni.navigateTo({
					url: "/pages/apply/apply_step_heath_test/apply_step_heath_test"
				})
			},

		}
	}
</script>

<style lang="scss">
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
		// height: 120rpx;
		padding: 10rpx 20rpx;
	}

	.middle {
		flex: 1;
		overflow: hidden;
		padding: 0rpx;
	}

	.bottom {
		margin-top: 20rpx;
		// margin: 10rpx 40rpx;
		height: 100rpx;
	}
</style>