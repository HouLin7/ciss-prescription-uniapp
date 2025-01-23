<template>
	<view class=" container">

		<view class="card top" style="margin: 10rpx 20rpx;">
			<uni-steps :options="stepMenus" :active="active" />
		</view>

		<view class="card middle" style="margin: 10rpx 20rpx;">
			<QuestionItemCompoment :questions="questions"></QuestionItemCompoment>
		</view>
		<button class="next-button bottom" style="margin: 20rpx;" @click="doNext">下一步</button>
	</view>

</template>

<script lang="ts">
	import {
		mapMutations
	} from 'vuex';
	import QuestionItemCompoment from "@/components/question_answer_list_componet.vue";
	import { ApplyRecordItem } from '../../../common/data-model';
	import { QuestionItem } from "../../../common/data-model";
	import { nextTick } from "vue";
	import { riskEvaluationQuestion } from '../../../common/constants';
	export default {

		components: {
			QuestionItemCompoment
		},
		created() {
			this.questions = riskEvaluationQuestion;
		},
		data() {
			return {
				questions: [] as QuestionItem[],
				active: 0,
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
			...mapMutations(['setTempApplyRecordItem']),
			doNext() {
				for (var index in this.questions) {
					var item = this.questions[index];
					if (item.selectIndexSet.length == 0) {
						uni.showToast({
							title: "请完成风险评估"
						});
						return;
					}

					if (item.selectIndexSet[0] == 0) {
						uni.showModal({
							content: "您当前的身体状况不建议申请运动处方",
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateBack();
								} else if (res.cancel) {
									console.log('用户点击取消');
									uni.navigateBack();
								}
							}
						});
						return;
					}

				}
				var applyItem = {} as ApplyRecordItem;
				var allSelectAnswers = [];
				for (var item of this.questions) {
					allSelectAnswers.push(item.selectIndexSet[0]);
				}
				var content = allSelectAnswers.join(',');
				applyItem.riskEvaluation = content;
				this.setTempApplyRecordItem(applyItem);
				console.log(JSON.stringify(applyItem));

				uni.navigateTo({
					url: "/pages/apply/apply_step_heath_ask/apply_step_heath_ask"
				})
			},
			radionSelectChange(e) {
				console.log(e);
				const index = parseInt(e.target.dataset.index)
				this.answers[index] = e.detail.value
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
		height: 80rpx;
		// padding: 10rpx 20rpx;
		overflow: hidden;
	}

	.middle {
		flex: 1;
		overflow: hidden;
	}

	.bottom {
		height: 80rpx;
		// background-color: white;
		overflow: hidden;
		/* height: 100rpx; */
	}
</style>