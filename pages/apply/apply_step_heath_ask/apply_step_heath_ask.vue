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
						:typeTitle="item.typeTitle"></QuestionItemTowCompoment>
					<view style="height: 10rpx;"></view>
					<QuestionItemCompoment :questions="questionsUni3" answerLayout="flex" bold-title="true">
					</QuestionItemCompoment>
				</view>
			</view>
		</scroll-view>

		<view class="bottom ">
			<button class="next-button" @click="doNext">下一步</button>
		</view>
	</view>
</template>

<script lang="ts">
	import QuestionItemCompoment from "@/components/question_answer_list_componet.vue"

	import QuestionItemTowCompoment from "@/components/question_answer_list_tow_componet.vue"

	export default {

		components: {
			QuestionItemCompoment, QuestionItemTowCompoment
		},

		created() {

			this.questionsUni1 = [{
				"title": "1.您是否患有下列疾病",
				"answers": ["高血压", "高血脂", "糖尿病", "冠心病"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "2.您是否吸烟",
				"answers": ["是", "否"],
				"selectIndexSet": [],
				"isSingleChoise": true
			},
			{
				"title": "3.您是否喝酒",
				"answers": ["是", "否"],
				"selectIndexSet": [],
				"isSingleChoise": true
			},
			{
				"title": "4.您的运动频率",
				"answers": ["不运动", "偶尔", "经常"],
				"selectIndexSet": [],
				"isSingleChoise": true
			},
			{
				"title": "5.您的运动强度",
				"answers": ["低", "中", "高"],
				"selectIndexSet": [],
				"isSingleChoise": true
			},
			];

			this.questionsUni2 = [{

				"typeTitle": "1.心血管疾病",
				"data": [{
					"title": "先天性心脏病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},
				{
					"title": "心衰",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},
				{
					"title": "心肌缺血",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "冠心病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "慢性风湿性心脏病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "心脏外科手术",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "心脏介入治（冠脉造影、支架、射频、扩瓣、起搏器）",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "高血压",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},

				]

			}, {

				"typeTitle": "2.肺部疾病",
				"data": [{
					"title": "慢性支气管炎",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},
				{
					"title": "慢性阻塞性肺病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "支气管扩张",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "哮喘",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "肺气肿",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "其他慢性呼吸系统疾病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},

				]

			}, {

				"typeTitle": "3.代谢系统疾病",
				"data": [{
					"title": "血脂异常",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},
				{
					"title": "2型糖尿病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "痛风",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "骨质疏松",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "环血病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "其他代谢系统疾病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},
				]

			}, {

				"typeTitle": "4.其他疾病",
				"data": [{
					"title": "脑血管病",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				},
				{
					"title": "肿瘤",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}, {
					"title": "脂肪肝",
					"answers": ["您", "您的家属"],
					"selectIndexSet": [],
				}
				]

			},];

			this.questionsUni3 = [{
				"title": "您是出现过下列症状和相关健康问题？",
				"answers": ["1.肥胖", "2.动脉粥样化", "3做体力活动时有过胸部不适", "有过原因不明的呼吸停止",
					"5.有过原因不明的头晕眼花、晕倒或眩晕", "6有过不明原因的突然心跳加速或者房颤的情况", "7.在步行的时候 出现过这样的情况：不走路时没有明显不适，但走一段路会出现下肢疼痛，越走越疼导致不得不停下休息，休息一段时间后疼痛缓解，又可以继续走路",
					"8.有限制活动的肌肉、骨骼或关节问题", "9.已经绝经？（女性回答）", "10.有夜间失眠（各种原因引起入睡困难、睡眠深度或频率过短、早睡及睡眠时间不足或质量差等）或睡眠不良（包括多梦、觉醒次数过多造成醒后感觉疲乏）的情况",
					"11.有打鼾的情况", "12.白天有精神状态不佳的情况（例如疲乏困倦、昏昏欲睡等）", "13.过去的一年中经历过因为压力、紧张和抑郁而影响到您健康的事情",
				],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "服药史",
				"answers": ["1.长期服用药物", "2.降血压药", "3降血糖药", "降血脂药", "减肥药", "心脏病药物", "钙片", "其他"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			];
		},
		data() {
			return {
				active: 1, //导航进度
				questionsUni1: [],
				questionsUni2: [],
				questionsUni3: [],
				answers: [0, 0, 0, 0, 0],
				siknessList: [{
					"name": "高血压",
					"value": "gxy",
					"checkFlag": false,
				}, {
					"name": "糖尿病",
					"value": "tnb",
					"checkFlag": false,
				}, {
					"name": "高血脂",
					"value": "gxz",
					"checkFlag": false,
				}],
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

			doNext() {
				uni.navigateTo({
					url: "/pages/apply/apply_step_heath_test/apply_step_heath_test"
				})
			},
			checkGroupChange(e) {

			},
		}
	}
</script>

<style lang="scss">
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