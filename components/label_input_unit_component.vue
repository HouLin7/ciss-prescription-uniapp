<template>

	<view class="flex-row">
		<text class="left">{{label}}</text>
		<view class="right-container">
			<view class="right">
				<input :disabled="!enable" @input="handleInput" placeholder-style="font-size:26rpx"
					style="width: 120rpx;" placeholder="请输入" type="number" :value="value" />
			</view>
			<text class="right uni-txt accent-color">{{unit}}</text>
		</view>
	</view>

</template>

<script lang="ts">
	import { PropType } from 'vue';
	import { LableInputDataItem } from '../common/data-model';

	export default {

		methods: {
			handleInput(e) {
				// this.$emit("input", e);
				(this.dataItem as LableInputDataItem).value = e.detail.value;
			},

		},

		computed: {

			label() {
				return (this.dataItem as LableInputDataItem).name;
			},

			value() {
				var value = (this.dataItem as LableInputDataItem).value;
				if (value) {
					return value;
				}
				return "";
			},

			unit() {
				return (this.dataItem as LableInputDataItem).unit;
			},

		},


		props: {
			/**
			 * @type {LableInputDataItem}
			 */
			dataItem: {
				type: Object,
				default: null
			},
			/**
			 * @type {Boolean}
			 * @default ""
			 * @description 是否可编辑
			 */
			enable: {
				type: Boolean,
				default: true,
			},

			// value: {
			// 	type: String,
			// 	default: null,
			// },
			// /**
			//  * @type 
			//  * @description  单位名称
			//  */
			// unit: {
			// 	type: String,
			// 	default: "",
			// },
		},

	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';

	.flex-row {
		display: flex;
		justify-content: space-between;
		/* 让左右两部分分开 */
		align-items: center;
		width: 100%;
	}

	/* 左侧 */
	.left {
		padding: 10rpx;
	}

	/* 右侧容器 */
	.right-container {
		display: flex;
		justify-content: flex-end;
		/* 让右侧两个元素靠右 */
		flex-grow: 1;
		align-items: center;
		/* 让其撑满剩余空间 */
	}

	/* 右侧元素 */
	.right {
		// padding: 10rpx;
		margin-left: 10rpx;
	}
</style>