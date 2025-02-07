<template>

	<view class="uni-flex uni-column" v-for="(questItem ,index) in questions" :key="index">
		<view :class="titleClass">{{questItem.title}}</view>
		<view style="height: 10rpx;" />
		<view v-if="questItem.isSingleChoise">
			<radio-group @change="radionSelectChange" :data-index="index"
				:style="{ 'pointer-events': !enable ? 'none' : 'auto' }">
				<label :disabled="true" class="radio" v-for="(answerItem,childIndex) in questItem.answers"
					style="margin: 0rpx 20rpx;">
					<radio style="transform: scale(0.6)" color="#007aff" :value="childIndex.toString()"
						:checked="isSelect(questItem,childIndex)" />
					{{answerItem}}
				</label>
			</radio-group>
		</view>
		<view v-else>
			<checkbox-group @change="checkboxSelectChange" :data-index="index"
				:style="{ 'pointer-events': !enable ? 'none' : 'auto' }">
				<label :class="radioClass" v-for="(answerItem,childIndex) in questItem.answers"
					style="margin: 0rpx 20rpx;">
					<checkbox style="transform: scale(0.6)" color="#007aff" :value="childIndex.toString()"
						:checked="isSelect(questItem,childIndex)" />
					{{answerItem}}
				</label>
			</checkbox-group>
		</view>

		<view style="height: 15rpx;" />
	</view>

</template>

<script lang="ts">
	import { nextTick } from "vue";
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

			/**
			 * @type string {"auto", "flex"}
			 * @description 选项布局样式
			 */
			answerLayout: {
				type: String,
				default: "auto",
			},

			/**
			 * @type string {"auto", "flex"}
			 * @description 选项布局样式
			 */
			boldTitle: {
				type: Boolean,
				default: false,
			}

		},


		data() {
			return {
				currRadioClas: "radio"
			}
		},
		computed: {
			titleClass() {
				if (this.boldTitle) {
					return "title-bold";
				} else {
					return "title";
				}
			},
			radioClass() {
				if (this.answerLayout === "auto") {
					return "radio";
				} else {
					return "radio-flex"
				}
			}
		},

		methods: {
			doNext() {
				uni.navigateTo({
					url: ""
				})
			},
			isSelect(questionItem : QuestionItem, targetIndex : number) : boolean {
				var result = questionItem.selectIndexSet.filter((value, _index, _array) => value == targetIndex);
				return result.length > 0
			},

			checkboxSelectChange(e) {
				if (!this.enable) {
					return;
				}
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
			},
			
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';

	.radio {
		margin: 0rpx 50rpx;
	}

	.title {}

	.title-bold {
		font-weight: bold;
		color: black;
	}

	.radio-flex {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		// align-items: center;
	}


	.arrow-down {
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid #666;
	}
</style>