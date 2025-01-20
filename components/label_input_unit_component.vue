<template>

	<view class="flex-row">
		<text class="left">{{label}}</text>
		<view class="right-container">
			<view class="right">
				<input placeholder-style="font-size:26rpx" style="width: 120rpx;" placeholder="请输入" type="number" :value="value" />
			</view>
			<text class="right uni-txt accent-color">{{unit}}</text>
		</view>
	</view>

</template>

<script lang="ts">
	export default {
		// name: "label_input_unit",
		props: {
			/**
			 * @type {String}
			 * @default ""
			 * @description 标题
			 */
			label: {
				type: String,
				default: "",
			},

			value: {
				type: String,
				default: null,
			},
			/**
			 * @type 
			 * @description  单位名称
			 */
			unit: {
				type: String,
				default: "",
			},
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