<template>

	<view> {{typeTitle}}</view>
	<view style="height: 5rpx;" />
	<view> 您 您的家属（父母、儿女、兄弟姐妹）</view>
	<view style="height: 5rpx;" />
	<view class="uni-flex uni-column" v-for="(questItem ,index) in questions" :key="index">
		<view class="uni-flex uni-row">
			<checkbox-group @change="checkboxSelectChange" :data-index="index" style="width: 150rpx;">
				<checkbox :disabled="!enable" v-for="(answerItem,childIndex) in questItem.answers"
					style="transform: scale(0.6)" color="#007aff" :value="childIndex.toString()"
					:checked="isSelect(questItem,childIndex)" />
			</checkbox-group>
			<view>{{questItem.title}}</view>
		</view>
	</view>

</template>

<script lang="ts">
	import { QuestionItem } from "../common/data-model.js"
	import {
		mapState
	} from 'vuex';


	export default {

		props: {
			/**
			 * @type {Boolean}
			 * @default ""
			 * @description 是否可编辑
			 */
			enable: {
				type: Boolean,
				default: true,
			},
			/**
			 * @type {Array}
			 * @default []
			 * @description 问题数据源
			 */
			questions: {
				type: Array<QuestionItem>,
				default: [],
			},

			typeTitle: {
				type: String,
				default: "",
			}

		},


		data() {
			return {

			}
		},

		watch: {
			// canChargeBattery: function (newVal) {
			// uni.showToast({
			// 	title: `${newVal}`,
			// })
			// },
		},
		computed: {

		},

		methods: {
			isSelect(questionItem : QuestionItem, targetIndex : number) : boolean {
				var result = questionItem.selectIndexSet.filter((value, _index, _array) => value == targetIndex);
				return result.length > 0
				// var flag = false;
				// for (var selectIndex in questionItem.selectIndexSet) {					
				// 	if (selectIndex == index) {
				// 		flag = true;
				// 		break;
				// 	}
				// }
				// return flag;
			},

			checkboxSelectChange(e) {
				const index = parseInt(e.target.dataset.index)
				const currQuestItem = this.questions[index];
				const values = e.detail.value;
				currQuestItem.selectIndexSet = values;
			},
			radionSelectChange(e) {
				// this.$emit("change", e);

				const index = parseInt(e.target.dataset.index)
				const currQuestItem = this.questions[index];

				const value = e.detail.value;
				console.log("radionSelectChange : " + value);
				currQuestItem.selectIndexSet = [value];
			}
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';

	.radio {
		margin: 0rpx 50rpx;
	}

	.label-text {
		color: $uni-text-color;
		font-size: 24rpx;
	}

	.counter {
		padding: 0rpx 15rpx;
		display: flex;
		flex-direction: column;
	}

	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}

	.picker {
		padding-left: 15rpx;
		padding-right: 15rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 8rpx;
	}

	.arrow-down {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid #666;
	}
</style>