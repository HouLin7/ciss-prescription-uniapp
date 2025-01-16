<template>
	<view class=" uni-flex uni-column">

		<view class="card" style="margin: 10rpx 20rpx;">
			<uni-steps :options="stepMenus" :active="active" />
		</view>

		<view class="card" style="margin: 10rpx 20rpx;">
			<QuestionItemCompoment :questions="questions"></QuestionItemCompoment>
		</view>
		<button class="next-button" style="margin: 20rpx;" @click="doNext">下一步</button>
	</view>

</template>

<script>
	import QuestionItemCompoment from "@/components/question_answer_list_componet.vue"

	export default {

		components: {
			QuestionItemCompoment
		},
		created() {

		},
		data() {
			return {
				questions: [{
						"title": "1.您是否有医院确诊的心脏病",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": false
					},
					{
						"title": "2.您的安静时血压是否收缩压超过",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": true
					},
					{
						"title": "3.您平时生活或者运动中是否出现过胸闷或缺血性胸痛（心绞痛）？",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": true
					},
					{
						"title": "4.一年内您是否曾因头晕跌倒或曾失去知觉过？",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": true
					},
					{
						"title": "5.医生是否告诉过您只能参加强度较轻的身体活动？",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": true
					},
					{
						"title": "6.您是否会因为运动使关节疼痛加重？",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": true
					},
					{
						"title": "7.您是否有其他不能参加运动的原因？",
						"answers": ["是", "否"],
						"selectIndexSet": [],
						"isSingleChoise": true
					},
				],
				active: 0,
				stepMenus: [{
					title: "风险评估"
				}, {
					title: "健康问卷"
				}, {
					title: "体测数据"
				}, {
					title: "知情同意书"
				}, ],
			}
		},
		methods: {
			doNext() {
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


</style>